var database = require("../database/config")

function cadastrar(tituloNotificacao, descricao, url, canal, fkUsuario, fkEmpresa) {

    var instrucaoSql = `
        INSERT INTO paramsNotificacao
        (tituloNotificacao, descricao, url, canal, isAtivo, fkUsuario, fkEmpresa)
        VALUES
        (?, ?, ?, ?, 1, ?, ?);
    `;

    return database.executar(instrucaoSql, [
        tituloNotificacao,
        descricao,
        url,
        canal,
        fkUsuario,
        fkEmpresa
    ]);
}
function cadastrarTiposLog(idParametrizacao, tiposLog) {

    let promises = [];

    for (let tipo of tiposLog) {

        let instrucaoSql = `
            INSERT INTO setandoTipos
            (fkParamsNotificacoes, fkTipoLog)
            VALUES
            (?, ?);
        `;

        promises.push(
            database.executar(instrucaoSql, [
                idParametrizacao,
                tipo
            ])
        );
    }

    return Promise.all(promises);
}

function editar(id, tituloNotificacao, descricao, url, canal, isAtivo) {
    var instrucaoSql = `
        UPDATE paramsNotificacao
        SET
            tituloNotificacao = ?,
            descricao = ?,
            url = ?,
            canal = ?,
            isAtivo = ?
        WHERE id = ?;
    `;
    return database.executar(instrucaoSql, [tituloNotificacao, descricao, url, canal, isAtivo, id]);
}

function atualizarTiposLog(idParametrizacao, tiposLog = []) {
    var sqlDelete = `
        DELETE FROM setandoTipos
        WHERE fkParamsNotificacoes = ?;
    `;
    return database.executar(sqlDelete, [idParametrizacao])
.then(() => {

    if (tiposLog.length === 0) {
        return [];
    }

    let promises = [];

    for (let tipo of tiposLog) {

        let sqlInsert = `
            INSERT INTO setandoTipos
            (fkParamsNotificacoes, fkTipoLog)
            VALUES (?, ?);
        `;

        promises.push(
            database.executar(sqlInsert, [
                idParametrizacao,
                tipo
            ])
        );
    }

    return Promise.all(promises);
});
}

function excluir(id) {

    var instrucaoSql = `
        DELETE FROM setandoTipos
        WHERE fkParamsNotificacoes = ?;
    `;

    return database.executar(instrucaoSql, [id])
        .then(() => {

            var sqlParams = `
                DELETE FROM paramsNotificacao
                WHERE id = ?;
            `;

            return database.executar(sqlParams, [id]);
        });
}

function listar() {

    var instrucaoSql = `
        SELECT
    p.id,
    p.isAtivo AS ativo,
    p.tituloNotificacao,
    p.descricao,
    p.url,
    p.canal,
    IFNULL(
        GROUP_CONCAT(t.tipo SEPARATOR ', '),
        ''
    ) AS tipos
FROM paramsNotificacao p
LEFT JOIN setandoTipos s
    ON s.fkParamsNotificacoes = p.id
LEFT JOIN tipoLog t
    ON t.id = s.fkTipoLog
GROUP BY
    p.id,
    p.isAtivo,
    p.tituloNotificacao,
    p.descricao,
    p.url,
    p.canal;
    `;

    return database.executar(instrucaoSql);
}
module.exports = {
    cadastrar,
    cadastrarTiposLog,
    listar,
    editar,
    atualizarTiposLog,
    excluir
};