import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";
import "../components/my-orders-item.js";
import { makeRequest } from "../utils/makeRequest.js";

const DUMMY_DATA = [
    {
        name: 'MacBook Pro M2 16 inch',
        qty: 1,
        price: 5000,
        orderDate: '10-10-2010 10:10'
    },
    {
        name: 'MacBook Air M1 13 inch',
        qty: 1,
        price: 3000,
        orderDate: '20-20-2020 20:20'
    },
    {
        name: 'iPhone 14 Pro Max',
        qty: 1,
        price: 2000,
        orderDate: '30-30-2030 30:30'
    }
]

// Render table rows from DUMMY_DATA

const table = document.querySelector('#my-orders-responsive-table');

// DUMMY_DATA.forEach(x => {
//     const myOrderItem = document.createElement('my-orders-item');

//     myOrderItem.setAttribute('product-name', x.name);
//     myOrderItem.setAttribute('product-qty', x.qty);
//     myOrderItem.setAttribute('product-price', x.price);
//     myOrderItem.setAttribute('order-date', x.orderDate);

//     table?.appendChild(myOrderItem);
// });

const loadItems = async () => {
    try {
        const data = await makeRequest({ path: `/Orders/MyOrders/1` });
        const dataToJSON = await data.json();
        dataToJSON.forEach(x => {
            const tableRow = document.createElement('div');
            tableRow.classList.add('table-row');
            tableRow.innerHTML = `
            <div class="col col-1" data-before="Name:">${x.name}</div>
            <div class="table-first-group">
                <div class="col col-2" data-before="Qty:">${x.quantity}</div>
                <div class="col col-3" data-before="Price:">${x.price} BGN</div>
            </div>
            <div class="table-second-group">
                <div class="col col-4" data-before="Order Date:">${x.orderDate}</div>
                <div class="col col-5" data-before="Status:">
                    <div class="status">
                        <span class="status-message">${x.status}</span>
                        <button class="cancel-btn">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.8203 1.35156L7.17188 6L11.8203 10.6484L10.6484 11.8203L6 7.17188L1.35156 11.8203L0.179688 10.6484L4.82812 6L0.179688 1.35156L1.35156 0.179688L6 4.82812L10.6484 0.179688L11.8203 1.35156Z"
                                    fill="#ED1C25" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            `;

            const cancelOrderBtn = tableRow.querySelector('.cancel-btn');
            cancelOrderBtn.addEventListener('click', showPopup);

            // Open and close pop-up functionality

            function showPopup(e) {
                // Close previous opened pop-up if there is such

                const prevPopUp = document.getElementById('pop-up');
                if (prevPopUp !== null) {
                    prevPopUp.remove();
                }

                // Create pop-up and append it to parent element

                const divPopUp = document.createElement('div');
                divPopUp.id = 'pop-up';
                divPopUp.classList.add('inside-pop-up');
                divPopUp.innerHTML = `<p class="inside-pop-up">Are you sure you want to remove this item?</p>
        <div class="pop-up-buttons inside-pop-up">
            <a href="" id="confirm-btn">Yes</a>
            <a href="" id="cancel-btn">No</a>
        </div>`;

                const position = e.target.getBoundingClientRect();

                const cancelButtonParent = e.target.parentElement;

                cancelButtonParent.appendChild(divPopUp);

                // Configure pop-up position depending on browser window

                const elementPopUp = document.getElementById('pop-up');

                let positionLeft;
                let positionTop;

                if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
                    if (window.innerWidth <= 768) {
                        positionLeft = position.left - position.left - 76;
                    } else {
                        positionLeft = position.left - position.left - 160;
                    }
                    elementPopUp.classList.add('top-right-pointer');
                } else if (position.x + elementPopUp.offsetWidth >= window.innerWidth && position.y + elementPopUp.offsetHeight + 20 >= window.innerHeight) {
                    positionLeft = position.left - position.left - 100;
                    elementPopUp.classList.add('bottom-right-pointer');
                } else {
                    positionLeft = position.left - position.left - 140;
                    elementPopUp.classList.add('top-middle-pointer');
                }

                if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && !(position.x + elementPopUp.offsetWidth >= window.innerWidth)) {
                    positionTop = position.top - position.top - 115;
                    elementPopUp.classList.add('bottom-middle-pointer');
                } else if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && position.x + elementPopUp.offsetWidth >= window.innerWidth) {
                    positionTop = position.top - position.top - 120;
                    elementPopUp.classList.add('bottom-right-pointer');
                }
                else {
                    positionTop = position.top - position.top + 30;
                }

                Object.assign(elementPopUp.style, {
                    left: `${positionLeft}px`,
                    top: `${positionTop}px`,
                    visibility: 'visible',
                });

                // Close pop-up if cancel button is clicked

                const cancelBtn = document.getElementById('cancel-btn');
                cancelBtn.addEventListener('click', closePopUp);

                window.addEventListener('click', trackWindowEvent);

                function closePopUp(e) {
                    e.preventDefault();
                    itemCard.removeChild(divPopUp);
                    window.removeEventListener('click', trackWindowEvent);
                }

                // Close pop-up if clicked outside pop-up

                function trackWindowEvent(e) {
                    if (!e.target.matches('.inside-pop-up') && !e.target.matches('.cancel-btn')) {
                        cancelButtonParent.removeChild(divPopUp);
                        window.removeEventListener('click', trackWindowEvent);
                    }
                }

                // Cancel order if cancel order button is clicked

                const confirmBtn = document.getElementById('confirm-btn');
                confirmBtn.addEventListener('click', onConfirmBtnClick);

                function onConfirmBtnClick(e) {
                    e.preventDefault();
                    const statusMessage = tableRow.querySelector('.status-message');
                    statusMessage.textContent = 'Canceled';
                    console.log(cancelBtn);
                    cancelOrderBtn.style.display = 'none';
                }
            };

            table?.appendChild(tableRow);
        });
    } catch (err) {
        console.log(err);
    }
}

loadItems();



///// NOT USED IN APP /////

// Load My Orders data inside table

// const myOrdersTable = document.querySelector('.responsive-table');

// DUMMY_DATA.forEach(x => {
//     const myOrderItem = document.createElement('my-orders-item');

//     myOrderItem.setAttribute('product-name', x.name);
//     myOrderItem.setAttribute('product-qty', x.qty);
//     myOrderItem.setAttribute('product-price', x.price);
//     myOrderItem.setAttribute('order-date', x.orderDate);

//     myOrdersTable.appendChild(myOrderItem);
// });