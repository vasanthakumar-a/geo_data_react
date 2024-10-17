import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

const DrawControl = ({ onSave, savedShapes }) => {
    const map = useMap();
    const [drawnItems] = useState(L.featureGroup());

    useEffect(() => {
        map.addLayer(drawnItems);

        if (savedShapes) {
            const loadedData = L.geoJSON(savedShapes);
            loadedData.eachLayer((layer) => {
                drawnItems.addLayer(layer);
            });
        }

        const drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                remove: true,
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
            saveAllLayers();
        });

        map.on('draw:deleted', () => {
            saveAllLayers();
        });

        return () => {
            map.off(L.Draw.Event.CREATED);
            map.removeControl(drawControl);
        };
    }, [map, drawnItems, savedShapes]);

    const saveAllLayers = () => {
        const geoJsonData = drawnItems.toGeoJSON();
        onSave(geoJsonData);
    };

    return null;
};

export default DrawControl;
