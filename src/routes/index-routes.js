const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    // Aqui será implementado rotinas de Logs, Validações, Autenticações...
    console.log("Intercept by Middleware");
    next();
});

router.get('/', (req, res) => res.json({message: "Intercepted!"}));

module.exports = router;