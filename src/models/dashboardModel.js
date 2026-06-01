var database = require("../database/config");

function getDestinoN1(token) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_total_passageiros WHERE total_passageiros = (SELECT MAX(total_passageiros) FROM vw_total_passageiros);
    `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getDestinoN1
}
