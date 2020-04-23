const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    produtos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    }]
});

module.exports = mongoose.model('Usuario', userSchema);
