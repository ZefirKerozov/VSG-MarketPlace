const templateDesktop = document.createElement('template');
const templateMobile = document.createElement('template');

templateDesktop.innerHTML = `
<style>
    .table-row {
        border-radius: 10px;
        padding: 10px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        font-size: 18px;
        background-color: #ffffff;
        border: 2px solid #DADCDD;
    }

    .col{
        overflow: hidden;
    }

    .col:nth-child(1){
        padding: 6px 0;
    }

    .col-1 {
        flex-basis: 15%;
    }

    .col-2 {
        flex-basis: 15%;
    }

    .col-3 {
        flex-basis: 15%;
    }

    .col-4 {
        flex-basis: 25%;
    }

    .col-5{
        flex-basis: 20%;
    }

    .col-6{
        flex-basis: 10%;
    }

    .complete-btn {
        padding: 6px 8px;
        font-size: 16px;
        font-weight: 700;
        color: #FFFFFF;
        background-color: #ED1C25;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        border: none;
    }
</style>
<div class="table-row">
    <div class="col col-1">1</div>
    <div class="col col-2">20</div>
    <div class="col col-3">350 BGN</div>
    <div class="col col-4">smechkov@vsgbg.com</div>
    <div class="col col-5">2023-03-13 16:30</div>
    <div class="col col-6">
        <span>
            <button class="complete-btn">Complete</button>
        </span>
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

    .top-container {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        width: 100%;
        border-bottom: 2px solid #DADCDD;
        padding: 10px;
    }

    .top-child-container {
        display: flex;
        flex-direction: column;
    }
        

    .bottom-container {
        box-sizing: border-box;
        width: 100%;
        border-bottom: 2px solid #DADCDD;
        padding: 10px;
    }

    .bottom-container:last-of-type {
        display: flex;
        justify-content: center;
        border-bottom: none;
    }

    .complete-btn {
        padding: 6px 8px;
        font-size: 16px;
        font-weight: 700;
        color: #FFFFFF;
        background-color: #ED1C25;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        border: none;
    }
</style>
<div class="table-row">
    <div class="top-container">
         <div class="top-child-container">
            <span class="title">Code</span>
            <span class="col-1">1</span>
         </div>
         <div class="top-child-container">
            <span class="title">QTY</span>
            <span class="col-2">10</span>
          </div>
        <div class="top-child-container">
            <span class="title">Price</span>
            <span class="col-3">150 BGN</span>
        </div>
    </div>
    <div class="bottom-container">
        <span class="title">Ordered by:</span>
        <span class="col-4">Yasen</span>
    </div>
    <div class="bottom-container">
        <span class="title">Order Date:</span>
        <span class="col-5">10-10-2010</span>
    </div>
    <div class="bottom-container">
        <button class="complete-btn">Complete</button>
    </div>
</div>
`;

class PendingOrderItem extends HTMLElement {
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
        if (this.hasAttribute('porduct-code')) {
            this.shadowRoot.querySelector('.col-1').textContent =
                this.getAttribute('product-code');
        }
        if (this.hasAttribute('product-qty')) {
            this.shadowRoot.querySelector('.col-2').textContent =
                this.getAttribute('product-qty');
        }
        if (this.hasAttribute('product-price')) {
            this.shadowRoot.querySelector('.col-3').textContent =
                `${this.getAttribute('product-price')} BGN`;
        }
        if (this.hasAttribute('ordered-by')) {
            this.shadowRoot.querySelector('.col-4').textContent =
                this.getAttribute('ordered-by');
        }
        if (this.hasAttribute('order-date')) {
            this.shadowRoot.querySelector('.col-5').textContent =
                this.getAttribute('order-date');
        }
        this.shadowRoot
            .querySelector('.complete-btn')
            .addEventListener('click', () => {
                alert('You completed this order!');
            });
    }
}

customElements.define('pending-orders-item', PendingOrderItem);