function cadastro(){
  var nomeCompleto = ipt_nomeCompleto.value
  var CPF = ipt_CPF.value
  var CNPJ = ipt_CNPJ.value
  var email = ipt_email.value
  var senha = ipt_senha.value
  var confirmeSenha = ipt_confirmeSenha.value
  var resposta = ''
  


  for (var contador = 1; contador <= email.length; contador++){
    if(senha[contador] == "\\", "'", "\"", "<", ">", ";", "--", "\0" ){
      resposta +=`Foi inserido um caractere especial não aceito , por favor tente outra senha caracteres aceitos (@, #, $, %, &, *, ( ), [ ], { }, _, -, +, = , !, ?) <br>`

    if(CPF[contador], CNPJ[contador] != '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'){
      resposta +=`Por favor insira somente números no CPF e/ou CNPJ<br>`  }
  }


  }
  if (senha != confirmeSenha){
    resposta += `As senhas não são iguais<br>`
  }
  if (senha.length < 10){
    resposta += `A senha deve ter pelo menos 10 caracteres<br>`
  }
  div_resposta.innerHTML += resposta
}
