import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';

const DrawControl = () => {
    const map = useMap();

    useEffect(() => {
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        const drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
            },
            draw: {
                polygon: true,
                rectangle: true,
                circle: false,
                marker: false,
                polyline: false,
            },
        });
        map.addControl(drawControl);

        map.on(L.Draw.Event.CREATED, (event) => {
            const layer = event.layer;
            drawnItems.addLayer(layer);
        });

        return () => {
            map.off(L.Draw.Event.CREATED);
            map.removeControl(drawControl);
        };
    }, [map]);

    return null;
};

const Map = ({ geoJsonData }) => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoJsonData && <GeoJSON data={geoJsonData} />}
            <DrawControl />
        </MapContainer>
    );
};

export default Map;
