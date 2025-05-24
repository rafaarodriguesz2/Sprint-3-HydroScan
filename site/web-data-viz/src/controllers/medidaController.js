var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const idRepresa = req.params.idRepresa;

    console.log(`Dentro do controller (buscarUltimasMedidas): idRepresa esta ${idRepresa}`);


    medidaModel.buscarUltimasMedidas(idRepresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    const idRepresa = req.params.idRepresa;

    console.log(`Dentro do controller (buscarMedidasEmTempoReal): idRepresa esta ${idRepresa}`);

    medidaModel.buscarMedidasEmTempoReal(idRepresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal

}