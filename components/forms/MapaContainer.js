"use client";
import MapDrawing from "../maps/drawing";
import { useEffect, useState } from "react";

export default function MapaContainer({ initialValue }) {
    const [coordinates, setCoordinates] = useState({ lat: -23.5505, lng: -46.6333 });

    useEffect(() => {
        if (initialValue && initialValue.talhoes?.[0]?.coordenadas?.[0]) {
            setCoordinates(initialValue.talhoes[0].coordenadas[0]);
        }
    }, [initialValue]);

    return (
        <div className="mt-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold">Mapa</h2>
                <p className="text-muted-foreground">
                    Visualização do mapa do talhão selecionado.
                </p>
            </div>
            <MapDrawing
                initialValue={initialValue}
                coordenadas={coordinates}
                noEdit={true}
            />
        </div>
    );
}
