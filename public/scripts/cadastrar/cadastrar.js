let empresaVar = null;

function limparFormulario() {
  in_nome.value = "";
  in_email.value = "";
  in_password.value = "";
  in_confirm_password.value = "";
  in_token.value = "";
}

function tryCadastrar() {
  if (validarNome() && validarEmail() && validarSenha() && confirmarSenha() && validarToken()) {
    validarEmpresa();
  } else {
    alert("Por favor, corrija os erros no formulário antes de cadastrar.");
  }
}

function validarEmpresa() {
  let token = in_token.value.trim();

  fetch(`/empresa/getFk/${token}`, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Token inválido ou empresa não encontrada.");
      }
      return response.json();
    })
    .then((resposta) => {
      if (!resposta || !resposta.id_empresa) {
        throw new Error("Token inválido.");
      }
      empresaVar = resposta.id_empresa;
      cadastrar();
    })
    .catch((err) => {
      console.error("Erro ao validar empresa: ", err);
      alert("Erro ao validar token: " + err.message);
      document.querySelector(".token-error-message").textContent = err.message;
      document.querySelector(".token-error-message").style.display = "flex";
    });
}

function cadastrar() {
  var nomeVar = in_nome.value;
  var emailVar = in_email.value;
  var senhaVar = in_confirm_password.value;

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      idEmpresaServer: empresaVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        limparFormulario();
        alert("Cadastro realizado com sucesso!");
      } else {
        return resposta.json().then(data => {
          throw new Error(data.erro || "Houve um erro ao tentar realizar o cadastro!");
        });
      }
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro.message}`);
      alert(`Erro ao cadastrar: ${erro.message}`);
    });
}

function validarNome() {
  let nome = in_nome.value.trim();

  if (nome === "") {
    document.querySelector(".nome-error-message").textContent = "Por favor, insira seu nome.";
    document.querySelector(".nome-error-message").style.display = "flex";
    return false;
  }
  document.querySelector(".nome-error-message").style.display = "none";
  return true;
}

function validarEmail() {
  let email = in_email.value.trim();
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    document.querySelector(".email-error-message").textContent = "Por favor, insira um email.";
    document.querySelector(".email-error-message").style.display = "flex";
    return false;
  } else if (!emailRegex.test(email)) {
    document.querySelector(".email-error-message").textContent = "Por favor, insira um email válido.";
    document.querySelector(".email-error-message").style.display = "flex";
    return false;
  }
  document.querySelector(".email-error-message").style.display = "none";
  return true;
}

function validarSenha() {
  let senha = in_password.value;

  if (senha.length < 8) {
    document.querySelector(".password-error-message").textContent = "A senha deve ter pelo menos 8 caracteres.";
    document.querySelector(".password-error-message").style.display = "flex";
    return false;
  }
  document.querySelector(".password-error-message").style.display = "none";
  return true;
}

function confirmarSenha() {
  let senha = in_password.value;
  let confirmSenha = in_confirm_password.value;

  if (senha !== confirmSenha) {
    document.querySelector(".confirm-password-error-message").textContent = "As senhas não coincidem.";
    document.querySelector(".confirm-password-error-message").style.display = "flex";
    return false;
  }
  document.querySelector(".confirm-password-error-message").style.display = "none";
  return true;
}

function validarToken() {
  let token = in_token.value.trim();

  if (token === "") {
    document.querySelector(".token-error-message").textContent = "Por favor, insira o token.";
    document.querySelector(".token-error-message").style.display = "flex";
    return false;
  }
  document.querySelector(".token-error-message").style.display = "none";
  return true;
}
