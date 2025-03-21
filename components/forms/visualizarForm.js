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
import { Textarea } from "../ui/textarea";

// Mocked data
const TIPO_COLETA = [
    { id: "Hexagonal", nome: 'Hexagonal (zonas)' },
    { id: "Retangular", nome: 'Retangular (zonas)' },
    { id: "PontosAmostrais", nome: 'Pontos Amostral' },
];

const TIPO_ANALISE = [
    { id: "Macronutrientes", nome: 'Macronutrientes' },
    { id: "Micronutrientes", nome: 'Micronutrientes' },
    { id: "Textura", nome: 'Textura' },
    { id: "Microbiologica", nome: 'Microbiologica (Metagenomica)' },
    { id: "BioAs", nome: 'BioAs' },
    { id: "Compactacao", nome: 'Compactação' },
    { id: "Outros", nome: 'Outros' },
];

const PROFUNDIDADE = [
    { id: "ZeroADez", nome: '00-10 cm' },
    { id: "ZeroAVinte", nome: '00-20 cm' },
    { id: "ZeroATrinta", nome: '00-30 cm' },
    { id: "ZeroAQuarenta", nome: '00-40 cm' },
    { id: "ZeroACinquenta", nome: '00-50 cm' },
    { id: "ZeroASetenta", nome: '00-60 cm' },
    { id: "DezAVinte", nome: '10-20 cm' },
    { id: "VinteATrinta", nome: '20-30 cm' },
    { id: "TrintaAQuarenta", nome: '30-40 cm' },
    { id: "QuarentaACinquenta", nome: '40-50 cm' },
    { id: "CinquentaASetenta", nome: '50-60 cm' },
];

const FUNCIONARIOS = [
    { id: 'João Silva', nome: 'João Silva' },
    { id: 'Maria Santos', nome: 'Maria Santos' },
    { id: 'Pedro Oliveira', nome: 'Pedro Oliveira' },
];

export default function VisualizarForm({ control, register, errors, children, onChangeColeta, onChangeQuantidade }) {
    return (
        <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                    <Label htmlFor="nome">Nome da Coleta</Label>
                    <Input
                        id="nome"
                        placeholder="Digite o nome da coleta"
                        {...register("nome")}
                        className="mt-1"
                    />
                    {errors.nome && <p className="text-red-500 text-sm">*{errors.nome.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="tipoColeta">Tipo da Coleta</Label>
                        <Controller
                            name="tipoColeta"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        onChangeColeta(value);
                                    }}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo de coleta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TIPO_COLETA.map((tipo) => (
                                            <SelectItem key={tipo.id} value={tipo.id}>
                                                {tipo.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.tipoColeta && <p className="text-red-500 text-sm">*{errors.tipoColeta.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="tipoColeta">Área do grid (ha) </Label>
                        <Input id="quantidade"
                            placeholder="Digite a quantidade"
                            {...register("quantidadeGrid")}
                            onChange={(e) => {
                                onChangeQuantidade(e.target.value);
                            }}
                        />
                        {errors.quantidadeGrid && <p className="text-red-500 text-sm">*{errors.quantidadeGrid.message}</p>}
                    </div>

                </div>
                <div>
                    <Label htmlFor="tipoAnalise">Tipo de Análise</Label>
                    <Controller
                        name="tipoAnalise"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo de análise" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TIPO_ANALISE.map((tipo) => (
                                        <SelectItem key={tipo.id} value={tipo.id}>
                                            {tipo.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.tipoAnalise && <p className="text-red-500 text-sm">*{errors.tipoAnalise.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="profundidade">Profundidade</Label>
                        <Controller
                            name="profundidade"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a profundidade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PROFUNDIDADE.map((prof) => (
                                            <SelectItem key={prof.id} value={prof.id}>
                                                {prof.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.profundidade && <p className="text-red-500 text-sm">*{errors.profundidade.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="tipoColeta">Quantidade de Pontos</Label>
                        <Input id="quantidade" placeholder="Digite a quantidade" {...register("quantidadePontos")} />
                        {errors.quantidadePontos && <p className="text-red-500 text-sm">*{errors.quantidadePontos.message}</p>}
                    </div>
                </div>


                <div>
                    <Label htmlFor="funcionarioID">Funcionário</Label>
                    <Controller
                        name="funcionarioID"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o funcionário" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FUNCIONARIOS.map((func) => (
                                        <SelectItem key={func.id} value={func.id}>
                                            {func.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.funcionarioID && <p className="text-red-500 text-sm">*{errors.funcionarioID.message}</p>}
                </div>
                <div>
                    <Label htmlFor="observacao">Observação</Label>
                    <Textarea
                        id="observacao"
                        placeholder="Digite uma observação (opcional)"
                        {...register("observacao")}
                        className="mt-1"
                    />
                    {errors.observacao && <p className="text-red-500 text-sm">*{errors.observacao.message}</p>}
                </div>

            </div>
            {children}
        </div>
    );
}
