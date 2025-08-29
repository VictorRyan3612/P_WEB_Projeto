import useSWR from 'swr'
import * as router from 'next/router';

export default function TheMovie(){
   const {imdId} = router.useRouter().query
   const {data, error} = useSWR(`http://localhost:3000/api/filme/${imdId}`, async (u) => {
      const res = await fetch(u)
      const json = await res.json();
      return json;
   })

   if (error) return <div>Erro na requisição/resposta </div>
   if (!data){
      return (
      <div>
         <center>
            Carregando...
         </center>
      </div>
      )
   } 
   if (data.Error) return <div>Erro</div>
   console.log(data)
   return (
      <div>
         <center>
            <a href='/'>
               Voltar
            </a>
            <br />
               <h2>Título: {data.title}</h2>
               <h3>Ano: {data.year}</h3>
               <img src={data.poster} width="200" alt={`Poster for ${data.title}`} />
         </center>
      </div>
   )
}
