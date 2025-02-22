"use client";
import Back from "@/components/back";
import SafraForm from "@/components/forms/safraForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { safraSchema } from "@/lib/schema/zod";
import ClienteService from "@/lib/services/clienteService";
import FazendaService from "@/lib/services/fazendaService";
import SafraService from "@/lib/services/safraService";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Safra() {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: zodResolver(safraSchema),
    });
    const [clientes, setClientes] = useState([]);
    const [fazendas, setFazendas] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        data.dataInicio = new Date(data.dataInicio).toISOString();
        data.dataFim = "0001-01-01T00:00:00" ? null : data.dataFim = new Date(data.dataFim).toISOString();

        const safraService = new SafraService();
        const cadastrar = await safraService.CadastrarSafra(data);
        if (!cadastrar) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao cadastrar safra",
                variant: "destructive"
            });
        }
        setLoading(false);
        toast({
            title: "Sucesso",
            description: "Safra cadastrada com sucesso",
            variant: "success"
        });
        return router.push("/admin/safra");
    }

    const fetchClientes = async () => {
        const clienteService = new ClienteService();
        const clientes = await clienteService.ListarTodosClientes();
        if (!clientes) {
            return toast({
                title: "Erro",
                description: "Erro ao listar clientes",
                variant: "destructive"
            });
        }
        setClientes(clientes);
    };

    const fetchFazendas = async () => {
        const fazendaService = new FazendaService();
        const fazendas = await fazendaService.ListarTodasFazendas();
        if (!fazendas) {
            return toast({
                title: "Erro",
                description: "Erro ao listar fazendas",
                variant: "destructive"
            });
        }
        setFazendas(fazendas);
    }

    useEffect(() => {
        fetchClientes()
        fetchFazendas()
    }, []);

    return (
        <div className="container max-w-6xl justify-center items-center mx-auto p-6">
            <div className="mb-8">
                <div className="flex items-center gap-2">
                    <Back icon={<ArrowLeft className="h-4 w-4" />} text="Voltar" href="/admin/safra" />
                </div>
            </div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">
                        Nova Safra
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha os campos abaixo para cadastrar uma safra.
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SafraForm control={control} register={register} errors={errors} fazendas={fazendas} clientes={clientes} setValue={setValue} />
                <Button type="submit" className="mt-4 w-24" disabled={loading}>
                    {loading ? <Spinner /> : "Cadastrar"}
                </Button>
            </form>
        </div>
    );
}