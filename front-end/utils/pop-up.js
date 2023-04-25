export default function showPopup(e, text, submitFunction) {
    // Close previous opened pop-up if there is such

    const prevPopUp = document.getElementById('pop-up');
    if (prevPopUp !== null) {
        prevPopUp.remove();
    }

    // Create pop-up and append it to parent element

    const divPopUp = document.createElement('div');
    divPopUp.id = 'pop-up';
    divPopUp.classList.add('inside-pop-up');
    divPopUp.innerHTML = text;

    const position = e.target.getBoundingClientRect();

    const itemCard = e.target.parentElement;

    itemCard.appendChild(divPopUp);

    // Configure pop-up position depending on browser window

    const elementPopUp = document.querySelector('#pop-up');

    let positionLeft;
    let positionTop;

    if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        if (window.innerWidth <= 768) {
            positionLeft = position.left - position.left + 4;
        } else {
            positionLeft = position.left - position.left + 5;
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
            positionTop = position.top - position.top + 125;
        } else {
            positionTop = position.top - position.top + 120;
        }
        elementPopUp.classList.add('bottom-right-pointer');
    }
    else {
        if (window.innerWidth <= 768) {
            positionTop = position.top - position.top + 310;
        } else {
            positionTop = position.top - position.top + 295;
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
        itemCard.removeChild(divPopUp);
        window.removeEventListener('click', trackWindowEvent);
    }

    // Close pop-up if clicked outside pop-up

    function trackWindowEvent(e) {
        console.log(e.target);
        if (!e.target.matches('.inside-pop-up') && !e.target.matches('.buy-btn')) {
            itemCard.removeChild(divPopUp);
            window.removeEventListener('click', trackWindowEvent);
        }
    }
};