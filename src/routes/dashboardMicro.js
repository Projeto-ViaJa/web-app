var express = require("express");
var router = express.Router();

var dashboardMicroController = require("../controllers/dashboardMicroController");

router.get("/getQuantidadePassageirosUltimoMes/:localidade", function (req, res) {
    dashboardMicroController.getQuantidadePassageirosUltimoMes(req, res);
});



module.exports = router;