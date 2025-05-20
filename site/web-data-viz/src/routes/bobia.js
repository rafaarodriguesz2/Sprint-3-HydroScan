var express = require("express");
var router = express.Router();

var bobiaController = require("../controllers/bobiaController")

//Recebendo os dados do html e direcionando para a função cadastrar de bobiaController.js
router.post("/enviar", function (req, res) {
  bobiaController.enviar(req, res);
});



module.exports = router;