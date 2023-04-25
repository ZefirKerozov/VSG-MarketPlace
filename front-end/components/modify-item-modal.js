import { getAllCategories, modifyItem } from "../utils/requests.js";

export default async function createModifyItemModal(id, code, name, description, quantityForSale, price, quantity, img, categoryName){
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
                    <input type="number" id="cssode" name="code" value="${code}" required/>
                </div>
                <div class="input-container">
                    <label for="name">Name*</label>    
                    <input type="text" id="name" name="name" value="${name}" required/>
                </div>
                <div class="input-container">
                    <label for="descriptionText">Description</label>
                    <textarea name="description" id="descriptionText" name="description" cols="30" rows="4">${description}</textarea>
                </div>
                <div class="input-container">
                    <label for="add-item-select">Category*</input>
                    <select id="add-item-select" name="category" required>
                        <option value="" disabled></option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="qty-for-sale">Qty for sale</label>
                    <input type="number" id="qty-for-sale" name="quantityForSale" value="${quantityForSale}"/>
                </div>
                <div class="input-container">
                    <label for="sale-price">Sale price</label>
                    <input type="number" id="sale-price" name="price" value="${price}"/>
                </div>
                <div class="input-container">
                    <label for="quantity">Qty*</label>
                    <input type="number" id="quantity" name="quantity" value="${quantity}" required/>
                </div>
            </div>
                    <div class="second-column">
                        <img src="${img === null ? '../images/no_image-placeholder.png' : img}" id="modify-item-image"
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

    const categories = await getAllCategories();
    const categoriesSelect = modal.querySelector('#add-item-select');
    categories.forEach(y => {
        categoriesSelect.innerHTML += `<option value=${y.id} ${categoryName === y.name ? 'selected' : ''}>${y.name}</option>`;
    });

    const overlay = document.querySelector('.overlay');
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

    overlay.addEventListener('mousedown', onOverlayClick);

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

    async function onModifySubmit(e) {
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

        await modifyItem(id, name, quantity, description, code, quantityForSale, categoryId, 'Plovdiv', price, image, img);
        window.location.reload();
    }
}