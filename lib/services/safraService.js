import httpClient from "../http/httpClient";

export default class SafraService {
    async CadastrarSafra(data) {
        const response = await httpClient.post("safra/salvar", data, true);
        if (response.status !== 200) {
            return false;
        }
        const d = await response.json();
        return d;
    }

    async ListarSafra(queryParams) {
        const response = await httpClient.get(`safra/listar?${queryParams}`, true);
        if (response.status !== 200) {
            return false;
        }
        const data = await response.json();
        return data;
    }

    async DeletarSafra(id) {
        const response = await httpClient.delete(`safra/deletar?id=${id}`, null, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }

    async BuscarSafra(id) {
        const response = await httpClient.get(`safra/buscar?id=${id}`, true);
        if (response.status !== 200) {
            return false;
        }
        const data = await response.json();
        return data;
    }

    async AtualizarSafra(data) {
        const response = await httpClient.put("safra/atualizar", data, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }
}