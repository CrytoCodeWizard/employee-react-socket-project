const express = require('express');
const router = express.Router();

const { get } = require('../controllers/products');

router.get('/', async (req, res) => {
    const products = await get();

    return res.json(products);
});

module.exports = router;