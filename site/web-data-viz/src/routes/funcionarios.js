var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController")

//Recebendo os dados do html e direcionando para a função cadastrar de funcionarioController.js
router.post("/cadastrar-funcionario", function (req, res) {
  funcionarioController.cadastrarFuncionario(req, res);
});


module.exports = router;