var sensorModel =require("../models/sensorModel")

function cadastrarsensor(req, res){

    const modeloSensor = req.body.modeloSensorServer;
    const localInstalação = req.body.localInstalaçãoServer;
    const dataInstalação = req.body.dataInstalaçãoServer;
    const Represa = req.body.represaServer;

    // Validando se os campos estão preenchidos
    if (!modeloSensor) {
        return res.status(400).json({ mensagem: "O campo Nome é obrigatório." });
    }
    if (!localInstalação) {
        return res.status(400).json({ mensagem: "O campo Localização é obrigatório." });
    }
    if (!dataInstalação) {
        return res.status(400).json({ mensagem: "O campo VolumeMáximo é obrigatório." });
    }
    if (!Represa) {
        return res.status(400).json({ mensagem: "O campo VolumeMínimo Temporária é obrigatório." });
    }

    // Se chegou até aqui, os dados básicos são válidos.
    // Podemos logar que a validação passou e manter o placeholder de resposta.
    console.log("Validação básica dos dados do funcionário passou.");
    console.log("Dados validados:", {modeloSensor, localInstalação, dataInstalação, Represa});

    // 4. Chamar a função do model para salvar no banco

    sensorModel.cadastrarsensor(modeloSensor, localInstalação, dataInstalação, Represa) 
    .then(
        function (resultado) {
            // Se o cadastro no banco foi bem-sucedido
            console.log("sensor cadastrado com sucesso no banco! Resultado:", resultado);
            res.status(201).json({ 
                mensagem: "sensor cadastrado com sucesso!", 
                dadosInseridos: resultado // O model pode retornar o ID do usuário inserido, por exemplo
            });
        }
    ).catch(
        function (erro) {
            // Se ocorreu um erro ao tentar cadastrar no banco
            console.log("Erro ao cadastrar sensor no banco:", erro);
            // É uma boa prática não expor detalhes do erro do SQL diretamente ao cliente em produção,
            // mas para desenvolvimento pode ser útil.
            res.status(500).json({ 
                mensagem: "Erro interno ao cadastrar sensor. Por favor, tente novamente.", 
                erro: erro.sqlMessage 
            });
        }
    );
}

function buscarsensores(req, res) {
  const localInstalação = req.body.localInstalaçãoServer;
  const Represa = req.body.represaServer; 

  sensorModel.buscarsensores(localInstalação, Represa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os sensores: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}




module.exports = {
    cadastrarsensor,
    buscarsensores
}