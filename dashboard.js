console.log("💚 GOG Payroll Dashboard Loaded");

/*
=========================================

Version : 1.0

Purpose :

Dashboard Navigation

=========================================
*/

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.cursor="pointer";

    });

});

/*

Future Updates

- Today's Profit

- Active Runners

- Weekly Profit

- Notifications

*/