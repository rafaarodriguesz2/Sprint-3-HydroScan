console.log(chk_mudarLogin.value);
let login2 = true

function mudar(){
    login2 = document.getElementById("chk_mudarLogin")
    console.log(login2.checked);
}

function checkCNPJorCPF(){
    var email = ipt_email.value
    var senha = ipt_senha.value
    if (email == 'suporte@hydroscan' && senha == 'hydroscan'){
        window.location.href = 'http://localhost:3001'
    }else{
        if(login2.checked){
            console.log("função cnpj")
            autenticarEmpresa()
        }else{
            console.log("função cpf")
            autenticarFuncionario()
        }
    }
}
 
 function autenticarEmpresa(){
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    

    if (emailVar == "" || senhaVar == "") {
        div_resposta.innerHTML = `<p style="color: red;">Ambos os campos devem estar preenchidos</p>`
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/empresas/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log('Antes do stringfy', json);
                console.log('Depois do stringfy', JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.CNPJ_USUARIO = json.cnpj;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.CODIGO = json.codigo;
                const represas = json.represas; 
                sessionStorage.setItem('REPRESA', JSON.stringify(represas));
                
            
                console.log(json)
                
                div_resposta.innerHTML = `<p style="color: green;">Usúario reconhecido</p>`

                setTimeout(function () {
                    window.location = "../../dashboard/dash.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                div_resposta.innerHTML = `<p style="color: red;">Usúario não foi reconhecido</p>`
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}



  function autenticarFuncionario(){

    if (!chk_mudarLogin){

    }


    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    

    if (emailVar == "" || senhaVar == "") {
        div_resposta.innerHTML = `<p style="color: red;">Ambos os campos devem estar preenchidos</p>`;
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/funcionarios/autenticar-funcionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.CPF_USUARIO = json.cpf;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.CODIGO = json.fkCodigo_empresa;
                sessionStorage.REPRESA = JSON.stringify(json.fkCodigo_empresa);
                sessionStorage.NIVEL_ACESSO = json.nivelAcesso;
                let nivelDeAcesso = sessionStorage.NIVEL_ACESSO
                console.log(json)
                
                div_resposta.innerHTML = `<p style="color: green;">Usúario reconhecido</p>`

                setTimeout(function () {
                   window.location = `../../dashboard/dash.html`
                }, 1000); // apenas para exibir o loading
            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                div_resposta.innerHTML = `<p style="color: red;">Email ou senha incorretos</p>`
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
  div_resposta.style.display = "none"
}