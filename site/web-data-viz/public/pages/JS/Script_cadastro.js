
function cadastroEmpresa(){
    const cpnj = document.getElementById("ipt_cnpj").value;
    const nome = document.getElementById("ipt_nomeCompleto").value;
    const email = document.getElementById("ipt_email").value;
    const senhaTemporaria = document.getElementById("ipt_senha").value;
    const confirmeSenha = document.getElementById("ipt_confirmeSenha").value;
    const telefone = document.getElementById("ipt_telefone").value;
    const codigoEmpresa = document.getElementById("ipt_codigoEmpresa").value;
    const endereco = document.getElementById("ipt_endereco").value;

    const divResposta = document.getElementById("div_resposta")

    if (!cpnj || !nome || !email || !senhaTemporaria || !confirmeSenha || !telefone || !codigoEmpresa || !endereco) {
    div_resposta.innerHTML = `<p style="color: red;">Ambos os campos devem estar preenchidos</p>`
    }else if (cpnj.length != 14){
        div_resposta.innerHTML = `<p style="color: red;">O CNPJ deve ter 14 caracteres</p>`
    }

    if (senhaTemporaria != confirmeSenha){
      div_resposta.innerHTML = `<p style="color: red;">As duas senhas devem ser iguais!</p>`
    }else{

    const dadosParaApi = {
        'cpnjServer': cpnj,                            // No controller: cpf
        'nomeServer': nome,                          // No controller: nome
        'emailServer': email,                        // No controller: email
        'SenhaServer': senhaTemporaria,    // No controller: SenhaTemporaria (S e T maiúsculos)
        'telefoneServer': telefone,
        'codigoServer': codigoEmpresa,
        'enderecoServer': endereco

    };

    console.log('Dados que serão enviados para a API:', dadosParaApi);
    
    const urlApi = `http://localhost:3333/empresas/cadastrar`;

    fetch(urlApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          
        },
        body: JSON.stringify(dadosParaApi) // Converte o objeto para uma string JSON
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for OK, tenta ler o corpo como JSON para obter a mensagem de erro da API
            return response.json().then(erroApi => {
                // Mostra a mensagem de erro da API ou um erro genérico
                const mensagemErro = erroApi.mensagem || `Erro ao cadastrar: ${response.status}`;
                console.error("Erro da API:", mensagemErro);
                if (divResposta) divResposta.innerHTML = `<p style="color: red;">${mensagemErro}</p>`;
                throw new Error(mensagemErro); // Isso fará com que caia no .catch() abaixo
            });
        }
        return response.json(); // Converte a resposta de sucesso para JSON
    })
    .then(data => {
        // Se chegou aqui, a API retornou sucesso (ex: status 201)
        console.log("Sucesso do cadastro:", data);
        divResposta.innerHTML = `<p style="color: green;">${data.mensagem || "Empresa cadastrada com sucesso!"}</p>`;
        
        // Opcional: Limpar o formulário após o sucesso
        document.getElementById("ipt_cnpj").value = "";
        document.getElementById("ipt_nomeCompleto").value = "";
        document.getElementById("ipt_email").value = "";
        document.getElementById("ipt_senha").value = "";
        document.getElementById("ipt_confirmeSenha").value = ""; 
        document.getElementById("ipt_telefone").value = "";
        document.getElementById("ipt_codigoEmpresa").value = ""; 
        document.getElementById("ipt_endereco").value = ""
        
        window.location.href = './login.html'

    })
    .catch(error => {
        // Este catch pega erros da rede (ex: servidor offline) ou o erro lançado do .then() anterior
        console.error("Erro geral no fetch:", error);
        if (divResposta && !divResposta.innerHTML) { // Só mostra se não já mostrou erro da API
             divResposta.innerHTML = `<p style="color: red;">Ocorreu um erro ao tentar cadastrar. Tente novamente.</p>`;
        }
    });
  }
}