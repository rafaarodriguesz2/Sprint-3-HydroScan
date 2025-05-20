console.log(chk_mudarLogin.value);
let login2 = null

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
        if(!login2){
            console.log("cnpj")
            login()
        }else{
            console.log("função cpf")
            autenticarFuncionario()
        }
    }
}
 
 function login(){
    var email = ipt_email.value
    var senha = ipt_senha.value
    const listaUsuario = [ "Gabriel@sptech", "Gustavo@sptech", "Kheyla@sptech", "Leandro@sptech", "Rafael@sptech"]
    var resposta = ''

    alert("Verificando Usuário")

    for (var contador = 1; contador <= listaUsuario.length; contador++){
      
      if (listaUsuario.includes(email) && senha == '123'){
        resposta = `Usuário reconhecido`
        alert('Usuario Reconhecido')
        window.location = "../pages/registros.html"
      }else resposta =`Email ou senha incorretos`; break
    }
    div_resposta.innerHTML = resposta
  }

  function autenticarFuncionario(){

    if (!chk_mudarLogin){

    }


    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    

    if (emailVar == "" || senhaVar == "") {
        div_resposta.innerHTML = "Ambos os campos devem estar preenchidos";
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
                sessionStorage.EMAIL_USUARIO = json.Email;
                sessionStorage.CPF_USUARIO = json.cpf;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.CODIGO = json.fkCodigo_empresa;
                sessionStorage.REPRESA = JSON.stringify(json.fkCodigo_empresa)
            
                console.log(json)
                
                setTimeout(function () {
                    window.location = "../../dashboard/dash.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                
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