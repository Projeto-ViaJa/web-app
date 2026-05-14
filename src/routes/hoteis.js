var express = require("express");
var router = express.Router();
var hotelController = require("../controllers/hotelController");

router.post("/cadastrar", function (req, res) {
    hotelController.cadastrarHotel(req, res);
});

router.post("/editar", function (req, res) {
    hotelController.editarHotel(req, res);
});

router.delete("/excluir/:id", function (req, res) {
    hotelController.excluirHotel(req, res);
});

router.get("/listar", function (req, res) {
    hotelController.listarHoteis(req, res);
});

module.exports = router;
