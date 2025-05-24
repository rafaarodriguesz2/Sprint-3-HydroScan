var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql 
function cadastrarRepresa(nome, localizacao, volumeMaximo, volumeMinimo, potenciaMaxima, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, localizacao, volumeMaximo, volumeMinimo, potenciaMaxima);
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Represa (Nome, Localizacao, VolumeMaximo, VolumeMinimo, potencia_max_kw, fkCodigo_empresa) VALUES ('${nome}', '${localizacao}','${volumeMaximo}', '${volumeMinimo}', '${potenciaMaxima}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRepresas(codigo) {
  var instrucaoSql = `SELECT * FROM Represa WHERE fkCodigo_empresa = '${codigo}'`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql)
   .then(resultado => resultado) // se vazio, retorna []
    .catch(erro => {
      console.error("Erro ao buscar represas", erro);
      return []; // <- ESSA LINHA GARANTE QUE VAI RETORNAR []
    });
}

module.exports = {
    cadastrarRepresa,
    buscarRepresas
};