const Product = require('../app/models/product');

// GetAll
exports.get = async () => {
    const res = await Product.find();
    return res;
}

// GetById
exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
}

// Post
exports.post = async (data) => {
    const product = new Product(data);
    await product.save();
}

// Put
exports.put = async (id, data) => {
    const res = await Product.findByIdAndUpdate(id, {
        $set:{
            nome: data.nome,
            preco: data.preco,
            descricao: data.descricao
        }
    });
    return res;
}

// Delete
exports.delete = async (id) => {
    await Product.findByIdAndRemove(id);
}