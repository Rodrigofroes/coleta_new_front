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

export default function FazendaForm({ initialValue, control, register, errors, clientes, setValue, children }) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (initialValue) {
            setValue("nome", initialValue.nome || "");
            setValue("endereco", initialValue.endereco || "");
            setValue("clienteID", initialValue.clienteID || "");

            const clienteInicial = clientes.find(cliente => cliente.id === initialValue.clienteID);
            if (clienteInicial) {
                setSearchTerm(clienteInicial.nome);
            }
        }
    }, [initialValue, setValue, clientes]);

    const filterCliente = searchTerm
        ? clientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : clientes;

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label>Cliente</Label>
                    <Controller
                        name="clienteID"
                        control={control}
                        rules={{ required: "Campo obrigatório" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    const cliente = clientes.find(c => c.id === value);
                                    if (cliente) {
                                        setSearchTerm(cliente.nome);
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
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
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
            </div>

            <div className="mt-6">{children}</div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label htmlFor="nome">Nome da Fazenda</Label>
                    <Input
                        id="nome"
                        type="text"
                        {...register("nome")}
                        placeholder="Fazenda Gaspar"
                    />
                    {errors.nome && <p className="text-red-500 text-sm">*{errors.nome.message}</p>}
                </div>

                <div>
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                        id="endereco"
                        type="text"
                        {...register("endereco")}
                        placeholder="Rua do cliente"
                    />
                    {errors.endereco && <p className="text-red-500 text-sm">*{errors.endereco.message}</p>}
                </div>
            </div>
        </div>
    );
}
