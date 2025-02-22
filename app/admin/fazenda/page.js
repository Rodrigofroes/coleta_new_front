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
import FazendaService from "@/lib/services/fazendaService";
import { set } from "date-fns";

export default function Fazenda() {
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
        { headerName: "Nome", field: "nome" },
        { headerName: "Enderenco", field: "endereco", },
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
        router.push(`/admin/fazenda/editar/${id}`);
    };

    const deletarFazenda = async (id) => {
        setShowDialog(true);
        setConfirmCallback(() => async () => {
            setLoading(true);
            const fazendaCliente = new FazendaService();
            const deletar = await fazendaCliente.DeletarFazenda(id);
            if (!deletar) {
                setShowDialog(false);
                setLoading(false);
                return toast({
                    title: "Erro",
                    description: "Erro ao deletar fazenda",
                    variant: "destructive",
                });
            }

            toast({
                title: "Sucesso",
                description: "Fazenda deletado com sucesso",
            });
            setShowDialog(false);
            setLoading(false);
            fetchFazendas();
        });
    };


    const fetchFazendas = async (page) => {
        setLoading(true);
        const fazendaService = new FazendaService();
        const fazendas = await fazendaService.ListarFazendas(page);
        if (!fazendas) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao buscar fazendas",
                variant: "destructive"
            });
        }
        setFazenda(fazendas.items);
        setTotalPage(fazendas.currentPage);
        setLoading(false);
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", currentPage);
        router.push(`${window.location.pathname}?${params.toString()}`)
    }, [])

    useEffect(() => {
        fetchFazendas(searchParams)
    }, [searchParams, currentPage]);


    return (
        <div className="container  max-w-full justify-center items-center mx-auto p-6">
            <AlertDialogUI
                title="Confirmação de exclusão"
                description="Deseja realmente deletar este fazenda?"
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                onConfirm={confirmCallback}
            />
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">Fazendas</h1>
                    <p className="text-muted-foreground">Lista de fazendas cadastradas</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <Link className="flex items-center justify-center" href="/admin/fazenda/novo">
                        <Button className="px-4">Nova Fazenda</Button>
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
                            totalPage={totalPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}