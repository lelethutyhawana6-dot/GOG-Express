// ===============================
// GOG EXPRESS v1.1
// FIREBASE MODULE
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";


// ===============================
// FIREBASE CONFIG
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyBW6l4EVSaaNYnxuIt2rVsVDEj2RQdXBR8",
  authDomain: "gog-express.firebaseapp.com",
  projectId: "gog-express",
  storageBucket: "gog-express.firebasestorage.app",
  messagingSenderId: "831128185396",
  appId: "1:831128185396:web:e6a3b4bbaa4b0c1e103861",
  measurementId: "G-2R7CLDKEPV"
};


// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("✅ Firebase Connected");


// ===============================
// GENERATE ORDER NUMBER
// ===============================

export async function generateOrderNumber() {

    try {

        const q = query(
            collection(db, "orders"),
            orderBy("createdAt", "desc"),
            limit(1)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            return "GOG-001";

        }

        const lastOrder =
            snapshot.docs[0].data().orderNumber;

        const number =
            parseInt(lastOrder.replace("GOG-", ""));

        return "GOG-" +
            String(number + 1).padStart(3, "0");

    }

    catch (error) {

        console.error(error);

        return "GOG-001";

    }

}


// ===============================
// DUPLICATE CHECK
// ===============================

export async function isDuplicateOrder(

    customer,
    institution,
    location,
    order,
    specialRequest

) {

    const q = query(

        collection(db, "orders"),

        where("customer", "==", customer)

    );

    const snapshot = await getDocs(q);

    const twoMinutesAgo =
        Date.now() - (2 * 60 * 1000);

    for (const doc of snapshot.docs) {

        const data = doc.data();

        if (

            data.customer === customer &&

            data.institution === institution &&

            data.location === location &&

            data.order === order &&

            data.specialRequest === specialRequest &&

            data.createdAt >= twoMinutesAgo

        ) {

            return true;

        }

    }

    return false;

}


// ===============================
// SAVE ORDER
// ===============================

export async function saveOrder(orderData) {

    try {

        await addDoc(

            collection(db, "orders"),

            orderData

        );

        return {

            success: true

        };

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            error: error

        };

    }

}


// ===============================
// LOAD ORDERS
// ===============================

export async function loadOrders() {

    const snapshot =
        await getDocs(collection(db, "orders"));

    let orders = [];

    snapshot.forEach(doc => {

        orders.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return orders;

}


// ===============================
// EXPORT DATABASE
// ===============================

export {

    db

};