const navLinks = Array.from(document.querySelectorAll('li a'));
const currentURL = new URL(document.URL);
navLinks.filter(x => x.pathname === currentURL.pathname).map(x => x.classList.add('active'));

const buyBtn = Array.from(document.getElementsByClassName('buy-btn'));
buyBtn.forEach(x => x.addEventListener('click', showPopup));

const hamburger = document.querySelector(".hamburger");
const navMenu = document.getElementsByTagName("aside")[0];

const asideNav = document.getElementsByTagName('aside')[0];
const hamburgerBtn = document.getElementsByTagName('svg')[0];

hamburgerBtn.addEventListener('click', openHamburgerMenu);

window.addEventListener('resize', () => {
    const userInfo = document.getElementById('user-info');
    if (screen.width <= 768) {
        asideNav.prepend(userInfo);
    } else {
        document.getElementsByTagName('header')[0].appendChild(userInfo);
    }
});

window.addEventListener('load', () => {
    const userInfo = document.getElementById('user-info');
    if (screen.width <= 768) {
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

// Modal

const modalOverlay = document.getElementsByClassName('overlay')[0];
modalOverlay.addEventListener('click', onOverlayClick);

const modalCloseBtn = document.getElementsByClassName('close-btn')[0];
modalCloseBtn.addEventListener('click', onModalCloseBtnClick);

const itemsImages = Array.from(document.querySelectorAll('.item-card img'));
itemsImages.forEach(x => x.addEventListener('click', onItemImageClick));

function onOverlayClick(e) {
    if (e.target.matches('.overlay')) {
        modalOverlay.style.display = 'none';
    }
}

function onModalCloseBtnClick(e) {
    modalOverlay.style.display = 'none';
}

function onItemImageClick(e) {
    modalOverlay.style.display = 'flex';
}

// Pop Up

function showPopup(e) {
    const prevPopUp = document.getElementById('pop-up');
    if (prevPopUp !== null) {
        prevPopUp.remove();
    }

    const divPopUp = document.createElement('div');
    divPopUp.id = 'pop-up';
    divPopUp.classList.add('inside-pop-up');
    divPopUp.innerHTML = `<p class="inside-pop-up">Are you sure you want to buy 1 item for 5000 BGN?</p>
<div class="pop-up-buttons inside-pop-up">
    <a href="" id="confirm-btn">Yes</a>
    <a href="" id="cancel-btn">No</a>
</div>`;

    const position = e.target.getBoundingClientRect();

    const itemCard = e.target;

    itemCard.appendChild(divPopUp);

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
        left: `${positionLeft}px`,
        top: `${positionTop}px`,
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
        console.log(e.target);
        if (!e.target.matches('.inside-pop-up') && !e.target.matches('.buy-btn')) {
            itemCard.removeChild(divPopUp);
            window.removeEventListener('click', trackWindowEvent);
        }
    }
};