export default function showPopup(e, popUpText, submitFunction, targetToClose, topPosition, leftPosition) {
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

    const parent = e.target.parentElement;

    console.log(parent);

    parent.appendChild(divPopUp);

    // Configure pop-up position depending on browser window

    const elementPopUp = document.querySelector('#pop-up');

    console.log(elementPopUp);

    let positionLeft;
    let positionTop;

    if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        if (window.innerWidth <= 768) {
            positionLeft = position.left - position.left + leftPosition + 8;
        } else {
            positionLeft = position.left - position.left + leftPosition;
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
            positionTop = position.top - position.top + topPosition - 160;
        } else {
            positionTop = position.top - position.top + 120;
        }
        elementPopUp.classList.add('bottom-right-pointer');
    }
    else {
        if (window.innerWidth <= 768) {
            positionTop = position.top - position.top + topPosition + 5;
        } else {
            positionTop = position.top - position.top + topPosition;
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
        console.log(e.target);
        if (!e.target.matches('.inside-pop-up') && !e.target.matches(targetToClose)) {
            parent.removeChild(divPopUp);
            window.removeEventListener('click', trackWindowEvent);
        }
    }
};