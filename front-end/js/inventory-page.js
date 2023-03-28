const navLinks = Array.from(document.querySelectorAll('li a'));
const currentURL = new URL(document.URL);
navLinks.filter(x => x.pathname === currentURL.pathname).map(x => x.classList.add('active'));

const buyBtn = Array.from(document.getElementsByClassName('buy-btn'));
buyBtn.forEach(x => x.addEventListener('click', showPopup));

const hamburger = document.querySelector(".hamburger");
const navMenu = document.getElementsByTagName("aside")[0];

console.log(navMenu);

const asideNav = document.getElementsByTagName('aside')[0];
const hamburgerBtn = document.getElementsByTagName('svg')[0];

hamburgerBtn.addEventListener('click', openHamburgerMenu);

function openHamburgerMenu(e) {
    if (asideNav.classList.contains('active')) {
        asideNav.classList.remove('active');
    } else {
        asideNav.classList.add('active');
    }
}