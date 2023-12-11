require("dotenv").config({path: 'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const routes = require('./routes');

const server = express();

server.use(cors());
server.use(bodyparser.urlencoded({extended: false}));

server.listen(process.env.PORT, () =>{
   console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
})

