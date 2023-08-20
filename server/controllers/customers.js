const { 
    getCustomers, 
    createCustomers, 
    editCustomer, 
    deleteCustomer
} = require('../models/customer');


const getCus = async () => {
    const customers = await getCustomers();

    return customers;
}

const createCus = async data => {
    const result = await createCustomers(data);

    return result;
}

const editCus = async (id, data) => {
    const result = await editCustomer(id, data);

    return result;
}

const deleteCus = id => {
    const result = deleteCustomer(id);

    return result;
}

module.exports = {
    getCus,
    createCus,
    editCus,
    deleteCus
};