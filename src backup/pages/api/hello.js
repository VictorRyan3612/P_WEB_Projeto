export default function handler(req, res){
   let data = [
      {nome: "Victor"},
      {nome: "Ceasar"},
      {nome: "Mario"}
   ]
   
   if (req.method === 'GET'){
      return res.status(200).json(data)
   }

   else if (req.method === 'POST'){
      const novoUsuario = req.body.nome;

      if (novoUsuario === ""){
         return res.status(400).json({mensagem: "O nome do Usuario precisa ser válido"})
      }
      else{
         data.push({nome: novoUsuario})
         console.log(data)
         return res.status(200).json({mensagem: "Usuario válido"})
      }
   }
   else{
      return res.status(400).json({mensagem: "Requisição inválida"})
   }
}
