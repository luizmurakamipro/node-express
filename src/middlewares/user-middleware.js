const fs = require('fs');

module.exports = (req, res, next) => {
    try {
        var logDir = "auth-" + Date.now() + ".json";

        var data = JSON.stringify({
            method: req.method,
            params: req.params,
            body: req.body,
        });
        fs.writeFile(logDir, data, err => {
            if (err)
                console.log(err);
            else
                console.log("Arquivo salvo!");
        });
    } catch (error) {
        res.status(400).send({
            message: "Erro ao tentar registrar JSON",
            error: error
        });
    }

    next();
}