import { emailRegex, nomeRegex, senhaRegex, telefoneRegex, cpfRegex, cnpjRegex, cepRegex, enderecoRegex, cidadeRegex, estadoRegex } from "./regex";
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
        .refine((value) => cnpjRegex.test(value), { message: "CPF inválido" }),
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

export { loginSchema, registroSchema, clienteSchema };
