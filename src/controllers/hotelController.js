var hotelModel = require("../models/hotelModel");

function cadastrarHotel(req, res) {
    var cnpj = req.body.cnpjServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var tipoHospedagem = req.body.tipoHospedagemServer;
    var nomeResponsavel = req.body.nomeResponsavelServer;
    var telContato = req.body.telContatoServer;
    var email = req.body.emailServer;
    var filialOuMatriz = req.body.filialOuMatrizServer;
    var uf = req.body.ufServer;
    var municipio = req.body.municipioServer;
    var rua = req.body.ruaServer;
    var bairro = req.body.bairroServer;
    var cep = req.body.cepServer;

    if (cnpj == undefined) {
        res.status(400).json({ erro: "CNPJ está undefined!" });
    } else if (nomeFantasia == undefined) {
        res.status(400).json({ erro: "Nome Fantasia está undefined!" });
    } else if (tipoHospedagem == undefined) {
        res.status(400).json({ erro: "Tipo de Hospedagem está undefined!" });
    } else if (nomeResponsavel == undefined) {
        res.status(400).json({ erro: "Nome Responsável está undefined!" });
    } else if (telContato == undefined) {
        res.status(400).json({ erro: "Telefone de Contato está undefined!" });
    } else if (email == undefined) {
        res.status(400).json({ erro: "Email está undefined!" });
    } else if (filialOuMatriz == undefined) {
        res.status(400).json({ erro: "Filial ou Matriz está undefined!" });
    } else if (uf == undefined) {
        res.status(400).json({ erro: "UF está undefined!" });
    } else if (municipio == undefined) {
        res.status(400).json({ erro: "Município está undefined!" });
    } else if (rua == undefined) {
        res.status(400).json({ erro: "Rua está undefined!" });
    } else if (bairro == undefined) {
        res.status(400).json({ erro: "Bairro está undefined!" });
    } else if (cep == undefined) {
        res.status(400).json({ erro: "CEP está undefined!" });
    } else {
        hotelModel.cadastrar(cnpj, nomeFantasia, tipoHospedagem, nomeResponsavel, telContato, email, filialOuMatriz, uf, municipio, rua, bairro, cep)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar a hospedagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function editarHotel(req, res) {
    var id = req.body.idServer;
    var cnpj = req.body.cnpjServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var tipoHospedagem = req.body.tipoHospedagemServer;
    var nomeResponsavel = req.body.nomeResponsavelServer;
    var telContato = req.body.telContatoServer;
    var email = req.body.emailServer;
    var filialOuMatriz = req.body.filialOuMatrizServer;
    var uf = req.body.ufServer;
    var municipio = req.body.municipioServer;
    var rua = req.body.ruaServer;
    var bairro = req.body.bairroServer;
    var cep = req.body.cepServer;

    if (id == undefined) {
        res.status(400).json({ erro: "ID está undefined!" });
    } else if (cnpj == undefined) {
        res.status(400).json({ erro: "CNPJ está undefined!" });
    } else if (nomeFantasia == undefined) {
        res.status(400).json({ erro: "Nome Fantasia está undefined!" });
    } else if (tipoHospedagem == undefined) {
        res.status(400).json({ erro: "Tipo de Hospedagem está undefined!" });
    } else if (nomeResponsavel == undefined) {
        res.status(400).json({ erro: "Nome Responsável está undefined!" });
    } else if (telContato == undefined) {
        res.status(400).json({ erro: "Telefone de Contato está undefined!" });
    } else if (email == undefined) {
        res.status(400).json({ erro: "Email está undefined!" });
    } else if (filialOuMatriz == undefined) {
        res.status(400).json({ erro: "Filial ou Matriz está undefined!" });
    } else if (uf == undefined) {
        res.status(400).json({ erro: "UF está undefined!" });
    } else if (municipio == undefined) {
        res.status(400).json({ erro: "Município está undefined!" });
    } else if (rua == undefined) {
        res.status(400).json({ erro: "Rua está undefined!" });
    } else if (bairro == undefined) {
        res.status(400).json({ erro: "Bairro está undefined!" });
    } else if (cep == undefined) {
        res.status(400).json({ erro: "CEP está undefined!" });
    } else {
        hotelModel.editar(id, cnpj, nomeFantasia, tipoHospedagem, nomeResponsavel, telContato, email, filialOuMatriz, uf, municipio, rua, bairro, cep)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao editar a hospedagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluirHotel(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).json({ erro: "ID do hotel está undefined!" });
    } else {
        hotelModel.excluir(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao excluir o hotel! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarHoteis(req, res) {
    hotelModel.listar()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao listar os hoteis! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrarHotel,
    editarHotel,
    excluirHotel,
    listarHoteis
};
