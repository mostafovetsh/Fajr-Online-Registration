import { Request } from "./ajaxreq.js";

/* DOM Elements */

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const username = document.getElementById("username");
const email = document.getElementById("@email");
const password = document.getElementById("password");
const rPassword = document.getElementById("re-password");
//const gender = document.querySelector('input[name="gender"]:checked').value;

const submitBTN = document.getElementById("submit-btn");

//Alerts
const mainAlert = document.getElementById("main-alert");

const usernameAlert = document.getElementById("username-alert");
const firstNameAlert = document.getElementById("first-name-alert");
const lastNameAlert = document.getElementById("last-name-alert");
const emailAlert = document.getElementById("email-alert");
const passwordAlert = document.getElementById("password-alert");
const rePasswordAlert = document.getElementById("re-password-alert");

/* ------------------------------------ */

//Properties
let canSubmit = true;

/* ------------------------------------ */

const moodleSiteURL = "http://learn.fajr.com";
const webServiceEndPoint = moodleSiteURL + "/webservice/rest/server.php";


username.addEventListener("blur", function(){
    UsernameValidator(this.value);
});

firstName.addEventListener("blur", function(){
    FirstNameValidator(this.value);
});

lastName.addEventListener("blur", function(){
    LastNameValidator(this.value);
});

email.addEventListener("blur", function(){
    EmailValidator(this.value);
});

password.addEventListener("blur", function(){
    PasswordValidator(this.value);
});

rPassword.addEventListener("blur", function(){
    ComparePassword(password.value, this.value);
});

username.addEventListener("input", function(){
    UsernameValidator(this.value);
});

firstName.addEventListener("input", function(){
    FirstNameValidator(this.value);
});

lastName.addEventListener("input", function(){
    LastNameValidator(this.value);
});

email.addEventListener("input", function(){
    EmailValidator(this.value);
});

password.addEventListener("input", function(){
    PasswordValidator(this.value);
});

rPassword.addEventListener("input", function(){
    ComparePassword(password.value, this.value);
});

submitBTN.onclick = async function(){

    if(!canSubmit) return;

    canSubmit = false;

    mainAlert.classList.remove("main-alert-faild");
    mainAlert.children[0].innerText = "";

    submitBTN.disabled = true;

    submitBTN.innerHTML = `<div class="spinner"></div>`;
    submitBTN.classList.remove("normal-btn");
    submitBTN.classList.add("busy-btn");

    const gender = Number(document.querySelector('input[name="gender"]:checked').value);

    const newUser = await JSON.parse(await Register(username.value, firstName.value, lastName.value, email.value, password.value, rPassword.value, gender));

    canSubmit = true;
    submitBTN.disabled = false;

    submitBTN.innerText = "Submit";
    submitBTN.classList.remove("busy-btn");
    submitBTN.classList.add("normal-btn");

    if(!newUser) return;

    if(!newUser.success){
        mainAlert.classList.add("main-alert-faild");
        mainAlert.children[0].innerText = newUser.message;

        return;
    }

    window.location.href = "http://learn.fajr.com/login";
}

/* Registration Function */

async function Register(username, firstName, lastName, email, password, rePassword, gender = 0){

    if(!UsernameValidator(username)) return null;

    if(!FirstNameValidator(firstName)) return null;

    if(!LastNameValidator(lastName)) return null;

    if(!EmailValidator(email)) return null;

    if(!PasswordValidator(password)) return null;

    if(!ComparePassword(password, rePassword)) return null;

    const user = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
    }

    const res = await Request("POST", "/api/register", "application/json", user);

    return res;
}

/* --------------------------------------------- */

/* Validators */

function UsernameValidator(username){
    if(username.length < 6){
        usernameAlert.innerText = "Invalid Username, Username should't Less than 5 Letters.";
        return false;
    }

    if(username.length > 50){
        usernameAlert.innerText = "Invalid Username, Username should't More than 50 Letters";
        return false;
    }

    if(/[A-Z]/.test(username)){
        usernameAlert.innerText = "Invalid Username, Username must be Lower Case";
        return false;
    }

    usernameAlert.innerText = "";
    return true;
}

function FirstNameValidator(firstName){
    if(firstName.length <= 0 ){
        firstNameAlert.innerText = "Invalid Value, First Name should't be Empty Value.";
        return false;
    }

    firstNameAlert.innerText = "";
    return true;
}

function LastNameValidator(lastName){
    if(lastName.length <= 0 ){
        lastNameAlert.innerText = "Invalid Value, Last Name should't be Empty Value.";
        return false;
    }

    lastNameAlert.innerText = "";
    return true;
}

function EmailValidator(email){

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailRegex.test(email)){
        emailAlert.innerText = "Invalid E-mail, is't a Mail Format.";
        return false;
    }

    if(/[A-Z]/.test(email)){
        emailAlert.innerText = "Invalid E-mail, E-Mail shouldn't Include Capital Letters.";
        return false;
    }
    
    emailAlert.innerText = "";
    return true;
}

function PasswordValidator(password){

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(!passwordRegex.test(password)){
        passwordAlert.innerText = "Invalid Password, Password must Contain One Capital Letter, Special Letter, and don't be Less than 6 Characters.";
        return false;
    }

    passwordAlert.innerText = "";
    return true;
}

function ComparePassword(password, rePassword){
    if(password !== rePassword){
        rePasswordAlert.innerText = "Invalid Value, Re-Password must Equal Password Value.";
        return false;
    }

    rePasswordAlert.innerText = "";
    return true;
}

/* ----------------------------------------------- */
//Kamarov123@%23$
//Promaxkov123@#$