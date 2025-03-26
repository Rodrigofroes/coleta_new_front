"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { visualizarMapaSchema } from "@/lib/schema/zod";
import VisualizarForm from "./visualizarForm";
import MapaContainer from "./MapaContainer";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import VisualizarMapaService from "@/lib/services/visualizarMapa";
import { useToast } from "@/hooks/use-toast";
import FuncionarioService from "@/lib/services/funcionarioService";

export default function VisualizarMapaFormContainer({ initialValue }) {
  const { toast } = useToast();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(visualizarMapaSchema)
  });

  const [tipoColeta, setTipoColeta] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [mapInitialValue, setMapInitialValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);

  // Nova função para formatar coordenadas
  const transformarCoordenadas = (coordenadas) => {
    const coordsFormatadas = coordenadas.map(coord => [coord.lng, coord.lat]);

    if (coordsFormatadas.length > 0) {
      coordsFormatadas.push(coordsFormatadas[0]);
    }

    return {
      polygon: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [coordsFormatadas]
            }
          }
        ]
      },
      hectares: parseInt(quantidade)
    };
  };

  const handleGerarColeta = async () => {
    if (!tipoColeta || !quantidade) {
      return toast({
        title: "Erro",
        description: "Selecione o tipo de coleta e a quantidade de grid",
        variant: "destructive"
      });
    }

    setLoading(true);
    const visualizarMapaService = new VisualizarMapaService();

    try {
      // Converte as coordenadas para o formato exigido pela API
      const talhaoFormatado = transformarCoordenadas(initialValue.talhoes[0].coordenadas);
      const data = await visualizarMapaService.GerarColeta(
        talhaoFormatado,
      );

      if (!data) {
        throw new Error("Erro ao gerar coleta");
      }

      setMapInitialValue(data);

      toast({
        title: "Sucesso",
        description: "Coleta gerada com sucesso",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Erro ao gerar coleta",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetarMapa = () => {
    setMapInitialValue(initialValue);
    toast({
      title: "Sucesso",
      description: "Mapa resetado com sucesso",
    });
  };

  useEffect(() => {
    setMapInitialValue((prev) => ({
      ...prev,
      tipoColeta,
      quantidade,
    }));
  }, [tipoColeta, quantidade]);

  const fecthFuncionarios = async () => {
    const funcionarioService = new FuncionarioService();
    const data = await funcionarioService.listarFuncionarios();
    console.log(data);
    setFuncionarios(data.items || []);
  }

  useEffect(() => {
    fecthFuncionarios();  
    if (initialValue) {
      setMapInitialValue(initialValue);
    }
  }, [initialValue]);

  const onSubmit = async (data) => {
    let obj = {
      ...data,
      geoJson: mapInitialValue,
      talhaoID: initialValue.talhoes[0].id
    }
    console.log(obj);
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <Spinner message="carregando..." className="text-white w-10 h-10" />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VisualizarForm
          control={control}
          register={register}
          funcionarios={funcionarios}
          errors={errors}
          setValue={setValue}
          defaultValues={initialValue}
          onChangeColeta={setTipoColeta}
          onChangeQuantidade={setQuantidade}
        >
          <div className="mt-4">
            <div className="flex justify-end gap-2 mb-4">
              <Button
                onClick={handleResetarMapa}
                variant="outline"
                type="button"
              >
                Resetar Mapa
              </Button>
              <Button
                onClick={handleGerarColeta}
                type="button"
                disabled={loading}
              >
                Gerar Coleta
              </Button>
            </div>
            <MapaContainer initialValue={mapInitialValue} />
          </div>
        </VisualizarForm>
        <Button type="submit" className="mt-4 w-24" disabled={loading}>
          {loading ? <Spinner /> : "Cadastrar"}
        </Button>
      </form>
    </>
  );
}
