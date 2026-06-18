var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(405).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var fkEmpresa = req.body.idEmpresaServer;
    if (nome == undefined) {
        res.status(400).json({ erro: "Seu nome está undefined!" });
    } else if (email == undefined) {
        res.status(400).json({ erro: "Seu email está undefined!" });
    } else if (fkEmpresa == undefined) {
        res.status(400).json({ erro: "Sua empresa a vincular está undefined!" });
    } else {
        usuarioModel.cadastrar(nome, email, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json({ erro: erro.sqlMessage });
                }
            );
    }
}

function cadastrarComum(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaServer;
    if (nome == undefined) {
        res.status(400).json({ erro: "Seu nome está undefined!" });
    } else if (email == undefined) {
        res.status(400).json({ erro: "Seu email está undefined!" });
    } else if (senha == undefined) {
        res.status(400).json({ erro: "Sua senha está undefined!" });
    } else if (fkEmpresa == undefined) {
        res.status(400).json({ erro: "Sua empresa a vincular está undefined!" });
    } else {
        usuarioModel.cadastrarComum(nome, email, senha, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json({ erro: erro.sqlMessage });
                }
            );
    }
}

function editarUsuario(req, res) {
    var id = req.body.idServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var ativo = req.body.ativoServer;
    var nivel = req.body.nivelServer;

    if (id == undefined) {
        res.status(400).send("Seu ID está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (ativo == undefined) {
        res.status(400).send("Status está undefined!");
    } else if (nivel == undefined) {
        res.status(400).send("Nível está undefined!");
    } else {
        usuarioModel.editar(id, nome, email, senha, ativo, nivel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao editar o usuario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluirUsuario(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).send("ID do usuário está undefined!");
    } else {
        usuarioModel.excluir(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao excluir o usuario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarUsuarios(req, res) {
    var fkEmpresa = req.query.fkEmpresa; // recebe da query string

    if (!fkEmpresa) {
        return res.status(400).json({ erro: "fkEmpresa é obrigatório" });
    }

    usuarioModel.listar(fkEmpresa)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function listarPorNome(req, res) {
    var nome = req.params.nome;
    var fkEmpresa = req.query.fkEmpresa;

    usuarioModel.listarPorNome(nome, fkEmpresa)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarComum,
    editarUsuario,
    excluirUsuario,
    listarUsuarios,
    listarPorNome
};
