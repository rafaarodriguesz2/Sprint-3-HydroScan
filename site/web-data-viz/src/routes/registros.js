const express = require('express');
const router = express.Router();
const db = require('../database'); //Ajustar

router.get('/dados-usina', async (req, res) => {
    try {
        const resultados = await db.query('SELECT mes, nivel_agua, producao_energia FROM medidas WHERE usina_id = 1');
        res.json(resultados);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).send('Erro no servidor');
    }
});
module.exports = router;