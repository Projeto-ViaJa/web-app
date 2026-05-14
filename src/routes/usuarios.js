var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/editar", function (req, res){
    usuarioController.editarUsuario(req, res);
})

router.delete("/excluir/:id", function (req, res){
    usuarioController.excluirUsuario(req, res);
})

router.get("/listar", function (req, res){
    usuarioController.listarUsuarios(req, res);
})

module.exports = router;
