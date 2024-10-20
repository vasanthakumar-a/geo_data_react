import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

const DrawControl = ({ onSave, savedShapes, setSavedShapes }) => {
  const map = useMap();
  const [drawnItems, setDrawnItems] = useState(new L.FeatureGroup());

  useEffect(() => {
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        remove: true, 
      },
      draw: {
        polygon: true,
        rectangle: true,
        circle: true,
        marker: true,
        polyline: true,
      },
    });

    const CustomButton = L.Control.extend({
      options: {
        position: 'topleft',
      },
      onAdd: function () {
        const button = L.DomUtil.create('button', 'custom-draw-button');
        button.innerHTML = 'Save Map';
        L.DomEvent.on(button, 'click', handleSave);
        return button;
      },
    });

    map.addControl(drawControl);
    map.addControl(new CustomButton());

    if (savedShapes) {
      const loadedData = L.geoJSON(savedShapes);
      loadedData.eachLayer((layer) => {
          drawnItems.addLayer(layer);
      });
    }

    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      drawnItems.clearLayers();
      drawnItems.addLayer(layer);
      setDrawnItems(drawnItems);
    });

    return () => {
      map.off(L.Draw.Event.CREATED);
      map.removeControl(drawControl);
    };
  }, [map, drawnItems, savedShapes]);

  const handleSave = () => {
    const savedShapes = drawnItems.toGeoJSON();
    onSave(savedShapes);
  };

  return (
    <>
    </>
  );
};

export default DrawControl;