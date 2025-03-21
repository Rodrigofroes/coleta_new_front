import httpClient from "../http/httpClient";

export default class VisualizarMapaService {
    async GerarColeta(data) {
        const response = await httpClient.post("utils/generate-hexagons", data);
        if (response.status !== 200) {
            return false;
        }
        const d = await response.json();
        return d;
    }
}