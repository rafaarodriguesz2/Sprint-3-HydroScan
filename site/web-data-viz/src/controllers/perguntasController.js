const perguntasModel = require('../models/perguntasModel');

const enviarPergunta = async (req, res) => {
  const { pergunta } = req.body;
  const horario = new Date();

  if (!pergunta) {
    return res.status(400).json({ mensagem: "Pergunta não pode estar vazia." });
  }

  try {
    await perguntasModel.salvarPergunta(pergunta, horario);
    res.status(200).json({ mensagem: "Pergunta enviada com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao salvar pergunta." });
  }
};

module.exports = { enviarPergunta };
