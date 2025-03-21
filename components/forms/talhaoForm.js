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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function TalhaoForm({ handleCoordendas, watch, handleDeletePolygon, initialValue, polygons, children, control, register, errors, clientes, fazendas, setValue }) {
    const [clienteSearch, setClienteSearch] = useState("");
    const [fazendaSearch, setFazendaSearch] = useState("");

    useEffect(() => {
        if (initialValue) {
            setValue("clienteID", initialValue.clienteID);
            setValue("fazendaID", initialValue.fazendaID);
            setValue("nome", initialValue.nome);
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
                                        handleCoordendas(cliente);
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
            {children}
            <Card className="mt-6 shadow-lg rounded-lg border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Talhões
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row gap-1 flex-wrap">
                    {polygons.length > 0 ? (
                        polygons.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 justify-between p-3 bg-gray-100 rounded-lg">
                                <div className="flex flex-col items-start gap-2">
                                    <div>
                                        <Label htmlFor={`talhoes.${index}.nome`}>Nome</Label>
                                        <Input
                                            type="text"
                                            placeholder="Nome do talhão"
                                            {...register(`talhoes.${index}.nome`)}
                                        />
                                        {errors.talhoes?.[index]?.nome && (
                                            <p className="text-red-500 text-sm">
                                                *{errors.talhoes[index].nome.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <p>Área: {item.area} hectares</p>
                                    </div>
                                    <div>
                                        <Label htmlFor={`talhoes.${index}.observacao`}>Observações</Label>
                                        <Textarea
                                            id={`talhoes.${index}.observacao`}
                                            {...register(`talhoes.${index}.observacao`)}
                                            placeholder="Observações"
                                        />
                                        <span className="text-primary text-sm">
                                            {watch(`talhoes.${index}.observacao`, "").length}/255 caracteres
                                        </span>
                                        {errors.talhoes?.[index]?.observacao && (
                                            <p className="text-red-500 text-sm">
                                                *{errors.talhoes[index].observacao.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            type="button"
                                            onClick={(e) => handleDeletePolygon(e, item.polygon)}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Nenhum talhão desenhado ainda.</p>
                    )}
                </CardContent>
            </Card>
            {errors.talhoes && <p className="text-red-500 text-sm">*{errors.talhoes.message}</p>}
        </div>
    );
}
