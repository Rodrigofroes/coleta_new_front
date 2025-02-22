"use client";
import { useEffect, useRef, useState } from "react";

const PlotForm = () => {
  const mapContainerRef = useRef(null);
  const [polygons, setPolygons] = useState([]); // Armazenar múltiplos polígonos
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) return;

      const newMap = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: -23.55052, lng: -46.633308 },
        zoom: 10,
        mapTypeId: "satellite",
      });

      const newDrawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ["polygon"],
        },
        polygonOptions: {
          editable: true,
          draggable: true,
        },
      });

      newDrawingManager.setMap(newMap);
      setMap(newMap);
      setDrawingManager(newDrawingManager);

      window.google.maps.event.addListener(newDrawingManager, "overlaycomplete", (event) => {
        const newPolygon = event.overlay;
        // Remover a linha com handleSelectPolygon
        newPolygon.addListener("set_at", () => handleEditPolygon(newPolygon)); // Evento de edição (quando o vértice é movido)
        newPolygon.addListener("insert_at", () => handleEditPolygon(newPolygon)); // Evento de edição (quando um novo vértice é adicionado)

        setPolygons((prevPolygons) => [
          ...prevPolygons,
          { polygon: newPolygon, area: getArea(newPolygon) }, // Armazena o polígono e sua área
        ]);
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD6Cry2XHdEycsrOW1othM2LbNIGEk5TyA&libraries=drawing,geometry`;
      script.async = true;
      script.onload = loadGoogleMaps;
      document.body.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, []);

  const getArea = (polygon) => {
    const path = polygon.getPath().getArray();
    const areaInSqMeters = window.google.maps.geometry.spherical.computeArea(path);
    const areaInHectares = areaInSqMeters / 10000; // Converte de metros quadrados para hectares
    return Math.round(areaInHectares * 100) / 100; // Retorna a área em hectares com 2 casas decimais
  };

  const handleEditPolygon = (polygon) => {
    // Recalcula a área após edição do polígono
    const newArea = getArea(polygon);
    setPolygons((prevPolygons) => {
      const updatedPolygons = prevPolygons.map((item) =>
        item.polygon === polygon ? { ...item, area: newArea } : item
      );
      return updatedPolygons;
    });
  };

  const handleDeletePolygon = (polygonToDelete) => {
    // Remove o polígono do mapa e do estado
    polygonToDelete.setMap(null);
    setPolygons(polygons.filter(({ polygon }) => polygon !== polygonToDelete));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", padding: 20, backgroundColor: "#f9f9f9" }}>
        <h2>Cadastro de Talhão</h2>
        <div>
          {polygons.length > 0 ? (
            polygons.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p>
                  {index + 1}° Talhão - {item.area} hectares
                  <button
                    type="button"
                    onClick={() => handleDeletePolygon(item.polygon)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Excluir
                  </button>
                </p>
              </div>
            ))
          ) : (
            <p>Nenhum talhão desenhado ainda.</p>
          )}
        </div>
      </div>
      <div ref={mapContainerRef} style={{ flex: 1, position: "relative" }} />
    </div>
  );
};

export default PlotForm;
