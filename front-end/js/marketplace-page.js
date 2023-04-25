import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";
import "../utils/darkMode.js";
import "../components/marketplace-item.js";
import { buyProduct, getAllProducts } from "../utils/requests.js";
import showPopup from "../utils/pop-up.js";
import createMarketplaceItem from "../components/marketplace-item-component.js";

////////// Dynamically load items from API //////////

const itemsContainer = document.querySelector('.items');

const loadProducts = async () => {
    try {
        const data = await getAllProducts();

        data.filter(x => x.quantityForSale > 0).forEach(x => {

            const itemDiv = createMarketplaceItem(x.img, x.quantityForSale, x.price, x.categoryName, itemsContainer);

            // Pop up

            const buyBtn = itemDiv.querySelector('.buy-btn');

            const selectedQuantity = itemDiv.querySelector('#quantity').value;
            const totalPrice = x.price * selectedQuantity;

            const popUpText = `<p class="inside-pop-up">Are you sure you want to buy ${selectedQuantity} ${selectedQuantity > 1 ? 'items' : 'item'} for ${totalPrice} BGN?</p>
            <div class="pop-up-buttons inside-pop-up">
                <a href="" id="confirm-btn">Yes</a>
                <a href="" id="cancel-btn">No</a>
            </div>`;

            async function confirmPurchase(e) {
                e.preventDefault();
                await buyProduct(selectedQuantity, x.id, 1);
                window.location.assign('http://127.0.0.1:5500/front-end/templates/my-orders-page.html');
            }

            buyBtn.addEventListener('click', (e) => {
                showPopup(e, popUpText, confirmPurchase);
            });

            // Show and hide item description modal

            // Show modal when clicked on item image

            const itemImage = itemDiv.querySelector('.item-card img');
            itemImage.addEventListener('click', onItemImageClick);

            async function onItemImageClick() {
                // const itemData = await makeRequest({ path: `/Products/${x.id}` });
                // console.log(itemData);
                const modal = document.createElement('div');
                modal.id = 'description-modal';

                modal.innerHTML = `
                <img src="${x.img === null ? '../images/no_image-placeholder.png' : x.img}" alt="Item image">
                <div class="item-description">
                    <div class="top">
                        <div class="title-category">
                            <span class="title">${x.name}</span>
                            <span class="category">${x.categoryName}</span>
                        </div>
                        <div class="price-quantity">
                            <span class="price">${x.price} BGN</span>
                            <span class="quantity">Qty: ${x.quantityForSale}</span>
                        </div>
                    </div>
                    <p>${x.description}</p>
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
        })
    } catch (err) {
        console.log(err);
    }
}

loadProducts();

///// NOT USED IN APP /////

// const marketplaceItem = document.createElement('marketplace-item');
// marketplaceItem.style.width = '25%';
// marketplaceItem.setAttribute('id', x.id);
// marketplaceItem.setAttribute('img', x.img);
// marketplaceItem.setAttribute('price', x.price);
// marketplaceItem.setAttribute('category', x.categoryName);
// marketplaceItem.setAttribute('quantity', x.quantityForSale);
// itemsContainer.appendChild(marketplaceItem);