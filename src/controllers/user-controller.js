const Usuario = require('../app/models/user');
const Produto = require('../app/models/product');

const Flag = require('../controllers/flag-controller');

const CREATE_FLAG = 201;
const OK_FLAG = 200;
const BADREQUEST_FLAG = 400;

// Inserir usuario.
exports.post = (req, res) => {
    var usuario = new Usuario();

    usuario.name = req.body.name;
    usuario.email = req.body.email;
    usuario.password = req.body.password;

    usuario.save(error => {
        if (error)
            res.status(BADREQUEST_FLAG).send({error: "Erro ao tentar salvar usuario"});
                
        res.status(CREATE_FLAG).send({message: "Usuario inserido com sucesso"});
    });
}

// Listar usuarios inseridos
exports.get = (req, res) => {
    Usuario.find((err, users) => {
        if (err)
            res.send(err);

        res.status(OK_FLAG).json({
            message:"Usuarios encontrados!",
             usuarios: users
        });
    });
}

exports.getById = (req, res) => {
    const id = req.params.userId;

    Usuario.findById(id, (err, user) => {
        if (err) {
            res.status(500).json({message: "Erro ao tentar encontrar usuário"});
        }
        else if (user == null) {
            res.status(BADREQUEST_FLAG).json({message: "Usuário não encontrado"});
        }
        else {
            res.status(OK_FLAG).json({
                message: "Usuário encontrado com sucesso",
                usuario: user
            });
        }
    });
}

exports.put = (req, res) => {
    const id = req.params.userId;

    Usuario.findById(id, (err, user) => {
        if (err) {
            res.status(500).json({message: "Erro ao tentar encontrar o usuário"});
        }
        else if (user == null) {
            res.status(BADREQUEST_FLAG).json({message: "Usuário não encontrado"});
        }
        else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(error => {
                if(error)
                    res.send("Erro ao tentar atualizar um usuário" + error);
                
                res.status(OK_FLAG).json({message:"Usuário atualizado com sucesso"});
            });
        }
    });
}

exports.delete = async (req, res) => {
    const { userId } = req.params;

    await Usuario.findByIdAndRemove(userId, (err, user) => {
        if(err) 
            return res.status(500).send(err);

        const response = {
            message:"Usuário removido com sucesso",
            id: userId
        }; 
        return res.status(OK_FLAG).send(response);
    });
}

exports.putProduct = async (req, res) => { 
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
}