import axios from 'axios';
import { SERVER_URL } from '../utils/config';

export class BaseApi {
    static baseURL = SERVER_URL;

    static createInstance() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const client = axios.create({
            baseURL: BaseApi.baseURL,
            headers: {...headers}
        });

        return client;
    }
}