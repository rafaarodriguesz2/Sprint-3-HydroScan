var express = require("express");
var router = express.Router();

var represaController = require("../controllers/represaController")

//Recebendo os dados do html e direcionando para a função cadastrar de funcionarioController.js
router.post("/cadastrar-represa", function (req, res) {
  represaController.cadastrarRepresa(req, res);
});

router.get("/buscar-represas:idRepresa", function(req, res){
  represaController.buscarRepresas(req,res);
})

module.exports = router;