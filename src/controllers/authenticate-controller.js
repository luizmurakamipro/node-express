const repository = require('../repositories/authenticate-repository');

exports.authenticate = async (req, res) => { 
    try {
        const { email, password } = req.body;
        var user = await repository.authenticate(email, password);
        if (!user)
            res.status(400).send({message: "Email ou senha incorretos"});
        else
            res.status(200).send({message: "Login realizado com sucesso", user:user});
    } catch (err) {
        res.status(400).send({
            message: "Erro ao tentar autenticar usuário",
            error: err
        });
    }
}