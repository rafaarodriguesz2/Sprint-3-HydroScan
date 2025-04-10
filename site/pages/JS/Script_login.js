function login(){
  var email = ipt_email.value
  var senha = ipt_senha.value
  const listaUsuario = [ "Gabriel@sptech", "Gustavo@sptech", "Kheyla@sptech", "Leandro@sptech", "Rafael@sptech"]
  var resposta = ''

  alert('botao apertado')

  for (var contador = 1; contador <= listaUsuario.length; contador++){
    console.log('chegou no for');
    
    if (listaUsuario.includes(email) && senha == '123'){
      resposta += `Usuário reconhecido`
      console.log('chegou dentro do if do for');
      alert('chegou dentro do if do for')
      
    }else resposta +=`Email ou senha incorretos`; break
  }
  div_resposta.innerHTML += resposta
}