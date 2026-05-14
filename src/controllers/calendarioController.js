var calendarioModel = require("../models/calendarioModel");

function cadastrarEvento(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var nivelImportancia = req.body.nivelImportancia;
    var dataInicial = req.body.dataInicial;
    var horarioInicial = req.body.horarioInicial;
    var dataFinal = req.body.dataFinal;
    var horarioFinal = req.body.horarioFinal;
    var fkEmpresa = req.body.fkEmpresa;

    if (titulo == undefined) {
        res.status(400).json({ erro: "Título está undefined!" });
    } else if (dataInicial == undefined) {
        res.status(400).json({ erro: "Data inicial está undefined!" });
    } else {
        var dataRegistro = new Date().toISOString().split('T')[0];
        var horarioRegistro = new Date().toTimeString().split(' ')[0];

        calendarioModel.cadastrar(titulo, descricao, nivelImportancia, dataInicial, horarioInicial, dataFinal, horarioFinal, dataRegistro, horarioRegistro, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar o evento! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editarEvento(req, res) {
    var id = req.body.idEvento;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var nivelImportancia = req.body.nivelImportancia;
    var dataInicial = req.body.dataInicial;
    var horarioInicial = req.body.horarioInicial;
    var dataFinal = req.body.dataFinal;
    var horarioFinal = req.body.horarioFinal;
    var fkEmpresa = req.body.fkEmpresa;

    if (id == undefined) {
        res.status(400).json({ erro: "ID está undefined!" });
    } else if (titulo == undefined) {
        res.status(400).json({ erro: "Título está undefined!" });
    } else {
        calendarioModel.editar(id, titulo, descricao, nivelImportancia, dataInicial, horarioInicial, dataFinal, horarioFinal, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao editar o evento! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluirEvento(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).json({ erro: "ID do evento está undefined!" });
    } else {
        calendarioModel.excluir(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao excluir o evento! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarEventos(req, res) {
    calendarioModel.listar()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao listar os eventos! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrarEvento,
    editarEvento,
    excluirEvento,
    listarEventos
};
