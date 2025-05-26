var funcionarioModel = require("../models/funcionarioModel")
var represaModel = require("../models/represaModel");

function cadastrarFuncionario(req, res) {

    const { cpf, nome, email, SenhaTemporaria, tipo_usuario, Empresa_CNPJ } = req.body;

    // Você também precisará definir valores padrão ou lógicos para outros campos:
    const ativo = 1;
    // E a flag para a primeira senha, se você adicionou ao banco:
    const precisa_alterar_senha = true;

    // Validando se os campos estão preenchidos
    if (!cpf) {
        return res.status(400).json({ mensagem: "O campo CPF é obrigatório." });
    }
    if (!nome) {
        return res.status(400).json({ mensagem: "O campo Nome é obrigatório." });
    }
    if (!email) {
        return res.status(400).json({ mensagem: "O campo Email é obrigatório." });
    }
    if (!SenhaTemporaria) {
        return res.status(400).json({ mensagem: "O campo Senha Temporária é obrigatório." });
    }
    if (!Empresa_CNPJ) {
        return res.status(400).json({ mensagem: "O campo CNPJ da Empresa é obrigatório." });
    }

    // Validações adicionais (exemplos)
    if (cpf.length !== 11) { // Já sabemos que CPF existe por causa da validação anterior
        return res.status(400).json({ mensagem: "O CPF deve conter 11 caracteres." });
    }
    if (!email.includes("@")) { // Já sabemos que Email existe
        return res.status(400).json({ mensagem: "Formato de email inválido." });
    }
    if (SenhaTemporaria.length < 6) { // Já sabemos que SenhaTemporaria existe
        return res.status(400).json({ mensagem: "A senha temporária deve ter pelo menos 6 caracteres." });
    }

    // Se chegou até aqui, os dados básicos são válidos.
    // Podemos logar que a validação passou e manter o placeholder de resposta.
    console.log("Validação básica dos dados do funcionário passou.");
    console.log("Dados validados:", { cpf, nome, email, SenhaTemporaria, tipo_usuario, Empresa_CNPJ });


    const Senha_hash_para_salvar = SenhaTemporaria;

    // 4. Chamar a função do model para salvar no banco

    funcionarioModel.cadastrar(nome, cpf, email, SenhaTemporaria, tipo_usuario, ativo, Empresa_CNPJ)
        .then(
            function (resultado) {
                // Se o cadastro no banco foi bem-sucedido
                console.log("Funcionário cadastrado com sucesso no banco! Resultado:", resultado);
                res.status(201).json({
                    mensagem: "Funcionário cadastrado com sucesso!",
                    dadosInseridos: resultado // O model pode retornar o ID do usuário inserido, por exemplo
                });
            }
        ).catch(
            function (erro) {
                // Se ocorreu um erro ao tentar cadastrar no banco
                console.log("Erro ao cadastrar funcionário no banco:", erro);

                res.status(500).json({
                    mensagem: "Erro interno ao cadastrar funcionário. Por favor, tente novamente.",
                    erro: erro.sqlMessage
                });
            }
        );
}

function autenticarFuncionario(req, res) {

    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (email == undefined) {
        return res.status(400).json({ mensagem: "O campo Email é obrigatório." });
    }
    if (senha == undefined) {
        return res.status(400).json({ mensagem: "O campo Senha é obrigatório." });
    }


    console.log("Validação básica dos dados do funcionário passou.");
    console.log("Dados validados:", { email, senha });


    funcionarioModel.autenticar(email, senha)
        .then(
            function (resultado) {
                console.log(`Resultado da autenticação: ${JSON.stringify(resultado)}`);

                if (resultado.length == 1) { // Supondo que o model retorna um array, e 1 significa encontrado e senha correta
                    console.log("Funcionário autenticado com sucesso:", resultado[0]);
                    // res.status(200).json(resultado[0]); // HTTP 200 OK para sucesso na autenticação

                    represaModel.buscarRepresas(resultado[0].fkCodigo_empresa)
                        .then((resultadoAquarios) => {
                            if (resultadoAquarios.length > 0) {
                                console.log("tem represa")
                                res.json({
                                    idUsuario: resultado[0].idUsuario,
                                    nome: resultado[0].nome,
                                    cpf: resultado[0].cpf,
                                    email: resultado[0].email,
                                    nivelAcesso:resultado[0].nivel_acesso,
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
                                    codigo: resultado[0].fkCodigo_empresa,
                                    represas: []
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
                console.log("Erro ao autenticar funcionário no controller:", erro);
                if (erro.sqlMessage) {
                    console.error("Erro SQL:", erro.sqlMessage);
                }
                res.status(500).json({
                    mensagem: "Erro interno ao autenticar funcionário. Por favor, tente novamente.",
                    erroDetalhe: erro.sqlMessage || erro.message
                });
            }
        );
}

// var funcionarioModel = require("../models/funcionarioModel");
// var represaModel = require("../models/represaModel");

// function autenticarFuncionario(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;

//     if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {

//         funcionarioModel.autenticar(email, senha)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);

//                         represaModel.buscarRepresas(resultadoAutenticar[0].empresaId)
//                             .then((resultadoAquarios) => {
//                                 if (resultadoAquarios.length > 0) {
//                                     res.json({
//                                         id: resultadoAutenticar[0].id,
//                                         email: resultadoAutenticar[0].email,
//                                         nome: resultadoAutenticar[0].nome,
//                                         senha: resultadoAutenticar[0].senha,
//                                         aquarios: resultadoAquarios
//                                     });
//                                 } else {
//                                     res.status(204).json({ aquarios: [] });
//                                 }
//                             })
//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

module.exports = {
    cadastrarFuncionario,
    autenticarFuncionario
}