const fs = require('fs');

module.exports = (req, res, next) => {
    var today = new Date();
    var correctDate = new Date(today.valueOf() - 10801000);
    var log = "./logs/auth-" + correctDate.toISOString().substring(0, 10) + ".txt";
    var time = correctDate.toISOString().substring(11, 19);
    var dados = [];

    fs.readFile(log, (err, data) => {
        if (err) {
            dados.push({hour: time, method: req.method, params: req.params, body: req.body});
            fs.writeFile(log, JSON.stringify(dados, null, 4), error => {
                if (error)
                    console.log(error);
                else
                    console.log("Success to save new file!");

                return next();
            });
        }
        else {
            dados = JSON.parse(data);
            dados.push({hour: time, method: req.method, params: req.params, body: req.body});
            fs.writeFile(log, JSON.stringify(dados, null, 4), error => {
                if (error)
                    console.log(error);
                else
                    console.log("Success to save file!");

                return next();
            });
        }
    });
}