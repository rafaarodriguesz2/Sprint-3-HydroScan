function cadastro() {
  var cpf = ipt_cpf.value;
  var cnpj = ipt_cnpj.value;
  var senha = ipt_senha.value;
  var confirmeSenha = ipt_confirmeSenha.value;

  var resposta1 = '';
  var resposta2 = '';
  var resposta3 = '';
  var resposta4 = '';
  
  // Verificação do CPF
  for (var contador = 0; contador < cpf.length; contador++) {
    var cpfDigitos = cpf[contador];

    console.log(cpfDigitos);

    if (isNaN(cpfDigitos)) {
      resposta1 = `Por favor insira somente números no (CPF)<br>`;
      console.log("Tem letra no (CPF)");
      break;
    } else {
      console.log("Tem número");
    }
  }

  // Verificação do CNPJ
  for (var i = 0; i < cnpj.length; i++) {
    var cnpjDigitos = cnpj[i];

    console.log(cnpjDigitos);

    if (isNaN(cnpjDigitos)) {
      resposta2 = `Por favor insira somente números no (CNPJ)<br>`;
      console.log("Tem letra no (CNPJ)");
      break;
    } else {
      console.log("Tem número");
    }
  }

  // Verificar se as senhas são iguais
  if (senha !== confirmeSenha) {
    resposta3 = `As senhas não são iguais<br>`;
  }

  // Verificar se as senhas têm pelo menos 5 caracteres
  if (senha.length < 5 || confirmeSenha.length < 5) {
    resposta4 = `A senha deve ter pelo menos 5 caracteres<br>`;
  }

  div_resposta1.innerHTML = resposta1;
  div_resposta2.innerHTML = resposta2;
  div_resposta3.innerHTML = resposta3;
  div_resposta4.innerHTML = resposta4;

  if(resposta1 == '' && resposta2 == '' && resposta3 == '' && resposta4 == ''){
    window.location = "../pages/login.html"
  }
}
