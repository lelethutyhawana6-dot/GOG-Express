import {

    loadRunners,
    saveRunnerCashIn

}

from "./firebase.js";

const form = document.getElementById("cashForm");
const runnerSelect = document.getElementById("runner");

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
// SAVE CASH-IN
// ==============================

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const runner = runnerSelect.value;

    const date = document.getElementById("date").value;

    const float = Number(document.getElementById("float").value);

    const cashReturned = Number(document.getElementById("cashReturned").value);

    const vendorCost = Number(document.getElementById("vendorCost").value);

    const expenses = Number(document.getElementById("expenses").value);

    // --------------------------
    // CALCULATIONS
    // --------------------------

    const profit = cashReturned - vendorCost - float - expenses;

    const commission = profit * 0.20;

    const orders = Number(
    document.getElementById("orders").value
);

    let suggestedQuest = 0;

if (orders >= 50){

    suggestedQuest = 20;

}
else if (orders >= 40){

    suggestedQuest = 10;

}
else if (orders >= 35){

    suggestedQuest = 5;

}

// Automatically fill the input
const questBox = document.getElementById("questInput");

if(questBox.value == 0){

    questBox.value = suggestedQuest;

}

// Amount actually paid
const quest = Number(questBox.value);

    const runnerTotal = commission + quest;

    const gogTotal = profit - runnerTotal;

    // --------------------------
    // DISPLAY RESULTS
    // --------------------------

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

    // --------------------------
    // SAVE TO FIREBASE
    // --------------------------

    await saveRunnerCashIn({

        runner,

        date,

        float,

        cashReturned,

        vendorCost,

        expenses,

        profit,

        commission,

        quest,

        runnerTotal,

        gogTotal,

        createdAt: new Date()

    });

    alert("✅ Cash-In Saved");

    form.reset();

});