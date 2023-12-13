const express = require('express');
const router = express.Router();

const filmesController = require('./controllers/filmesControllers');
module.exports = router

router.get('/filmes', filmesController.buscarTodos)
router.get('/filme/:imdId', filmesController.buscarUm)

router.post('/login', (req, res) => {
   const { email, password } = req.body;

   const user = users.find(user => user.email === email && user.password === password);
   if (user)
   {
      return res.status(200).json(user);
   }

   return res.status(401).json({ message: 'Credenciais inválidas' });
});
