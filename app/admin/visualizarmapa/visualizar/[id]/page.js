"use client";
import Back from "@/components/back";
import { Spinner } from "@/components/ui/spinner";
import TalhaoService from "@/lib/services/talhaoService";
import { ArrowLeft } from "lucide-react";
import { use, useEffect, useState } from "react";
import VisualizarMapaFormContainer from "@/components/forms/visualizarMapaFormContainer";
import { useToast } from "@/hooks/use-toast";

export default function VisualizarMapa({ params }) {
    const { id } = use(params);
    const [loading, setLoading] = useState(false);
    const [talhao, setTalhao] = useState({});

    const fetchTalhao = async (id) => {
        setLoading(true);
        const talhaoService = new TalhaoService();
        const talhao = await talhaoService.ObterTalhao(id);
        if (!talhao) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao buscar talhão",
                variant: "destructive"
            });
        }
        setLoading(false);
        setTalhao(talhao);
    }

    useEffect(() => {
        fetchTalhao(id);
    }, [id]);

    return (
        <div className="container max-w-6xl justify-center items-center mx-auto p-6">
        {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                <Spinner message="carregando..." className="text-white w-10 h-10" />
            </div>
        )}
        <div className="mb-8">
            <div className="flex items-center gap-2">
                <Back icon={<ArrowLeft className="h-4 w-4" />} text="Voltar" href="/admin/visualizarmapa" />
            </div>
        </div>
        <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="mt-4 text-3xl font-bold">
                    Visualizar Mapa
                </h1>
                <p className="text-muted-foreground">
                    Preencha os campos abaixo para cadastrar um mapa.
                </p>
            </div>
        </div>
        <VisualizarMapaFormContainer initialValue={talhao} />
    </div>
    );
}