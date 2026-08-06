import {

    loadRunners,
    loadRunnerHistory

}

from "./firebase.js";

const runnerSelect = document.getElementById("runnerSelect");

const history = document.getElementById("history");


// ==========================================
// LOAD RUNNERS
// ==========================================

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


// ==========================================
// SHOW SUMMARY
// ==========================================

runnerSelect.addEventListener("change", async()=>{

    const runner = runnerSelect.value;

    if(runner==="") return;

    const records = await loadRunnerHistory(runner);

    let profit = 0;
    let commission = 0;
    let quest = 0;
    let runnerTotal = 0;
    let gogTotal = 0;

    history.innerHTML = "";

    records.forEach(record=>{

        profit += Number(record.profit || 0);

        commission += Number(record.commission || 0);

        quest += Number(record.quest || 0);

        runnerTotal += Number(record.runnerTotal || 0);

        gogTotal += Number(record.gogTotal || 0);

        history.innerHTML += `

            <div class="record">

                <strong>${record.date}</strong>

                <br>

                Profit : R${record.profit.toFixed(2)}

                <br>

                Runner : R${record.runnerTotal.toFixed(2)}

            </div>

        `;

    });

    if(records.length===0){

        history.innerHTML = `

            <p class="empty">

                No records found.

            </p>

        `;

    }

    document.getElementById("profit").textContent =
    `R${profit.toFixed(2)}`;

    document.getElementById("commission").textContent =
    `R${commission.toFixed(2)}`;

    document.getElementById("quest").textContent =
    `R${quest.toFixed(2)}`;

    document.getElementById("runnerTotal").textContent =
    `R${runnerTotal.toFixed(2)}`;

    document.getElementById("gogTotal").textContent =
    `R${gogTotal.toFixed(2)}`;

});