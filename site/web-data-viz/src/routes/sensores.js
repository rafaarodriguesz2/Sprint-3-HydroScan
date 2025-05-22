var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController")

//Recebendo os dados do html e direcionando para a função cadastrar de sensorController.js
router.post("/cadastrar-sensor", function (req, res) {
    sensorController.cadastrarsensor(req, res);
});

module.exports = router;