var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/getFk/:token?", function (req, res) {
    empresaController.getFk(req, res);
});

module.exports = router;