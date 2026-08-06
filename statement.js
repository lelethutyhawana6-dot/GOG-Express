import {

    loadRunners,
    loadRunnerHistory

}

from "./firebase.js";

const runnerSelect = document.getElementById("runnerSelect");
const generateBtn = document.getElementById("generateBtn");


// ==============================
// LOAD RUNNERS
// ==============================

async function populateRunners(){

    const runners = await loadRunners();

    runnerSelect.innerHTML = `
        <option value="">
            Select Runner
        </option>
    `;

    runners.forEach(runner=>{

        runnerSelect.innerHTML += `

            <option value="${runner.name}">

                ${runner.name}

            </option>

        `;

    });

}

populateRunners();


// ==============================
// GENERATE STATEMENT
// ==============================

generateBtn.addEventListener("click", async()=>{

    const runner = runnerSelect.value;

    if(runner===""){

        alert("Please select a runner.");

        return;

    }

    const history = await loadRunnerHistory(runner);

    let profit = 0;
    let commission = 0;
    let quest = 0;
    let total = 0;

    history.forEach(record=>{

        profit += Number(record.profit || 0);

        commission += Number(record.commission || 0);

        quest += Number(record.quest || 0);

        total += Number(record.runnerTotal || 0);

    });

    document.getElementById("runnerName").textContent =
        runner;

    document.getElementById("profit").textContent =
        `R${profit.toFixed(2)}`;

    document.getElementById("commission").textContent =
        `R${commission.toFixed(2)}`;

    document.getElementById("quest").textContent =
        `R${quest.toFixed(2)}`;

    document.getElementById("runnerTotal").textContent =
        `R${total.toFixed(2)}`;

    document.getElementById("statement")
        .classList.remove("hidden");

});