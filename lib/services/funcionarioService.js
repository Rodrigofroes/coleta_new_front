import httpClient from "../http/httpClient";

export default class FuncionarioService {
    async listarFuncionarios(page = 1){
        const response = await httpClient.get(`funcionario/listar?page=${page}`, true);
        if (response.status !== 200) {
            return false;
        }
        const funcionarios = await response.json();
        return funcionarios;
    }
}