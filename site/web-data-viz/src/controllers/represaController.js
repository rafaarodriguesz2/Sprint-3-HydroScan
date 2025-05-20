var represaModel =require("../models/represaModel")

function cadastrarRepresa(req, res){

    const { nome, localizacao, volumeMaximo, volumeMinimo, potenciaMaxima, cnpj} = req.body;

    // Validando se os campos estão preenchidos
    if (!nome) {
        return res.status(400).json({ mensagem: "O campo Nome é obrigatório." });
    }
    if (!localizacao) {
        return res.status(400).json({ mensagem: "O campo Localização é obrigatório." });
    }
    if (!volumeMaximo) {
        return res.status(400).json({ mensagem: "O campo VolumeMáximo é obrigatório." });
    }
    if (!volumeMinimo) {
        return res.status(400).json({ mensagem: "O campo VolumeMínimo Temporária é obrigatório." });
    }
    if (!potenciaMaxima) {
        return res.status(400).json({ mensagem: "O campo PotenciaMáxima da Empresa é obrigatório." });
    }
    if (!cnpj) {
        return res.status(400).json({ mensagem: "O campo Cnpj da Empresa é obrigatório." });
    }

    // Se chegou até aqui, os dados básicos são válidos.
    // Podemos logar que a validação passou e manter o placeholder de resposta.
    console.log("Validação básica dos dados do funcionário passou.");
    console.log("Dados validados:", { nome, localizacao, volumeMaximo, volumeMinimo, potenciaMaxima, cnpj });

    // 4. Chamar a função do model para salvar no banco

    represaModel.cadastrarRepresa(nome, localizacao, volumeMaximo, volumeMinimo, potenciaMaxima, cnpj) 
    .then(
        function (resultado) {
            // Se o cadastro no banco foi bem-sucedido
            console.log("Represa cadastrada com sucesso no banco! Resultado:", resultado);
            res.status(201).json({ 
                mensagem: "Represa cadastrado com sucesso!", 
                dadosInseridos: resultado // O model pode retornar o ID do usuário inserido, por exemplo
            });
        }
    ).catch(
        function (erro) {
            // Se ocorreu um erro ao tentar cadastrar no banco
            console.log("Erro ao cadastrar Represa no banco:", erro);
            // É uma boa prática não expor detalhes do erro do SQL diretamente ao cliente em produção,
            // mas para desenvolvimento pode ser útil.
            res.status(500).json({ 
                mensagem: "Erro interno ao Represa funcionário. Por favor, tente novamente.", 
                erro: erro.sqlMessage 
            });
        }
    );
}

function buscarRepresas(req, res) {
  var codigo2 = req.body.fkCodigo_empresa
  console.log(codigo2)

  represaModel.buscarRepresas().then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}




module.exports = {
    cadastrarRepresa,
    buscarRepresas
}