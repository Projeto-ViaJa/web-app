var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/getDestinoN1", function (req, res) {
    dashboardController.getDestinoN1(req, res);
});

module.exports = router;