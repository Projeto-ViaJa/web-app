function entrar() {
  var emailVar = in_email.value;
  var senhaVar = in_password.value;

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.ID_EMPRESA = json.fk_empresa;
          sessionStorage.IS_ADMIN = json.is_admin;

          document.querySelector(".error-message").style.display = "none";

          alert("Login realizado com sucesso!");
          document.location = "../../pages/dashboard/index.html";
        });
      } else {
        if (resposta.status === 403) {
          document.querySelector(".error-message").style.display = "flex";
          return;
        }
        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}
