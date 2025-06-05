function enviarPergunta() {
  const pergunta = document.getElementById('inputPergunta').value;

  fetch("/perguntas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pergunta })
  })
    .then(res => res.json())
    .then(res => {
      document.getElementById("mensagemEnvio").innerText = res.mensagem || "Pergunta enviada com sucesso!";
      document.getElementById("inputPergunta").value = "";
    })
    .catch(err => {
      document.getElementById("mensagemEnvio").innerText = "Erro ao enviar pergunta.";
    });
}
