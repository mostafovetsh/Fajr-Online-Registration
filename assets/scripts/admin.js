import { Request } from "./ajaxreq.js";

const selectors = document.getElementById("selectors");
const coursesSelector = document.getElementById("courses");
let groupsSelector = null;
const username = document.getElementById("username");
const submitBTN = document.getElementById("submit-btn");

Init();

async function Init(){
    const courses = await GetCourses();

    for(let i = 0; i < courses.length; i++){
        coursesSelector.innerHTML += `<option value=${courses[i].id}>${courses[i].shortname}</option>`;
    }
}

coursesSelector.onchange = async function(){

    if(groupsSelector) groupsSelector.remove();

    const groups = await GetGroups(this.value);

    if(!groups) return;

    groupsSelector = document.createElement("select");

    groupsSelector.innerHTML = "";

    for(let i = 0; i < groups.length; i++){
        groupsSelector.innerHTML += `<option value=${groups[i].id}>${groups[i].name}</option>`;
    }

    selectors.appendChild(groupsSelector);
}

submitBTN.onclick = async function(){
    const user = await GetUser(username.value);

    const res = await EnrolUser(user.id, 20, 5);
}

async function GetUser(username){

    const url = `http://learn.fajr.com/webservice/rest/server.php?wstoken=3a4b8aba0773629cbb10ab3926ef80f0&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=username&criteria[0][value]=${username}`

    const res = await JSON.parse(await Request("GET", url, "application/x-www-form-urlencoded"));

    if(!res || res.exception || res.users.length === 0) return null;

    return res.users[0];
}

async function GetCourses(){

    let url = `http://learn.fajr.com/webservice/rest/server.php?wstoken=3a4b8aba0773629cbb10ab3926ef80f0&wsfunction=core_course_get_courses&moodlewsrestformat=json`;

    for(let i = 1; i <= 100; i++){

        if(i === 68 || i === 82 || i === 97) continue;
        url += `&options[ids][${i - 1}]=${i}`;
    }

    const res = await JSON.parse(await Request("GET", url, "application/x-www-form-urlencoded"));

    return res;
}

async function GetGroups(courseID){

    const res = await JSON.parse(await Request("post", "/api/get-course-groups", "application/json", {
        courseID,
    }));

    if(!res) {
        console.log("Error");

        return null;
    }

    if(!res.success){
        console.log(res.message);

        return null;
    }

    return res.data;
}

async function EnrolUser(userID, courseID, isTeacher = false){

    console.log(userID, courseID, isTeacher);

    let url = `http://learn.fajr.com/webservice/rest/server.php?wstoken=3a4b8aba0773629cbb10ab3926ef80f0&wsfunction=enrol_manual_enrol_users&moodlewsrestformat=json&courseid=${courseID}&userid=${userID}&roleid=5`;

    const res = await JSON.parse(await Request("POST", url, "application/x-www-form-urlencoded"));
    console.log(res);
    return res;
}