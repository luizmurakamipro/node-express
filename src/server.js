const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Persistência
mongoose.connect('mongodb+srv://luizmurakami:luiz@murakami@cluster0-usoip.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true});

// Configurar a aplicação para usar o Body-Parser
app.use(bodyParser.urlencoded([{extended:true}]));
app.use(bodyParser.json());

// Porta da aplicação
const PORT = process.env.port || 3000;

// Rotas
var productRoute = require('./routes/product-routes');
var userRoute = require('./routes/user-routes');
var indexRoute = require('./routes/index-routes');

// Rotas para Usuarios
app.use('/api/users', userRoute);

// Rotas para Produtos
app.use('/api/products', productRoute);

// Rota para Index
app.use('/api', indexRoute);

/*// Definindo as rotas
const router = express.Router(); // Interceptar todas as rotas

// Intecerpt by Middleware
router.use((req, res, next) => {
    console.log("Intercept by Middleware");
    next(); // Continua para próxima API
});

// Rota padrão
router.get('/', (req, res) => {
    res.json({"message":"Route test OK"});
});

router.get('/about', (req, res) => {
    res.json({"message":"About test OK!"});
});

// Caminho padrão para APIs
app.use('/api', router);
*/
app.listen(PORT, () => console.log("Server on-line!"));