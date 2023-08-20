const { getEmployees, getEmployee } = require('../models/employees');

const get = async () => {
    const employees = await getEmployees();
    return employees;
}

const getById = async id => {
    const employee = await getEmployee(id);
    return employee;
}

module.exports = {
    get,
    getById
};