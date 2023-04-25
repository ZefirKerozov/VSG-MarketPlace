export default function createMarketplaceItemDescriptionModal(img, name, categoryName, price, quantityForSale ,description) {
    const modal = document.createElement('div');
    modal.id = 'description-modal';

    modal.innerHTML = `
    <img src="${img === null ? '../images/no_image-placeholder.png' : img}" alt="Item image">
    <div class="item-description">
        <div class="top">
            <div class="title-category">
                <span class="title">${name}</span>
                <span class="category">${categoryName}</span>
            </div>
            <div class="price-quantity">
                <span class="price">${price} BGN</span>
                <span class="quantity">Qty: ${quantityForSale}</span>
            </div>
        </div>
        <p>${description}</p>
    </div>
    <button class="close-btn">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.7305 2.02734L10.7578 9L17.7305 15.9727L15.9727 17.7305L9 10.7578L2.02734 17.7305L0.269531 15.9727L7.24219 9L0.269531 2.02734L2.02734 0.269531L9 7.24219L15.9727 0.269531L17.7305 2.02734Z"
                fill="black" />
        </svg>
    </button>
    `;

    const overlay = document.querySelector('.overlay');
    overlay.appendChild(modal);
    overlay.style.display = 'flex';

    // Close modal if modal close button is clicked

    const modalCloseBtn = modal.querySelector('.close-btn');
    modalCloseBtn.addEventListener('click', onModalCloseBtnClick);

    function onModalCloseBtnClick() {
        modal.remove();
        overlay.style.display = 'none';
    }

    // Close modal when user clicks on overlay

    overlay.addEventListener('click', onOverlayClick);

    function onOverlayClick(e) {
        if (e.target.matches('.overlay')) {
            modal.remove();
            overlay.style.display = 'none';
        }
    }
}