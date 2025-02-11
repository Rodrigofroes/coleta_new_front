"use client";
import Back from "@/components/back";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema } from "@/lib/schema/zod";
import ClienteForm from "@/components/forms/clienteForm";
import { useState } from "react";
import ClienteService from "@/lib/services/clienteService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";


export default function Cliente() {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: zodResolver(clienteSchema),
    });

    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        const clienteService = new ClienteService();
        const cliente = await clienteService.CadastrarCliente(data);
        if (!cliente) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao cadastrar cliente",
                variant: "destructive"
            })
        }
        toast({
            title: "Sucesso",
            description: "Cliente cadastrado com sucesso",
        });
        router.push("/admin/cliente");
        setLoading(false);
    }

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
                        Novo Cliente
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha os campos abaixo para cadastrar um cliente.
                    </p>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ClienteForm control={control} register={register} errors={errors} setValue={setValue} />
                    <Button type="submit" className="mt-4 w-24" disabled={loading}>
                        {loading ? <Spinner /> : "Cadastrar"}
                    </Button>
                </form>
            </div>
        </div>
    );
}