const db = require('../config/db');
const util = require('util');
const dbQuery = util.promisify(db.query).bind(db);

const getProducts = async () => {
    let sql = "SELECT * FROM products";

    try {
        const result = await dbQuery(sql);
        return result;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getProducts
};