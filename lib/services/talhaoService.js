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

    async CadastrarTalhao(talhao) {
        const response = await httpClient.post("talhao/salvar", talhao, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }

    async DeletarTalhao(id) {
        const response = await httpClient.delete(`talhao/deletar?id=${id}`, null, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }

    async ObterTalhaoPorId(id) {
        const response = await httpClient.get(`talhao/buscar?id=${id}`, true);
        if (response.status !== 200) {
            return false;
        }
        const data = await response.json();
        return data;
    }

    async BuscarTalhao(id) {
        const response = await httpClient.get(`talhao/buscar?id=${id}`, true);
        if (response.status !== 200) {
            return false;
        }
        const data = await response.json();
        return data;
    }

    async ObterTalhao(id) {
        const response = await httpClient.get(`talhao/buscarPorTalhao?id=${id}`, true);
        if (response.status !== 200) {
            return false;
        }
        const data = await response.json();
        return data;
    }

    async AtualizarTalhao(talhao) {
        const response = await httpClient.put("talhao/atualizar", talhao, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }
}