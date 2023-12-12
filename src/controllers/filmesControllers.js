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
   },
   buscarUm: async(req, res) => {
      let json = {error: '', result:{}};
      let imdId = req.params.imdId;
      let filme = await filmeService.buscarUm(imdId);
      if (filme){
         json.result = filme
      }
      res.json(filme)
      // res.json(json)
   }
}