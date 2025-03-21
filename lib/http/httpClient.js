const baseUrl = 'https://apis-api-coleta.uwqcav.easypanel.host/api/';
// const baseUrl = 'http://localhost:5004/api/';
import Cookies from 'js-cookie';
const tk = Cookies.get('token');

const httpClient = {
    get: async (path, token = false) => {
        return fetch(baseUrl + path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${tk}` : '',
            },
        });
    },
    post: async (path, data, token = false) => {
        return fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${tk}` : '',
            },
            body: JSON.stringify(data),
        });
    },
    postFormData: async (path, data, token = false) => {
        return fetch(baseUrl + path, {
            method: 'POST',
            body: data,
            headers: {
                // 'Authorization': token ? `Bearer ${httpClient.token}` : '',
            }
        });
    },
    put: async (path, data, token = false) => {
        return fetch(baseUrl + path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${tk}` : '',
            },
            body: JSON.stringify(data),
        });
    },
    delete: async (path, data, token = false) => {
        return fetch(baseUrl + path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${tk}` : '',
            },
            body: JSON.stringify(data)
        });
    },
};

export default httpClient; 