import { makeRequest } from "../utils/makeRequest.js";

const navLinks = Array.from(document.querySelectorAll('li a'));
const currentURL = new URL(document.URL);
navLinks.filter(x => x.pathname === currentURL.pathname).map(x => x.classList.add('active'));

// Show and hide hamburger mobile menu

const hamburger = document.querySelector(".hamburger");
const asideNav = document.getElementsByTagName('aside')[0];
const hamburgerBtn = document.getElementsByTagName('svg')[0];

hamburgerBtn.addEventListener('click', openHamburgerMenu);

window.addEventListener('resize', () => {
    const userInfo = document.getElementById('user-info');
    if (window.innerWidth <= 768) {
        asideNav.prepend(userInfo);
    } else {
        document.getElementsByTagName('header')[0].appendChild(userInfo);
    }
});

window.addEventListener('load', () => {
    const userInfo = document.getElementById('user-info');
    if (window.innerWidth <= 768) {
        asideNav.prepend(userInfo);
    } else {
        document.getElementsByTagName('header')[0].appendChild(userInfo);
    }
});

function openHamburgerMenu(e) {
    if (asideNav.classList.contains('active')) {
        asideNav.classList.remove('active');
    } else {
        asideNav.classList.add('active');
    }
}

////////// ADD ITEM AND MODIFY ITEM MODALS //////////

// Open add item modal if add item button is clicked

const overlay = document.querySelector('.overlay');

const addItemBtn = document.getElementById('add-btn');

addItemBtn.addEventListener('click', onAddItemBtnClick);

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
                <div class="input-div">
                    <input type="number" name="code" required>
                    <span class="floating-label">Code *</span>
                </div>
                <input type="text" placeholder="Name *" name="title" required>
                <textarea name="description" id="descriptionText" name="description" cols="30" rows="6"
                    placeholder="Description"></textarea>
                <select id="add-item-select" placeholder="Category *" name="category" required>
                    <option value="" disabled selected>Category *</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Monitors">Monitors</option>
                </select>
                <input type="number" placeholder="Qty for sale" name="forSale">
                <input type="number" placeholder="Sale price" name="price">
                <input type="number" placeholder="Qty" name="quantity" required>
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

    const modalCloseBtn = modal.querySelector('.close-btn');
    modalCloseBtn.addEventListener('click', onModalCloseBtnClick);

    function onModalCloseBtnClick() {
        modal.remove();
        overlay.style.display = 'none';
    }

    overlay.addEventListener('click', onOverlayClick);

    function onOverlayClick(e) {
        if (e.target.matches('.overlay')) {
            modal.remove();
            overlay.style.display = 'none';
        }
    }

    const addModalImageInput = modal.querySelector('#add-item-upload-image');

    addModalImageInput.addEventListener('change', onAddModalImageUpload);

    function onAddModalImageUpload(e) {
        const imageSrc = URL.createObjectURL(this.files[0]);
        modal.querySelector('#add-item-image').src = imageSrc;
    }

    const addItemRemoveImageBtn = modal.querySelector('#add-item-remove-image-btn');

    addItemRemoveImageBtn.addEventListener('click', onAddItemRemoveImage);

    function onAddItemRemoveImage(e) {
        addModalImageInput.value = "";
        modal.querySelector('#add-item-image').src = '/front-end/images/no_image-placeholder.png';
    }

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

// Add item modal category select placeholder color change

// const addItemCategorySelect = document.getElementById('add-item-select');

// addItemCategorySelect.addEventListener('change', onSelectChange);

// function onSelectChange(e) {
//     if (e.target.value !== "") {
//         addItemCategorySelect.style.color = '#000000';
//     }
// }

// Upload and remove uploaded image in add item modal

// const addModalImageInput = document.getElementById('add-item-files');

// addModalImageInput.addEventListener('change', onAddModalImageUpload);

// function onAddModalImageUpload(e) {
//     const imageSrc = URL.createObjectURL(this.files[0]);
//     document.getElementById('add-item-image').src = imageSrc;
// }

// const addItemRemoveImageBtn = document.getElementById('add-item-remove-upload-btn');

// addItemRemoveImageBtn.addEventListener('click', onAddItemRemoveImage);

// function onAddItemRemoveImage(e) {
//     addModalImageInput.value = "";
//     document.getElementById('add-item-image').src = '/front-end/images/no_image-placeholder.png';
// }

// Upload and remove uploaded image in modify item modal



//////////

const tableBody = document.querySelector('tbody');

const loadProducts = async () => {
    try {
        const data = await makeRequest({ path: '/products' });
        const modifiedData = data.map(x => x = { ...x, quantity: Math.floor(Math.random() * 11), forSale: 1 });
        console.log(modifiedData);
        modifiedData.forEach(x => {
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
                            <div class="input-div">
                                <input type="number" name="code" value="${x.id}" required>
                                <span class="floating-label">Code *</span>
                            </div>
                            <input type="text" placeholder="Name *" name="title" value="${x.title}" required>
                            <textarea name="description" id="descriptionText" cols="30" rows="6"
                                placeholder="Description">${x.description}</textarea>
                            <select id="modify-item-select" placeholder="Category *" name="category" required>
                                <option value="" disabled>Category *</option>
                                <option value="${x.category}" selected>Laptops</option>
                            </select>
                            <input type="number" placeholder="Qty for sale" name="forSale" value="${x.forSale}">
                            <input type="number" placeholder="Sale price" name="price" value="${x.price}">
                            <input type="number" placeholder="Qty" name="quantity" value="${x.quantity}" required>
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

                const modalCloseBtn = modal.querySelector('.close-btn');
                modalCloseBtn.addEventListener('click', onModalCloseBtnClick);

                function onModalCloseBtnClick() {
                    modal.remove();
                    overlay.style.display = 'none';
                }

                overlay.addEventListener('click', onOverlayClick);

                function onOverlayClick(e) {
                    if (e.target.matches('.overlay')) {
                        modal.remove();
                        overlay.style.display = 'none';
                    }
                }

                const modifyModalImageInput = modal.querySelector('#modify-item-upload-image');

                modifyModalImageInput.addEventListener('change', onModifyModalImageUpload);

                function onModifyModalImageUpload(e) {
                    const imageSrc = URL.createObjectURL(this.files[0]);
                    modal.querySelector('#modify-item-image').src = imageSrc;
                }

                const modifyItemRemoveImageBtn = modal.querySelector('#modify-item-remove-image-btn');

                modifyItemRemoveImageBtn.addEventListener('click', onModifyItemRemoveImage);

                function onModifyItemRemoveImage(e) {
                    modifyModalImageInput.value = "";
                    modal.querySelector('#modify-item-image').src = '/front-end/images/no_image-placeholder.png';
                }

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

            const deleteBtn = tableRow.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', showPopup);

            // Pop Up

            function showPopup(e) {
                const prevPopUp = document.getElementById('pop-up');
                if (prevPopUp !== null) {
                    prevPopUp.remove();
                }

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

                const elementPopUp = document.getElementById('pop-up');

                let positionLeft;
                let positionTop;

                if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
                    positionLeft = position.left - position.left - 230;
                    elementPopUp.classList.add('top-right-pointer');
                } else if (position.x + elementPopUp.offsetWidth >= window.innerWidth && position.y + elementPopUp.offsetHeight + 20 >= window.innerHeight) {
                    positionLeft = position.left - position.left - 0;
                    elementPopUp.classList.add('bottom-right-pointer');
                } else {
                    positionLeft = position.left - position.left - 0;
                    elementPopUp.classList.add('top-middle-pointer');
                }

                if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && !(position.x + elementPopUp.offsetWidth >= window.innerWidth)) {
                    positionTop = position.top - position.top - 0;
                    elementPopUp.classList.add('bottom-middle-pointer');
                } else if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && position.x + elementPopUp.offsetWidth >= window.innerWidth) {
                    positionTop = position.top - position.top - 0;
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

                const cancelBtn = document.getElementById('cancel-btn');
                cancelBtn.addEventListener('click', closePopUp);

                window.addEventListener('click', trackWindowEvent);

                function closePopUp(e) {
                    e.preventDefault();
                    deleteBtnParent.removeChild(divPopUp);
                    window.removeEventListener('click', trackWindowEvent);
                }

                function trackWindowEvent(e) {
                    if (!e.target.matches('.inside-pop-up') && !e.target.matches('.delete-btn')) {
                        deleteBtnParent.removeChild(divPopUp);
                        window.removeEventListener('click', trackWindowEvent);
                    }
                }
            };

            tableBody.appendChild(tableRow);
        })
    } catch (err) {
        console.log(err);
    }
}

loadProducts();