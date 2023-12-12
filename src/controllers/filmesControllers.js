const filmeService = require('../services/filmeService')

module.exports ={ 
   buscarTodos: async (req, res) =>{
      let json = {error: '', result:[]};

      let filmes = await filmeService.buscarTodos();

      for(let i in filmes){
         json.result.push({
            imdId: filmes[i].imdId,
            title: filmes[i].title,
            year: filmes[i].year,
            poster: filmes[i].poster

         })
      }
      res.json(json)
   }
}