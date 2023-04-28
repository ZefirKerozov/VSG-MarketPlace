// Show and hide hamburger mobile menu

const asideNav = document.getElementsByTagName('aside')[0];
const hamburgerBtn = document.getElementsByTagName('svg')[0];

hamburgerBtn.addEventListener('click', openHamburgerMenu);

const header = document.querySelector('header');
const headerLeftContainer = document.querySelector('.left-container');
const darkModeToggleContainer = document.querySelector('.toggle');

const userInfo = document.getElementById('user-info');
const darkModeSwitch = document.querySelector('.dark-mode-switch-container');

const prependContainer = document.querySelector('#prepend-container');

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        prependContainer.appendChild(userInfo);
        prependContainer.appendChild(darkModeSwitch);
        darkModeToggleContainer.style['flex-direction'] = 'row-reverse';
    } else {
        header.appendChild(userInfo);
        headerLeftContainer.appendChild(darkModeSwitch);
        darkModeToggleContainer.style['flex-direction'] = 'row';
    }
});

window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        prependContainer.appendChild(userInfo);
        prependContainer.appendChild(darkModeSwitch);
        darkModeToggleContainer.style['flex-direction'] = 'row-reverse';
    } else {
        header.appendChild(userInfo);
        headerLeftContainer.appendChild(darkModeSwitch);
        darkModeToggleContainer.style['flex-direction'] = 'row';
    }
});

function openHamburgerMenu(e) {
    if (asideNav.classList.contains('active')) {
        asideNav.classList.remove('active');
    } else {
        asideNav.classList.add('active');
    }
}