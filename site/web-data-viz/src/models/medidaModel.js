var database = require("../database/config");

function buscarUltimasMedidas(nomeRepresa) {

    var instrucaoSql = `
                    SELECT 
                    l.idLeitura,
                    l.data_hora,
                    l.nivel_agua_m,
                    s.nome_represa
                    FROM Leitura l
                    INNER JOIN Sensor s ON l.idSensor = s.idSensor
                    WHERE s.nome_represa LIKE '%${nomeRepresa}%'
                    ORDER BY l.data_hora DESC LIMIT 20`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(nomeRepresa) {

    var instrucaoSql = `SELECT 
    l.idLeitura,
    l.data_hora,
    l.nivel_agua_m,
    s.nome_represa
    FROM Leitura l
    INNER JOIN Sensor s ON l.idSensor = s.idSensor
    WHERE s.nome_represa like '%${nomeRepresa}%'
    ORDER BY l.data_hora DESC LIMIT 20;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
