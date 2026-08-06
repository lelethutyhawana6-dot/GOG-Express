// ==========================================
// GOG EXPRESS v2.0
// FIREBASE MODULE
// ==========================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {

    getFirestore,

    collection,

    addDoc,

    getDocs,

    getDoc,

    doc,

    query,

    where,

    orderBy,

    limit,

    updateDoc,

    deleteDoc

}

from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyBW6l4EVSaaNYnxuIt2rVsVDEj2RQdXBR8",

    authDomain: "gog-express.firebaseapp.com",

    projectId: "gog-express",

    storageBucket: "gog-express.firebasestorage.app",

    messagingSenderId: "831128185396",

    appId: "1:831128185396:web:e6a3b4bbaa4b0c1e103861"

};


// ==========================================
// INITIALIZE
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("✅ Firebase Connected");


// ==========================================
// ORDERS
// ==========================================

export async function generateOrderNumber(){

    const q=query(

        collection(db,"orders"),

        orderBy("createdAt","desc"),

        limit(1)

    );

    const snapshot=await getDocs(q);

    if(snapshot.empty){

        return "GOG-001";

    }

    const last=snapshot.docs[0].data().orderNumber;

    const number=parseInt(

        last.replace("GOG-","")

    );

    return "GOG-"+

    String(number+1).padStart(3,"0");

}

export async function saveOrder(order){

    return await addDoc(

        collection(db,"orders"),

        order

    );

}

export async function loadOrders(){

    const q=query(

        collection(db,"orders"),

        orderBy("createdAt","desc")

    );

    const snapshot=await getDocs(q);

    let orders=[];

    snapshot.forEach(doc=>{

        orders.push({

            id:doc.id,

            ...doc.data()

        });

    });

    return orders;

}

export async function loadVendorOrders(vendor){

    const q=query(

        collection(db,"orders"),

        where("vendor","==",vendor),

        orderBy("createdAt","desc")

    );

    const snapshot=await getDocs(q);

    let orders=[];

    snapshot.forEach(doc=>{

        orders.push({

            id:doc.id,

            ...doc.data()

        });

    });

    return orders;

}

export async function loadOrder(id){

    const snapshot=await getDoc(

        doc(db,"orders",id)

    );

    return{

        id:snapshot.id,

        ...snapshot.data()

    };

}

export async function updateOrderStatus(id,status){

    await updateDoc(

        doc(db,"orders",id),

        {

            status

        }

    );

}

export async function assignRunner(id,runner){

    await updateDoc(

        doc(db,"orders",id),

        {

            runner

        }

    );

}

export async function deleteOrder(id){

    await deleteDoc(

        doc(db,"orders",id)

    );

}


// ==========================================
// RUNNERS
// ==========================================

export async function saveRunner(runner){

    return await addDoc(

        collection(db,"runners"),

        runner

    );

}

export async function loadRunners(){

    const snapshot=await getDocs(

        collection(db,"runners")

    );

    let runners=[];

    snapshot.forEach(doc=>{

        runners.push({

            id:doc.id,

            ...doc.data()

        });

    });

    return runners;

}

export async function deleteRunner(id){

    await deleteDoc(

        doc(db,"runners",id)

    );

}


// ==========================================
// RUNNER CASH-INS
// ==========================================

export async function saveRunnerCashIn(data){

    return await addDoc(

        collection(db,"runner_cashins"),

        data

    );

}

export async function loadRunnerCashIns(){

    const q=query(

        collection(db,"runner_cashins"),

        orderBy("date","desc")

    );

    const snapshot=await getDocs(q);

    let cashins=[];

    snapshot.forEach(doc=>{

        cashins.push({

            id:doc.id,

            ...doc.data()

        });

    });

    return cashins;

}

export async function loadRunnerHistory(runner){

    const q=query(

        collection(db,"runner_cashins"),

        where("runner","==",runner),

        orderBy("date","desc")

    );

    const snapshot=await getDocs(q);

    let history=[];

    snapshot.forEach(doc=>{

        history.push({

            id:doc.id,

            ...doc.data()

        });

    });

    return history;

}

export async function deleteRunnerCashIn(id){

    await deleteDoc(

        doc(db,"runner_cashins",id)

    );

}


// ==========================================
// EXPORT DATABASE
// ==========================================

export{

    db

};