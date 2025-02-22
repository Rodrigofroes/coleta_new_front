import { Label } from "@radix-ui/react-label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "../calendario";
import { Textarea } from "../ui/textarea";

export default function SafraForm({ initialValue, control, register, errors, clientes, fazendas, setValue }) {
    const [clienteSearch, setClienteSearch] = useState("");
    const [fazendaSearch, setFazendaSearch] = useState("");
    const [obs, setObs] = useState("");
    const maxObs = 255;

    useEffect(() => {
        if (initialValue) {
            setValue("clienteID", initialValue.clienteID);
            setValue("fazendaID", initialValue.fazendaID);
            setValue("dataInicio", initialValue.dataInicio);
            setValue("dataFim", initialValue.dataFim);
            setValue("observacao", initialValue.observacao);

            const clienteInicial = clientes.find(cliente => cliente.id === initialValue.clienteID);
            if (clienteInicial) {
                setClienteSearch(clienteInicial.nome);
            }

            const fazendaInicial = fazendas.find(fazenda => fazenda.id === initialValue.fazendaID);
            if (fazendaInicial) {
                setFazendaSearch(fazendaInicial.nome);
            }
        }
    }, [initialValue, setValue, clientes]);

    const filterCliente = clienteSearch
        ? clientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(clienteSearch.toLowerCase())
        )
        : clientes;

    const filterFazenda = fazendaSearch
        ? fazendas.filter(fazenda =>
            fazenda.nome.toLowerCase().includes(fazendaSearch.toLowerCase())
        )
        : fazendas;

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label htmlFor="clienteID">Cliente</Label>
                    <Controller
                        name="clienteID"
                        control={control}
                        rules={{ required: "Campo obrigatório" }}
                        render={({ field }) => (
                            <Select
                                name="clienteID"
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    const cliente = clientes.find(c => c.id === value);
                                    if (cliente) {
                                        setClienteSearch(cliente.nome);
                                    }
                                }}
                                value={field.value || ""}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um cliente..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <Input
                                        type="text"
                                        placeholder="Buscar cliente..."
                                        value={clienteSearch}
                                        onChange={(e) => setClienteSearch(e.target.value)}
                                        className="p-2"
                                    />
                                    {filterCliente.length > 0 ? (
                                        filterCliente.map((cliente) => (
                                            <SelectItem key={cliente.id} value={cliente.id}>
                                                {cliente.nome}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <p className="p-2 text-gray-500">Nenhum cliente encontrado.</p>
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.clienteID && <p className="text-red-500 text-sm">*{errors.clienteID.message}</p>}
                </div>
                <div>
                    <Label htmlFor="fazendaID">Fazenda</Label>
                    <Controller
                        name="fazendaID"
                        control={control}
                        rules={{ required: "Campo obrigatório" }}
                        render={({ field }) => (
                            <Select
                                name="fazendaID"
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    const cliente = fazendas.find(c => c.id === value);
                                    if (cliente) {
                                        setFazendaSearch(cliente.nome);
                                    }
                                }}
                                value={field.value || ""}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um cliente..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <Input
                                        type="text"
                                        placeholder="Buscar cliente..."
                                        value={fazendaSearch}
                                        onChange={(e) => setFazendaSearch(e.target.value)}
                                        className="p-2"
                                    />
                                    {filterFazenda.length > 0 ? (
                                        filterFazenda.map((cliente) => (
                                            <SelectItem key={cliente.id} value={cliente.id}>
                                                {cliente.nome}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <p className="p-2 text-gray-500">Nenhum fazenda encontrado.</p>
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.fazendaID && <p className="text-red-500 text-sm">*{errors.fazendaID.message}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label htmlFor="dataInicio">Data Inicio</Label>
                    <DatePicker control={control} name="dataInicio" />
                    {errors.dataInicio && <p className="text-red-500 text-sm">*{errors.dataInicio.message}</p>}
                </div>
                <div>
                    <Label htmlFor="dataFim">Data Termino</Label>
                    <DatePicker control={control} name="dataFim" />
                    {errors.dataFim && <p className="text-red-500 text-sm">*{errors.dataFim.message}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label htmlFor="observacao">Observações</Label>
                    <Textarea
                        id="observacao"
                        {...register("observacao")}
                        placeholder="Observações"
                        value={obs}
                        onChange={(e) => {
                            if (e.target.value.length <= maxObs) {
                                setObs(e.target.value);
                            }
                        }}
                    />
                    <span className="text-primary text-sm">
                        {obs.length }/{maxObs} caracteres
                    </span>
                    {errors.obs && <p className="text-red-500 text-sm">*{errors.obs.message}</p>}
                </div>
            </div>
        </div>
    );
}
