///// NOT USED IN APP /////

const template = document.createElement('template');

template.innerHTML = `
<style>
.table-first-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 35%;
}

.table-second-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 35%;
}

.table-header,
.table-row {
    border-radius: 10px;
    padding: 0 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 18px;
    position: relative;
}

    

    .col-1 {
        flex-basis: 40%;
    }

    .col-2 {
        flex-basis: 25%;
    }

    .col-3 {
        flex-basis: 25%;
    }

    .col-4 {
        flex-basis: 50%;
    }

    .col-5 {
        flex-basis: 30%;
    }

        .status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            position: relative;
        }

        .cancel-btn {
            background: none;
            border: none;
            width: 12px;
            height: 12px;
        }

        svg {
            pointer-events: none;
        }

        .cancel-btn:hover {
            cursor: pointer;
        }
    
.table-header {
    background-color: #DADCDD;
    font-weight: 700;
}

.table-row {
    border: 2px solid #DADCDD;
}

#overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

#pop-up {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    z-index: 999;
    width: 300px;
    height: 80px;
    background-color: #FFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    padding: 16px;
    font-size: 0.5rem;
</style>

<div class="table-row">
<div class="col col-1" data-before="Name:">Macbook Pro 16 inch</div>
<div class="table-first-group">
    <div class="col col-2" data-before="Qty:">1</div>
    <div class="col col-3" data-before="Price:">5000 BGN</div>
</div>
<div class="table-second-group">
    <div class="col col-4" data-before="Order Date:">2023</div>
    <div class="col col-5" data-before="Status:">
        <div class="status">
            <span class="status-message">Pending</span>
            <button class="cancel-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.8203 1.35156L7.17188 6L11.8203 10.6484L10.6484 11.8203L6 7.17188L1.35156 11.8203L0.179688 10.6484L4.82812 6L0.179688 1.35156L1.35156 0.179688L6 4.82812L10.6484 0.179688L11.8203 1.35156Z"
                        fill="#ED1C25" />
                </svg>
            </button>
        </div>
    </div>
</div>
</div>
`;

class MyOrdersItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log('Connected callback connected!');
        this._setUpProductData();
    }

    _setUpProductData() {
        if (this.hasAttribute('product-name')) {
            this.shadowRoot.querySelector('.col-1').textContent =
                this.getAttribute('product-name');
        }
        if (this.hasAttribute('product-qty')) {
            this.shadowRoot.querySelector('.col-2').textContent =
                this.getAttribute('product-qty');
        }
        if (this.hasAttribute('product-price')) {
            this.shadowRoot.querySelector('.col-3').textContent =
                `${this.getAttribute('product-price')} BGN`;
        }
        if (this.hasAttribute('order-date')) {
            this.shadowRoot.querySelector('.col-4').textContent =
                this.getAttribute('order-date');
        }
        this.shadowRoot
            .querySelector('.cancel-btn')
            .addEventListener('click', showPopup);
    }
}

customElements.define('my-orders-item', MyOrdersItem);

function showPopup(e) {
    // Close previous opened pop-up if there is such

    console.log(e.target);

    const prevPopUp = document.getElementById('pop-up');
    if (prevPopUp !== null) {
        prevPopUp.remove();
    }

    // Create pop-up and append it to parent element

    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const divPopUp = document.createElement('div');
    divPopUp.id = 'pop-up';
    divPopUp.classList.add('inside-pop-up');
    divPopUp.innerHTML = `
    <p class="inside-pop-up">Are you sure you want to remove this item?</p>
    <div class="pop-up-buttons inside-pop-up">
        <a href="" id="confirm-btn">Yes</a>
        <a href="" id="cancel-btn">No</a>
    </div>`;

    const position = e.target.getBoundingClientRect();

    const parent = e.target;

    parent.appendChild(overlay);
    parent.appendChild(divPopUp);

    // Configure pop-up position depending on browser window

    const elementPopUp = parent.querySelector('#pop-up');
    console.log(parent);
    console.log(elementPopUp);

    let positionLeft;
    let positionTop;

    if (position.x + elementPopUp.offsetWidth >= window.innerWidth) {
        if (window.innerWidth <= 768) {
            positionLeft = position.left - position.left - 76;
        } else {
            positionLeft = position.left - position.left - 160;
        }
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
        positionTop = position.top - position.top - 120;
        elementPopUp.classList.add('bottom-right-pointer');
    }
    else {
        positionTop = position.top - position.top + 30;
    }

    Object.assign(elementPopUp.style, {
        left: `${positionLeft}px`,
        top: `${positionTop}px`,
        visibility: 'visible',
    });

    // Close pop-up if cancel button is clicked

    const cancelBtn = parent.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', closePopUp);

    window.addEventListener('click', trackWindowEvent);

    function closePopUp(e) {
        e.preventDefault();
        parent.removeChild(divPopUp);
        parent.removeChild(overlay);
        window.removeEventListener('click', trackWindowEvent);
    }

    // Close pop-up if clicked outside pop-up

    function trackWindowEvent(e) {
        if (!e.target.matches('.inside-pop-up') && !e.target.matches('.cancel-btn')) {
            cancelButtonParent.removeChild(divPopUp);
            window.removeEventListener('click', trackWindowEvent);
        }
    }

    // Cancel order if cancel order button is clicked

    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.addEventListener('click', onConfirmBtnClick);

    function onConfirmBtnClick(e) {
        e.preventDefault();
        const statusMessage = tableRow.querySelector('.status-message');
        statusMessage.textContent = 'Canceled';
        console.log(cancelBtn);
        cancelOrderBtn.style.display = 'none';
    }
};