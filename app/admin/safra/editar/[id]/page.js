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
import { se } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Safra({ params }) {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: zodResolver(safraSchema),
    });
    const [clientes, setClientes] = useState([]);
    const [fazendas, setFazendas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [safra, setSafra] = useState({});
    const { toast } = useToast();
    const router = useRouter();
    const { id } = use(params);

    const onSubmit = async (data) => {
        setLoading(true);
        data.dataInicio = new Date(data.dataInicio).toISOString();
        data.dataFim ? data.dataFim = new Date(data.dataFim).toISOString() : null;
        let obj = {
            ...data,
            id: id
        }
        const safraService = new SafraService();
        const cadastrar = await safraService.AtualizarSafra(obj);
        if (!cadastrar) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao atualizar safra",
                variant: "destructive"
            });
        }
        setLoading(false);
        toast({
            title: "Sucesso",
            description: "Safra atualizada com sucesso",
            variant: "success"
        });
        return router.push("/admin/safra");
    }

    useEffect(() => {
        fetchSafra(id);
        fetchClientes()
        fetchFazendas()
    }, [id]);

    const fetchClientes = async () => {
        setLoading(true);
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
        setLoading(false);
    };

    const fetchFazendas = async () => {
        setLoading(true);
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
        setLoading(false);
    }

    const fetchSafra = async (id) => {
        setLoading(true);
        const safraService = new SafraService();
        const safra = await safraService.BuscarSafra(id);
        if (!safra) {
            return toast({
                title: "Erro",
                description: "Erro ao buscar safra",
                variant: "destructive"
            });
        }
        safra.dataInicio = new Date(safra.dataInicio);
        safra.dataFim = safra.dataFim ? new Date(safra.dataFim) : undefined;
        setSafra(safra);
        setLoading(false);
    }


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
                        Editar Safra
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha os campos abaixo para editar uma safra.
                    </p>
                </div>
            </div>
            {loading ?
                <Spinner className="text-black" message="Carregando..." /> : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <SafraForm control={control} initialValue={safra} register={register} errors={errors} fazendas={fazendas} clientes={clientes} setValue={setValue} />
                            <Button type="submit" className="mt-4 w-24" disabled={loading}>
                                {loading ? <Spinner /> : "Cadastrar"}
                            </Button>
                        </form>
                    </>
                )}
        </div>
    );
}