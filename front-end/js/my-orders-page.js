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

DUMMY_DATA = [
    {
        name: 'MacBook Pro M2 16 inch',
        qty: 1,
        price: 5000,
        orderDate: '10-10-2010'
    },
    {
        name: 'MacBook Air M1 13 inch',
        qty: 1,
        price: 3000,
        orderDate: '20-20-2020'
    },
    {
        name: 'iPhone 14 Pro Max',
        qty: 1,
        price: 2000,
        orderDate: '30-30-2030'
    }
]

// Load My Orders data inside table

// const myOrdersTable = document.querySelector('.responsive-table');

// DUMMY_DATA.forEach(x => {
//     const myOrderItem = document.createElement('my-orders-item');

//     myOrderItem.setAttribute('product-name', x.name);
//     myOrderItem.setAttribute('product-qty', x.qty);
//     myOrderItem.setAttribute('product-price', x.price);
//     myOrderItem.setAttribute('order-date', x.orderDate);

//     myOrdersTable.appendChild(myOrderItem);
// });

// Pop Up

const cancelOrderBtns = Array.from(document.getElementsByClassName('cancel-btn'));

cancelOrderBtns.forEach(x => x.addEventListener('click', showPopup));

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

    const cancelButtonParent = e.target.parentElement;

    cancelButtonParent.appendChild(divPopUp);

    const elementPopUp = document.getElementById('pop-up');

    let positionLeft;
    let positionTop;

    if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        positionLeft = position.left - position.left - 265;
        elementPopUp.classList.add('top-right-pointer');
    } else if (position.x + elementPopUp.offsetWidth >= window.innerWidth && position.y + elementPopUp.offsetHeight + 20 >= window.innerHeight) {
        positionLeft = position.left - position.left - 100;
        elementPopUp.classList.add('bottom-right-pointer');
    } else {
        positionLeft = position.left - position.left - 140;
        elementPopUp.classList.add('top-middle-pointer');
    }

    if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && !(position.x + elementPopUp.offsetWidth >= window.innerWidth)) {
        positionTop = position.top - position.top - 115;
        elementPopUp.classList.add('bottom-middle-pointer');
    } else if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        positionTop = position.top - position.top - 115;
        elementPopUp.classList.add('bottom-right-pointer');
    }
    else {
        positionTop = position.top - position.top + 50;
    }

    Object.assign(elementPopUp.style, {
        left: `${position.x - 285}px`,
        top: `${position.y + 25}px`,
        visibility: 'visible',
    });

    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', closePopUp);

    window.addEventListener('click', trackWindowEvent);

    function closePopUp(e) {
        e.preventDefault();
        itemCard.removeChild(divPopUp);
        window.removeEventListener('click', trackWindowEvent);
    }

    function trackWindowEvent(e) {
        if (!e.target.matches('.inside-pop-up') && !e.target.matches('.cancel-btn')) {
            cancelButtonParent.removeChild(divPopUp);
            window.removeEventListener('click', trackWindowEvent);
        }
    }
};