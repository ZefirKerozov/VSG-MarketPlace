import { makeRequest } from "../utils/makeRequest.js";
import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";

// Open add item modal if add item button is clicked

const overlay = document.querySelector('.overlay');

const addItemBtn = document.getElementById('add-btn');

addItemBtn.addEventListener('click', onAddItemBtnClick);

// Open add item modal

function onAddItemBtnClick(e) {
    const modal = document.createElement('div');
    modal.id = 'add-modal';
    modal.innerHTML = `
    <div class="modal-content">
        <h1>Add new item</h1>
    </div>
    <form action="">
        <div class="first-row">
            <div class="first-column">
                <div class="input-container">
                    <label for="code">Code*</label>
                    <input type="number" id="code" name="code" required>
                </div>
                <div class="input-container">
                    <label for="name">Name*</label>    
                    <input type="text" id="name" name="title" required>
                </div>
                <div class="input-container">
                    <label for="descriptionText">Description</label>
                    <textarea name="description" id="descriptionText" name="description" cols="30" rows="4"></textarea>
                </div>
                <div class="input-container">
                    <label for="add-item-select">Category*</input>
                    <select id="add-item-select" name="category" required>
                        <option value="" disabled selected></option>
                        <option value="Laptops">Laptops</option>
                        <option value="Monitors">Monitors</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="qty-for-sale">Qty for sale</label>
                    <input type="number" id="qty-for-sale" name="forSale">
                </div>
                <div class="input-container">
                    <label for="sale-price">Sale price</label>
                    <input type="number" id="sale-price" name="price">
                </div>
                <div class="input-container">
                    <label for="quantity">Qty*</label>
                    <input type="number" id="quantity" name="quantity" required>
                </div>
            </div>
            <div class="second-column">
                <img src="/front-end/images/no_image-placeholder.png" id="add-item-image"
                    alt="Photo preview">
                <div class="upload-remove-btn">
                    <label for="add-item-upload-image">Upload</label>
                    <input type="file" class="hidden-upload-input" id="add-item-upload-image" name="image">
                    <button id="add-item-remove-image-btn">Remove</button>
                </div>
            </div>
        </div>
        <div class="second-row">
            <input type="submit" value="Add">
        </div>
    </form>
    <button class="close-btn">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.7305 2.02734L10.7578 9L17.7305 15.9727L15.9727 17.7305L9 10.7578L2.02734 17.7305L0.269531 15.9727L7.24219 9L0.269531 2.02734L2.02734 0.269531L9 7.24219L15.9727 0.269531L17.7305 2.02734Z"
                fill="black" />
        </svg>
    </button>
    `;

    overlay.appendChild(modal);
    overlay.style.display = 'flex';

    // Close add item modal when modal close button is clicked

    const modalCloseBtn = modal.querySelector('.close-btn');
    modalCloseBtn.addEventListener('click', onModalCloseBtnClick);

    function onModalCloseBtnClick() {
        modal.remove();
        overlay.style.display = 'none';
    }

    // Close add item modal when overlay is clicked

    overlay.addEventListener('click', onOverlayClick);

    function onOverlayClick(e) {
        if (e.target.matches('.overlay')) {
            modal.remove();
            overlay.style.display = 'none';
        }
    }

    // Upload and display image in add item modal

    const addModalImageInput = modal.querySelector('#add-item-upload-image');

    addModalImageInput.addEventListener('change', onAddModalImageUpload);

    function onAddModalImageUpload(e) {
        const imageSrc = URL.createObjectURL(this.files[0]);
        modal.querySelector('#add-item-image').src = imageSrc;
    }

    // Remove uplaoded image from add item modal

    const addItemRemoveImageBtn = modal.querySelector('#add-item-remove-image-btn');

    addItemRemoveImageBtn.addEventListener('click', onAddItemRemoveImage);

    function onAddItemRemoveImage(e) {
        addModalImageInput.value = "";
        modal.querySelector('#add-item-image').src = '/front-end/images/no_image-placeholder.png';
    }

    // Add item modal submit request

    const form = modal.querySelector('form');
    form.addEventListener('submit', onAddSubmit);

    function onAddSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const code = formData.get('code');
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('category');
        const forSale = formData.get('forSale');
        const price = formData.get('price');
        const quantity = formData.get('quantity');
        const image = URL.createObjectURL(formData.get('image'));

        const addItem = async () => {
            const addItem = await makeRequest({ path: `/products`, method: 'POST', data: { title, price, description, image, quantity } });
            console.log(addItem);
        }

        addItem();
    }
}

////////// Dynamically load items from API //////////

const loadProducts = async () => {
    try {
        const data = await makeRequest({ path: '/products' });
        const modifiedData = data.map(x => x = { ...x, quantity: Math.floor(Math.random() * 11), forSale: 1 });

        // Display 10 items per page

        let startSlice = 0;
        let endSlice = 10;
        let slicedItemsToLoad = modifiedData.slice(startSlice, endSlice);
        let searchItemsToLoad;
        const backwardBtn = document.querySelector('#backward-btn');
        const forwardBtn = document.querySelector('#forward-btn');
        let pageIndex = document.querySelector('#page-index');
        pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${modifiedData.length}`;

        // Pagiantion functionality

        // Pagiantion forward button

        forwardBtn.addEventListener('click', () => {
            console.log(searchItemsToLoad);
            if (searchItemsToLoad !== undefined && endSlice < searchItemsToLoad.length) {
                console.log('inside forward serach handler');

                startSlice += 10;
                if (endSlice + 10 > searchItemsToLoad.length) {
                    endSlice = searchItemsToLoad.length;
                } else {
                    endSlice += 10;
                }
                displayItemsInTable(searchItemsToLoad.slice(startSlice, endSlice));
                pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${searchItemsToLoad.length}`;
            } else {
                if (searchItemsToLoad === undefined && endSlice < modifiedData.length) {
                    startSlice += 10;
                    endSlice += 10;
                    slicedItemsToLoad = modifiedData.slice(startSlice, endSlice);
                    displayItemsInTable(slicedItemsToLoad);
                    pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${modifiedData.length}`;
                }
            }

        })

        // Pagiantion backward button

        backwardBtn.addEventListener('click', () => {
            console.log(searchItemsToLoad);
            if (searchItemsToLoad !== undefined && startSlice - 10 >= 0) {
                console.log('inside backward serach handler');

                startSlice -= 10;
                console.log(startSlice);
                if (endSlice - 10 < searchItemsToLoad.length) {
                    endSlice = 10;
                } else {
                    endSlice -= 10;
                }
                console.log(endSlice);
                displayItemsInTable(searchItemsToLoad.slice(startSlice, endSlice));
                pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${searchItemsToLoad.length}`;
            } else {
                if (searchItemsToLoad === undefined && startSlice > 0) {
                    startSlice -= 10;
                    endSlice -= 10;
                    slicedItemsToLoad = modifiedData.slice(startSlice, endSlice);
                    displayItemsInTable(slicedItemsToLoad);
                    pageIndex.textContent = `${startSlice + 1} - ${endSlice} of ${modifiedData.length}`;
                }
            }
        })

        // Search functionality

        const searchForm = document.querySelector('#search-form');

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const search = formData.get('search');

            startSlice = 0;
            endSlice = 10;

            searchItemsToLoad = modifiedData.filter(x => x.title.toLowerCase().includes(search.toLowerCase()));

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
        <td>${x.id}</td>
        <td>${x.title}</td>
        <td>${x.category}</td>
        <td>${x.forSale}</td>
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
        modifyBtn.addEventListener('click', onModifyBtnClick);

        function onModifyBtnClick() {
            const modal = document.createElement('div');
            modal.id = 'modify-modal';

            modal.innerHTML = `
            <div class="modal-content">
                <h1>Modify item</h1>
            </div>
            <form>
                <div class="first-row">
                <div class="first-column">
                <div class="input-container">
                    <label for="code">Code*</label>
                    <input type="number" id="code" name="code" value="${x.id}" required/>
                </div>
                <div class="input-container">
                    <label for="name">Name*</label>    
                    <input type="text" id="name" name="title" value="${x.title}" required/>
                </div>
                <div class="input-container">
                    <label for="descriptionText">Description</label>
                    <textarea name="description" id="descriptionText" name="description" cols="30" rows="4">${x.description}</textarea>
                </div>
                <div class="input-container">
                    <label for="add-item-select">Category*</input>
                    <select id="add-item-select" name="category" required>
                        <option value="" disabled></option>
                        <option value="${x.category}" selected>Laptops</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="qty-for-sale">Qty for sale</label>
                    <input type="number" id="qty-for-sale" name="forSale" value="${x.forSale}"/>
                </div>
                <div class="input-container">
                    <label for="sale-price">Sale price</label>
                    <input type="number" id="sale-price" name="price" value="${x.price}"/>
                </div>
                <div class="input-container">
                    <label for="quantity">Qty*</label>
                    <input type="number" id="quantity" name="quantity" value="${x.quantity}" required/>
                </div>
            </div>
                    <div class="second-column">
                        <img src="${x.image}" id="modify-item-image"
                            alt="Photo preview">
                        <div class="upload-remove-btn">
                            <label for="modify-item-upload-image">Upload</label>
                            <input type="file" class="hidden-upload-input" name="image" id="modify-item-upload-image">
                            <button id="modify-item-remove-image-btn">Remove</button>
                        </div>
                    </div>
                </div>
                <div class="second-row">
                    <input type="submit" value="Modify" id="modify-btn">
                </div>
            </form>
            <button class="close-btn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.7305 2.02734L10.7578 9L17.7305 15.9727L15.9727 17.7305L9 10.7578L2.02734 17.7305L0.269531 15.9727L7.24219 9L0.269531 2.02734L2.02734 0.269531L9 7.24219L15.9727 0.269531L17.7305 2.02734Z"
                        fill="black" />
                </svg>
            </button>
        </div>
        `;

            overlay.appendChild(modal);
            overlay.style.display = 'flex';

            // Close modal when close modal button is clicked

            const modalCloseBtn = modal.querySelector('.close-btn');
            modalCloseBtn.addEventListener('click', onModalCloseBtnClick);

            function onModalCloseBtnClick() {
                modal.remove();
                overlay.style.display = 'none';
            }

            // Close modal when overlay is clicked

            overlay.addEventListener('click', onOverlayClick);

            function onOverlayClick(e) {
                if (e.target.matches('.overlay')) {
                    modal.remove();
                    overlay.style.display = 'none';
                }
            }

            // Upload and display image in modify modal

            const modifyModalImageInput = modal.querySelector('#modify-item-upload-image');

            modifyModalImageInput.addEventListener('change', onModifyModalImageUpload);

            function onModifyModalImageUpload(e) {
                const imageSrc = URL.createObjectURL(this.files[0]);
                modal.querySelector('#modify-item-image').src = imageSrc;
            }

            // Remove uploaded image from modify modal

            const modifyItemRemoveImageBtn = modal.querySelector('#modify-item-remove-image-btn');

            modifyItemRemoveImageBtn.addEventListener('click', onModifyItemRemoveImage);

            function onModifyItemRemoveImage(e) {
                modifyModalImageInput.value = "";
                modal.querySelector('#modify-item-image').src = '/front-end/images/no_image-placeholder.png';
            }

            // Modify modal submit request

            const form = modal.querySelector('form');
            form.addEventListener('submit', onModifySubmit);

            function onModifySubmit(e) {
                e.preventDefault();

                const formData = new FormData(e.target);

                const code = formData.get('code');
                const title = formData.get('title');
                const description = formData.get('description');
                const category = formData.get('category');
                const forSale = formData.get('forSale');
                const price = formData.get('price');
                const quantity = formData.get('quantity');
                const image = URL.createObjectURL(formData.get('image'));

                const modifyItem = async () => {
                    const modifyItem = await makeRequest({ path: `/products/${x.id}`, method: 'PUT', data: { title, price, description, image, quantity } });
                    console.log(modifyItem);
                }

                modifyItem();
            }
        }

        // Show pop-up when item delete button is clicked

        const deleteBtn = tableRow.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', showPopup);

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

            const deleteBtnParent = e.target.parentElement;

            deleteBtnParent.appendChild(divPopUp);

            // Configure pop-up position depending on browser window

            const elementPopUp = document.getElementById('pop-up');

            let positionLeft;
            let positionTop;

            if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
                positionLeft = position.left - position.left - 224;
                elementPopUp.classList.add('top-right-pointer');
            } else if (position.x + elementPopUp.offsetWidth >= window.innerWidth && position.y + elementPopUp.offsetHeight + 20 >= window.innerHeight) {
                positionLeft = position.left - position.left - 100;
                elementPopUp.classList.add('bottom-right-pointer');
            } else {
                positionLeft = position.left - position.left - 100;
                elementPopUp.classList.add('top-middle-pointer');
            }

            if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && !(position.x + elementPopUp.offsetWidth >= window.innerWidth)) {
                positionTop = position.top - position.top - 100;
                elementPopUp.classList.add('bottom-middle-pointer');
            } else if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && position.x + elementPopUp.offsetWidth >= window.innerWidth) {
                positionTop = position.top - position.top - 100;
                elementPopUp.classList.add('bottom-right-pointer');
            }
            else {
                positionTop = position.top - position.top + 50;
            }

            Object.assign(elementPopUp.style, {
                left: `${positionLeft}px`,
                top: `${positionTop}px`,
                visibility: 'visible',
            });

            // Delete item request when confirm button is clicked

            const confirmBtn = document.getElementById('confirm-btn');
            console.log(confirmBtn);
            confirmBtn.addEventListener('click', onDeleteItem);

            function onDeleteItem(e) {
                e.preventDefault();
                const deleteItem = async () => {
                    const deletedItem = await makeRequest({ path: `/products/${x.id}`, method: 'DELETE' })
                    console.log(deletedItem);
                }

                deleteItem();
            }

            // Close pop-up if cancel button is clicked

            const cancelBtn = document.getElementById('cancel-btn');
            cancelBtn.addEventListener('click', closePopUp);

            window.addEventListener('click', trackWindowEvent);

            function closePopUp(e) {
                e.preventDefault();
                deleteBtnParent.removeChild(divPopUp);
                window.removeEventListener('click', trackWindowEvent);
            }

            // Close pop-up if clicked outside pop-up

            function trackWindowEvent(e) {
                if (!e.target.matches('.inside-pop-up') && !e.target.matches('.delete-btn')) {
                    deleteBtnParent.removeChild(divPopUp);
                    window.removeEventListener('click', trackWindowEvent);
                }
            }
        };

        tableBody.appendChild(tableRow);
    })
}