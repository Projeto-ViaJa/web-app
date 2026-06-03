var database = require("../database/config");

function getQuantidadePassageirosUltimoMes(localidade) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_volume_de_turistas_mensal_local_especifico
        WHERE destino_localidade = "${localidade}";
    `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getQuantidadePassageirosUltimoMes
}