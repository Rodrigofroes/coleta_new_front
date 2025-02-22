"use client";
import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

export default function Map({ initial, onLocationSelect }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCTi6KWVtwv58_HaYxb_OrTAa6m3K-A7Ao",
    });

    const [markerPosition, setMarkerPosition] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: -23.55052, lng: -46.633308 });

    useEffect(() => {
        if (initial) {
            setMarkerPosition({ lat: Number(initial.lat), lng: Number(initial.lng) });
            setMapCenter({ lat: Number(initial.lat), lng: Number(initial.lng) });
        }

    }, [initial]);

    const handleMapClick = useCallback((event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarkerPosition(newPosition);
        if (onLocationSelect) {
            onLocationSelect(newPosition);
        }
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={14}
            onClick={handleMapClick}
        >
            {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
    ) : (
        <p>Carregando mapa...</p>
    );
}
