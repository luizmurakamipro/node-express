const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    nome: {
        type:String, 
        required:true
    },
    preco: Number,
    descricao: String,
    comprador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Produto', productSchema);