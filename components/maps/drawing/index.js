"use client";
import { useEffect, useRef, useState } from "react";

export default function MapDrawing({ 
    initialValue, 
    coordenadas, 
    noEdit 
}) {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [polygons, setPolygons] = useState([]);

    // Carrega o mapa inicialmente
    useEffect(() => {
        const loadGoogleMaps = () => {
            if (!window.google) return;

            const newMap = new window.google.maps.Map(mapContainerRef.current, {
                center: coordenadas,
                zoom: 15,
                mapTypeId: "satellite",
                tilt: 0,
                rotateControl: false,
                streetViewControl: false,
            });

            setMap(newMap);
        };

        if (!window.google) {
            const script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTi6KWVtwv58_HaYxb_OrTAa6m3K-A7Ao&libraries=geometry";
            script.async = true;
            script.onload = loadGoogleMaps;
            document.body.appendChild(script);
        } else {
            loadGoogleMaps();
        }
    }, []);

    // Função para renderizar polígonos GeoJSON recebidos
    useEffect(() => {
        if (map && initialValue) {

            // Limpa polígonos antigos
            polygons.forEach(polygon => polygon.setMap(null));

            let loadedPolygons = [];

            // Verifica se é um GeoJSON (hexágonos da API)
            if (initialValue.type === "FeatureCollection" && initialValue.features) {
                loadedPolygons = initialValue.features.map(feature => {
                    const coordinates = feature.geometry.coordinates[0].map(coord => ({
                        lat: coord[1],
                        lng: coord[0]
                    }));

                    const polygon = new window.google.maps.Polygon({
                        paths: coordinates,
                        editable: false,
                        draggable: false,
                        fillColor: "hsl(100, 100%, 60%)",
                        strokeColor: "hsl(100, 100%, 50%)",
                        fillOpacity: 0.5,
                    });

                    polygon.setMap(map);
                    return polygon;
                });

                // Centraliza o mapa no primeiro hexágono carregado
                if (initialValue.features[0]?.geometry.coordinates[0][0]) {
                    const [lng, lat] = initialValue.features[0].geometry.coordinates[0][0];
                    map.setCenter({ lat, lng });
                }

            } else if (initialValue.talhoes) {
                // Formato original (talhões)
                loadedPolygons = initialValue.talhoes.map(t => {
                    const polygon = new window.google.maps.Polygon({
                        paths: t.coordenadas,
                        editable: !noEdit,
                        draggable: !noEdit,
                        fillColor: "transparent",
                        strokeColor: "hsl(100, 100%, 50%)",
                        fillOpacity: 0.5,
                    });

                    polygon.setMap(map);
                    return polygon;
                });

                // Centraliza o mapa no primeiro talhão carregado
                if (initialValue.talhoes[0]?.coordenadas[0]) {
                    map.setCenter(initialValue.talhoes[0].coordenadas[0]);
                }
            }

            // Atualiza estado uma única vez
            setPolygons(loadedPolygons);
        }
    }, [map, initialValue, noEdit]);

    // Atualiza o centro do mapa quando as coordenadas mudam
    useEffect(() => {
        if (map && coordenadas) {
            map.setCenter(coordenadas);
        }
    }, [coordenadas, map]);

    return <div ref={mapContainerRef} style={{ height: "500px" }} />;
}
