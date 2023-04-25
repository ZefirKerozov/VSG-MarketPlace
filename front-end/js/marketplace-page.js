import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";
import "../utils/darkMode.js";
import "../components/marketplace-item.js";
import { buyProduct, getAllProducts } from "../utils/requests.js";
import showPopup from "../utils/pop-up.js";
import createMarketplaceItem from "../components/marketplace-item-component.js";
import createMarketplaceItemDescriptionModal from "../components/marketplace-item-description-modal.js";

////////// Dynamically load items from API //////////

const itemsContainer = document.querySelector('.items');

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
        itemImage.addEventListener('click', () => {
            createMarketplaceItemDescriptionModal(x.img, x.name, x.categoryName, x.price, x.quantityForSale, x.description);
        });
    });
} catch (err) {
    console.log(err);
}

///// NOT USED IN APP /////

// const marketplaceItem = document.createElement('marketplace-item');
// marketplaceItem.style.width = '25%';
// marketplaceItem.setAttribute('id', x.id);
// marketplaceItem.setAttribute('img', x.img);
// marketplaceItem.setAttribute('price', x.price);
// marketplaceItem.setAttribute('category', x.categoryName);
// marketplaceItem.setAttribute('quantity', x.quantityForSale);
// itemsContainer.appendChild(marketplaceItem);