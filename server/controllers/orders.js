const { 
    getOrders, 
    createOrders, 
    editOrder, 
    deleteOrder
} = require('../models/order');


const get = async (emId, cusId) => {
    const orders = await getOrders(emId, cusId);

    return orders;
}

const create = async data => {
    const result = await createOrders(data);

    return result;
}

const edit = data => {
    const result = editOrder(data);

    return result;
}

const deleteOrd= id => {
    const result = deleteOrder(id);

    return result;
}

module.exports = {
    get,
    create,
    edit,
    deleteOrd
};