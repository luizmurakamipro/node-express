const fs = require('fs');

module.exports = (req, res, next) => {
    var data = [];
    data.push(req.method);
    fs.writeFile("authUser.txt", JSON.stringify(data), err => {
        if (err)
            console.log(err);
        else
            console.log("Arquivo salvo!");
    });
    /*try {
        var data = [];
        data.push(req.method);

       /* fs.readFile("authUser.txt", (err, file) => {
            if (err)
            {
                fs.writeFile("authUser.txt", JSON.stringify(data), err => {
                    if (err)
                        throw err;
                    else
                        console.log("Arquivo salvo!");
                });
            }
            else
            {
                console.log(file);
            }
        });

        fs.writeFile("authUser.txt", JSON.stringify(data), err => {
                    if (err)
                        throw err;
                    else
                        console.log("Arquivo salvo!");
                });
    } catch (error) {
        res.status(400).send({
            message: "Erro ao tentar registrar JSON",
            error: error
        });
    }*/

    next();
}