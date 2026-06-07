var express = require("express");
var router = express.Router();
var paramsController = require("../controllers/paramsController");

router.post("/cadastrar", function (req, res) {
    paramsController.cadastrarParams(req, res);
});

router.put("/editar", function (req, res) {
    paramsController.editarParams(req, res);
});

router.delete("/excluir/:id", function (req, res) {
    paramsController.excluirParams(req, res);
});

router.get("/listar", function (req, res) {
    paramsController.listarParams(req, res);
});

module.exports = router;