var database = require("../database/config");

function getDestinoN1(token) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_destino_n1_ultimo_mes;
    `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getQuantidadePassageirosUltimoMes() {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_volume_turista_mensal;
    `;
    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getSazonalidadeGeral() {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_sazonalidade_comparando_mes_com_historico;
    `;
    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getDestinoN1Crescimento() {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_destino_n1_crescimento;
    `;
    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getTop5EstadosCrescimento() {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_crescimento_estado_em_relacao_ao_mesmo_no_ano_anterior;
    `;
    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getLocalidades() {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_pesquisar_localidades;
    `;
    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getLocalidade(localidade) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_pesquisar_localidades WHERE destino_localidade LIKE "${localidade}%";
    `;
    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getDestinoN1,
    getQuantidadePassageirosUltimoMes,
    getSazonalidadeGeral,
    getDestinoN1Crescimento,
    getTop5EstadosCrescimento,
    getLocalidades,
    getLocalidade
}