var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idRepresa", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idRepresa", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;