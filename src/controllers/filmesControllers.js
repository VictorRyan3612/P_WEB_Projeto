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
   },
   addfilme: async(req, res) => {
      let json = {error:'', result:{}};
      let imdId = req.body.imdId;
      let title = req.body.title;
      let year = req.body.year;
      let poster = req.body.poster
      console.log(imdId,title,year,poster)
      if (imdId, title, year, poster){
            let filmeCodigo = await filmeService.inserir(imdId, title, year, poster);
            console.log(filmeCodigo)
            json.result = {
               imdId: imdId,
               title: title,
               year: year,
               poster: poster
            };
         }else{
            json.error = 'Campos não enviados';
         }
         res.json(json);
   },

}