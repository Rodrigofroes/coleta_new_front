import httpClient from "../http/httpClient";

export default class ClienteService {
    async ListarClientes(page = 1) {
        const response = await httpClient.get(`cliente/listar?page=${page}`, true);
        if (response.status !== 200) {
            return false;
        }
        const clientes = await response.json();
        return clientes;
    }

    async CadastrarCliente(cliente) {
        const response = await httpClient.post("cliente/salvar", cliente, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }

    async DeletarCliente(id) {
        const response = await httpClient.delete(`cliente/deletar?id=${id}`, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }

    async ObterCliente(id) {
        const response = await httpClient.get(`cliente/buscar?id=${id}`, true);
        if (response.status !== 200) {
            return false;
        }
        const cliente = await response.json();
        return cliente
    }

    async AtualizarCliente(cliente) {
        const response = await httpClient.put("cliente/atualizar", cliente, true);
        if (response.status !== 200) {
            return false;
        }
        return true;
    }
}