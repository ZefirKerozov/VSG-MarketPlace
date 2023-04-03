const navLinks = Array.from(document.querySelectorAll('li a'));
const currentURL = new URL(document.URL);
navLinks.filter(x => x.pathname === currentURL.pathname).map(x => x.classList.add('active'));

// Show and hide hamburger mobile menu

const hamburger = document.querySelector(".hamburger");
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

////////// ADD ITEM AND MODIFY ITEM MODALS //////////

const overlay = document.getElementsByClassName('overlay')[0];
const addModal = document.getElementById('add-modal');
const modifyModal = document.getElementById('modify-modal');

// Close modal when the overlay is clicked

overlay.addEventListener('click', onOverlayClick);

function onOverlayClick(e) {
    if (e.target.matches('.overlay')) {
        overlay.style.display = 'none';
    }
}

// Open add item modal if add item button is clicked

const addItemBtn = document.getElementById('add-btn');

addItemBtn.addEventListener('click', onAddItemBtnClick);

function onAddItemBtnClick(e) {
    overlay.style.display = 'flex';
    modifyModal.style.display = 'none';
    addModal.style.display = 'block';
}

// Open modify modal if modify button is clicked

const modifyBtns = Array.from(document.querySelectorAll('.modify-btn'));

modifyBtns.forEach(x => x.addEventListener('click', onModifyBtnClick));

function onModifyBtnClick(e) {
    overlay.style.display = 'flex';
    addModal.style.display = 'none';
    modifyModal.style.display = 'block';
}

// Close modal if close button is clicked

const modalCloseBtns = Array.from(document.querySelectorAll('.close-btn'));

modalCloseBtns.forEach(x => x.addEventListener('click', onModalCloseBtnClick));

function onModalCloseBtnClick(e) {
    overlay.style.display = 'none';
}

// Add item modal category select placeholder color change

const addItemCategorySelect = document.getElementById('add-item-select');

addItemCategorySelect.addEventListener('change', onSelectChange);

function onSelectChange(e) {
    if (e.target.value !== "") {
        addItemCategorySelect.style.color = '#000000';
    }
}

// Upload and remove uploaded image in add item modal

const addModalImageInput = document.getElementById('add-item-files');

addModalImageInput.addEventListener('change', onAddModalImageUpload);

function onAddModalImageUpload(e) {
    const imageSrc = URL.createObjectURL(this.files[0]);
    document.getElementById('add-item-image').src = imageSrc;
}

const addItemRemoveImageBtn = document.getElementById('add-item-remove-upload-btn');

addItemRemoveImageBtn.addEventListener('click', onAddItemRemoveImage);

function onAddItemRemoveImage(e) {
    addModalImageInput.value = "";
    document.getElementById('add-item-image').src = '/front-end/images/no_image-placeholder.png';
}

// Upload and remove uploaded image in modify item modal

const modifyModalImageInput = document.getElementById('modify-item-files');

modifyModalImageInput.addEventListener('change', onModifyModalImageUpload);

function onModifyModalImageUpload(e) {
    const imageSrc = URL.createObjectURL(this.files[0]);
    document.getElementById('modify-item-image').src = imageSrc;
}

const modifyItemRemoveImageBtn = document.getElementById('modify-item-remove-upload-btn');

modifyItemRemoveImageBtn.addEventListener('click', onModifyItemRemoveImage);

function onModifyItemRemoveImage(e) {
    modifyModalImageInput.value = "";
    document.getElementById('modify-item-image').src = '/front-end/images/no_image-placeholder.png';
}

// Pop Up

const deleteItemBtns = Array.from(document.getElementsByClassName('delete-btn'));

deleteItemBtns.forEach(x => x.addEventListener('click', showPopup));

function showPopup(e) {
    const prevPopUp = document.getElementById('pop-up');
    if (prevPopUp !== null) {
        prevPopUp.remove();
    }

    const divPopUp = document.createElement('div');
    divPopUp.id = 'pop-up';
    divPopUp.classList.add('inside-pop-up');
    divPopUp.innerHTML = `<p class="inside-pop-up">Are you sure you want to remove this item?</p>
<div class="pop-up-buttons inside-pop-up">
    <a href="" id="confirm-btn">Yes</a>
    <a href="" id="cancel-btn">No</a>
</div>`;

    const position = e.target.getBoundingClientRect();

    const body = document.getElementsByTagName('body')[0];

    body.appendChild(divPopUp);

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
        left: `${position.x - 285}px`,
        top: `${position.y + 25}px`,
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
        if (!e.target.matches('.inside-pop-up') && !e.target.matches('.delete-btn')) {
            body.removeChild(divPopUp);
            window.removeEventListener('click', trackWindowEvent);
        }
    }
};