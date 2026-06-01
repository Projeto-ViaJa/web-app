var dashboardModel = require("../models/dashboardModel");

function getDestinoN1(req, res) {
    dashboardModel.getDestinoN1()
        .then(function (resultado) {
            if (resultado.length > 0) {
                return res.status(200).json(resultado[0]);
            } else {
                return res.status(404).json({ erro: "Query não retornou nada, cheque a VIEW ou as tabelas que alimentam a VIEW" });
            }

        }).catch(function (erro) {

            console.error("Erro ao consultar dashboard: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });

        });
}

module.exports = {
    getDestinoN1
}
