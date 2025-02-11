import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function RegistroForm({ register, errors }) {
    return (
        <div className="">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                        type="text"
                        id="nome"
                        placeholder="Ex: João Silva"
                        {...register("nomeCompleto")}
                        className="mt-1 block w-full px-3 py-2"
                    />
                    {errors.nomeCompleto && (<p className="text-red-500 text-sm">*{errors.nomeCompleto.message}</p>)}
                </div>
                <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                        type="text"
                        id="telefone"
                        placeholder="Ex: 1899999-9999"
                        {...register("telefone")}
                        className="mt-1 block w-full px-3 py-2"
                    />
                    {errors.telefone && (<p className="text-red-500 text-sm">*{errors.telefone.message}</p>)}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                        type="text"
                        id="cpf"
                        placeholder="Ex: 999.999.999-99"
                        {...register("cpf")}
                        className="mt-1 block w-full px-3 py-2"
                    />
                    {errors.cpf && (<p className="text-red-500 text-sm">*{errors.cpf.message}</p>)}
                </div>
                <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Ex: joaosilva@dominio.com"
                        {...register("email")}
                        className="mt-1 block w-full px-3 py-2"
                    />
                    {errors.email && (<p className="text-red-500 text-sm">*{errors.email.message}</p>)}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                        type="password"
                        id="senha"
                        placeholder="••••••••"
                        {...register("senha")}
                        className="mt-1 block w-full px-3 py-2"
                    />
                    {errors.senha && (<p className="text-red-500 text-sm">*{errors.senha.message}</p>)}
                </div>
            </div>
        </div>
    );
}