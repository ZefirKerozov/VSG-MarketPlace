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
        const itemDiv = createMarketplaceItem(x.id, x.img, x.quantityForSale, x.price, x.categoryName, x.name, x.description);

        itemsContainer.appendChild(itemDiv);
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