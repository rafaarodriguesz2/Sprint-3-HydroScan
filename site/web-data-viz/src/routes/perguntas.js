const express = require('express');
const router = express.Router();
const perguntasController = require('../controllers/perguntasController');

router.post('/', perguntasController.enviarPergunta);

module.exports = router;
