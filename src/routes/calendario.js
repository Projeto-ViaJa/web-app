var express = require("express");
var router = express.Router();
var calendarioController = require("../controllers/calendarioController");

router.post("/cadastrar", function (req, res) {
    calendarioController.cadastrarEvento(req, res);
});

router.post("/editar", function (req, res) {
    calendarioController.editarEvento(req, res);
});

router.delete("/excluir/:id", function (req, res) {
    calendarioController.excluirEvento(req, res);
});

router.get("/listar", function (req, res) {
    calendarioController.listarEventos(req, res);
});

module.exports = router;
