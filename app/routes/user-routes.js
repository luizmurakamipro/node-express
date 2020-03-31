const express = require('express');
const router = express.Router(); // Interceptação das Rotas
const Usuario = require('../models/user');
const Produto = require('../models/product');

const CREATE_FLAG = 201;
const OK_FLAG = 200;
const BADREQUEST_FLAG = 400;

// Inserir usuario.
router.post('/', (req, res) => {
    var usuario = new Usuario();

    usuario.nome = req.body.nome;
    usuario.cpf = req.body.cpf;

    usuario.save(error => {
        if (error)
            res.status(BADREQUEST_FLAG).send({error: "Erro ao tentar salvar usuario"});
                
        res.status(CREATE_FLAG).send({message: "Usuario inserido com sucesso"});
    });
});

// Listar usuarios inseridos
router.get('/', (req, res) => {
    Usuario.find((err, users) => {
        if (err)
            res.send(err);

        res.status(OK_FLAG).json({
            message:"Usuarios encontrados!",
             usuarios: users
        });
    });
});

router.post('/:userId/:productId', async (req, res) => { 
    const { userId, productId } = req.params;
    const produto = await Produto.findById(productId);
    const usuario = await Usuario.findById(userId);

    produto.comprador = usuario;
    produto.save(error => {
        if (error)
            res.status(BADREQUEST_FLAG).send({message: "Erro ao salvar produto com usuario inserido"});
    });

    usuario.produtos.push(produto);
    usuario.save(error => {
        if (error)
            res.status(BADREQUEST_FLAG).send({message: "Erro ao inserir produto no usuario"});

        res.status(CREATE_FLAG).send({message: "Produto inserido no usuario com sucesso"});
    });
});

module.exports = router;