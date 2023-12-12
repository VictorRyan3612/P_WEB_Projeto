const express = require('express');
const router = express.Router();

const filmesController = require('./controllers/filmesControllers');
module.exports = router

router.get('/filmes', filmesController.buscarTodos)