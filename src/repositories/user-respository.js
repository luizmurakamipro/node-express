const User = require('../app/models/user');
const Product = require('../app/models/product');

// GetAll
exports.get = async () => {
    const res = await User.find();
    return res;
}

// GetById
exports.getById = async (id) => {
    const res = await User.findById(id);
    return res;
}

// Post
exports.post = async (data) => {
    const user = new User(data);
    await user.save();
}

// Put
exports.put = async (id, data) => {
    const res = await User.findByIdAndUpdate(id, {
        $set:{
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
    return res;
}

// Delete
exports.delete = async (id) => {
    await User.findByIdAndRemove(id);
}

exports.putProduct = async (uId, pId) => {
    const product = await Product.findById(pId);
    const user = await User.findById(uId);

    product.comprador = user;
    await product.save();

    user.produtos.push(product);
    await user.save();

    return [ user, product ];
}

exports.authenticate = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user)
    {
        console.log('Não encontrado');
        return null;
    }
    if (user.email !== email)
    {     
         console.log('email errado');
        return null;
    }
    if (user.password !== password)
    {
         console.log('senha errada');
        return null;
    }
    return user;
}