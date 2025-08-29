import React, { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement
);

// Cores para categorias e pagamentos
const colors = {
	pix: "#36A2EB",
	dinheiro: "#FF6384",
	cartao: "#FFCE56",
	boleto: "#4BC0C0",
	aluguel: "#FF9F40",
	salario: "#9966FF",
	"contas fixas": "#FF9999",
	"matéria-prima": "#36A2EB",
	insumos: "#FFCD56",
	manutenção: "#4BC0C0",
	comida: "#FF9F40",
	bebida: "#36A2EB",
	doce: "#FF6384",
};

const Index = () => {
	const [dados, setDados] = useState(null);
	const [vendasPorCategoria, setVendasPorCategoria] = useState({});
	const [faturamentoMensal, setFaturamentoMensal] = useState({});
	const [despesasMensais, setDespesasMensais] = useState({});
	const [comparativo, setComparativo] = useState({});
	const [formasPagamento, setFormasPagamento] = useState({});
	const [despesasCategorias, setDespesasCategorias] = useState({});
	const [lucroMensal, setLucroMensal] = useState({});

	useEffect(() => {
		fetch("/dados.json")
			.then((r) => r.json())
			.then((json) => {
				setDados(json);
				processarDados(json);
			});
	}, []);

	const processarDados = (dados) => {
		const vendas = dados.vendas;
		const despesas = dados.despesas;

		const vendasCat = {};
		const faturamento = {};
		const despesasMes = {};
		const comp = {};
		const formas = {};
		const despesasCat = {};

		vendas.forEach((v) => {
			const mes = new Date(v.data).toLocaleString("pt-BR", { month: "short" });

			// Vendas por categoria (produto)
			vendasCat[v.categoria] = (vendasCat[v.categoria] || 0) + v.quantidade * v.valorUnitario;

			// Faturamento mensal
			faturamento[mes] = (faturamento[mes] || 0) + v.quantidade * v.valorUnitario;

			// Formas de pagamento por mês
			if (!formas[mes]) formas[mes] = {};
			formas[mes][v.formaPagamento] = (formas[mes][v.formaPagamento] || 0) + v.quantidade * v.valorUnitario;
		});

		despesas.forEach((d) => {
			const mes = new Date(d.data).toLocaleString("pt-BR", { month: "short" });

			// Despesas mensais
			despesasMes[mes] = (despesasMes[mes] || 0) + d.valor;

			// Despesas por categoria por mês
			if (!despesasCat[mes]) despesasCat[mes] = {};
			despesasCat[mes][d.categoria] = (despesasCat[mes][d.categoria] || 0) + d.valor;
		});

		// Comparativo Vendas x Despesas e Lucro
		Object.keys(faturamento).forEach((mes) => {
			const vendasMes = faturamento[mes] || 0;
			const despesasMesVal = despesasMes[mes] || 0;
			comp[mes] = {
				vendas: vendasMes,
				despesas: despesasMesVal,
			};
			lucroMensal[mes] = {
				valor: vendasMes - despesasMesVal,
				percentual: vendasMes > 0 ? ((vendasMes - despesasMesVal) / vendasMes) * 100 : 0,
			};
		});

		setVendasPorCategoria(vendasCat);
		setFaturamentoMensal(faturamento);
		setDespesasMensais(despesasMes);
		setComparativo(comp);
		setFormasPagamento(formas);
		setDespesasCategorias(despesasCat);
		setLucroMensal(lucroMensal);
	};

	if (!dados) return <p style={{ padding: 24 }}>Carregando dados...</p>;

	const meses = Object.keys(faturamentoMensal);

	// === Função para criar datasets multi-colunas ===
	const criarDatasetMultiColuna = (dataPorMes) => {
		const categorias = Array.from(
			new Set(Object.values(dataPorMes).flatMap((mes) => Object.keys(mes)))
		);

		return categorias.map((cat) => ({
			label: cat,
			data: meses.map((mes) => (dataPorMes[mes]?.[cat] || 0)),
			backgroundColor: colors[cat.toLowerCase()] || "#888",
		}));
	};

	// Vendas por categoria por mês
	const vendasPorMes = {};
	dados.vendas.forEach((v) => {
		const mes = new Date(v.data).toLocaleString("pt-BR", { month: "short" });
		if (!vendasPorMes[mes]) vendasPorMes[mes] = {};
		vendasPorMes[mes][v.categoria] = (vendasPorMes[mes][v.categoria] || 0) + v.quantidade * v.valorUnitario;
	});

	const chartVendasCategoria = {
		labels: meses,
		datasets: criarDatasetMultiColuna(vendasPorMes),
	};

	const chartFormasPagamento = {
		labels: meses,
		datasets: criarDatasetMultiColuna(formasPagamento),
	};

	const chartDespesasCategoria = {
		labels: meses,
		datasets: criarDatasetMultiColuna(despesasCategorias),
	};

	const chartFaturamento = {
		labels: meses,
		datasets: [{ label: "Faturamento (R$)", data: Object.values(faturamentoMensal), backgroundColor: "rgba(54, 162, 235, 0.6)" }],
	};

	const chartDespesas = {
		labels: meses,
		datasets: [{ label: "Despesas (R$)", data: Object.values(despesasMensais), backgroundColor: "rgba(255, 99, 132, 0.6)" }],
	};

	const chartComparativo = {
		labels: meses,
		datasets: [
			{ label: "Vendas (R$)", data: meses.map((m) => comparativo[m].vendas), backgroundColor: "rgba(75, 192, 192, 0.6)" },
			{ label: "Despesas (R$)", data: meses.map((m) => comparativo[m].despesas), backgroundColor: "rgba(255, 99, 132, 0.6)" },
		],
	};

	const chartLucro = {
		labels: meses,
		datasets: [
			{
				label: "Lucro (R$)",
				data: meses.map((m) => lucroMensal[m].valor),
				backgroundColor: "rgba(75, 192, 75, 0.6)",
			},
			{
				label: "% Lucro",
				data: meses.map((m) => lucroMensal[m].percentual),
				backgroundColor: "rgba(75, 192, 192, 0.3)",
			},
		],
	};

	return (
		<div style={styles.page}>
			<h1 style={styles.title}>📊 Dashboard — {dados.empresa}</h1>
			<div style={styles.grid}>
				{/* Grupo Vendas */}
				<div style={styles.card}>
					<h3 style={styles.cardTitle}>Vendas por Categoria</h3>
					<div style={styles.chartBox}>
						<Bar data={chartVendasCategoria} options={{ responsive: true, maintainAspectRatio: false }} />
					</div>
				</div>

				<div style={styles.cardSmall}>
					<h3 style={styles.cardTitle}>Formas de Pagamento</h3>
					<div style={styles.chartBoxSmall}>
						<Bar data={chartFormasPagamento} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
					</div>
				</div>

				{/* Grupo Despesas */}
				<div style={styles.cardSmall}>
					<h3 style={styles.cardTitle}>Despesas por Categoria</h3>
					<div style={styles.chartBoxSmall}>
						<Bar data={chartDespesasCategoria} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
					</div>
				</div>

				<div style={styles.card}>
					<h3 style={styles.cardTitle}>Despesas Mensais</h3>
					<div style={styles.chartBox}>
						<Bar data={chartDespesas} options={{ responsive: true, maintainAspectRatio: false }} />
					</div>
				</div>

				{/* Grupo Comparativo */}
				<div style={styles.card}>
					<h3 style={styles.cardTitle}>Comparativo Vendas x Despesas</h3>
					<div style={styles.chartBox}>
						<Bar data={chartComparativo} options={{ responsive: true, maintainAspectRatio: false }} />
					</div>
				</div>

				<div style={styles.card}>
					<h3 style={styles.cardTitle}>Lucro Mensal</h3>
					<div style={styles.chartBox}>
						<Bar data={chartLucro} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
					</div>
				</div>

				<div style={styles.card}>
					<h3 style={styles.cardTitle}>Faturamento Mensal</h3>
					<div style={styles.chartBox}>
						<Line data={chartFaturamento} options={{ responsive: true, maintainAspectRatio: false }} />
					</div>
				</div>
			</div>
		</div>
	);
};

const styles = {
	page: { minHeight: "100vh", background: "#f4f6f9", padding: "24px" },
	title: { textAlign: "center", marginBottom: "24px", fontWeight: 700 },
	grid: { display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", alignItems: "stretch" },
	card: { background: "#fff", borderRadius: "14px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", padding: "16px", display: "flex", flexDirection: "column" },
	cardSmall: { background: "#fff", borderRadius: "14px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", padding: "16px", display: "flex", flexDirection: "column", maxHeight: 420 },
	cardTitle: { marginBottom: "12px", fontWeight: 600 },
	chartBox: { position: "relative", width: "100%", height: 320, flex: 1 },
	chartBoxSmall: { position: "relative", width: "100%", height: 300, flex: 1 },
};

export default Index;
