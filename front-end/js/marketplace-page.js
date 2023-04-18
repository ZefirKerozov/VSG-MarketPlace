import { makeRequest } from "../utils/makeRequest.js";
import "../utils/navLinks.js";
import "../utils/hamburgerMenu.js";

// const testFetch = async () => {
//     const result = await makeRequest({ path: '/Products/productId?productId=2'});
//     console.log(result);
// }

// testFetch();

////////// Dynamically load items from API //////////

const itemsContainer = document.querySelector('.items');

const loadProducts = async () => {
    try {
        const data = await makeRequest({ path: '/Products' });
        console.log(data);
        const modifiedData = data.map(x => x = { ...x, quantity: Math.floor(Math.random() * 11) });
        modifiedData.forEach(x => {
            const selectMenu = document.createElement('select');
            selectMenu.name = 'quantity';
            selectMenu.id = 'quantity';
            for (let i = 1; i <= x.quantity; i++) {
                selectMenu.innerHTML += `<option value="${i}">${i}</option>`;
            }
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-wrapper');
            itemDiv.innerHTML = `
            <div class="item-card">
                <div class="img-wrapper">
                    <img src="${x.image}" alt="Product image">
                </div>
                <div class="item-info">
                    <div class="price-category">
                        <span class="item-price">${x.price} BGN</span>
                        <span class="item-category">${x.category}</span>
                    </div>
                    <div class="quantity-wrapper">
                        <form class="quantity">
                            <label for="quantity">Qty</label>
                        </form>
                        <button class="buy-btn">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.6709 5.95471L12.0459 0.329706C11.7669 0.0507056 11.3625 -0.0612319 10.9794 0.0332681C10.7775 0.0827681 10.5969 0.186831 10.454 0.329706C10.3263 0.457393 10.2302 0.615456 10.175 0.792081C9.92021 1.61839 9.47978 2.33671 8.82784 2.98808C7.95709 3.85827 6.82309 4.51752 5.62328 5.21446C4.34978 5.95246 3.03409 6.71746 1.95578 7.79521C1.03946 8.71264 0.41565 9.73302 0.0500248 10.9176C-0.0731627 11.3176 0.0342748 11.7501 0.329025 12.046L5.95403 17.671C6.23303 17.95 6.63746 18.062 7.02053 17.9675C7.22246 17.9168 7.40303 17.8139 7.5459 17.671C7.67359 17.5433 7.76978 17.3853 7.8249 17.2075C8.08028 16.3812 8.52071 15.6629 9.17321 15.0115C10.0434 14.1413 11.1768 13.4832 12.3778 12.7868C13.6502 12.0477 14.9664 11.2827 16.0442 10.205C16.9605 9.28864 17.5843 8.26714 17.9505 7.08252C18.0731 6.68314 17.9651 6.24889 17.6709 5.95471ZM6.74996 16.8751C4.88696 15.0121 2.98796 13.1125 1.12496 11.2501C2.72359 6.07452 9.65246 6.30064 11.25 1.12508C13.113 2.98752 15.0125 4.88708 16.8761 6.75008C15.2769 11.9245 8.34803 11.6995 6.74996 16.8751ZM11.0036 8.38133C10.8202 8.22777 10.6357 8.12314 10.4501 8.07139C10.2656 8.01964 10.0811 7.99883 9.89434 8.01233C9.70984 8.02639 9.52084 8.06858 9.33184 8.14114C9.14284 8.21483 8.95271 8.29471 8.76146 8.38752C8.4594 8.04046 8.15734 7.69733 7.85528 7.37896C7.9914 7.25577 8.12359 7.19333 8.25071 7.18883C8.3784 7.18321 8.50103 7.19671 8.61746 7.22596C8.73615 7.25577 8.84471 7.28108 8.94484 7.30077C9.04609 7.32046 9.13384 7.29852 9.2109 7.23383C9.29246 7.16352 9.33746 7.07239 9.34365 6.96271C9.34928 6.85189 9.30765 6.74389 9.21484 6.63871C9.09615 6.50258 8.95328 6.41989 8.78171 6.38952C8.6124 6.35971 8.43915 6.36196 8.25859 6.40133C8.08084 6.44183 7.91153 6.50877 7.75121 6.60327C7.5909 6.69777 7.46209 6.79452 7.36646 6.88902C7.3299 6.85414 7.29334 6.81983 7.25678 6.78552C7.21628 6.74839 7.16565 6.72814 7.1049 6.72927C7.04359 6.72927 6.99296 6.75571 6.95134 6.80408C6.91084 6.85133 6.89228 6.90646 6.89959 6.96439C6.90521 7.02458 6.9294 7.07071 6.97103 7.10614C7.00759 7.13708 7.04415 7.16746 7.08071 7.19952C6.93671 7.37333 6.81803 7.56514 6.72465 7.76764C6.63015 7.97071 6.5739 8.17208 6.55309 8.36727C6.53115 8.56414 6.55196 8.74414 6.61215 8.91121C6.67234 9.07939 6.78371 9.22227 6.94628 9.35727C7.21121 9.57721 7.52284 9.67058 7.88453 9.64977C8.24509 9.62783 8.63378 9.52039 9.05171 9.29595C9.38359 9.67958 9.71659 10.0604 10.049 10.4142C9.9084 10.5329 9.78521 10.601 9.67665 10.6229C9.56809 10.646 9.47134 10.6437 9.38359 10.6173C9.29584 10.5897 9.21428 10.5503 9.13946 10.4997C9.06465 10.448 8.99096 10.4041 8.91728 10.3681C8.84471 10.3321 8.7699 10.3118 8.6934 10.3107C8.6169 10.3096 8.53534 10.3467 8.44534 10.4238C8.35309 10.5042 8.30696 10.5976 8.30696 10.7028C8.30696 10.8074 8.35534 10.9137 8.44984 11.0211C8.54546 11.1286 8.66978 11.2191 8.81996 11.2906C8.97015 11.362 9.14003 11.407 9.32678 11.4194C9.51353 11.4323 9.7104 11.4042 9.91796 11.3271C10.1267 11.2512 10.3331 11.114 10.5367 10.9098C10.6346 11.0054 10.7336 11.0965 10.832 11.1843C10.8737 11.2203 10.9243 11.2383 10.9856 11.2338C11.0447 11.2315 11.0964 11.204 11.1375 11.1545C11.1791 11.1038 11.1965 11.0481 11.1903 10.9896C11.1847 10.9306 11.1605 10.885 11.12 10.8524C11.021 10.7731 10.922 10.6898 10.8236 10.6021C10.9918 10.3956 11.1268 10.178 11.2269 9.96252C11.327 9.74596 11.3861 9.53727 11.4058 9.34377C11.4255 9.14914 11.4024 8.97364 11.3388 8.81446C11.2758 8.65302 11.1639 8.51464 11.0036 8.38133ZM7.85865 8.76271C7.69946 8.76946 7.56053 8.71658 7.43903 8.59902C7.38728 8.54952 7.35128 8.48933 7.32934 8.41789C7.30628 8.34646 7.2984 8.26827 7.3074 8.18277C7.31528 8.09839 7.34059 8.01008 7.38446 7.92121C7.42609 7.83233 7.48796 7.74346 7.56671 7.65739C7.8519 7.94089 8.13653 8.25196 8.42171 8.57371C8.20571 8.69239 8.01784 8.75596 7.85865 8.76271ZM10.512 9.88883C10.4613 9.98221 10.4034 10.0655 10.3353 10.138C10.0198 9.81964 9.70478 9.46977 9.39034 9.11089C9.47078 9.07489 9.55515 9.03721 9.64628 8.99896C9.7374 8.96071 9.82853 8.93539 9.91965 8.91964C10.013 8.90558 10.1053 8.90952 10.1975 8.93146C10.2887 8.95452 10.3753 9.00402 10.4557 9.0822C10.535 9.16152 10.5851 9.24364 10.6053 9.33252C10.6273 9.42252 10.6284 9.51364 10.6132 9.60702C10.5969 9.70096 10.5637 9.79433 10.512 9.88883ZM8.27828 12.4763C8.38909 12.3869 8.55221 12.3914 8.65403 12.4949C8.76428 12.6046 8.76428 12.784 8.65403 12.8937C8.64503 12.9027 8.63546 12.9089 8.62534 12.9168L8.62646 12.9179C8.2704 13.1885 7.9779 13.432 7.66234 13.7476C7.37715 14.0322 7.11953 14.332 6.89678 14.6363L6.53734 15.1285C6.52609 15.1488 6.51259 15.1673 6.49571 15.1848C6.38546 15.2945 6.20603 15.2945 6.09634 15.1848C6.00071 15.0891 5.9889 14.9418 6.05921 14.8321L6.05809 14.831L6.44284 14.3056C6.68303 13.9771 6.95921 13.6553 7.26465 13.3499C7.58246 13.031 7.92559 12.7463 8.27715 12.4763H8.27828ZM10.3376 4.33977C10.6222 4.05514 10.8793 3.75646 11.1026 3.45046L11.4761 2.93858C11.4896 2.91439 11.5048 2.89021 11.5256 2.86939C11.6364 2.75858 11.8158 2.75858 11.9267 2.86939C12.0318 2.97514 12.0363 3.14221 11.9407 3.25414L11.9418 3.25527L11.5571 3.78289C11.3163 4.11139 11.0407 4.43202 10.7353 4.73746C10.4175 5.05527 10.0749 5.34102 9.72334 5.61102L9.72109 5.60989C9.60915 5.71283 9.43534 5.71058 9.3279 5.60202C9.21709 5.49121 9.21709 5.31064 9.3279 5.19983C9.34759 5.17902 9.37065 5.16439 9.39371 5.15146C9.72446 4.89889 10.0434 4.63396 10.3376 4.33977Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            `;
            const selectForm = itemDiv.querySelector('form');
            selectForm.appendChild(selectMenu)
            itemsContainer.appendChild(itemDiv);

            const buyBtn = itemDiv.querySelector('.buy-btn');
            buyBtn.addEventListener('click', showPopup);

            // Show and hide item description modal

            // Show modal when clicked on item image

            const itemImage = itemDiv.querySelector('.item-card img');
            itemImage.addEventListener('click', onItemImageClick);

            function onItemImageClick() {
                const modal = document.createElement('div');
                modal.id = 'description-modal';

                modal.innerHTML = `
                <img src="${x.image}" alt="Item image">
                <div class="item-description">
                    <div class="top">
                        <div class="title-category">
                            <span class="title">${x.title}</span>
                            <span class="category">${x.category}</span>
                        </div>
                        <div class="price-quantity">
                            <span class="price">${x.price} BGN</span>
                            <span class="quantity">Qty: ${x.quantity}</span>
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
    divPopUp.innerHTML = `<p class="inside-pop-up">Are you sure you want to buy 1 item for 5000 BGN?</p>
<div class="pop-up-buttons inside-pop-up">
    <a href="" id="confirm-btn">Yes</a>
    <a href="" id="cancel-btn">No</a>
</div>`;

    const position = e.target.getBoundingClientRect();

    const itemCard = e.target.parentElement;

    itemCard.appendChild(divPopUp);

    // Configure pop-up position depending on browser window

    const elementPopUp = document.querySelector('#pop-up');

    let positionLeft;
    let positionTop;

    if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        if (window.innerWidth <= 768) {
            positionLeft = position.left - position.left + 4;
        } else {
            positionLeft = position.left - position.left + 12;
        }
        elementPopUp.classList.add('top-right-pointer');
    } else if (position.x + elementPopUp.offsetWidth >= window.innerWidth && position.y + elementPopUp.offsetHeight + 20 >= window.innerHeight) {
        positionLeft = position.left - position.left - 100;
        elementPopUp.classList.add('bottom-right-pointer');
    } else {
        positionLeft = position.left - position.left + 128;
        elementPopUp.classList.add('top-middle-pointer');
    }

    if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && !(position.x + elementPopUp.offsetWidth >= window.innerWidth)) {
        positionTop = position.top - position.top + 120;
        elementPopUp.classList.add('bottom-middle-pointer');
    } else if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        if (window.innerWidth <= 768) {
            positionTop = position.top - position.top + 125;
        } else {
            positionTop = position.top - position.top + 120;
        }
        elementPopUp.classList.add('bottom-right-pointer');
    }
    else {
        if (window.innerWidth <= 768) {
            positionTop = position.top - position.top + 310;
        } else {
            positionTop = position.top - position.top + 305;
        }
    }

    Object.assign(elementPopUp.style, {
        left: `${positionLeft}px`,
        top: `${positionTop}px`,
        visibility: 'visible',
    });

    // Close pop-up if cancel button is clicked

    const cancelBtn = document.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', closePopUp);

    window.addEventListener('click', trackWindowEvent);

    function closePopUp(e) {
        e.preventDefault();
        itemCard.removeChild(divPopUp);
        window.removeEventListener('click', trackWindowEvent);
    }

    // Close pop-up if clicked outside pop-up

    function trackWindowEvent(e) {
        console.log(e.target);
        if (!e.target.matches('.inside-pop-up') && !e.target.matches('.buy-btn')) {
            itemCard.removeChild(divPopUp);
            window.removeEventListener('click', trackWindowEvent);
        }
    }
};