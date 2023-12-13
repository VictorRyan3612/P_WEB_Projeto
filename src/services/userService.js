const { request } = require('express');
const db = require('../dbUsers')

module.exports = {
   buscarUsuario: (email, password) => {
      return new Promise((resolve, reject) => {
         db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
            if (error) {
               reject(error);
               return;
            }
            
            console.log("opa")
            if (results.length > 0) {
               resolve(results[0]);
            } else {
               resolve(null);
            }
         });
      });
   }

};
