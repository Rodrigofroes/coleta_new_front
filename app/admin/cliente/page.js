"use client";
import Tables from "@/components/tables/Tables";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertDialogUI } from "@/components/alertDialog";
import ClienteService from "@/lib/services/clienteService";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { PaginationUI } from "@/components/pagination";
import { maskCep, maskCpf, maskPhone } from "@/lib/mask";
import { set } from "date-fns";

export default function Cliente() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [clientes, setClientes] = useState([]);
    const { toast } = useToast();
    const [showDialog, setShowDialog] = useState(false);
    const [confirmCallback, setConfirmCallback] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const currentPage = Number(searchParams.get("page")) || 1

    const columns = [
        { headerName: "Nome", field: "nome" },
        { headerName: "CPF", field: "cpf", renderCell: (params) => maskCpf(params.row.cpf) },
        { headerName: "Telefone", field: "telefone", renderCell: (params) => maskPhone(params.row.telefone) },
        { headerName: "E-mail", field: "email" },
        { headerName: "CEP", field: "cep", renderCell: (params) => maskCep(params.row.cep) },
        { headerName: "Endereco", field: "endereco", },
        { headerName: "Cidade", field: "cidade", },
        { headerName: "Estado", field: "estado", },
        {
            headerName: "Ações",
            field: "acoes",
            renderCell: (params) => (
                <div className="flex justify-center gap-3">
                    <Button size="sm" onClick={() => editarCliente(params.row.id)}>
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={() => deletarCliente(params.row.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const editarCliente = (id) => {
        router.push(`/admin/cliente/editar/${id}`);
    };

    const deletarCliente = async (id) => {
        setShowDialog(true);
        setConfirmCallback(() => async () => {
            setLoading(true);
            const clienteService = new ClienteService();
            const deletar = await clienteService.DeletarCliente(id);
            if (!deletar) {
                setShowDialog(false);
                setLoading(false);
                return toast({
                    title: "Erro",
                    description: "Erro ao deletar cliente",
                    variant: "destructive",
                });
            }

            toast({
                title: "Sucesso",
                description: "Cliente deletado com sucesso",
            });
            setShowDialog(false);
            setLoading(false);
            fetchClientes();
        });
    };


    const fetchClientes = async (page) => {
        setLoading(true);
        const clienteService = new ClienteService();
        const clientes = await clienteService.ListarClientes(page);
        if (!clientes) {
            setLoading(false);
            return toast({
                title: "Erro",
                description: "Erro ao buscar clientes",
                variant: "destructive"
            });
        }
        setClientes(clientes.items);
        setTotalPage(clientes.totalPages);
        setLoading(false);
    };

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("page", currentPage);
        router.push(`${window.location.pathname}?${params.toString()}`)
    }, []);

    useEffect(() => {
        fetchClientes(searchParams)
    }, [currentPage]);

    return (
        <div className="container  max-w-full justify-center items-center mx-auto p-6">
            <AlertDialogUI
                title="Confirmação de exclusão"
                description="Deseja realmente deletar este cliente?"
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                onConfirm={confirmCallback}
            />
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">Clientes</h1>
                    <p className="text-muted-foreground">Lista de clientes cadastrados</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <Link className="flex items-center justify-center" href="/admin/cliente/novo">
                        <Button className="px-4">Novo Cliente</Button>
                    </Link>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spinner className="text-black" message="Carregando..." />
                </div>
            ) : (
                <>
                    <Tables data={clientes} columns={columns} />
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