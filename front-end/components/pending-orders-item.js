///// NOT USED IN APP /////

const template = document.createElement('template');

template.innerHTML = `
<style>

.table-first-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 45%;
}

.col {
    width: 33.3333%;
}

.table-second-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 55%;
}

.table-header,
.table-row {
    display: flex;
    justify-content: space-between;
    align-items: cener;
    border-radius: 10px;
    padding: 0 10px;
    height: 50px;
    margin-bottom: 20px;
    font-size: 18px;
}

.col-1 {
    flex-basis: 33.333333%;
}

.col-2 {
    flex-basis: 33.333333%;
}

.col-3 {
    flex-basis: 33.333333%;
}

.col-4 {
    flex-basis: 25%;
}

.col-5 {
    flex-basis: 20%;
}

.col-6 {
    flex-basis: 10%;
}

.table-row {
    background-color: #ffffff;
    border: 2px solid #DADCDD;
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

.complete-btn:hover {
    cursor: pointer;
}

</style>
<div class="table-row">
<div class="table-first-group">
        <div class="col col-1" data-before="Code">1</div>
        <div class="col col-2" data-before="Qty">1</div>
        <div class="col col-3" data-before="Price">500 BGN</div>
    </div>
    <div class="table-second-group">
        <div class="col col-4" data-before="Ordered By:">yasen@vsgbg.com</div>
        <div class="col col-5" data-before="Order Date:">2023</div>
        <div class="col col-6">
            <span>
                <button class="complete-btn">Complete</button>
            </span>
        </div>
    </div>
</div>
`;

class PendingOrderItem extends HTMLElement {
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