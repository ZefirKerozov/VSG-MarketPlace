import { makeRequest } from "./makeRequest.js"

export const getAllProducts = async () => {
    const res = await makeRequest({ path: '/Products/All' });
    return await res.json();
}

export const buyProduct = async (quantity, productId, userId) => {
    await makeRequest({ path: '/Orders/Add', method: 'POST', data: { quantity, productId, userId } });
}