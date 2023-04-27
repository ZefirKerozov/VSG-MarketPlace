export default function showPopup(e, popUpText, submitFunction, targetToClose, popUpPage) {
    // Close previous opened pop-up if there is such

    const prevPopUp = document.getElementById('pop-up');
    if (prevPopUp !== null) {
        prevPopUp.remove();
    }

    // Create pop-up and append it to parent element

    const divPopUp = document.createElement('div');
    divPopUp.id = 'pop-up';
    divPopUp.classList.add('inside-pop-up');
    divPopUp.innerHTML = popUpText;

    const position = e.target.getBoundingClientRect();

    const parent = e.target;

    parent.appendChild(divPopUp);

    // Configure pop-up position depending on browser window

    const elementPopUp = document.querySelector('#pop-up');

    let positionLeft;
    let positionTop;
    let positionTopAddDesktop;
    let positionTopAddMobile;

    if (popUpPage === 'marketplace') {
        positionTop = 50;
        positionLeft = -133;
        positionTopAddDesktop = -168;
        positionTopAddMobile = -168;
    }

    if (popUpPage === 'inventory') {
        positionTop = 50;
        positionLeft = -97;
        positionTopAddDesktop = -155;
        positionTopAddMobile = -155;
    }

    if (popUpPage === 'my-orders') {
        positionTop = 50;
        positionLeft = -264;
        positionTopAddDesktop = -170;
        positionTopAddMobile = -170;
    }

    if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        if (window.innerWidth <= 768) {
            positionLeft = position.left - position.left + (popUpPage === 'my-orders' ? positionLeft : positionLeft - 115);
        } else {
            positionLeft = position.left - position.left + (popUpPage === 'my-orders' ? positionLeft : positionLeft - 115);
        }
        elementPopUp.classList.add('top-right-pointer');
    } else if (position.x + elementPopUp.offsetWidth >= window.innerWidth && position.y + elementPopUp.offsetHeight + 20 >= window.innerHeight) {
        positionLeft = position.left - position.left - positionLeft;
        elementPopUp.classList.add('bottom-right-pointer');
    } else {
        positionLeft = position.left - position.left + positionLeft;
        elementPopUp.classList.add('top-middle-pointer');
    }

    if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && !(position.x + elementPopUp.offsetWidth >= window.innerWidth)) {
        positionTop = position.top - position.top + positionTop - 168;
        elementPopUp.classList.add('bottom-middle-pointer');
    } else if (position.y + elementPopUp.offsetHeight + 50 >= window.innerHeight && position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        if (window.innerWidth <= 768) {
            positionTop = position.top - position.top + positionTop + positionTopAddMobile;
        } else {
            positionTop = position.top - position.top + positionTop + positionTopAddDesktop;
        }
        elementPopUp.classList.add('bottom-right-pointer');
    }
    else {
        if (window.innerWidth <= 768) {
            positionTop = position.top - position.top + (popUpPage === 'my-orders' ? positionTop - 25 : positionTop);
        } else {
            positionTop = position.top - position.top + (popUpPage === 'my-orders' ? positionTop - 25 : positionTop);
        }
    }

    Object.assign(elementPopUp.style, {
        left: `${positionLeft}px`,
        top: `${positionTop}px`,
        visibility: 'visible',
    });

    // Buy

    const confirmBtn = document.querySelector('#confirm-btn');
    confirmBtn.addEventListener('click', submitFunction);

    // Close pop-up if cancel button is clicked

    const cancelBtn = document.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', closePopUp);

    window.addEventListener('click', trackWindowEvent);

    function closePopUp(e) {
        e.preventDefault();
        parent.removeChild(divPopUp);
        window.removeEventListener('click', trackWindowEvent);
    }

    // Close pop-up if clicked outside pop-up

    function trackWindowEvent(e) {
        if (!e.target.matches('.inside-pop-up') && !e.target.matches(targetToClose)) {
            parent.removeChild(divPopUp);
            window.removeEventListener('click', trackWindowEvent);
        }
    }
};