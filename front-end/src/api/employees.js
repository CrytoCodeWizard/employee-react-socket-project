import { BaseApi } from "./base";

export class EmployeeApi {
    static getAll = async () => {
        const employees = await BaseApi.createInstance().get('/employees');

        return employees.data;
    }
    static getById = async id => {
        const employee = await BaseApi.createInstance().get(`/employees/${id}`);
        return employee.data
    }
}