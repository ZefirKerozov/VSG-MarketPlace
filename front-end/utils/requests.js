import { makeRequest } from "./makeRequest.js"

// Marketplace page requsts

export const getAllProducts = async () => {
    const res = await makeRequest({ path: '/Products/All' });
    return await res.json();
}

export const buyProduct = async (quantity, productId, userId) => {
    await makeRequest({ path: '/Orders/Add', method: 'POST', data: { quantity, productId, userId } });
}

// Inventory page requests

export const getAllCategories = async () => {
    const res = await makeRequest({ path: '/Category/All' });
    return await res.json();
}

export const addItem = async (name, quantity, description, code, quantityForSale, categoryId, location, price, image) => {
    const res = await makeRequest({ path: '/Products/Inventory/Add', method: 'POST', data: { name, quantity, description, code, quantityForSale, categoryId, location, price } });
    const itemId = await res.json();
    console.log(itemId);

    const imageFormData = new FormData();
    imageFormData.append('image', image);

    await fetch(`http://localhost:5288/api/Images/Upload/${itemId}`, {
        method: 'POST',
        body: imageFormData
    });
}

export const modifyItem = async (id, name, quantity, description, code, quantityForSale, categoryId, location, price, image, uploadedImage) => {
    await makeRequest({ path: `/Products/Edit/${id}`, method: 'PUT', data: { name, quantity, description, code, quantityForSale, categoryId, location, price } });

    const img = document.querySelector('#modify-item-image');

    const imageFormData = new FormData();
    imageFormData.append('image', image);

    if (image.name) {
        // add image request
        await fetch(`http://localhost:5288/api/Images/Edit/${id}`, {
            method: 'POST',
            body: imageFormData
        });
    } else if (uploadedImage !== img.src) {
        // delete image request
        await fetch(`http://localhost:5288/api/Images/Delete/${id}`, {
            method: 'DELETE',
            body: imageFormData
        });
    }
}

export const deleteItem = async (id) => {
    await makeRequest({path: `/Products/Inventory/Delete/${id}`, method: 'DELETE'});
}