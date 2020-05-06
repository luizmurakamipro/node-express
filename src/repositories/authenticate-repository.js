const User = require('../app/models/user');
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

exports.authenticate = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    const id = user._id;
    if (!user)
        throw({
            status: 404, 
            code: "Usuário não encontrado",
            message: "Usuário inexistente"});  
    if (user.email !== email)
       throw({
            status: 404, 
            code: "Usuário não encontrado",
            message: "Email incorreto"});  
    if (!user.validPassword(password))
        throw({
            status: 404, 
            code: "Usuário não encontrado",
            message: "Senha incorreta"});  
    return jwt.sign({id}, process.env.SECRET, {expiresIn:60});
}