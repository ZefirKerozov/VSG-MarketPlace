import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";
import "../utils/darkMode.js";
import "../components/pending-orders-item.js";
import { completeOrder, getAllPendingOrders } from "../utils/requests.js";

const DUMMY_DATA = [
    {
        code: 1,
        qty: 10,
        price: 150,
        email: 'yasen@vsgbg.com',
        orderDate: '10-10-2010 10:10'
    },
    {
        code: 2,
        qty: 20,
        price: 250,
        email: 'simeon@vsgbg.com',
        orderDate: '20-20-2020 20:20'
    },
    {
        code: 3,
        qty: 30,
        price: 350,
        email: 'alex@vsgbg.com',
        orderDate: '30-30-2030 30:30'
    }
]

// Render table rows from DUMMY_DATA

const table = document.querySelector('#rows');

// Load Pending Items data inside table

// DUMMY_DATA.forEach(x => {
//     const pendingItem = document.createElement('pending-orders-item');

//     pendingItem.setAttribute('product-code', x.code);
//     pendingItem.setAttribute('product-qty', x.qty);
//     pendingItem.setAttribute('product-price', x.price);
//     pendingItem.setAttribute('ordered-by', x.email);
//     pendingItem.setAttribute('order-date', x.orderDate);

//     table.appendChild(pendingItem);
// });

const loadItems = async () => {
    try {
        const data = await getAllPendingOrders();
        data.forEach(x => {
            const tableRow = document.createElement('div');
            tableRow.classList.add('table-row');
            tableRow.innerHTML = `
            <div class="table-first-group">
                <div class="col col-1" data-before="Code">${x.code}</div>
                <div class="col col-2" data-before="Qty">${x.quantity}</div>
                <div class="col col-3" data-before="Price">${x.price} BGN</div>
            </div>
            <div class="table-second-group">
                <div class="col col-4" data-before="Ordered By:">${x.email}</div>
                <div class="col col-5" data-before="Order Date:">${x.orderDate}</div>
                <div class="col col-6">
                    <span>
                        <button class="complete-btn">Complete</button>
                    </span>
                </div>
            </div>
            `;

            const completeBtn = tableRow.querySelector('.complete-btn');
            completeBtn.addEventListener('click', onCompleteOrder);

            async function onCompleteOrder(){
                await completeOrder(x.id);
                window.location.reload();
            }

            table?.appendChild(tableRow);
        });
    } catch (err) {
        console.log(err);
    }
}

loadItems();



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