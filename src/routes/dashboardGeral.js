var express = require("express");
var router = express.Router();

var dashboardGeralController = require("../controllers/dashboardGeralController");

router.get("/getDestinoN1", function (req, res) {
    dashboardGeralController.getDestinoN1(req, res);
});

router.get("/getQuantidadePassageirosUltimoMes", function (req, res) {
    dashboardGeralController.getQuantidadePassageirosUltimoMes(req, res);
});

router.get("/getSazonalidadeGeral", function (req, res) {
    dashboardGeralController.getSazonalidadeGeral(req, res);
});

router.get("/getDestinoN1Crescimento", function (req, res) {
    dashboardGeralController.getDestinoN1Crescimento(req, res);
});

router.get("/getTop5EstadosCrescimento", function (req, res) {
    dashboardGeralController.getTop5EstadosCrescimento(req, res);
});

router.get("/getLocalidades", function (req, res) {
    dashboardGeralController.getLocalidades(req, res);
});

router.get("/getLocalidade/:localidade", function (req, res) {
    dashboardGeralController.getLocalidade(req, res);
});

module.exports = router;