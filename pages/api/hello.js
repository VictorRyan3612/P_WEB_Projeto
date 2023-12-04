export default function handler(req, res){
   const data = [
      {nome: "Victor"},
      {nome: "Ceasar"},
      {nome: "Mario"}
   ]
   if (req.method === 'GET'){
      return res.status(200).json(data)
   }
   else{
      return res.status(400).json({mensagem: "Requisição inválida"})
   }
}
