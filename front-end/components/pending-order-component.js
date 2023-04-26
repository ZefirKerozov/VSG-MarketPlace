import { completeOrder } from "../utils/requests.js";

export default async function createPendingOrder(id, code, quantity, price, email, orderDate) {
    const tableRow = document.createElement('div');
    tableRow.classList.add('table-row');
    tableRow.innerHTML = `
    <div class="table-first-group">
        <div class="col col-1" data-before="Code">${code}</div>
        <div class="col col-2" data-before="Qty">${quantity}</div>
        <div class="col col-3" data-before="Price">${price} BGN</div>
    </div>
    <div class="table-second-group">
        <div class="col col-4" data-before="Ordered By:">${email}</div>
        <div class="col col-5" data-before="Order Date:">${orderDate}</div>
        <div class="col col-6">
            <span>
                <button class="complete-btn">Complete</button>
            </span>
        </div>
    </div>
    `;

    const completeBtn = tableRow.querySelector('.complete-btn');
    completeBtn.addEventListener('click', onCompleteOrder);

    async function onCompleteOrder() {
        await completeOrder(id);
        window.location.reload();
    }

    return tableRow;
}