var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id_usuario, nome, email_usuario, fk_empresa, is_admin as empresaId, ativo, nivel FROM usuario WHERE email_usuario = ? AND senha = ?;
    `;

    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, email, senha, fkEmpresa) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email_usuario, senha, fk_empresa, is_admin, ativo, nivel) VALUES (?, ?, ?, ?, 0, 1, 1);
    `;

    return database.executar(instrucaoSql, [nome, email, senha, fkEmpresa]);
}
function editar(id, nome, email_usuario, senha, fkEmpresa, ativo, permissao, nivel) {
    var instrucaoSql = `
        UPDATE usuario SET
            nome = ?,
            email_usuario = ?,
            senha = ?,
            fk_empresa = ?,
            ativo = ?,
            permissao = ?,
            nivel = ?
        WHERE id_usuario = ?
    `;
    return database.executar(instrucaoSql, [nome, email_usuario, senha, fkEmpresa, ativo, permissao, nivel, id])
}

function excluir(id) {
    var instrucaoSql = `DELETE FROM usuario WHERE id_usuario = ?`;
    return database.executar(instrucaoSql, [id]);
}

function listar() {
    var instrucaoSql = `SELECT u.id_usuario, u.nome, u.email_usuario, u.fk_empresa, e.nome_fantasia as empresa, u.ativo, u.nivel FROM usuario u JOIN empresa e ON u.fk_empresa = e.id_empresa`;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    editar,
    listar,
    excluir
};
