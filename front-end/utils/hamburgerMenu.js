// Show and hide hamburger mobile menu

const asideNav = document.getElementsByTagName('aside')[0];
const hamburgerBtn = document.getElementsByTagName('svg')[0];

hamburgerBtn.addEventListener('click', openHamburgerMenu);

window.addEventListener('resize', () => {
    const userInfo = document.getElementById('user-info');
    if (window.innerWidth <= 768) {
        asideNav.prepend(userInfo);
    } else {
        document.getElementsByTagName('header')[0]?.appendChild(userInfo);
    }
});

window.addEventListener('load', () => {
    const userInfo = document.getElementById('user-info');
    if (window.innerWidth <= 768) {
        asideNav.prepend(userInfo);
    } else {
        document.getElementsByTagName('header')[0]?.appendChild(userInfo);
    }
});

function openHamburgerMenu(e) {
    if (asideNav.classList.contains('active')) {
        asideNav.classList.remove('active');
    } else {
        asideNav.classList.add('active');
    }
}