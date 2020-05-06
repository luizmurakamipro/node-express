const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

exports.authorize = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        res.status(401).json({auth: false, message: 'Acesso restrito'});
    else {
        jwt.verify(token, process.env.SECRET, (error, decode) => {
            if (error)
                res.status(401).json({auth:false, message: 'Token inválido'});
            else
                next();
        });
    }
}