"use client";
import Back from "@/components/back";
import FazendaForm from "@/components/forms/fazendaForm";
import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { fazendaSchema } from "@/lib/schema/zod";
import ClienteService from "@/lib/services/clienteService";
import FazendaService from "@/lib/services/fazendaService";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Fazenda({ params }) {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: zodResolver(fazendaSchema),
    });

    const { id } = use(params);

    const [location, setLocation] = useState(null);
    const [fazenda, setFazenda] = useState({});
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        data.lat = location?.lat ?? fazenda?.lat;
        data.lng = location?.lng ?? fazenda?.lng;
        data.id = id;
        const fazendaService = new FazendaService();
        const cadastrar = await fazendaService.AtualizarFazenda(data);
        if (!cadastrar) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao editar fazenda",
                variant: "destructive"
            });
        }
        setLoading(false);
        toast({
            title: "Sucesso",
            description: "Fazenda editada com sucesso",
            variant: "success"
        });
        return router.push("/admin/fazenda");
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

    const fetchFazenda = async (id) => {
        const fazendaService = new FazendaService();
        const fazenda = await fazendaService.BuscarFazenda(id);
        if (!fazenda) {
            return toast({
                title: "Erro",
                description: "Erro ao buscar fazenda",
                variant: "destructive"
            });
        }
        setFazenda(fazenda);
        setLocation({ lat: fazenda.lat, lng: fazenda.lng });
    }

    useEffect(() => {
        fetchClientes()
        fetchFazenda(id);
    }, [id]);

    return (
        <div className="container max-w-6xl justify-center items-center mx-auto p-6">
            <div className="mb-8">
                <div className="flex items-center gap-2">
                    <Back icon={<ArrowLeft className="h-4 w-4" />} text="Voltar" href="/admin/fazenda" />
                </div>
            </div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">
                        Editar Fazenda
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha os campos abaixo para editar uma fazenda.
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FazendaForm
                    control={control}
                    register={register}
                    initialValue={fazenda}
                    errors={errors}
                    clientes={clientes}
                    setValue={setValue}
                    children={<Map initial={fazenda}
                        onLocationSelect={setLocation}
                    />} />

                <Button type="submit" className="mt-4 w-24" disabled={loading}>
                    {loading ? <Spinner /> : "Cadastrar"}
                </Button>
            </form>
        </div>
    );
}