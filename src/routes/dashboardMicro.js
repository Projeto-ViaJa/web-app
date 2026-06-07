var express = require("express");
var router = express.Router();

var dashboardMicroController = require("../controllers/dashboardMicroController");

router.get("/getQuantidadePassageirosUltimoMes/:localidade", function (req, res) {
    dashboardMicroController.getQuantidadePassageirosUltimoMes(req, res);
});

router.get("/getPosicaoNoRankingGeral/:localidade", function (req, res) {
    dashboardMicroController.getPosicaoNoRankingGeral(req, res);
});

router.get("/getSazonalidade/:localidade", function (req, res) {
    dashboardMicroController.getSazonalidade(req, res);
});

router.get("/getPosicaoNoRankingCrescimento/:localidade", function (req, res) {
    dashboardMicroController.getPosicaoNoRankingCrescimento(req, res);
});

router.get("/getQuantidadePassageirosNoAno/:localidade", function (req, res) {
    dashboardMicroController.getQuantidadePassageirosNoAno(req, res);
});

router.get("/getFluxoPorRota/:localidade", function (req, res) {
    dashboardMicroController.getFluxoPorRota(req, res);
});

module.exports = router;