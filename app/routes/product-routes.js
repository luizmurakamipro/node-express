const express = require('express');
const router = express.Router(); // Interceptação das Rotas
const Produto = require('../models/product');

const CREATE_FLAG = 201;
const OK_FLAG = 200;

router
    .post('/', (req, res) => {
        var produto = new Produto();
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(error => {
            if (error)
                res.send("Erro ao tentar salvar um produto " + error);
            
            res.status(CREATE_FLAG).json({message: "Produto inserido com sucesso"});
        });
    });

router.get('/', (req, res) => {
    Produto.find((err, prods) => {
        if (err)
            res.send(err);

        res.status(OK_FLAG).json({
            message:"Produtos encontrados!",
            produtos: prods
        });
    });
});

module.exports = router;