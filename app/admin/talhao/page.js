"use client";
import Tables from "@/components/tables/Tables";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertDialogUI } from "@/components/alertDialog";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { PaginationUI } from "@/components/pagination";
import SafraService from "@/lib/services/safraService";
import TalhaoService from "@/lib/services/talhaoService";

export default function Talhao() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fazenda, setFazenda] = useState([]);
    const { toast } = useToast();
    const [showDialog, setShowDialog] = useState(false);
    const [confirmCallback, setConfirmCallback] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const currentPage = Number(searchParams.get("page")) || 1

    const columns = [
        { headerName: "Fazenda", field: "fazenda", renderCell: (params) => params.row.fazenda.nome },
        { headerName: "Cliente", field: "cliente", renderCell: (params) => params.row.cliente.nome },
        { headerName: "Cultura", field: "cultura", renderCell: (params) => params.row.cultura },
        { headerName: "Variedade", field: "variedade", renderCell: (params) => params.row.variedade },
        {
            headerName: "Ações",
            field: "acoes",
            renderCell: (params) => (
                <div className="flex justify-center gap-3">
                    <Button size="sm" onClick={() => editarFazenda(params.row.id)}>
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={() => deletarFazenda(params.row.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const editarFazenda = (id) => {
        router.push(`/admin/safra/editar/${id}`);
    };

    const deletarFazenda = async (id) => {
        setShowDialog(true);
        setConfirmCallback(() => async () => {
            setLoading(true);
            const safraService = new SafraService();
            const deletar = await safraService.DeletarSafra(id);
            if (!deletar) {
                setLoading(false);
                setShowDialog(false);
                return toast({
                    title: "Erro",
                    description: "Erro ao deletar safra",
                    variant: "destructive",
                });
            }

            toast({
                title: "Sucesso",
                description: "Safra deletado com sucesso",
            });
            setShowDialog(false);
            setLoading(false);
            fetchSafra();
        });
    };

    const fetchSafra = async (page) => {
        setLoading(true);
        const talhaoService = new TalhaoService();
        const talhao = await talhaoService.ListarTalhao(page);
        if (!talhao) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao buscar talhao",
                variant: "destructive"
            });
        }
        setFazenda(talhao.items);
        setTotalPage(talhao.totalPages)
        setLoading(false);
    };

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("page", currentPage);
        router.push(`${window.location.pathname}?${params.toString()}`)
    }, []);

    useEffect(() => {
        fetchSafra(searchParams)
    }, [currentPage, searchParams]);

    return (
        <div className="container  max-w-full justify-center items-center mx-auto p-6">
            <AlertDialogUI
                title="Confirmação de exclusão"
                description="Deseja realmente deletar esta safra?"
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                onConfirm={confirmCallback}
            />
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">Talhões</h1>
                    <p className="text-muted-foreground">Lista de talhões cadastradas</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <Link className="flex items-center justify-center" href="/admin/talhao/novo">
                        <Button className="px-4">Novo Talhão</Button>
                    </Link>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spinner className="text-black" message="Carregando..." />
                </div>
            ) : (
                <>
                    <Tables data={fazenda} columns={columns} />
                    <div className="mt-4 flex justify-end items-center">
                        <PaginationUI
                            totalPage={1}
                        />
                    </div>
                </>
            )}
        </div>
    );
}