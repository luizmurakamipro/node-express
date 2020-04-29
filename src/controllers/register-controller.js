const repository = require('../repositories/user-respository'); 

exports.register = async (req, res) => {
    try {
        await repository.post({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).send({
            message: "Usuário registrado com sucesso"
        });
    } catch (err) {
        res.status(500).send({
            message: "Erro ao tentar registrar usuário",
            error: err
        });
    }
}