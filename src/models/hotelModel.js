var database = require("../database/config")

function cadastrar(cnpj, nomeFantasia, tipoHospedagem, nomeResponsavel, telContato, email, filialOuMatriz, uf, municipio, rua, bairro, cep) {
    var instrucaoSql = `
        INSERT INTO hospedagemParceiros (cnpj, nomeFantasia, tipoHospedagem, nomeResponsavel, telContato, email, filialOuMatriz, uf, municipio, rua, bairro, cep)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [cnpj, nomeFantasia, tipoHospedagem, nomeResponsavel, telContato, email, filialOuMatriz, uf, municipio, rua, bairro, cep]);
}


function editar(id, cnpj, nomeFantasia, tipoHospedagem, nomeResponsavel, telContato, email, filialOuMatriz, uf, municipio, rua, bairro, cep) {
    var instrucaoSql = `
        UPDATE hospedagemParceiros SET
            cnpj = ?,
            nomeFantasia = ?,
            tipoHospedagem = ?,
            nomeResponsavel = ?,
            telContato = ?,
            email = ?,
            filialOuMatriz = ?,
            uf = ?,
            municipio = ?,
            rua = ?,
            bairro = ?,
            cep = ?
        WHERE idhospedagemParceiros = ?
    `;
    return database.executar(instrucaoSql, [cnpj, nomeFantasia, tipoHospedagem, nomeResponsavel, telContato, email, filialOuMatriz, uf, municipio, rua, bairro, cep, id]);
}


function excluir(id) {
    var instrucaoSql = `DELETE FROM hospedagemParceiros WHERE idhospedagemParceiros = ?`;
    return database.executar(instrucaoSql, [id]);
}

function listar() {
    var instrucaoSql = `SELECT idhospedagemParceiros, cnpj, nomeFantasia, tipoHospedagem, nomeResponsavel, telContato, email, filialOuMatriz, uf, municipio, rua, bairro, cep FROM hospedagemParceiros`;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    editar,
    excluir,
    listar
};
