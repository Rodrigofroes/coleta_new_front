"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import ClienteService from "@/lib/services/clienteService";
import FazendaService from "@/lib/services/fazendaService";
import TalhaoService from "@/lib/services/talhaoService";
import TalhaoFormContainer from "@/components/forms/TalhaoFormContainer";
import Back from "@/components/back";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Talhao() {
  const [clientes, setClientes] = useState([]);
  const [fazendas, setFazendas] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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
  };

  useEffect(() => {
    fetchClientes();
    fetchFazendas();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const talhaoService = new TalhaoService();
    const cadastrar = await talhaoService.CadastrarTalhao(data);
    if (!cadastrar) {
      setLoadingFazendas(false);
      return toast({
        title: "Erro",
        description: "Erro ao cadastrar talhão",
        variant: "destructive"
      });
    }
    toast({
      title: "Sucesso",
      description: "Talhão cadastrado com sucesso",
      variant: "success"
    });
    setLoading(false);
    router.push("/admin/talhao");
  };

  return (
    <div className="container max-w-6xl justify-center items-center mx-auto p-6">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <Spinner message="carregando..." className="text-white w-10 h-10" />
        </div>
      )}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Back icon={<ArrowLeft className="h-4 w-4" />} text="Voltar" href="/admin/talhao" />
        </div>
      </div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="mt-4 text-3xl font-bold">
            Novo Talhão
          </h1>
          <p className="text-muted-foreground">
            Preencha os campos abaixo para cadastrar um talhão.
          </p>
        </div>
      </div>
      <TalhaoFormContainer clientes={clientes} fazendas={fazendas} onSubmit={onSubmit} setLoadingFazendas={setLoading} />
    </div>
  );
}