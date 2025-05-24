var EmpresaModel = require("../models/empresaModel")
var represaModel = require("../models/represaModel");

function cadastrar(req, res) {

    const cpnj = req.body.cpnjServer;
    const nome = req.body.nomeServer;
    const email = req.body.emailServer;
    const telefone = req.body.telefoneServer;
    const codigo = req.body.codigoServer;
    const endereco = req.body.enderecoServer;
    const senha = req.body.SenhaServer;

    EmpresaModel.cadastrar(nome, cpnj, email, telefone, codigo, endereco, senha)
        .then(
            function (resultado) {
                // Se o cadastro no banco foi bem-sucedido
                console.log("Empresa cadastrado com sucesso no banco! Resultado:", resultado);
                res.status(201).json({
                    mensagem: "Empresa cadastrado com sucesso!",
                    dadosInseridos: resultado // O model pode retornar o ID do usuário inserido, por exemplo
                });
            }
        ).catch(
            function (erro) {
                // Se ocorreu um erro ao tentar cadastrar no banco
                console.log("Erro ao cadastrar empresa no banco:", erro);

                res.status(500).json({
                    mensagem: "Erro  ao cadastrar empresa. Por favor, tente novamente.",
                    erro: erro.sqlMessage
                });
            }
        );
}

function autenticar(req, res) {

    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (email == undefined) {
        return res.status(400).json({ mensagem: "O campo Email é obrigatório." });
    }
    if (senha == undefined) {
        return res.status(400).json({ mensagem: "O campo Senha é obrigatório." });
    }


    console.log("Validação básica dos dados da empresa passou.");
    console.log("Dados validados:", { email, senha });


    EmpresaModel.autenticar(email, senha)
        .then(
            function (resultado) {
                console.log(`Resultado da autenticação: ${JSON.stringify(resultado)}`);

                if (resultado.length == 1) { // Supondo que o model retorna um array, e 1 significa encontrado e senha correta
                    console.log("Empresa autenticado com sucesso:", resultado[0]);
                    // res.status(200).json(resultado[0]); // HTTP 200 OK para sucesso na autenticação

                    represaModel.buscarRepresas(resultado[0].fkCodigo_empresa)
                        .then((resultadoAquarios) => {
                            if (resultadoAquarios.length > 0) {
                                res.json({
                                    idUsuario: resultado[0].idUsuario,
                                    nome: resultado[0].nome,
                                    cpf: resultado[0].cpf,
                                    email: resultado[0].email,
                                    fkCodigo_empresa: resultado[0].fkCodigo_empresa,
                                    fkCodigo_empresa: resultadoAquarios 
                                });
                                console.log(res.json)
                            } else {
                                res.status(200).json({
                                    idUsuario: resultado[0].idUsuario,
                                    nome: resultado[0].nome,
                                    cpf: resultado[0].cpf,
                                    email: resultado[0].email,
                                    fkCodigo_empresa: resultado[0].fkCodigo_empresa,
                                    fkCodigo_empresa: []
                                });
                            }
                        })
                } else if (resultado.length == 0) { // Nenhum usuário encontrado ou senha incorreta
                    console.log("Email ou senha inválidos.");
                    res.status(403).json({ mensagem: "Email ou senha inválido(s)" }); // HTTP 403 Forbidden ou 401 Unauthorized
                } else { // Múltiplos usuários encontrados, o que não deveria acontecer para login
                    console.log("Múltiplos usuários encontrados com o mesmo login, verificar consistência do banco.");
                    res.status(500).json({ mensagem: "Erro de consistência de dados." });
                }
            }
        ).catch(
            function (erro) {
                console.log("Erro ao autenticar empresa no controller:", erro);
                if (erro.sqlMessage) {
                    console.error("Erro SQL:", erro.sqlMessage);
                }
                res.status(500).json({
                    mensagem: "Erro ao autenticar a empresa. Por favor, tente novamente.",
                    erroDetalhe: erro.sqlMessage || erro.message
                });
            }
        );
}

module.exports = {
    cadastrar,
    autenticar,
}