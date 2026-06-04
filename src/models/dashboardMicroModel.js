var database = require("../database/config");

function getQuantidadePassageirosUltimoMes(localidade) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_volume_de_turistas_mensal_local_especifico
        WHERE destino_localidade like "%${localidade}%";
    `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getPosicaoNoRankingGeral(localidade) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_posicao_no_ranking_localidade 
        WHERE destino_localidade like "%${localidade}%";
        `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function getSazonalidade(localidade) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_indice_sazonalidade_local_especifico 
        WHERE destino_localidade like "%${localidade}%";
        `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getPosicaoNoRankingCrescimento(localidade) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_posicao_no_ranking_crescimento_localidade 
        WHERE destino_localidade like "%${localidade}%";
        `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getQuantidadePassageirosNoAno(localidade) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_passageiros_pagos_localidade_ultimos_meses_ano 
        WHERE destino_localidade like "%${localidade}%";
        `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getFluxoPorRota(localidade) {
    console.log("MODEL DASHBOARD ACESSADO!");

    var instrucaoSql = `
        SELECT * FROM vw_fluxo_rota_mes
        WHERE destino_localidade like "%${localidade}%";
        `;

    console.log("Executando a instrução SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    getQuantidadePassageirosUltimoMes,
    getPosicaoNoRankingGeral,
    getSazonalidade,
    getPosicaoNoRankingCrescimento,
    getQuantidadePassageirosNoAno,
    getFluxoPorRota
}