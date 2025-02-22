import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import CepAdapter from "@/lib/adapter/cep";
import { maskCep, maskCpf, maskPhone } from "@/lib/mask";

export default function ClienteForm({ control, register, errors, cliente, setValue }) {
    const [cep, setCep] = useState({});
    useEffect(() => {
        if (cliente) {
            setValue("nome", cliente.nome);
            setValue("cpf", maskCpf(cliente.cpf));
            setValue("telefone", maskPhone(cliente.telefone));
            setValue("email", cliente.email);
            setValue("cep", maskCep(cliente.cep));
            setValue("endereco", cliente.endereco);
            setValue("cidade", cliente.cidade);
            setValue("estado", cliente.estado);
        }
    }, [cliente]);

    const ufs = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
    ];

    const buscarCep = async (data) => {
        const cepAdapter = new CepAdapter();
        const buscarcep = await cepAdapter.buscarCep(data);
        if (!buscarcep) {
            return;
        }
        setCep(buscarcep);
        setValue("endereco", buscarcep.logradouro);
        setValue("cidade", buscarcep.localidade);
        setValue("estado", buscarcep.uf);
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                        id="nome"
                        type="text"
                        {...register("nome")}
                        placeholder="Ex: João da Silva"
                    />
                    {errors.nome && (<p className="text-red-500 text-sm">*{errors.nome.message}</p>)}
                </div>
                <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                        id="cpf"
                        type="text"
                        {...register("cpf")}
                        placeholder="000.000.000-00"
                        onChange={(e) => setValue("cpf", maskCpf(e.target.value))}
                    />
                    {errors.cpf && (<p className="text-red-500 text-sm">*{errors.cpf.message}</p>)}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                        id="telefone"
                        type="text"
                        {...register("telefone")}
                        placeholder="(00) 00000-0000"
                        onChange={(e) => setValue("telefone", maskPhone(e.target.value))}
                    />
                    {errors.telefone && (<p className="text-red-500 text-sm">*{errors.telefone.message}</p>)}
                </div>
                <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        type="text"
                        {...register("email")}
                        placeholder="exemplo@email.com"
                    />
                    {errors.email && (<p className="text-red-500 text-sm">*{errors.email.message}</p>)}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                        id="cep"
                        type="text"
                        {...register("cep")}
                        placeholder="00000-000"
                        onBlur={(e) => buscarCep(e.target.value)}
                        onChange={(e) => setValue("cep", maskCep(e.target.value))}
                    />
                    {errors.cep && (<p className="text-red-500 text-sm">*{errors.cep.message}</p>)}
                </div>
                <div>
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                        id="endereco"
                        type="text"
                        {...register("endereco")}
                        placeholder="Rua Exemplo, 123"
                    />
                    {errors.endereco && (<p className="text-red-500 text-sm">*{errors.endereco.message}</p>)}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                        id="cidade"
                        type="text"
                        {...register("cidade")}
                        placeholder="Nome da Cidade"
                    />
                    {errors.cidade && (<p className="text-red-500 text-sm">*{errors.cidade.message}</p>)}
                </div>

                <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Controller
                        name="estado"
                        control={control}
                        rules={{ required: "Campo obrigatório" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ufs.map((uf, index) => (
                                        <SelectItem key={index} value={uf}>
                                            {uf}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.estado && <p className="text-red-500 text-sm">*{errors.estado.message}</p>}
                </div>
            </div>
        </div>
    );
}
