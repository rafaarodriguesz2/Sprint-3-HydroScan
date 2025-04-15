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