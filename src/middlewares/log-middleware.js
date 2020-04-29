const fs = require('fs');

module.exports = (req, res, next) => {
    var today = new Date();
    var correctDate = new Date(today.valueOf() - 10801000);
    var log = "./logs/log-" + correctDate.toISOString().substring(0, 10) + ".txt";
    var time = correctDate.toISOString().substring(11, 19);
    var dados = [];

    fs.readFile(log, (err, data) => {
        if (err) {
            dados.push({hour: time, url: req.url, method: req.method, params: req.params, body: req.body});
            fs.writeFile(log, JSON.stringify(dados, null, 4), error => {
                if (error)
                    console.log(error);
                else
                    console.log("sys,log has just been created " + time);

                return next();
            });
        }
        else {
            dados = JSON.parse(data);
            dados.push({hour: time, url: req.url, method: req.method, params: req.params, body: req.body});
            fs.writeFile(log, JSON.stringify(dados, null, 4), error => {
                if (error)
                    console.log(error);
                else
                    console.log("sys,log has just been updated " + time);

                return next();
            });
        }
    });
}