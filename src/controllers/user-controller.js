const repository = require('../repositories/user-respository'); 
const fs = require('fs');
function sendUserLog(req)
{
    try {
        var today = new Date();
        var log = "auth-" + today.toISOString().substring(0, 10) + ".json";
        var time = (today.getUTCHours() + 21) + ":" + today.getMinutes() + ":" + today.getSeconds();

        fs.readFile(log, (err, data) => {
            if (err) {
                var dados = [];
                dados.push({hour: time, method: req.method, params: req.params, body: req.body});
                fs.writeFile(log, JSON.stringify(dados), error => {
                    if (error)
                        console.log(error);
                    else
                        console.log("Success to save new file!");
                });
            }
            else {
                var dados = JSON.parse(data);
                dados.push({hour: time, method: req.method, params: req.params, body: req.body});
                fs.writeFile(log, JSON.stringify(dados), error => {
                    if (error)
                        console.log(error);
                    else
                        console.log("Success to save file!");
                }); 
            }
        });
    } catch (error) {
        /*res.status(400).send({
            message: "Erro ao tentar registrar JSON",
            error: error
        });*/
        console.log(error);
    }
}

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

exports.authenticate = async (req, res) => { 
    try {
        const { email, password } = req.body;
        console.log(email + " " + password);
        var user = await repository.authenticate(email, password);
        if (!user)
            res.status(400).send({message: "Erro ao tentar autenticar usuário"});
        else
            res.status(200).send({message: "Login realizado com sucesso", user:user});

        sendUserLog(req);
    } catch (err) {
        res.status(400).send({
            message: "Erro ao tentar autenticar usuário",
            error: err
        });
    }
}