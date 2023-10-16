//////////
let usersDataArray = JSON.parse(localStorage.getItem("usersData")) || [];
let utentedatti = usersDataArray;
console.log(utentedatti);
// Define the regular expressions
let regExpEmail =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
let regExpUserName = /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/;
let regExpPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
const menuButtonLogin = document.getElementById("accedi");
const xButtoneLogin = document.querySelector("span.chiudi1");
const xButtoneLogin2 = document.querySelector("span.chiudi2");
const chiudiContatti = document.querySelector("span.chiudi0");
const xButtoneShowSignUp = document.querySelector("#invito_reg h1");
const xButtoneShowLoginBack = document.querySelector(
  "#buttoni2 button:first-child"
);

// gestinoe funzioni form login e signup

const formLoginn = document.forms["formLoginn"];
const loginEmail = formLoginn.elements["login_email"];
const loginPassword = formLoginn.elements["login_pass"];
const formSingUp = document.forms["formSignUp"];
const signUpUserName = formSingUp.elements["signup_username"];
const signUpEmail = formSingUp.elements["signup_email"];
const signUpPassword = formSingUp.elements["signup_pass"];
const signUpRipetiPassword = formSingUp.elements["signup_pass_repeat"];
const erroreSignUp = document.getElementById("erroreSignUp");
const erroreLogin = document.getElementById("erroreLogin");
const menuButtonContatti = document.getElementById("contatti");
const sectionCONTATTI = document.getElementById("contatto");

menuButtonContatti.addEventListener("click", () => {
  sectionCONTATTI.style.display = "block";
});
chiudiContatti.addEventListener("click", () => {
  sectionCONTATTI.style.display = "none";
});
// Fetch the form and add an event listener
const formContatti = document.forms["formContatto"];
formContatti.addEventListener("submit", function (event) {
  event.preventDefault();
  if (isFormValid()) {
    formContatti.submit();
  }
});

// Validation function with proper arguments
function isFormValid() {
  const nomeContatto = formContatti.elements["usernameCont"].value.trim();
  const cognomeContatto = formContatti.elements["lastnameCont"].value.trim();
  const emailContatto = formContatti.elements["emailCont"].value.trim();

  let errorMessageCo = "";

  if (!regExpUserName.test(nomeContatto)) {
    errorMessageCo += "Nome non valido. <br> ";
  }

  if (!regExpUserName.test(cognomeContatto)) {
    errorMessageCo += "Cognome non valido.<br> ";
  }

  if (!regExpEmail.test(emailContatto)) {
    errorMessageCo += "Email non valida.<br> ";
  }

  const erroreContatti = document.getElementById("erroreContatti");
  if (errorMessageCo !== "") {
    erroreContatti.innerHTML = errorMessageCo;
    erroreContatti.style.color = "red";
    erroreContatti.style.display = "block";
    return false;
  } else {
    // Display success message
    errorMessageCo += "Messaggio Inviato";
    erroreContatti.innerHTML = errorMessageCo;
    erroreContatti.style.color = "green";
    erroreContatti.style.display = "block";
    return true;
  }
}
// gestione stile form login e signup

menuButtonLogin.addEventListener("click", () => {
  document.getElementById("login").style.display = "block";
});

xButtoneLogin.addEventListener("click", () => {
  document.getElementById("login").style.display = "none";
});
xButtoneLogin2.addEventListener("click", () => {
  document.getElementById("signUp").style.display = "none";
});

xButtoneShowSignUp.addEventListener("click", () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("signUp").style.display = "block";
});

xButtoneShowLoginBack.addEventListener("click", () => {
  document.getElementById("login").style.display = "block";
  document.getElementById("signUp").style.display = "none";
});

//
//
//
//

formLoginn.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();
  const loginSuccessful = loginUser(email, password);

  if (loginSuccessful) {
    console.log(
      "Fai sparire il form login e fai vedere il nome utente alla menu"
    );
  } else {
    console.log("E succeso un errore...");
  }
});
function loginUser(email, password) {
  const user = usersDataArray.find(
    (user) => user.email === email && user.password === password
  );
  let errorMessageL = "";
  if (user) {
    /*    console.log("Login successful!");*/

    document.getElementById("login").style.display = "none";
    document.getElementById("nomeUtenteMenu").style.display = "block";
    document.getElementById("nomeUtente").innerHTML = user.username;
    return true;
  } else {
    errorMessageL += "Invalid email or password. <br>";
    console.log("Invalid email or password.");
    erroreLogin.innerHTML = errorMessageL;
    erroreLogin.style.display = "block";
    return false;
  }
}
formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();
  if (gestioneSignUp()) {
    const userData = {
      username: signUpUserName.value.trim(),
      email: signUpEmail.value.trim(),
      password: signUpPassword.value.trim(),
    };
    saveUserDataToLocalstorage(userData);
    console.log(usersDataArray);
  }
});

function gestioneSignUp() {
  const username = signUpUserName.value.trim();
  const email = signUpEmail.value.trim();
  const password = signUpPassword.value.trim();
  const repeatPassword = signUpRipetiPassword.value.trim();

  const validitySignUpUsername = regExpUserName.test(username);
  const validitySignUpEmail = regExpEmail.test(email);
  const validitySignUpPassword = regExpPassword.test(password);
  const validitySignUpRipetiPassword = password === repeatPassword;
  const erroreSignUp = document.getElementById("erroreSignUp");
  if (
    validitySignUpUsername &&
    validitySignUpEmail &&
    validitySignUpPassword &&
    validitySignUpRipetiPassword
  ) {
    erroreSignUp.style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("signUp").style.display = "none";
    return true;
  } else {
    let errorMessage = "";
    if (!validitySignUpUsername) {
      errorMessage +=
        "Il nome utente deve avere almeno 3 caratteri e può contenere solo lettere. <br>";
    }
    if (!validitySignUpEmail) {
      errorMessage += "Inserisci un indirizzo email valido. <br>";
    }
    if (!validitySignUpPassword) {
      errorMessage +=
        "La password deve contenere almeno 6 caratteri, <br> includere almeno una lettera maiuscola,<br> una lettera minuscola e un numero.\n";
    }
    if (!validitySignUpRipetiPassword) {
      errorMessage += "Le password non coincidono.";
    }
    erroreSignUp.innerHTML = errorMessage;
    erroreSignUp.style.display = "block";
    console.log(errorMessage);
    return false;
  }
}
//////// salva dati utente
function saveUserDataToLocalstorage(userData) {
  usersDataArray.push(userData);
  localStorage.setItem("usersData", JSON.stringify(usersDataArray));
}
//////// resetta dati sign up se diventano troppe
//////// chiama la funzione per resettarli
//resetLocalStorage();
function resetLocalStorage() {
  localStorage.clear();
}
////////
