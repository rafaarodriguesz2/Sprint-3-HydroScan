// importando os bibliotecas necessárias
const { GoogleGenAI } = require("@google/genai");
const { log } = require("console");
const express = require("express");
const path = require("path");

// carregando as variáveis de ambiente do projeto do arquivo .env
require("dotenv").config();

// criando variavel que guarda quantos tokens foram utilizados e quantos ainda restam
let tokensUtilizados = 121
let tokensRestantes = 1000000000 - tokensUtilizados

// configurando o servidor express
const app = express();
const PORTA_SERVIDOR = process.env.PORTA;

// configurando o gemini (IA)
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });



// configurando o servidor para receber requisições JSON
app.use(express.json());

// configurando o servidor para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// configurando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// inicializando o servidor
app.listen(PORTA_SERVIDOR, () => {
    console.info(
        `
        ######                ###    #    
        #     #  ####  #####   #    # #   
        #     # #    # #    #  #   #   #  
        ######  #    # #####   #  #     # 
        #     # #    # #    #  #  ####### 
        #     # #    # #    #  #  #     # 
        ######   ####  #####  ### #     # 
        `
    );
    console.info(`A API BobIA iniciada, acesse http://localhost:${PORTA_SERVIDOR}`);
});

// rota para receber perguntas e gerar respostas
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

// função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {

    try {
        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Em um paragráfo responda: ${mensagem}`

        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;
        

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);
        
        
        enviarBD(mensagem, resposta, tokens)
        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function enviarBD(pergunta, resposta, tokens){
    const apiKey = chatIA.apiKey;

    const dadosParaApi = {
        'apiKeyServer': apiKey,
        'perguntaServer': pergunta,
        'respostaServer': resposta,
        'tokensServer': tokens.totalTokenCount,
    };

    console.log('Dados que serão enviados para a API:', dadosParaApi);

    const urlApi = `http://localhost:3333/bobia/enviar`;

    fetch(urlApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          
        },
        body: JSON.stringify(dadosParaApi) // Converte o objeto para uma string JSON
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for OK, tenta ler o corpo como JSON para obter a mensagem de erro da API
            return response.json().then(erroApi => {
                // Mostra a mensagem de erro da API ou um erro genérico
                const mensagemErro = erroApi.mensagem || `Erro ao enviar a mensagem: ${response.status}`;
                console.error("Erro da API:", mensagemErro);
                console.log(`${mensagemErro}`);
                throw new Error(mensagemErro); // Isso fará com que caia no .catch() abaixo
            });
        }
        return response.json(); // Converte a resposta de sucesso para JSON
    })
    .then(data => {
        // Se chegou aqui, a API retornou sucesso (ex: status 201)
        console.log("Sucesso do cadastro:", data);
        console.log(`${data.mensagem || "Funcionário cadastrado com sucesso!"}`);
        

    })
    .catch(error => {
        // Este catch pega erros da rede (ex: servidor offline) ou o erro lançado do .then() anterior
        console.error("Erro geral no fetch:", error);
        console.log('Ocorreu um erro ao tentar enviar a mensagem. Tente novamente.');
        
    });
  
}