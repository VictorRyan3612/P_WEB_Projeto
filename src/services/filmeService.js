const { request } = require('express');
const db = require('../db')

module.exports = {
   buscarTodos: () =>{
      return new Promise((aceito, rejeitado) =>{
         db.query('SELECT * FROM filmes', (error, results) => {
            if (error) {
               rejeitado(error); return;
            }
            aceito(results)
         })
      })
   },

   buscarUm: (imdId) =>{
      return new Promise ((aceito, rejeitado) =>{
         db.query('SELECT * FROM filmes WHERE imdId = ?', [imdId], (error, results) =>{
            if (error) {
               rejeitado(error); return;
            }
            if (results.length > 0){
               aceito(results[0]);
            }
            else{
               // let a = results.lenght
               // aceito(a);
               aceito(false)
            }
         })
      })
   },
   inserir: (imdId, title, year, poster)=> {
      return new Promise((aceito, rejeitado)=> {

         db.query('INSERT INTO filmes (imdId, title, year, poster) VALUES (?, ?, ?, ?)',
            [imdId, title, year, poster],
            (error, results)=>{
               // console.log(results)
                  if(error){ rejeitado(error); return; }
                  aceito(results);
            }
         );
      });
   },
};