var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql 
function cadastrarsensor(modeloSensor, localInstalação, dataInstalação, Represa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", modeloSensor, localInstalação, dataInstalação, Represa
    );
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO sensor (modelo, local_instalacao, nome_represa, data_instalacao) VALUES ('${modeloSensor}', '${localInstalação}','${dataInstalação}', '${Represa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarsensores(localInstalação, Represa) {

  var instrucaoSql = `SELECT * FROM sensor WHERE local_instalacao = '${localInstalação}' and nome_represa = '${Represa} `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarsensor,
    buscarsensores
};