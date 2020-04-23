const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Persistência
mongoose.connect('mongodb+srv://luizmurakami:luiz@murakami@cluster0-usoip.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true});

// Configurar a aplicação para usar o Body-Parser
app.use(bodyParser.urlencoded([{extended:false}]));
app.use(bodyParser.json());

// Porta da aplicação
const PORT = process.env.port || 3000;

// Rotas
var productRoute = require('./routes/product-routes');
var userRoute = require('./routes/user-routes');
var indexRoute = require('./routes/index-routes');

// Rota para Index
app.use('/api', indexRoute);

// Rotas para Usuarios
app.use('/api/users', userRoute);

// Rotas para Produtos
app.use('/api/products', productRoute);

app.listen(PORT, () => console.log("Server on-line!"));