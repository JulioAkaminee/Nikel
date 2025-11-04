const myModal = new bootstrap.Modal(document.getElementById("register-modal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// Criar Conta
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length < 5) {
    alert("Preencha o campo com um e-mail válido.");
    return;
  }

  if (password.length < 4) {
    alert("Preencha a senha com no mínimo 4 caracteres.");
    return;
  }

  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  myModal.hide(); // fecha o modal
  alert("Conta criada com sucesso.");
});

//Logar no sistema
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const session = document.getElementById("session-input").checked;

  const account = getAccount(email);

  if (!account) {
    alert("Opps! Verifique o usuário ou a senha.");
    return;
  }
  
  if(account){
    if(account.password !== password){
       alert("Opps! Verifique o usuário ou a senha.");
    return;
    }
    
    saveSession(email,session);

    
    window.location.href = "home.html";
  }

});
function checkLogged(){
    if(session){
    sessionStorage.setItem("logged", session);
    logged = session;
    }

    if(logged){
        saveSession(logged,session)

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data,saveSession){
    if(saveSession){
        localStorage.setItem("session",data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return null;
}
