export default class CepAdapter {
    #link;
    constructor() {
        this.#link = 'https://viacep.com.br/ws/';
    }

    async buscarCep(cep) {
        const response = await fetch(`${this.#link}${cep}/json`);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    }
}