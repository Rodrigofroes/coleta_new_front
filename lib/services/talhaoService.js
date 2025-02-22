import httpClient from "../http/httpClient";

export default class TalhaoService {
    async ListarTalhao(queryParams) {
        const response = await httpClient.get(`talhao/listar?${queryParams}`, true);
        if (response.status !== 200) {
            return false;
        }
        const data = await response.json();
        return data;
    }
}