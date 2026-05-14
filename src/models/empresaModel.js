var database = require("../database/config");

function getFk(token) {
    console.log("MODEL EMPRESA ACESSADO!");

    var instrucaoSql = `
        SELECT id_empresa
        FROM empresa
        WHERE token = ?
    `;

    console.log("Executando a instrução SQL com token: " + token);
    return database.executar(instrucaoSql, [token]);
}

module.exports = {
    getFk
}
