const repository = require('../repositories/product-repository');
const mongoose = require('mongoose');

exports.post = async (req, res) => {
    try {
        await repository.post({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao
        });
        res.status(201).send({
            message: "Produto inserido com sucesso"
        });
    } catch (err) {
        res.status(500).send({
            message: "Erro ao tentar inserir produto",
            error: err
        });
    }
}

exports.get = async (req, res) => {
   try {
       var data = await repository.get();
       res.status(200).send({
           data: data,
           count: data.length
        });
   } catch (err) {
       res.status(500).send({
           message: "Falha na requisição",
           error: err
       });
   }
}

exports.getById = async (req, res) => {
    try {
        const { productId } = req.params;
        var data = await repository.getById(productId);

        if (data == null)
            res.status(500).send({message: "Produto não encontrado"});
        else
            res.status(200).send(data);
   } catch (err) {
       res.status(500).send({
           message: "Falha na requisição",
           error: err
       });
   }
}

exports.put = async (req, res) => {
    try {
        const { productId } = req.params;;
        var data = await repository.put(productId, req.body);
        res.status(200).send({
            message: "Produto atualizado com sucesso",
            dados: data
        });
    } catch (err) {
        res.status(400).send({
            message: "Erro ao tentar atualizar produto",
            error: err
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const { productId } = req.params;

        await repository.delete(productId);

        res.status(201).send({
            message: "Produto deletado com sucesso"
        });
    } catch (err) {
        res.status(500).send({
            message: "Erro ao tentar deletar produto",
            error: err
        });
    }
}