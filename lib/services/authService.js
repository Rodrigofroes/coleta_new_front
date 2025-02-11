import httpClient from "../http/httpClient";

export default class AuthService {
    async Login(data) {
        const response = await httpClient.get(`usuario/login?email=${data.email}&senha=${data.password}`);
        if(response.status !== 200) {
            return false;
        }
        const user = await response.json();
        return user;
    }

    async Registro(data) {
        const response = await httpClient.post("usuario/cadastrar", data);
        if(response.status !== 200) {
            return false;
        }
        return true;
    }
}