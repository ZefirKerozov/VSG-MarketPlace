import showPopup from "../utils/pop-up.js";
import { cancelOrder } from "../utils/requests.js";

export default async function createMyOrder(id, name, quantity, price, orderDate, status) {
    const tableRow = document.createElement('div');
    tableRow.classList.add('table-row');
    tableRow.innerHTML = `
    <div class="col col-1" data-before="Name:">${name}</div>
    <div class="table-first-group">
        <div class="col col-2" data-before="Qty:">${quantity}</div>
        <div class="col col-3" data-before="Price:">${price} BGN</div>
    </div>
    <div class="table-second-group">
        <div class="col col-4" data-before="Order Date:">${orderDate}</div>
        <div class="col col-5" data-before="Status:">
            <div class="status">
                <span class="status-message">${status}</span>
                ${status === "Finished" || status === "Cancelled"
            ? ''
            : `
                    <button class="cancel-btn">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.8203 1.35156L7.17188 6L11.8203 10.6484L10.6484 11.8203L6 7.17188L1.35156 11.8203L0.179688 10.6484L4.82812 6L0.179688 1.35156L1.35156 0.179688L6 4.82812L10.6484 0.179688L11.8203 1.35156Z"
                            fill="#ED1C25" />
                    </svg>
                </button>
                    `}
            </div>
        </div>
    </div>
    `;

    const popUpText = `
    <p class="inside-pop-up">Are you sure you want to remove this item?</p>
    <div class="pop-up-buttons inside-pop-up">
        <a href="" id="confirm-btn">Yes</a>
        <a href="" id="cancel-btn">No</a>
    </div>
    `;

    async function onCancelOrder(e) {
        e.preventDefault();
        await cancelOrder(id);
        window.location.reload();
    }

    const cancelOrderBtn = tableRow.querySelector('.cancel-btn');
    cancelOrderBtn?.addEventListener('click', (e) => {
        showPopup(e, popUpText, onCancelOrder, '.cancel-btn', 'my-orders');
    });

    return tableRow;
}