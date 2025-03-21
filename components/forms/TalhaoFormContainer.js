"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { talhaoSchema } from "@/lib/schema/zod";
import TalhaoForm from "@/components/forms/talhaoForm";
import MapDrawing from "../maps/drawing/index.js";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function TalhaoFormContainer({ initialValue, clientes, fazendas, onSubmit, setLoadingFazendas }) {
    const { register, handleSubmit, setValue, control, watch, formState: { errors } } = useForm({
        resolver: zodResolver(talhaoSchema),
        defaultValues: {
            clienteID: initialValue?.clienteID || "",
            fazendaID: initialValue?.fazendaID || "",
            talhoes: initialValue?.talhoes || [],
        }
    });
    const [polygons, setPolygons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initial, setInitial] = useState({});
    const [coordinates, setCoordinates] = useState({ lat: -23.5505, lng: -46.6333 });

    const handlePolygonComplete = (polygon, coordinates) => {
        const area = getArea(polygon);
        setPolygons((prevPolygons) => [
            ...prevPolygons,
            { polygon, area, coordinates },
        ]);
    };

    const handlePolygonEdit = (polygon) => {
        const area = getArea(polygon);
        const path = polygon.getPath().getArray();
        const coordinates = path.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }));

        setPolygons((prevPolygons) =>
            prevPolygons.map((item) =>
                item.polygon === polygon ? { ...item, area, coordinates } : item
            )
        );
    };

    const handleDeletePolygon = (e, polygonToDelete) => {
        polygonToDelete.setMap(null);
        setPolygons((prevPolygons) => prevPolygons.filter(({ polygon }) => polygon !== polygonToDelete));
    };

    const getArea = (polygon) => {
        const path = polygon.getPath().getArray();
        const areaInSqMeters = window.google.maps.geometry.spherical.computeArea(path);
        const areaInHectares = areaInSqMeters / 10000;
        return Math.round(areaInHectares * 100) / 100;
    };

    useEffect(() => {
        if (initialValue) {
            setInitial(initialValue);
            setValue("clienteID", initialValue.clienteID);
            setValue("fazendaID", initialValue.fazendaID);
            setValue("talhoes", initialValue.talhoes);
        } else {
            setValue("talhoes", polygons.map(polygon => ({
                area: polygon.area,
                coordenadas: polygon.coordinates,
            })));
        }
    }, [initialValue, polygons, setValue]);

    const handleCoordendas = (coor) => {
        setLoadingFazendas(true);
        setCoordinates({ lat: coor.lat, lng: coor.lng });
        setTimeout(() => {
            setLoadingFazendas(false);
        }, 2000);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TalhaoForm
                    control={control}
                    children={
                        <>
                            <div className="mt-4 mb-4">
                                <h2 className="text-xl font-bold">Desenhe o talhão no mapa</h2>
                                <p className="text-muted-foreground">
                                    Clique no botão "Desenhar forma" e clique no mapa para desenhar o talhão.
                                </p>
                            </div>
                            <MapDrawing
                                onPolygonComplete={handlePolygonComplete}
                                onPolygonEdit={handlePolygonEdit}
                                coordenadas={coordinates}
                                initialValue={initial}
                            />
                        </>
                    }
                    polygons={polygons}
                    register={register}
                    errors={errors}
                    fazendas={fazendas}
                    clientes={clientes}
                    setValue={setValue}
                    handleDeletePolygon={handleDeletePolygon}
                    handleCoordendas={handleCoordendas}
                    watch={watch}
                />
                <Button type="submit" className="mt-4 w-24" disabled={loading}>
                    {loading ? <Spinner /> : initialValue ? "Editar" : "Cadastrar"}
                </Button>
            </form>
        </>

    );
}