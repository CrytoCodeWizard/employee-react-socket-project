const db = require('../config/db');
const util = require('util');
const dbQuery = util.promisify(db.query).bind(db);

const getOrders = async (emId, cusId) => {
    let sql = "SELECT * FROM orders WHERE salesPersonId = ? and customerId = ?";

    try {
        const result = await dbQuery(sql, [emId, cusId]);
        return result;
    } catch(err) {
        console.log(err);
    }
}

const createOrders = async data => {
    const { 
        emId, 
        customerId, 
        productId, 
        quantity
    } = data;

    let sql = "INSERT INTO orders (salesPersonId, customerId, productId, quantity) VALUES (?,?,?,?)";

    try {
        const result = await dbQuery(sql, [emId, customerId, productId, quantity]);
        return result;
    } catch(err) {
        console.log(err);
    }
}

const editOrder = async data => {
    const { 
            id,
            productId,
            quantity 
        } = data;
        console.log(data);
    let sql = "UPDATE orders SET productId = ?, quantity = ? WHERE id = ?";
    
    try {
        const result = await dbQuery(sql, [productId, quantity, id]);
        console.log(result);
        return result;
    } catch(err) {
        console.log(err);
    }
}

const deleteOrder = async id => {

    let sql = "DELETE FROM orders WHERE id = ?"

    try {
        const result = await dbQuery(sql, [id]);
        return result;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getOrders,
    createOrders,
    editOrder,
    deleteOrder
};