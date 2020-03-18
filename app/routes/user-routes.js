const express = require('express');
const router = express.Router(); // Interceptação das Rotas
const Usuario = require('../models/user');
const Produto = require('../models/product');

const CREATE_FLAG = 201;
const OK_FLAG = 200;
const BADREQUEST_FLAG = 400;

// Inserir usuario.
router
    .post('/', (req, res) => {
        try {
            var usuario = new Usuario();

            usuario.nome = req.body.nome;
            usuario.cpf = req.body.cpf;

            usuario.save(error => {
                if (error)
                    res.status(BADREQUEST_FLAG).send({error: "Erro ao tentar salvar usuario"});
                
                res.status(CREATE_FLAG).send({message: "Usuario inserido com sucesso"});
            });
        } catch (err) {
            res.status(BADREQUEST_FLAG).send({error: "Informações incorretas"});
        }
    });

// Listar usuarios inseridos
router
    .get('/', (req, res) => {
        Usuario.find((err, users) => {
            if (err)
                res.send(err);

            res.status(OK_FLAG).json({
                message:"Usuarios encontrados!",
                usuarios: users
            });
        });
    });


router.
    post('/:userId/products', (req, res) => { 
        const { userId } = req.params;
        const novoProduto = new Produto(req.body);
        var id = new mongoose.Types.ObjectId(userId);
        const usuario = Usuario.findOne(id);

        novoProduto.comprador = usuario;
        novoProduto.save();

        usuario.produtos.push(novoProduto);
        usuario.save(error => {
            if (error)
                res.status(BADREQUEST_FLAG).send({message: "Erro ao inserir produto no usuario"});

            res.status(CREATE_FLAG).send({message: "Produto inserido no usuario com sucesso"});
        });
    });

module.exports = router;