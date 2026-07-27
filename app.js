import {
    generateOrderNumber,
    isDuplicateOrder,
    saveOrder,
    loadOrders
} from "./firebase.js";


// ==========================================
// GOG EXPRESS V1.5
// PART 3A - CART ENGINE
// ==========================================

let cart = {

    umndundu: 0,
    amagwinya: 0,
    small: 0,
    medium: 0,
    large: 0,
    cold: 0

};

const prices = {

    umndundu: 6,
    amagwinya: 8,
    small: 15,
    medium: 20,
    large: 25,
    cold: 12

};

function updateTotal(){

    let total =
        (cart.umndundu * prices.umndundu) +
        (cart.amagwinya * prices.amagwinya) +
        (cart.small * prices.small) +
        (cart.medium * prices.medium) +
        (cart.large * prices.large) +
        (cart.cold * prices.cold);

    document.getElementById("cartTotal").innerText =
        total.toFixed(2);

}

// ---------------------------
// UMNDUNDU
// ---------------------------

function increaseUmndundu(){

    cart.umndundu++;

    document.getElementById("umndunduQty").innerText =
        cart.umndundu;

    updateTotal();

}

function decreaseUmndundu(){

    if(cart.umndundu>0){

        cart.umndundu--;

        document.getElementById("umndunduQty").innerText =
            cart.umndundu;

        updateTotal();

    }

}

// ---------------------------
// AMAGWINYA
// ---------------------------

function increaseAmagwinya(){

    cart.amagwinya++;

    document.getElementById("amagwinyaQty").innerText =
        cart.amagwinya;

    updateTotal();

}

function decreaseAmagwinya(){

    if(cart.amagwinya>0){

        cart.amagwinya--;

        document.getElementById("amagwinyaQty").innerText =
            cart.amagwinya;

        updateTotal();

    }

}

// ---------------------------
// SMALL CHIPS
// ---------------------------

function increaseSmall(){

    cart.small++;

    document.getElementById("smallQty").innerText =
        cart.small;

    updateTotal();

}

function decreaseSmall(){

    if(cart.small>0){

        cart.small--;

        document.getElementById("smallQty").innerText =
            cart.small;

        updateTotal();

    }

}

// ---------------------------
// MEDIUM CHIPS
// ---------------------------

function increaseMedium(){

    cart.medium++;

    document.getElementById("mediumQty").innerText =
        cart.medium;

    updateTotal();

}

function decreaseMedium(){

    if(cart.medium>0){

        cart.medium--;

        document.getElementById("mediumQty").innerText =
            cart.medium;

        updateTotal();

    }

}

// ---------------------------
// LARGE CHIPS
// ---------------------------

function increaseLarge(){

    cart.large++;

    document.getElementById("largeQty").innerText =
        cart.large;

    updateTotal();

}

function decreaseLarge(){

    if(cart.large>0){

        cart.large--;

        document.getElementById("largeQty").innerText =
            cart.large;

        updateTotal();

    }

}

// ---------------------------
// COLD DRINK
// ---------------------------

function increaseCold(){

    cart.cold++;

    document.getElementById("coldQty").innerText =
        cart.cold;

    updateTotal();

}

function decreaseCold(){

    if(cart.cold>0){

        cart.cold--;

        document.getElementById("coldQty").innerText =
            cart.cold;

        updateTotal();

    }

}

// ----------------------------
// CATEGORY FILTER
// ----------------------------

function filterCategory(category){

    const cards =
        document.querySelectorAll(".item-card");

    cards.forEach(card=>{

        if(

            category==="all" ||

            card.dataset.category===category

        ){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}

// ----------------------------
// SEARCH MENU
// ----------------------------

function searchMenu(){

    const keyword =
        document
        .getElementById("searchMenu")
        .value
        .toLowerCase();

    const cards =
        document.querySelectorAll(".item-card");

    cards.forEach(card=>{

        const text =
            card.innerText.toLowerCase();

        if(

            text.includes(keyword)

        ){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}


// ----------------------------
// CUSTOMER VALIDATION
// ----------------------------

function validateCustomer(){

    const initials =
        document.getElementById("initials").value.trim();

    const surname =
        document.getElementById("surname").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const institution =
        document.getElementById("institution").value.trim();

    if(

        initials === "" ||

        surname === "" ||

        location === "" ||

        institution === ""

    ){

        alert(
            "Please complete all customer details."
        );

        return false;

    }

    return true;

}


// ----------------------------
// SAVE CUSTOMER
// ----------------------------

function saveUser(){

    if(

        !document.getElementById("rememberMe").checked

    ){

        alert(
            "Tick Remember Me before saving."
        );

        return;

    }

    localStorage.setItem(
        "initials",
        document.getElementById("initials").value
    );

    localStorage.setItem(
        "surname",
        document.getElementById("surname").value
    );

    localStorage.setItem(
        "location",
        document.getElementById("location").value
    );

    localStorage.setItem(
        "institution",
        document.getElementById("institution").value
    );

    alert(
        "Customer details saved."
    );

}


// ----------------------------
// LOAD CUSTOMER
// ----------------------------

function loadCustomer(){

    document.getElementById("initials").value =
        localStorage.getItem("initials") || "";

    document.getElementById("surname").value =
        localStorage.getItem("surname") || "";

    document.getElementById("location").value =
        localStorage.getItem("location") || "";

    document.getElementById("institution").value =
        localStorage.getItem("institution") || "";

}


// ----------------------------
// CLEAR CUSTOMER
// ----------------------------

function clearCustomer(){

    localStorage.removeItem("initials");

    localStorage.removeItem("surname");

    localStorage.removeItem("location");

    localStorage.removeItem("institution");

}


// ----------------------------
// RESET CART
// ----------------------------

function resetCart(){

    cart.umndundu = 0;
    cart.amagwinya = 0;
    cart.small = 0;
    cart.medium = 0;
    cart.large = 0;
    cart.cold = 0;

    document.getElementById("umndunduQty").innerText = 0;
    document.getElementById("amagwinyaQty").innerText = 0;
    document.getElementById("smallQty").innerText = 0;
    document.getElementById("mediumQty").innerText = 0;
    document.getElementById("largeQty").innerText = 0;
    document.getElementById("coldQty").innerText = 0;

    document.getElementById("specialRequest").value = "";

    updateTotal();

}

// ----------------------------
// BUILD ORDER ITEMS
// ----------------------------

function buildOrderItems(){

    let items = "";

    if(cart.umndundu>0)
        items += `${cart.umndundu} Umndundu\n`;

    if(cart.amagwinya>0)
        items += `${cart.amagwinya} Plain Amagwinya\n`;

    if(cart.small>0)
        items += `${cart.small} Small Fries\n`;

    if(cart.medium>0)
        items += `${cart.medium} Medium Fries\n`;

    if(cart.large>0)
        items += `${cart.large} Large Fries\n`;

    if(cart.cold>0)
        items += `${cart.cold} Cold Drink\n`;

    return items;

}

// ==========================================
// GOG EXPRESS V1.5
// APP.JS - PART 3B
// Customer Module
// ==========================================


// ----------------------------
// WINDOW LOAD
// ----------------------------

window.onload = function(){

    loadCustomer();

    updateTotal();

}


// ----------------------------
// EXPORT FUNCTIONS
// ----------------------------

window.saveUser = saveUser;

window.validateCustomer = validateCustomer;

window.resetCart = resetCart;

window.generateOrderNumber = generateOrderNumber;

window.buildOrderItems = buildOrderItems;

// ----------------------------
// WINDOW LOAD
// ----------------------------

window.onload = function(){

    loadCustomer();

    updateTotal();

}


// ----------------------------
// EXPORT FUNCTIONS
// ----------------------------

window.saveUser = saveUser;

window.validateCustomer = validateCustomer;

window.resetCart = resetCart;

window.generateOrderNumber = generateOrderNumber;

window.buildOrderItems = buildOrderItems;

window.placeOrder = placeOrder;


// ==========================================
// GOG EXPRESS V1.5
// APP.JS - PART 3C
// PLACE ORDER
// ==========================================

async function placeOrder() {

    if (!validateCustomer()) {
        return;
    }

    const orderItems = buildOrderItems();

    const specialRequest =
        document.getElementById("specialRequest").value.trim();

    const cartTotal =
        parseFloat(document.getElementById("cartTotal").innerText);

    if (orderItems === "" && specialRequest === "") {
        alert("Please add at least one item or enter a special request.");
        return;
    }

    const customer =
        document.getElementById("initials").value.trim() +
        " " +
        document.getElementById("surname").value.trim();

    const institution =
        document.getElementById("institution").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const duplicate = await isDuplicateOrder(
        customer,
        institution,
        location,
        orderItems,
        specialRequest
    );

    if (duplicate) {
        alert("⚠ This order already exists.");
        return;
    }

    const btn = document.getElementById("placeOrderBtn");

    btn.disabled = true;
    btn.innerText = "Creating Order...";

    const orderNumber = await generateOrderNumber();

    const deliveryPin =
        Math.floor(1000 + Math.random() * 9000);

    const orderData = {

        orderNumber,

        orderCode: deliveryPin,

        customer,

        institution,

        location,

        order: orderItems,

        specialRequest,

        total: cartTotal.toFixed(2),

        runner: "Unassigned",

        status: "Pending Payment",

        createdAt: Date.now()

    };

    const result = await saveOrder(orderData);

    btn.disabled = false;
    btn.innerText = "Place Order";

    if (!result.success) {

        alert("Failed to save order.");

        return;

    }

    document.getElementById("orderSummary").innerHTML = `

<h2>🚚 GOG EXPRESS ORDER</h2>

<p><b>Order Number:</b> ${orderNumber}</p>

<p><b>Delivery PIN:</b> ${deliveryPin}</p>

<p><b>Customer:</b> ${customer}</p>

<p><b>Institution:</b> ${institution}</p>

<p><b>Location:</b> ${location}</p>

<p><b>Order:</b></p>

<pre>${orderItems}</pre>

<p><b>Special Request:</b><br>${specialRequest || "None"}</p>

<h3>Total: R${cartTotal.toFixed(2)}</h3>

<p>Status: 🟡 Pending Payment</p>

`;

    resetCart();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

    alert(
`Order Created Successfully!

Order Number: ${orderNumber}

Delivery PIN: ${deliveryPin}

Keep your PIN safe.`
    );

}

// ==========================================
// GOG EXPRESS V1.5
// APP.JS - PART 3D
// VIEW ORDERS
// ==========================================

async function viewOrders() {

    const container =
        document.getElementById("ordersList");

    container.innerHTML =
        "<p>Loading orders...</p>";

    try {

        const orders =
            await loadOrders();

        if (orders.length === 0) {

            container.innerHTML =
                "<p>No orders found.</p>";

            return;

        }

        orders.sort(
            (a, b) => b.createdAt - a.createdAt
        );

        let html = "";

        orders.forEach(order => {

            html += `

<div class="order-card">

<h3>${order.orderNumber}</h3>

<p><b>Customer:</b> ${order.customer}</p>

<p><b>Institution:</b> ${order.institution}</p>

<p><b>Location:</b> ${order.location}</p>

<p><b>PIN:</b> ${order.orderCode}</p>

<p><b>Status:</b> ${order.status}</p>

<p><b>Runner:</b> ${order.runner}</p>

<p><b>Total:</b> R${order.total}</p>

<pre>${order.order}</pre>

</div>

<hr>

`;

        });

        container.innerHTML = html;

        window.scrollTo({

            top: document.body.scrollHeight,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

        container.innerHTML =

            "<p>Unable to load orders.</p>";

    }

}

window.filterCategory = filterCategory
// =========================
// EXPORT FUNCTIONS
// =========================

// Cart
window.increaseUmndundu = increaseUmndundu;
window.decreaseUmndundu = decreaseUmndundu;

window.increaseAmagwinya = increaseAmagwinya;
window.decreaseAmagwinya = decreaseAmagwinya;

window.increaseSmall = increaseSmall;
window.decreaseSmall = decreaseSmall;

window.increaseMedium = increaseMedium;
window.decreaseMedium = decreaseMedium;

window.increaseLarge = increaseLarge;
window.decreaseLarge = decreaseLarge;

window.increaseCold = increaseCold;
window.decreaseCold = decreaseCold;

// Menu
window.filterCategory = filterCategory;
window.searchMenu = searchMenu;

// Customer
window.saveUser = saveUser;
window.validateCustomer = validateCustomer;
window.resetCart = resetCart;
window.buildOrderItems = buildOrderItems;

// Orders
window.placeOrder = placeOrder;
window.viewOrders = viewOrders;