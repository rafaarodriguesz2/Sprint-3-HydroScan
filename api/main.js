// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (valoresSensorDigital) => {

    // conexão com o banco de dados MySQL
    const poolBancoDados = mysql.createPool(
        {
    host: 'localhost',
    user: 'aluno',
    password: '1234',
    database: 'hydroscan',
    port: 3306
}).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const sensorDigital = parseInt(data);
        console.log("Valor que será inserido:", sensorDigital);

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorDigital.push(sensorDigital);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // Aqui ajustamos a inserção para a tabela Leitura
            const idSensor2 = 2;
            const idSensor = 1;  // Ajuste conforme a lógica de identificação do sensor
            const dataHora = new Date();  // Data e hora atuais
            const statusGeracao = sensorDigital > 40 ? 'gerando' : 'parada';  // Exemplo de lógica para status de geração

            // Inserção na tabela Leitura
            await poolBancoDados.execute(
                'insert into Leitura (idSensor, data_hora, nivel_agua_m, status_geracao) values (?, ?, ?, ?)',
                [idSensor, dataHora, sensorDigital, statusGeracao]
            );
            await poolBancoDados.execute(
                'insert into Leitura (idSensor, data_hora, nivel_agua_m, status_geracao) values (?, ?, ?, ?)',
                [idSensor2, dataHora, sensorDigital, statusGeracao]
            );
            console.log("Valores inseridos na tabela Leitura:", sensorDigital, statusGeracao);
        }
    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`);
    });
}

// função para criar e configurar o servidor web
const servidor = (valoresSensorDigital) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // Nesta parte ele vai pegar os dados do banco e enviar para as dashboards iziiiiiiiiiii
    app.get('/sensores/digital', async (_, response) => {
        try {
            const [linhas] = await poolBancoDados.execute(
                `select nivel_agua_m from Leitura order by data_hora desc limit 10`
            );
    
            const valores = linhas.map(registro => registro.nivel_agua_m);
            response.json(valores.reverse()); // reverse para mostrar do mais antigo ao mais recente
        } catch (erro) {
            console.error('Erro ao buscar dados no banco:', erro);
            response.status(500).send('Erro ao buscar dados no banco de dados');
        }
    });
    
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorDigital = [];

    // inicia a comunicação serial
    await serial(valoresSensorDigital);

    // inicia o servidor web
    servidor(valoresSensorDigital);
})();
