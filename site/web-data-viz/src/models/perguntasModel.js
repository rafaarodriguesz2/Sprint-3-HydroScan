const database = require('../database/config');

function salvarPergunta(pergunta) {
  const instrucao = `
    INSERT INTO perguntas_frequentes (pergunta)
    VALUES ('${pergunta}');
  `;
  return database.executar(instrucao);
}

module.exports = { salvarPergunta };

