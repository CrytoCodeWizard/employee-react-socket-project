const db = require('../config/db');
const util = require('util');
const dbQuery = util.promisify(db.query).bind(db);

async function getCustomers() {
    let sql = "SELECT * FROM customers";
    try {
        const customers = await dbQuery(sql);
        return customers;
    } catch (err) {
    console.log(err);
    }
}

const createCustomers = async data => {
    const {
        firstName,
        middleInitial,
        lastName
    } = data;

    let sql = "INSERT INTO customers (firstName, middleInitial, lastName) VALUES (?,?,?)";

    try {
        const result = await dbQuery(sql, [firstName, middleInitial, lastName]);
        return result;
    } catch(err) {
        console.log(err);
    }
}

const editCustomer = async (id, data) => {
    const {
            firstName,
            middleInitial,
            lastName
        } = data;

    let sql = "UPDATE customers SET firstName = ?, middleInitial = ?, lastName = ? WHERE id = ?";

    try {
        const result = await dbQuery(sql, [firstName, middleInitial, lastName, id]);
        return result;
    } catch(err) {
        console.log(err);
    }
}

const deleteCustomer = id => {

    let sql = "DELETE FROM customers WHERE id = ?";
    
    try {
        const result = dbQuery(sql, [id]);
        return result;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getCustomers,
    createCustomers,
    editCustomer,
    deleteCustomer
};