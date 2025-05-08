var usuarioModel =require("../models/usuarioModel")

function cadastrarFuncionario(req, res){

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
    console.log("Dados validados:", { cpf, nome, email, SenhaTemporaria, tipo_usuario,Empresa_CNPJ });


    const Senha_hash_para_salvar = SenhaTemporaria; 

    // 4. Chamar a função do model para salvar no banco

    usuarioModel.cadastrar(nome, cpf, email, SenhaTemporaria, tipo_usuario, ativo, Empresa_CNPJ) 
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
            // É uma boa prática não expor detalhes do erro do SQL diretamente ao cliente em produção,
            // mas para desenvolvimento pode ser útil.
            res.status(500).json({ 
                mensagem: "Erro interno ao cadastrar funcionário. Por favor, tente novamente.", 
                erro: erro.sqlMessage 
            });
        }
    );
}



module.exports = {
    cadastrarFuncionario
}