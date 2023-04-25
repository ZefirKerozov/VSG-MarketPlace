// Show and hide hamburger mobile menu

const asideNav = document.getElementsByTagName('aside')[0];
const hamburgerBtn = document.getElementsByTagName('svg')[0];

hamburgerBtn.addEventListener('click', openHamburgerMenu);

const userInfo = document.getElementById('user-info');
const darkModeSwitch = document.querySelector('.dark-mode-switch-container');
const prependContainer = document.querySelector('#prepend-container');
prependContainer.id = 'prepend-container';

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        userInfo.style.display = 'none';
        darkModeSwitch.style.display = 'none';
        prependContainer.style.display = 'flex';
    } else {
        userInfo.style.display = 'flex';
        darkModeSwitch.style.display = 'flex';
        prependContainer.style.display = 'none';
    }
});

window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        userInfo.style.display = 'none';
        darkModeSwitch.style.display = 'none';
        prependContainer.style.display = 'flex';
    } else {
        userInfo.style.display = 'flex';
        darkModeSwitch.style.display = 'flex';
        prependContainer.style.display = 'none';
    }
});

function openHamburgerMenu(e) {
    if (asideNav.classList.contains('active')) {
        asideNav.classList.remove('active');
    } else {
        asideNav.classList.add('active');
    }
}