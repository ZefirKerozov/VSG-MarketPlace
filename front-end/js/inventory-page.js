import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";
import "../utils/darkMode.js";
import { addItem, deleteItem, getAllCategories, getAllProducts, modifyItem } from "../utils/requests.js";
import createAddItemModal from "../components/add-item-modal.js";
import createModifyItemModal from "../components/modify-item-modal.js";
import showPopup from "../utils/pop-up.js";

// Open add item modal if add item button is clicked

const addItemBtn = document.querySelector('#add-btn');

addItemBtn?.addEventListener('click', createAddItemModal);

////////// Dynamically load items from API //////////

const loadProducts = async () => {
    try {
        const data = await getAllProducts();

        // Display 10 items per page

        let startSlice = 0;
        let endSlice = data.length < 10 ? data.length : 10;
        let slicedItemsToLoad = data.slice(startSlice, endSlice);
        let searchItemsToLoad;
        const backwardBtn = document.querySelector('#backward-btn');
        const forwardBtn = document.querySelector('#forward-btn');
        let pageIndex = document.querySelector('#page-index');
        pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${data.length}`;

        // Pagiantion functionality

        // Pagiantion forward button

        forwardBtn.addEventListener('click', () => {
            if (searchItemsToLoad !== undefined && endSlice < searchItemsToLoad.length) {
                console.log('inside forward search handler');

                startSlice += 10;
                if (endSlice + 10 > searchItemsToLoad.length) {
                    endSlice = searchItemsToLoad.length;
                } else {
                    endSlice += 10;
                }
                displayItemsInTable(searchItemsToLoad.slice(startSlice, endSlice));
                pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${searchItemsToLoad.length}`;
            } else {
                if (searchItemsToLoad === undefined && endSlice < data.length) {
                    if (data.length - endSlice <= 10) {
                        startSlice += 10;
                        endSlice += data.length - endSlice;
                    } else {
                        startSlice += 10;
                        endSlice += 10;
                    }
                    slicedItemsToLoad = data.slice(startSlice, endSlice);
                    displayItemsInTable(slicedItemsToLoad);
                    pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${data.length}`;
                }
            }

        })

        // Pagiantion backward button

        backwardBtn.addEventListener('click', () => {
            if (searchItemsToLoad !== undefined && startSlice - 10 >= 0) {
                startSlice -= 10;

                if (endSlice - 10 < searchItemsToLoad.length) {
                    endSlice = 10;
                } else {
                    endSlice -= 10;
                }

                displayItemsInTable(searchItemsToLoad.slice(startSlice, endSlice));
                pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${searchItemsToLoad.length}`;
            } else {
                if (searchItemsToLoad === undefined && startSlice > 0) {
                    if (endSlice - 10 < 10) {
                        startSlice -= 10;
                        endSlice = 10;
                    } else {
                        startSlice -= 10;
                        endSlice -= 10;
                    }
                    slicedItemsToLoad = data.slice(startSlice, endSlice);
                    displayItemsInTable(slicedItemsToLoad);
                    pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${data.length}`;
                }
            }
        })

        // Search functionality

        document.querySelector('#search-btn svg path').style.fill = 'var(--color-text)';

        const searchForm = document.querySelector('#search-form');

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const search = formData.get('search');

            searchItemsToLoad = dataToJSON.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));

            startSlice = 0;

            if (searchItemsToLoad.length > 10) {
                endSlice = 10;
            } else {
                endSlice = searchItemsToLoad.length;
            }

            displayItemsInTable(searchItemsToLoad.slice(startSlice, endSlice));
            pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${searchItemsToLoad.length}`;
        })

        displayItemsInTable(slicedItemsToLoad);

    } catch (err) {
        console.log(err);
    }
}

loadProducts();

// Display fetched items in table function

function displayItemsInTable(items) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    items.forEach(x => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <td>${x.code}</td>
        <td>${x.name}</td>
        <td>${x.categoryName}</td>
        <td>${x.quantityForSale}</td>
        <td>${x.quantity}</td>
        <td>
            <div class="table-actions">
                <button class="modify-btn">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.8125 2.6875L10.5938 3.90625L8.09375 1.40625L9.3125 0.1875C9.4375 0.0625 9.59375 0 9.78125 0C9.96875 0 10.125 0.0625 10.25 0.1875L11.8125 1.75C11.9375 1.875 12 2.03125 12 2.21875C12 2.40625 11.9375 2.5625 11.8125 2.6875ZM0 9.5L7.375 2.125L9.875 4.625L2.5 12H0V9.5Z"
                            fill="#ED6C02" />
                    </svg>
                </button>
                <button class="delete-btn">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.34375 0.65625H9.65625V2H0.34375V0.65625H2.65625L3.34375 0H6.65625L7.34375 0.65625ZM2.34375 4V10.6562H7.65625V4H2.34375ZM1 10.6562V2.65625H9V10.6562C9 11.0104 8.86458 11.3229 8.59375 11.5938C8.32292 11.8646 8.01042 12 7.65625 12H2.34375C1.98958 12 1.67708 11.8646 1.40625 11.5938C1.13542 11.3229 1 11.0104 1 10.6562Z"
                            fill="#ED1C25" />
                    </svg>
                </button>
            </div>
        </td>
        `;

        // Open modify modal when modify button is clicked

        const modifyBtn = tableRow.querySelector('.modify-btn');
        console.log(modifyBtn);
        modifyBtn.addEventListener('click', () => {
            createModifyItemModal(x.id, x.code, x.name, x.description, x.quantityForSale, x.price, x.quantity, x.img, x.categoryName);
        });

        // Show pop-up when item delete button is clicked

        const deleteBtn = tableRow.querySelector('.delete-btn');

        const popUpText = `
        <p class="inside-pop-up">Are you sure you want to remove this item?</p>
        <div class="pop-up-buttons inside-pop-up">
            <a href="" id="confirm-btn">Yes</a>
            <a href="" id="cancel-btn">No</a>
        </div>
        `;

        async function deleteItem(e) {
            e.preventDefault();
            await deleteItem(x.id);
            window.location.reload();
        }

        deleteBtn.addEventListener('click', (e) => {
            showPopup(e, popUpText, deleteItem);
        });



//         // Open and close pop-up functionality

//         function showPopup(e) {
//             // Close previous opened pop-up if there is such

//             const prevPopUp = document.getElementById('pop-up');
//             if (prevPopUp !== null) {
//                 prevPopUp.remove();
//             }

//             // Create pop-up and append it to parent element

//             const divPopUp = document.createElement('div');
//             divPopUp.id = 'pop-up';
//             divPopUp.classList.add('inside-pop-up');
//             divPopUp.innerHTML = `<p class="inside-pop-up">Are you sure you want to remove this item?</p>
// <div class="pop-up-buttons inside-pop-up">
// <a href="" id="confirm-btn">Yes</a>
// <a href="" id="cancel-btn">No</a>
// </div>`;

//             const position = e.target.getBoundingClientRect();

//             const deleteBtnParent = e.target.parentElement;

//             deleteBtnParent.appendChild(divPopUp);

//             // Configure pop-up position depending on browser window

//             const elementPopUp = document.querySelector('#pop-up');

//             let positionLeft;
//             let positionTop;

//             if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
//                 positionLeft = position.left - position.left - 224;
//                 elementPopUp.classList.add('top-right-pointer');
//             } else if (position.x + elementPopUp.offsetWidth >= window.innerWidth && position.y + elementPopUp.offsetHeight + 20 >= window.innerHeight) {
//                 positionLeft = position.left - position.left - 100;
//                 elementPopUp.classList.add('bottom-right-pointer');
//             } else {
//                 positionLeft = position.left - position.left - 100;
//                 elementPopUp.classList.add('top-middle-pointer');
//             }

//             if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && !(position.x + elementPopUp.offsetWidth >= window.innerWidth)) {
//                 positionTop = position.top - position.top - 100;
//                 elementPopUp.classList.add('bottom-middle-pointer');
//             } else if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && position.x + elementPopUp.offsetWidth >= window.innerWidth) {
//                 positionTop = position.top - position.top - 100;
//                 elementPopUp.classList.add('bottom-right-pointer');
//             }
//             else {
//                 positionTop = position.top - position.top + 50;
//             }

//             Object.assign(elementPopUp.style, {
//                 left: `${positionLeft}px`,
//                 top: `${positionTop}px`,
//                 visibility: 'visible',
//             });

//             // Delete item request when confirm button is clicked

//             const confirmBtn = document.querySelector('#confirm-btn');
//             confirmBtn.addEventListener('click', onDeleteItem);

//             async function onDeleteItem(e) {
//                 e.preventDefault();
//                 await deleteItem(x.id);
//                 window.location.reload();
//             }

//             // Close pop-up if cancel button is clicked

//             const cancelBtn = document.querySelector('#cancel-btn');
//             cancelBtn.addEventListener('click', closePopUp);

//             window.addEventListener('click', trackWindowEvent);

//             function closePopUp(e) {
//                 e.preventDefault();
//                 deleteBtnParent.removeChild(divPopUp);
//                 window.removeEventListener('click', trackWindowEvent);
//             }

//             // Close pop-up if clicked outside pop-up

//             function trackWindowEvent(e) {
//                 if (!e.target.matches('.inside-pop-up') && !e.target.matches('.delete-btn')) {
//                     deleteBtnParent.removeChild(divPopUp);
//                     window.removeEventListener('click', trackWindowEvent);
//                 }
//             }
//         };

        tableBody.appendChild(tableRow);
    })
}