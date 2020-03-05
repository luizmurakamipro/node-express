const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configurar a aplicação para usar o Body-Parser
app.use(bodyParser.urlencoded([{extended:true}]));
app.use(bodyParser.json());

// Porta da aplicação
const PORT = process.env.port || 3000;

// Definindo as rotas
const router = express.Router(); // Interceptar todas as rotas

// Middleware
router.use((req, res, next) => {
    console.log("Intercept by Middleware");
    next(); // Continua para próxima API
});

router.get('/', (req, res) => {
    res.json({"message":"Route test OK"});
});

// Caminho padrão para APIs
app.use('/api', router);

app.listen(PORT, () => {
    console.log("Server on-line!");
});