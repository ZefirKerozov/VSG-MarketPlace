import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";
import "../utils/darkMode.js";
import "../components/pending-orders-item.js";
import { completeOrder, getAllPendingOrders } from "../utils/requests.js";
import createPendingOrder from "../components/pending-order-component.js";

const table = document.querySelector('#rows');

// Load Pending Items data inside table

try {
    const data = await getAllPendingOrders();
    data.forEach(async x => {
        const tableRow = await createPendingOrder(x.id, x.code, x.quantity, x.price, x.email, x.orderDate);

        table?.appendChild(tableRow);
    });
} catch (err) {
    console.log(err);
}

///// NOT USED IN APP /////

// // Load Pending Items data inside table

// const pendingOrdersTable = document.querySelector('.responsive-table');

// DUMMY_DATA.forEach(x => {
//     const pendingItem = document.createElement('pending-orders-item');

//     pendingItem.setAttribute('product-code', x.code);
//     pendingItem.setAttribute('product-qty', x.qty);
//     pendingItem.setAttribute('product-price', x.price);
//     pendingItem.setAttribute('ordered-by', x.orderedBy);
//     pendingItem.setAttribute('order-date', x.orderDate);

//     pendingOrdersTable.appendChild(pendingItem);
// });