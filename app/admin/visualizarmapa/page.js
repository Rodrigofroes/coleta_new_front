"use client";
import AccordionWithTables from "@/components/accordion/accordion";
import { AlertDialogUI } from "@/components/alertDialog";
import { PaginationUI } from "@/components/pagination";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import TalhaoService from "@/lib/services/talhaoService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VisualizarMapa() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fazenda, setFazenda] = useState([]);
    const { toast } = useToast();
    const [showDialog, setShowDialog] = useState(false);
    const [confirmCallback, setConfirmCallback] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const currentPage = Number(searchParams.get("page")) || 1

    const fetchTalhao = async (page) => {
        setLoading(true);
        const talhaoService = new TalhaoService();
        const talhao = await talhaoService.ListarTalhao(page);
        if (!talhao) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao buscar talhão",
                variant: "destructive"
            });
        }
        setFazenda(talhao.items);
        setTotalPage(talhao.totalPages)
        setLoading(false);
    };

        const visualizar = (id) => {
            router.push(`/admin/visualizarmapa/visualizar/${id}`);
        };
    
        const deletar = async (id) => {
            setShowDialog(true);
            setConfirmCallback(() => async () => {
                setLoading(true);
                const talhaoService = new TalhaoService();
                const deletar = await talhaoService.DeletarTalhao(id);
                if (!deletar) {
                    setLoading(false);
                    setShowDialog(false);
                    return toast({
                        title: "Erro",
                        description: "Erro ao deletar talhão",
                        variant: "destructive",
                    });
                }
    
                toast({
                    title: "Sucesso",
                    description: "Talhão deletado com sucesso",
                });
                setShowDialog(false);
                setLoading(false);
                fetchTalhao();
            });
        };

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("page", currentPage);
        router.push(`${window.location.pathname}?${params.toString()}`)
    }, []);

    useEffect(() => {
        fetchTalhao(searchParams)
    }, [currentPage, searchParams]);

    return (
        <div className="container  max-w-full justify-center items-center mx-auto p-6">
            <AlertDialogUI
                title="Confirmação de exclusão"
                description="Deseja realmente deletar esta talhão?"
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                onConfirm={confirmCallback}
            />
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">Visualizar Mapa</h1>
                    <p className="text-muted-foreground">Lista de mapas cadastradas</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <Link className="flex items-center justify-center" href="/admin/visualizarmapa/novo" />
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spinner className="text-black" message="Carregando..." />
                </div>
            ) : (
                <>
                    <AccordionWithTables data={fazenda} isVisualizarMapa={true} visualizar={visualizar} />
                    <div className="mt-4 flex justify-end items-center">
                        <PaginationUI
                            totalPage={totalPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}