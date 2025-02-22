import httpClient from "../http/httpClient";

export default class FazendaService {
    async ListarFazendas(queryParams) {
        const response = await httpClient.get(`fazenda/listar?${queryParams}`, true);
        if (response.status !== 200) {
            return false;
        }
        const clientes = await response.json();
        return clientes;
    }

    async ListarTodasFazendas() {
        const response = await httpClient.get("fazenda/all", true);
        if (response.status !== 200) {
            return false;
        }
        const fazendas = await response.json();
        return fazendas;
    }

    async CadastrarFazendo(data) {
        const response = await httpClient.post("fazenda/salvar", data, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }

    async DeletarFazenda(id) {
        const response = await httpClient.delete(`fazenda/deletar?id=${id}`, null, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }

    async BuscarFazenda(id) {
        const response = await httpClient.get(`fazenda/buscar?id=${id}`, true);
        if (response.status !== 200) {
            return false;
        }
        const fazenda = await response.json();
        return fazenda;
    }

    async AtualizarFazenda(data) {
        const response = await httpClient.put("fazenda/atualizar", data, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }
}