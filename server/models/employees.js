const db = require('../config/db');
const util = require('util');
const dbQuery = util.promisify(db.query).bind(db);

const getEmployees = async () => {
    let sql = "SELECT * FROM employees";

    try {
        const result = await dbQuery(sql);
        return result;
    } catch(error) {
        console.log(error);
    }
}

const getEmployee = async id => {
    let sql = "SELECT * from employees WHERE id = ?";
    
    try {
        const result = await dbQuery(sql, [id]);
        return result;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getEmployees,
    getEmployee
};