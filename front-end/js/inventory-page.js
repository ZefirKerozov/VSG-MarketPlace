import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";
import "../utils/darkMode.js";
import { addItem, deleteItem, getAllCategories, getAllProducts, modifyItem } from "../utils/requests.js";
import createAddItemModal from "../components/add-item-modal.js";
import createModifyItemModal from "../components/modify-item-modal.js";
import showPopup from "../utils/pop-up.js";
import createInventoryTableRow from "../components/inventory-table-row-component.js";

// Open add item modal if add item button is clicked

const addItemBtn = document.querySelector('#add-btn');

addItemBtn?.addEventListener('click', createAddItemModal);

////////// Dynamically load items from API //////////

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

// Display fetched items in table function

function displayItemsInTable(items) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    items.forEach(async x => {
        const tableRow = await createInventoryTableRow(x.id, x.code, x.name, x.description, x.categoryName, x.quantityForSale, x.quantity, x.price, x.img)
        tableBody.appendChild(tableRow);
    });
}