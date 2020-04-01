const Produto = require('../app/models/product');

const CREATE_FLAG = 201;
const OK_FLAG = 200;
const BADREQUEST_FLAG = 400;

exports.post = (req, res) => {
    var produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(error => {
        if (error)
            res.send("Erro ao tentar salvar um produto " + error);
            
        res.status(CREATE_FLAG).json({message: "Produto inserido com sucesso"});
    });
}

exports.get = (req, res) => {
    Produto.find((err, prods) => {
        if (err)
            res.send(err);

        res.status(OK_FLAG).json({
            message:"Produtos encontrados!",
            produtos: prods
        });
    });
}

exports.getById = (req, res) => {
    const id = req.params.productId;

    Produto.findById(id, (err, prod) => {
        if (err) {
            res.status(500).json({message: "Erro ao tentar encontrar produto"});
        }
        else if (prod == null) {
            res.status(400).json({message: "Produto não encontrado"});
        }
        else {
            res.status(OK_FLAG).json({
                message: "Produto encontrado com sucesso",
                produto: prod
            });
        }
    });
}

exports.put = (req, res) => {
    const id = req.params.productId;

    Produto.findById(id, (err, produto) => {
        if (err) {
            res.status(500).json({message: "Erro ao tentar encontrar o produto"});
        }
        else if (produto == null) {
            res.status(400).json({message: "Produto não encontrado"});
        }
        else {
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;

            produto.save(error => {
                if(error)
                    res.send("Erro ao tentar atualizar um produto" + error);
                
                res.status(OK_FLAG).json({message:"Produto atualizado com sucesso"});
            });
        }
    });
}

exports.delete = async (req, res) => {
    const { productId } = req.params;

    await Produto.findByIdAndRemove(productId, (err, produto) => {
        if(err) 
            return res.status(500).send(err);

        const response = {
            message:"Produto removido com sucesso",
            id: productId
        }; 
        return res.status(OK_FLAG).send(response);
    });
}