const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    nome: {type:String, required:true},
    preco: Number,
    descricao: String
});

module.exports = mongoose.model('Produto', productSchema);