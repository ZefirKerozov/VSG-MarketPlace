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

const DUMMY_DATA = [
    {
        code: 1,
        qty: 10,
        price: 150,
        orderedBy: 'Yasen',
        orderDate: '10-10-2010'
    },
    {
        code: 2,
        qty: 20,
        price: 250,
        orderedBy: 'Simeon',
        orderDate: '20-20-2020'
    },
    {
        code: 3,
        qty: 30,
        price: 350,
        orderedBy: 'Alex',
        orderDate: '30-30-2030'
    }
]

// Load Pending Items data inside table

const pendingOrdersTable = document.querySelector('.responsive-table');

DUMMY_DATA.forEach(x => {
    const pendingItem = document.createElement('pending-orders-item');

    pendingItem.setAttribute('product-code', x.code);
    pendingItem.setAttribute('product-qty', x.qty);
    pendingItem.setAttribute('product-price', x.price);
    pendingItem.setAttribute('ordered-by', x.orderedBy);
    pendingItem.setAttribute('order-date', x.orderDate);

    pendingOrdersTable.appendChild(pendingItem);
});