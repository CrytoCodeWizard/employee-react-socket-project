const express = require('express');
const router = express.Router();

const {
    getCus, 
    createCus, 
    editCus, 
    deleteCus
} = require('../controllers/customers');


router.get('/', async (req, res) => {
    res.json(await getCus());
});

router.post('/', async (req, res) => {
    const status = await createCus(req.body);
    res.json({ state:  status});
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const status = editCus(id, data);

    return res.json(status);
});

router.delete('/:id', async (req, res) => {
    const status = await deleteCus(req.params.id);
    return res.json(status);
});

module.exports = router;