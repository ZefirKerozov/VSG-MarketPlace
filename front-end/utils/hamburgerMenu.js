// Show and hide hamburger mobile menu

const asideNav = document.getElementsByTagName('aside')[0];
const hamburgerBtn = document.getElementsByTagName('svg')[0];

hamburgerBtn.addEventListener('click', openHamburgerMenu);

const header = document.querySelector('header');
const headerLeftContainer = document.querySelector('.left-container');
const userInfo = document.getElementById('user-info');
const darkModeSwitch = document.querySelector('.dark-mode-switch-container');
const prependContainer = document.querySelector('#prepend-container');

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        prependContainer.appendChild(userInfo);
        prependContainer.appendChild(darkModeSwitch);
    } else {
        header.appendChild(userInfo);
        headerLeftContainer.appendChild(darkModeSwitch);
    }
});

window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        prependContainer.appendChild(userInfo);
        prependContainer.appendChild(darkModeSwitch);
    } else {
        header.appendChild(userInfo);
        headerLeftContainer.appendChild(darkModeSwitch);
    }
});

function openHamburgerMenu(e) {
    if (asideNav.classList.contains('active')) {
        asideNav.classList.remove('active');
    } else {
        asideNav.classList.add('active');
    }
}