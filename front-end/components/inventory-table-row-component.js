import showPopup from "../utils/pop-up.js";
import { deleteItem } from "../utils/requests.js";
import createModifyItemModal from "./modify-item-modal.js";

export default async function createInventoryTableRow(id, code, name, description, categoryName, quantityForSale, quantity, price, img) {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td>${code}</td>
        <td>${name}</td>
        <td>${categoryName}</td>
        <td>${quantityForSale}</td>
        <td>${quantity}</td>
        <td>
            <div class="table-actions">
                <button class="modify-btn">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.8125 2.6875L10.5938 3.90625L8.09375 1.40625L9.3125 0.1875C9.4375 0.0625 9.59375 0 9.78125 0C9.96875 0 10.125 0.0625 10.25 0.1875L11.8125 1.75C11.9375 1.875 12 2.03125 12 2.21875C12 2.40625 11.9375 2.5625 11.8125 2.6875ZM0 9.5L7.375 2.125L9.875 4.625L2.5 12H0V9.5Z"
                            fill="#ED6C02" />
                    </svg>
                </button>
                <button class="delete-btn">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.34375 0.65625H9.65625V2H0.34375V0.65625H2.65625L3.34375 0H6.65625L7.34375 0.65625ZM2.34375 4V10.6562H7.65625V4H2.34375ZM1 10.6562V2.65625H9V10.6562C9 11.0104 8.86458 11.3229 8.59375 11.5938C8.32292 11.8646 8.01042 12 7.65625 12H2.34375C1.98958 12 1.67708 11.8646 1.40625 11.5938C1.13542 11.3229 1 11.0104 1 10.6562Z"
                            fill="#ED1C25" />
                    </svg>
                </button>
            </div>
        </td>
        `;

    // Open modify modal when modify button is clicked

    const modifyBtn = tableRow.querySelector('.modify-btn');
    modifyBtn.addEventListener('click', () => {
        createModifyItemModal(id, code, name, description, quantityForSale, price, quantity, img, categoryName);
    });

    // Show pop-up when item delete button is clicked

    const deleteBtn = tableRow.querySelector('.delete-btn');

    const popUpText = `
        <p class="inside-pop-up">Are you sure you want to remove this item?</p>
        <div class="pop-up-buttons inside-pop-up">
            <a href="" id="confirm-btn">Yes</a>
            <a href="" id="cancel-btn">No</a>
        </div>
        `;

    async function deleteInventoryItem(e) {
        e.preventDefault();
        await deleteItem(id);
        window.location.reload();
    }

    deleteBtn.addEventListener('click', (e) => {
        showPopup(e, popUpText, deleteInventoryItem, '.delete-btn', 50, -233);
    });

    return tableRow;
}