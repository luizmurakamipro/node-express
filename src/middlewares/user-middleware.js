const fs = require('fs');

module.exports = (req, res, next) => {
   /* var today = new Date();
    var log = "auth-" + today.toISOString().substring(0, 10) + ".json";
    var time = (today.getUTCHours() + 21) + ":" + today.getMinutes() + ":" + today.getSeconds();
    try {
        fs.readFile(log, (err, data) => {
            if (err) {
                var dados = [];
                dados.push({hour: time, method: req.method, params: req.params, body: req.body});
                fs.writeFile(log, JSON.stringify(dados), error => {
                    if (error)
                        console.log(error);
                    else
                        console.log("Success to save new file!");
                });
            }
            else {
                var dados = JSON.parse(data);
                dados.push({hour: time, method: req.method, params: req.params, body: req.body});
                fs.writeFile(log, JSON.stringify(dados), error => {
                    if (error)
                        console.log(error);
                    else
                        console.log("Success to save file!");
                }); 
            }
        });
    } catch (error) {
        res.status(400).send({
            message: "Erro ao tentar registrar JSON",
            error: error
        });
    }*/
    next();
}