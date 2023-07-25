import { Request } from "./ajaxreq.js";

const username = document.getElementById("username");
const password = document.getElementById("password");

const submitBTN = document.getElementById("submit-btn");

submitBTN.onclick = async function(){
    await Login(username.value, password.value);
}

async function Login(username, password){

    const resTXT = await Request("POST", "/api/admin-login", "application/json", {
        username: username,
        password: password,
    });

    if(!resTXT) return;

    const resOBJ = await JSON.parse(resTXT);

    if(!resOBJ){
        console.log("There is Error");
        return;
    }

    if(!resOBJ.success) console.log(resOBJ.message);
    else window.location = "/admin-panel";
}