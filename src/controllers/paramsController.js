var parametrizacaoModel = require("../models/paramsModel");

function cadastrarParams(req, res) {

    var tituloNotificacao = req.body.tituloNotificacaoServer;
    var descricao = req.body.descricaoServer;
    var url = req.body.urlServer;
    var canal = req.body.canalServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var tiposLog = req.body.tiposLogServer;

    if (tituloNotificacao == undefined) {
        res.status(400).json({ erro: "Título da notificação está undefined!" });
    } else if (descricao == undefined) {
        res.status(400).json({ erro: "Descrição está undefined!" });
    } else if (url == undefined) {
        res.status(400).json({ erro: "URL está undefined!" });
    } else if (canal == undefined) {
        res.status(400).json({ erro: "Canal está undefined!" });
    } else if (fkUsuario == undefined) {
        res.status(400).json({ erro: "Usuário está undefined!" });
    } else if (fkEmpresa == undefined) {
        res.status(400).json({ erro: "Empresa está undefined!" });
    } else if (tiposLog == undefined || tiposLog.length == 0) {
        res.status(400).json({ erro: "Nenhum tipo de log foi informado!" });
    } else {

        parametrizacaoModel.cadastrar(
            tituloNotificacao,
            descricao,
            url,
            canal,
            fkUsuario,
            fkEmpresa
        )
        .then(function(resultado) {

            var idParametrizacao = resultado.insertId;

            return parametrizacaoModel.cadastrarTiposLog(
                idParametrizacao,
                tiposLog
            );

        })
        .then(function() {
            res.status(200).json({
            mensagem: "Parametrização cadastrada com sucesso!"
        });
        })
        .catch(function(erro) {

            console.log(erro);
            console.log(
                "\nHouve um erro ao cadastrar a parametrização! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
    }
}

function listarParams(req, res) {

    parametrizacaoModel.listar()
        .then(function(resultado) {
            res.json(resultado);
        })
        .catch(function(erro) {

            console.log(erro);
            console.log(
                "\nHouve um erro ao listar as parametrizações! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}

function excluirParams(req, res) {

    var id = req.params.id;

    if (id == undefined) {

        res.status(400).json({
            erro: "ID da parametrização está undefined!"
        });

    } else {

        parametrizacaoModel.excluir(id)
            .then(function(resultado) {
                res.json(resultado);
            })
            .catch(function(erro) {

                console.log(erro);
                console.log(
                    "\nHouve um erro ao excluir a parametrização! Erro: ",
                    erro.sqlMessage
                );

                res.status(500).json(erro.sqlMessage);
            });
    }
}

function editarParams(req, res) {

    var id = req.body.idServer;
    var tituloNotificacao = req.body.tituloNotificacaoServer;
    var descricao = req.body.descricaoServer;
    var url = req.body.urlServer;
    var canal = req.body.canalServer;
    var isAtivo = req.body.isAtivoServer;
    var tiposLog = req.body.tiposLogServer;

    if (id == undefined) {
        res.status(400).json({ erro: "ID está undefined!" });
    } else if (tituloNotificacao == undefined) {
        res.status(400).json({ erro: "Título está undefined!" });
    } else if (descricao == undefined) {
        res.status(400).json({ erro: "Descrição está undefined!" });
    } else if (url == undefined) {
        res.status(400).json({ erro: "URL está undefined!" });
    } else if (canal == undefined) {
        res.status(400).json({ erro: "Canal está undefined!" });
    } else {

        parametrizacaoModel.editar(
            id,
            tituloNotificacao,
            descricao,
            url,
            canal,
            isAtivo
        )
        .then(function() {

            return parametrizacaoModel.atualizarTiposLog(
                id,
                tiposLog
            );

        })
        .then(function(resultado) {

            res.json(resultado);

        })
        .catch(function(erro) {

            console.log(erro);
            console.log(
                "\nHouve um erro ao editar a parametrização! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    cadastrarParams,
    listarParams,
    editarParams,
    excluirParams
};