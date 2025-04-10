function cadastro(){
  var nomeCompleto = ipt_nomeCompleto.value
  var cpf = ipt_cpf.value
  var cnpj = ipt_cnpj.value
  var email = ipt_email.value
  var senha = ipt_senha.value
  var confirmeSenha = ipt_confirmeSenha.value
  var resposta1 = ''
  var resposta2 = ''
  var resposta3 = ''
  

  for (var contador = 0; contador < cpf.length; contador++){

    var cpfDigitos = cpf[contador]

    console.log(cpfDigitos);

    if(cpfDigitos != 1 
      && cpfDigitos != 2 
      && cpfDigitos != 3 
      && cpfDigitos != 4  
      && cpfDigitos != 5 
      && cpfDigitos != 6 
      && cpfDigitos != 7 
      && cpfDigitos != 8 
      && cpfDigitos != 9 
      && cpfDigitos != 0){

      resposta1 =`Por favor insira somente números no cpf e/ou CNPJ<br>` 
      console.log("tem Letra")

      } else{
        console.log("Tem Numero")
      }
  }

  if (senha != confirmeSenha){
    resposta += `As senhas não são iguais<br>`
  }
  if (senha.length < 5 || confirmeSenha < 5){
    resposta += `A senha deve ter pelo menos 5 caracteres<br>`
  }

  div_resposta1.innerHTML += resposta1
  div_resposta2.innerHTML += resposta2
  div_resposta3.innerHTML += resposta3
}

/*Código antigo*/ 

// function cadastro(){
//   var nomeCompleto = ipt_nomeCompleto.value
//   var CPF = ipt_CPF.value
//   var CNPJ = ipt_CNPJ.value
//   var email = ipt_email.value
//   var senha = ipt_senha.value
//   var confirmeSenha = ipt_confirmeSenha.value
//   var resposta = ''
  


//   for (var contador = 1; contador <= email.length; contador++){
//     if(senha[contador] == "\\", "'", "\"", "<", ">", ";", "--", "\0" ){
//       resposta +=`Foi inserido um caractere especial não aceito , por favor tente outra senha caracteres aceitos (@, #, $, %, &, *, ( ), [ ], { }, _, -, +, = , !, ?) <br>`

//     if(CPF[contador], CNPJ[contador] != '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'){
//       resposta +=`Por favor insira somente números no CPF e/ou CNPJ<br>`  }
//   }


//   }
//   if (senha != confirmeSenha){
//     resposta += `As senhas não são iguais<br>`
//   }
//   if (senha.length < 10){
//     resposta += `A senha deve ter pelo menos 10 caracteres<br>`
//   }
//   div_resposta.innerHTML += resposta
// }