
const repository = require('../repositories/user-respository'); 

exports.post = async (req, res) => {
    try {
        await repository.post({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).send({
            message: "Usuário inserido com sucesso"
        });
    } catch (err) {
        res.status(500).send({
            message: "Erro ao tentar inserir usuário",
            error: err
        });
    }
}

exports.get = async (req, res) => {
   try {
       var data = await repository.get();
       res.status(200).send(data);
   } catch (err) {
       res.status(500).send({
           message: "Falha na requisição",
           error: err
       });
   }
}

exports.getById = async (req, res) => {
    try {
       const { userId } = req.params;
       var data = await repository.getById(userId);
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
        const { userId } = req.params;;
        var data = await repository.put(userId, req.body);
        res.status(200).send({
            message: "Usuário atualizado com sucesso",
            dados: data
        });
    } catch (err) {
        res.status(400).send({
            message: "Erro ao tentar atualizar usuário",
            error: err
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const { userId } = req.params;
        await repository.delete(userId);  
        res.status(200).send({
            message: "Usuário deletado com sucesso"
        });
    } catch (err) {
        res.status(500).send({
            message: "Erro ao tentar deletar usuário",
            error: err
        });
    }
}

exports.putProduct = async (req, res) => { 
    try {
        const { userId, productId } = req.params;
        var [ userData, productData ] = await repository.putProduct(userId, productId);
        res.status(200).send({
            message: "Produto inserido no usuário com sucesso",
            user: userData,
            product: productData
        });
    } catch (err) {
        res.status(400).send({
            message: "Erro ao inserir produto no usuario",
            error: err
        });
    }
}