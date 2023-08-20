import { BaseApi } from "./base";

export class OrderApi {
    static getAll = async (employeeId, customerId) => {
        const orders =
            await BaseApi
                    .createInstance()
                    .get(`orders/${employeeId}/${customerId}`);
        return orders.data;
    }

    static addOrder = async (employeeId, customerId, data) => {
        await BaseApi.createInstance().post(`orders/${employeeId}/${customerId}`, data);
        const orders = await OrderApi.getAll(employeeId, customerId);
        return orders;
    }

    static deleteOrder = async (employeeId, customerId, orderId) => {
        await BaseApi.createInstance().delete(`orders/${orderId}`);
        const orders = await OrderApi.getAll(employeeId, customerId);
        return orders;
    }

    static updateOrder = async (orderId, data) => {
        const result = await BaseApi
                                .createInstance()
                                .put(`orders/${orderId}`, data);
        return result;
    }
}