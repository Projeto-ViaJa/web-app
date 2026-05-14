var database = require("../database/config")

function cadastrar(titulo, descricao, nivelImportancia, dataInicial, horarioInicial, dataFinal, horarioFinal, dataRegistro, horarioRegistro, fkEmpresa) {
    var instrucaoSql = `
        INSERT INTO eventosRegistrados (titulo, descricao, nivelImportancia, dataInicial, horarioInicial, dataFinal, horarioFinal, dataRegistro, horarioRegistro, fkEmpresa)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [titulo, descricao, nivelImportancia, dataInicial, horarioInicial, dataFinal, horarioFinal, dataRegistro, horarioRegistro, fkEmpresa]);
}

function editar(id, titulo, descricao, nivelImportancia, dataInicial, horarioInicial, dataFinal, horarioFinal, fkEmpresa) {
    var instrucaoSql = `
        UPDATE eventosRegistrados SET
            titulo = ?,
            descricao = ?,
            nivelImportancia = ?,
            dataInicial = ?,
            horarioInicial = ?,
            dataFinal = ?,
            horarioFinal = ?,
            fkEmpresa = ?
        WHERE idEventosRegistrados = ?
    `;
    return database.executar(instrucaoSql, [titulo, descricao, nivelImportancia, dataInicial, horarioInicial, dataFinal, horarioFinal, fkEmpresa, id]);
}

function excluir(id) {
    var instrucaoSql = `DELETE FROM eventosRegistrados WHERE idEventosRegistrados = ?`;
    return database.executar(instrucaoSql, [id]);
}

function listar() {
    var instrucaoSql = `SELECT idEventosRegistrados, titulo, descricao, nivelImportancia, dataInicial, horarioInicial, dataFinal, horarioFinal FROM eventosRegistrados`;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    editar,
    excluir,
    listar
};
