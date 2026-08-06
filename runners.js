import {

saveRunner,
loadRunners

}

from "./firebase.js";


const form=document.getElementById("runnerForm");

const runnerList=document.getElementById("runnerList");


form.addEventListener("submit",async(e)=>{

e.preventDefault();

const runner={

name:document.getElementById("runnerName").value,

territory:document.getElementById("runnerTerritory").value,

createdAt:new Date()

};

await saveRunner(runner);

form.reset();

displayRunners();

});


async function displayRunners(){

const runners=await loadRunners();

runnerList.innerHTML="";

if(runners.length===0){

runnerList.innerHTML="<p class='empty'>No runners yet.</p>";

return;

}

runners.forEach(r=>{

runnerList.innerHTML+=`

<div class="runner">

<div>

<strong>${r.name}</strong>

<br>

${r.territory}

</div>

</div>

`;

});

}

displayRunners();