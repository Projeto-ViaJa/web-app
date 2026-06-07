var dashboardMicroModel = require("../models/dashboardMicroModel");

function getQuantidadePassageirosUltimoMes(req, res) {
    var localidade = req.params.localidade;

    dashboardMicroModel.getQuantidadePassageirosUltimoMes(localidade)
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

function getPosicaoNoRankingGeral(req, res) {
    var localidade = req.params.localidade;

    dashboardMicroModel.getPosicaoNoRankingGeral(localidade)
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

function getSazonalidade(req, res) {
    var localidade = req.params.localidade;

    dashboardMicroModel.getSazonalidade(localidade)
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

function getPosicaoNoRankingCrescimento(req, res) {
    var localidade = req.params.localidade;

    dashboardMicroModel.getPosicaoNoRankingCrescimento(localidade)
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

function getQuantidadePassageirosNoAno(req, res) {
    var localidade = req.params.localidade;

    dashboardMicroModel.getQuantidadePassageirosNoAno(localidade)
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

function getFluxoPorRota(req, res) {
    var localidade = req.params.localidade;

    dashboardMicroModel.getFluxoPorRota(localidade)
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
    getQuantidadePassageirosUltimoMes,
    getPosicaoNoRankingGeral,
    getSazonalidade,
    getPosicaoNoRankingCrescimento,
    getQuantidadePassageirosNoAno,
    getFluxoPorRota
}
