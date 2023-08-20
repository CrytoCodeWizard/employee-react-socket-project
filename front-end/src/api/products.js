import { BaseApi } from "./base";

export class ProductApi {
    static getAll = async () => {
        const products = await BaseApi.createInstance().get('/products');

        return products.data;
    }
}