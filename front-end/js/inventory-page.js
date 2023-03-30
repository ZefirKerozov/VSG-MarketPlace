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

////////// ADD MODAL //////////

// Open add item modal when add item button is clicked

const addItemBtn = document.getElementById('add-btn');

addItemBtn.addEventListener('click', onAddItem);

function onAddItem(e) {
    addModalOverlay.style.display = 'flex';
}

// Add item modal close functionality

const addModalOverlay = document.getElementsByClassName('add-modal-overlay')[0];
addModalOverlay.addEventListener('click', onAddModalOverlayClick);

const addModalCloseBtn = document.getElementsByClassName('add-item-close-btn')[0];
console.log(addModalCloseBtn);
addModalCloseBtn.addEventListener('click', onAddModalCloseBtnClick);

function onAddModalOverlayClick(e) {
    if (e.target.matches('.add-modal-overlay')) {
        addModalOverlay.style.display = 'none';
    }
}

function onAddModalCloseBtnClick(e) {
    console.log('ok');
    addModalOverlay.style.display = 'none';
}

// Add item modal category select placeholder

const addItemCategorySelect = document.getElementById('add-item-select');

addItemCategorySelect.addEventListener('change', onSelectChange);

function onSelectChange(e) {
    if (e.target.value !== "") {
        addItemCategorySelect.style.color = '#000000';
    }
}

// Upload and remove uploaded image in add item modal

const imageInput = document.getElementById('add-item-files');
console.log(imageInput);

imageInput.addEventListener('change', onImageUpload);

function onImageUpload(e) {
    const imageSrc = URL.createObjectURL(this.files[0]);
    console.log(document.getElementById('add-item-image'));
    document.getElementById('add-item-image').src = imageSrc;
}

const removeBtn = document.getElementById('add-item-remove-upload-btn');

removeBtn.addEventListener('click', onRemoveImage);

function onRemoveImage(e) {
    imageInput.value = "";
    document.getElementById('add-item-image').src = '/front-end/images/no_image-placeholder.png';
}

////////// MODIFY MODAL //////////

// Open modify modal when modify button is clicked

const modifyBtns = document.querySelectorAll('.modify-btn');

modifyBtns.forEach(x => x.addEventListener('click', onModifyBtnClick));

function onModifyBtnClick(e) {
    console.log('ok');
    modifyModalOverlay.style.display = 'flex';
}

// Modify item modal close functionality

const modifyModalOverlay = document.getElementsByClassName('modify-modal-overlay')[0];
modifyModalOverlay.addEventListener('click', onModifyOverlayClick);

const modifyModalCloseBtn = document.getElementsByClassName('modify-item-close-btn')[0];
modifyModalCloseBtn.addEventListener('click', onModifyModalCloseBtnClick);

function onModifyOverlayClick(e) {
    if (e.target.matches('.modify-modal-overlay')) {
        modifyModalOverlay.style.display = 'none';
    }
}

function onModifyModalCloseBtnClick(e) {
    modifyModalOverlay.style.display = 'none';
}

// Add item modal category select placeholder

const modifyItemCategorySelect = document.getElementById('modify-item-select');

modifyItemCategorySelect.addEventListener('change', onSelectChange);

function onSelectChange(e) {
    if (e.target.value !== "") {
        modifyItemCategorySelect.style.color = '#000000';
    }
}