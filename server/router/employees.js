const express = require('express');
const router = express.Router();

const { get, getById } = require('../controllers/employees');

router.get('/', async (req, res) => {
    const employees = await get();

    return res.json(employees);
});

router.get('/:id', async (req, res) => {
    const employee = await getById(req.params.id);

    return res.json(employee);
})

module.exports = router;