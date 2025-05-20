var bobiaModel =require("../models/bobiaModel")

function enviar(req, res){

    
  const apikey = req.body.apiKeyServer;
  const pergunta = req.body.perguntaServer;
  const resposta = req.body.respostaServer;
  const tokensUtilizados = req.body.tokensServer;



    bobiaModel.enviar(apikey, pergunta, resposta, tokensUtilizados) 
    .then(
        function (resultado) {
            // Se o cadastro no banco foi bem-sucedido
            console.log("conversa enviada com sucesso Resultado:", resultado);
            res.status(201).json({ 
                mensagem: "conversa enviada com sucesso!", 
                dadosInseridos: resultado // O model pode retornar o ID do usuário inserido, por exemplo
            });
        }
    ).catch(
        function (erro) {
            // Se ocorreu um erro ao tentar cadastrar no banco
            console.log("Erro ao enviar conversa ao banco:", erro);
            
            res.status(500).json({ 
                mensagem: "Erro interno ao enviar conversa ao banco. Por favor, tente novamente.", 
                erro: erro.sqlMessage 
            });
        }
    );
}

module.exports = {
    enviar,

}