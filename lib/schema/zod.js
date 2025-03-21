import { emailRegex, nomeRegex, senhaRegex, telefoneRegex, cpfRegex, nomeNumeroRegex, cnpjRegex, cepRegex, enderecoRegex, cidadeRegex, estadoRegex } from "./regex";
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => emailRegex.test(value), { message: "E-mail inválido" }),
    password: z.string()
        .min(1, { message: "Campo obrigatório" }),
});

const registroSchema = z.object({
    nomeCompleto: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => nomeRegex.test(value), { message: "Pelo menos dois nomes" }),
    telefone: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => telefoneRegex.test(value), { message: "Telefone inválido" }),
    cpf: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => cpfRegex.test(value), { message: "CNPJ inválido" }),
    email: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => emailRegex.test(value), { message: "E-mail inválido" }),
    senha: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => senhaRegex.test(value), { message: "Senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número." }),
});

const clienteSchema = z.object({
    nome: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => nomeRegex.test(value), { message: "Pelo menos dois nomes" }),
    telefone: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => telefoneRegex.test(value), { message: "Telefone inválido" }),
    cpf: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => cpfRegex.test(value), { message: "CPF inválido" }),
    email: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => emailRegex.test(value), { message: "E-mail inválido" }),
    cep: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => cepRegex.test(value), { message: "CEP inválido" }),
    endereco: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => enderecoRegex.test(value), { message: "Endereço inválido" }),
    cidade: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => cidadeRegex.test(value), { message: "Cidade inválida" }),
    estado: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => estadoRegex.test(value), { message: "Estado inválido" }),
})

const fazendaSchema = z.object({
    clienteID: z.string()
        .min(1, { message: "Campo obrigatório" }),
    nome: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => nomeRegex.test(value), { message: "Pelo menos dois nomes" }),
    endereco: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => enderecoRegex.test(value), { message: "Endereço inválido" }),
})

const safraSchema = z.object({
    fazendaID: z.string().min(1, { message: "Campo obrigatório" }),
    clienteID: z.string().min(1, { message: "Campo obrigatório" }),
    dataInicio: z.date().refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }, { message: "A data de início não pode ser no passado" }),
    dataFim: z.date().optional(),
    observacao: z.string().max(255, "Máximo de 255 caracteres").optional(),
});

const talhaoSchema = z.object({
    fazendaID: z.string().min(1, { message: "Campo obrigatório" }),
    clienteID: z.string().min(1, { message: "Campo obrigatório" }),
    talhoes: z.array(
        z.object({
            area: z.number(),
            nome: z.string().min(1, { message: "Campo obrigatório" }),
            observacao: z.string().max(255, "Máximo de 255 caracteres").optional(),
            coordenadas: z.array(
                z.object({
                    lat: z.number(),
                    lng: z.number(),
                })
            ),
        })
    ).min(1, { message: "Adicione pelo menos um talhão" }),
})

const visualizarMapaSchema = z.object({
    nome: z.string()
        .min(1, { message: "Campo obrigatório" })
        .refine((value) => nomeRegex.test(value), { message: "Pelo menos dois nomes" }),
    tipoColeta: z.string().min(1, { message: "Campo obrigatório" }),
    tipoAnalise: z.string().min(1, { message: "Campo obrigatório" }),
    funcionarioID: z.string().min(1, { message: "Campo obrigatório" }),
    observacao: z.string().max(255, "Máximo de 255 caracteres").optional(),
    quantidadeGrid: z.string().min(1, { message: "Campo obrigatório" }),
    quantidadePontos: z.string().min(1, { message: "Campo obrigatório" }),
})


export { loginSchema, registroSchema, clienteSchema, fazendaSchema, safraSchema, talhaoSchema, visualizarMapaSchema };
