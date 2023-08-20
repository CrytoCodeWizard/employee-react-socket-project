import { BaseApi } from "./base";

export class CustomerApi {
    static getAll = async () => {
        const customers = await BaseApi
                                    .createInstance()
                                    .get('customers');
        return customers.data;
    }

    static addCustomer = async (data) => {
        await BaseApi
                .createInstance()
                .post(`customers/`, data);
        const customers = await CustomerApi.getAll();
        return customers;
    }

    static updateCustomer = async (id, data) => {
        await BaseApi
                .createInstance()
                .put(`customers/${id}`, data);
        const customers = await CustomerApi.getAll();
        return customers;
    }

    static deleteCustomer = async id => {
        await BaseApi
                .createInstance()
                .delete(`customers/${id}`);
        const customers = await CustomerApi.getAll();
        return customers;
    }
}