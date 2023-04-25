import { addItem, getAllCategories } from "../utils/requests.js";

export default async function createAddItemModal() {
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
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="input-container">
                    <label for="descriptionText">Description</label>
                    <textarea name="description" id="descriptionText" name="description" cols="30" rows="4"></textarea>
                </div>
                <div class="input-container">
                    <label for="add-item-select">Category*</input>
                    <select id="add-item-select" name="category" required>
                        <option value="" disabled selected></option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="qty-for-sale">Qty for sale</label>
                    <input type="number" id="qty-for-sale" name="quantityForSale">
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

    const categories = await getAllCategories();
    const categoriesSelect = modal.querySelector('#add-item-select');
    categories.forEach(x => {
        categoriesSelect.innerHTML += `<option value=${x.id}>${x.name}</option>`;
    });

    const overlay = document.querySelector('.overlay');
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

    overlay.addEventListener('mousedown', onOverlayClick);

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
        console.log(addModalImageInput.value);
    }

    // Remove uploaded image from add item modal

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
        const name = formData.get('name');
        const description = formData.get('description');
        const categoryId = formData.get('category');
        const quantityForSale = formData.get('quantityForSale');
        const price = formData.get('price');
        const quantity = formData.get('quantity');
        const image = formData.get('image');

        addItem(name, quantity, description, code, quantityForSale, categoryId, 'Plovdiv', price, image);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
}