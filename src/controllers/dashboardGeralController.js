var dashboardGeralModel = require("../models/dashboardGeralModel");

function getDestinoN1(req, res) {
    dashboardGeralModel.getDestinoN1()
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

function getQuantidadePassageirosUltimoMes(req, res) {
    dashboardGeralModel.getQuantidadePassageirosUltimoMes()
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

function getSazonalidadeGeral(req, res) {
    dashboardGeralModel.getSazonalidadeGeral()
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

function getDestinoN1Crescimento(req, res) {
    dashboardGeralModel.getDestinoN1Crescimento()
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

function getTop5EstadosCrescimento(req, res) {
    dashboardGeralModel.getTop5EstadosCrescimento()
        .then(function (resultado) {
            if (resultado.length > 0) {
                return res.status(200).json(resultado);
            } else {
                return res.status(404).json({ erro: "Query não retornou nada, cheque a VIEW ou as tabelas que alimentam a VIEW" });
            }

        }).catch(function (erro) {

            console.error("Erro ao consultar dashboard: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });

        });
}

function getLocalidades(req, res) {
    dashboardGeralModel.getLocalidades()
        .then(function (resultado) {
            if (resultado.length > 0) {
                return res.status(200).json(resultado);
            } else {
                return res.status(404).json({ erro: "Query não retornou nada, cheque a VIEW ou as tabelas que alimentam a VIEW" });
            }

        }).catch(function (erro) {

            console.error("Erro ao consultar dashboard: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });

        });
}

function getLocalidade(req, res) {
    var localidade = req.params.localidade;

    dashboardGeralModel.getLocalidade(localidade)
        .then(function (resultado) {
            if (resultado.length > 0) {
                return res.status(200).json(resultado);
            } else {
                return res.status(404).json({ erro: "Query não retornou nada, cheque a VIEW ou as tabelas que alimentam a VIEW" });
            }

        }).catch(function (erro) {

            console.error("Erro ao consultar dashboard: ", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });

        });
}

module.exports = {
    getDestinoN1,
    getQuantidadePassageirosUltimoMes,
    getSazonalidadeGeral,
    getDestinoN1Crescimento,
    getTop5EstadosCrescimento,
    getLocalidades,
    getLocalidade
}
