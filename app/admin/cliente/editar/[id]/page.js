"use client";
import Back from "@/components/back";
import ClienteForm from "@/components/forms/clienteForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { clienteSchema } from "@/lib/schema/zod";
import ClienteService from "@/lib/services/clienteService";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Cliente({ params }) {
    const { id } = use(params);

    const [loading, setLoading] = useState(false);
    const [cliente, setCliente] = useState({});
    const { toast } = useToast();
    const router = useRouter();
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({ resolver: zodResolver(clienteSchema) });

    const onSubmit = async (data) => {
        setLoading(true);
        data.cep = data.cep.replace(/\D/g, "");
        data.cpf = data.cpf.replace(/\D/g, "");
        data.telefone = data.telefone.replace(/\D/g, "");
        const obj = {
            id: id,
            ...data
        }
        const clienteService = new ClienteService();
        const cliente = await clienteService.AtualizarCliente(obj);
        if (!cliente) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao atualizar cliente",
                variant: "destructive"
            })
        }
        toast({
            title: "Sucesso",
            description: "Cliente atualizado com sucesso",
        });
        router.push("/admin/cliente");
        setLoading(false);
        setLoading(false);
    };

    const fetchCliente = async () => {
        setLoading(true);
        const clienteService = new ClienteService();
        const cliente = await clienteService.ObterCliente(id);
        if (!cliente) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao buscar cliente",
                variant: "destructive"
            });
        }
        setCliente(cliente);
        setLoading(false);
    }

    useEffect(() => {
        fetchCliente();
    }, [])

    return (
        <div className="container max-w-6xl justify-center items-center mx-auto p-6">
            <div className="mb-8">
                <div className="flex items-center gap-2">
                    <Back icon={<ArrowLeft className="h-4 w-4" />} text="Voltar" href="/admin/cliente" />
                </div>
            </div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">
                        Editar Cliente
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha os campos abaixo para editar um cliente.
                    </p>
                </div>
            </div>
            {loading ? (
                <Spinner className="text-black" message="Carregando..." />
            ) : (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ClienteForm control={control} register={register} errors={errors} setValue={setValue} cliente={cliente} />
                        <Button type="submit" className="mt-4 w-24" disabled={loading}>
                            {loading ? <Spinner /> : "Cadastrar"}
                        </Button>
                    </form>
                </>
            )
            }
        </div >
    );
}