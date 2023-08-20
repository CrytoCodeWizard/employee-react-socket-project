const { getProducts } = require('../models/products');

const get = async () => {
    const products = await getProducts();
    return products;
}

module.exports = {
    get
};