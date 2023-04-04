const templateDesktop = document.createElement('template');
const templateMobile = document.createElement('template');

templateDesktop.innerHTML = `
<style>
.table-row {
    border-radius: 10px;
    padding: 14px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 18px;
    border: 2px solid #DADCDD;
}

.col-1 {
    flex-basis: 50%;
}

.col-2 {
    flex-basis: 20%;
}

.col-3 {
    flex-basis: 20%;
}

.col-4 {
    flex-basis: 20%;
}

.col-5 {
    flex-basis: 10%;
    display: flex;
    align-items: center;
    gap: 30px;
}

.cancel-btn{
    background: none;
    border: none;
}

.cancel-btn:hover{
    cursor: pointer;
}
</style>
<div class="table-row">
    <div class="col col-1">MacBook Pro 16” M1 Max 32GB 1TB</div>
    <div class="col col-2">1</div>
    <div class="col col-3">5000 BGN</div>
    <div class="col col-4">2023-03-13 16:30</div>
    <div class="col col-5">
        <span>Pending</span>
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
`;

templateMobile.innerHTML = `
<style>
    .table-row {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 0;
        border: 2px solid #DADCDD;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    span {
        font-size: 14px;
    }

    .title {
        font-size: 16px;
        font-weight: 700;
    }

    .child-container{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 10px 0;
        border-bottom: 2px solid #DADCDD;
    }

    .qty-price-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        border-bottom: 2px solid #DADCDD;
        padding: 10px;
    }
        
    .bottom-container {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
    }

    .cancel-btn{
        background: none;
        border: none;
    }
    
    .cancel-btn:hover{
        cursor: pointer;
    }
</style>
<div class="table-row">
    <div class="child-container">
        <span class="title">Name: </span>
        <span class="col-1">MacBook Pro 16” M1 Max 32GB 1TB</span>
    </div>
    <div class="qty-price-container">
       <div class="qty-price-child-container">
          <span class="title">QTY: </span>
          <span class="col-2">1</span>
        </div>
       <div class="qty-price-child-container">
           <span class="title">Price: </span>
           <span class="col-3">5000 BGN</span>
       </div>
    </div>
    <div class="child-container">
        <span class="title">Order Date: </span>
        <span class="col-4">10-10-2010</span>
    </div>
    <div class="bottom-container">
        <span>Pending</span>
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
`;

class MyOrdersItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (window.innerWidth <= 768) {
            this.shadowRoot.appendChild(templateMobile.content.cloneNode(true));
        } else {
            this.shadowRoot.appendChild(templateDesktop.content.cloneNode(true));
        }
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
    const prevPopUp = document.getElementById('pop-up');
    if (prevPopUp !== null) {
        prevPopUp.remove();
    }

    const divPopUp = document.createElement('div');
    divPopUp.id = 'pop-up';
    divPopUp.classList.add('inside-pop-up');
    divPopUp.innerHTML = `<p class="inside-pop-up">Are you sure you want to reject this order?</p>
<div class="pop-up-buttons inside-pop-up">
    <a href="" id="confirm-btn">Yes</a>
    <a href="" id="cancel-btn">No</a>
</div>`;

    const position = e.target.getBoundingClientRect();

    const body = document.getElementsByTagName('body')[0];

    body.appendChild(divPopUp);

    const elementPopUp = document.getElementById('pop-up');

    console.log(elementPopUp);

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