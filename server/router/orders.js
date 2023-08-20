const express = require('express');
const router = express.Router();

const {
    get,
    create,
    edit,
    deleteOrd
} = require('../controllers/orders');

router.get('/:emId/:customerId', async (req, res) => {
    const { emId, customerId } = req.params;

    const orders = await get(emId, customerId);

    return res.json(orders);
});

router.post('/:emId/:customerId', async (req, res) => {
    const { emId, customerId } = req.params;

    const data = {
        ...req.body,
        emId,
        customerId
    }
    const status =  await create(data);

    return res.json(status);
});

router.put('/:id', (req, res) => {
    const { id }= req.params;
    const bodyData = req.body;

    const data = {
        ...bodyData,
        id
    }

    const status = edit(data);

    return res.json(status);
});

router.delete('/:id', (req, res) => {
    const status = deleteOrd(req.params.id);

    return res.json(status);
});

module.exports = router;