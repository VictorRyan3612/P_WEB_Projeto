const express = require('express');
const router = express.Router();

const filmesController = require('./controllers/filmesControllers');
const usersController = require('./controllers/usersController');


module.exports = router

router.get('/filmes', filmesController.buscarTodos)
router.get('/filme/:imdId', filmesController.buscarUm)
router.get('/addfilme', filmesController.addfilme)


router.post('/login', usersController.login);
