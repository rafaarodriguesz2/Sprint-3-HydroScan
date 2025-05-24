var database = require("../database/config");

function buscarUltimasMedidas(idRepresa) {

    var instrucaoSql = `
                    SELECT 
                    l.idLeitura,
                    l.data_hora,
                    l.nivel_agua_m,
                    r.Nome AS nome_represa,
                    r.fkCodigo_empresa
                    FROM Leitura l
                    INNER JOIN Sensor s ON l.idSensor = s.idSensor
                    INNER JOIN Represa r ON s.nome_represa = r.nome
                    WHERE r.idRepresa = ${idRepresa}
                    ORDER BY l.data_hora DESC LIMIT 20`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idRepresa) {

    var instrucaoSql = `SELECT 
    l.idLeitura,
    l.data_hora,
    l.nivel_agua_m,
    r.Nome AS nome_represa,
    r.fkCodigo_empresa
    FROM Leitura l
    INNER JOIN Sensor s ON l.idSensor = s.idSensor
    INNER JOIN Represa r ON s.nome_represa = r.nome
    WHERE r.idRepresa = ${idRepresa}
    ORDER BY l.data_hora DESC LIMIT 20;`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
