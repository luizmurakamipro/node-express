const Usuario = require('../app/models/user');
const Produto = require('../app/models/product');

// Inserir usuario.
exports.post = (req, res) => {
    var usuario = new Usuario();

    usuario.name = req.body.name;
    usuario.email = req.body.email;
    usuario.password = req.body.password;

    usuario.save(error => {
        if (error)
            res.status(400).send({error: "Erro ao tentar salvar usuario"});
                
        res.status(201).send({message: "Usuario inserido com sucesso"});
    });
}

// Listar usuarios inseridos
exports.get = (req, res) => {
    Usuario.find((err, users) => {
        if (err)
            res.send(err);

        res.status(200).json({
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
            res.status(400).json({message: "Usuário não encontrado"});
        }
        else {
            res.status(200).json({
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
            res.status(400).json({message: "Usuário não encontrado"});
        }
        else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(error => {
                if(error)
                    res.send("Erro ao tentar atualizar um usuário" + error);
                
                res.status(200).json({message:"Usuário atualizado com sucesso"});
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
        return res.status(200).send(response);
    });
}

exports.putProduct = async (req, res) => { 
    const { userId, productId } = req.params;
    const produto = await Produto.findById(productId);
    const usuario = await Usuario.findById(userId);

    produto.comprador = usuario;
    produto.save(error => {
        if (error)
            res.status(400).send({message: "Erro ao salvar produto com usuario inserido"});
    });

    usuario.produtos.push(produto);
    usuario.save(error => {
        if (error)
            res.status(400).send({message: "Erro ao inserir produto no usuario"});

        res.status(201).send({message: "Produto inserido no usuario com sucesso"});
    });
}