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
var productRoute = require('./routes/product-route');
var userRoute = require('./routes/user-route');
var indexRoute = require('./routes/index-route');
var regRoute = require('./routes/register-route');
var authRoute = require('./routes/authenticate-route');

// Rota para Index
app.use('/api', indexRoute);

// Rotas para Usuarios
app.use('/api/users', userRoute);

// Rotas para Produtos
app.use('/api/products', productRoute);

// Rota para Registro
app.use('/api/register', regRoute);

// Rota para Autenticação
app.use('/api/authenticate', authRoute);

app.listen(PORT, () => console.log("Server on-line!"));