import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import { parse } from 'terraformer-wkt-parser';

const DrawControl = ({ onSave, shape, setShape }) => {
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
        button.classList = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        L.DomEvent.on(button, 'click', handleSave);
        return button;
      },
    });

    map.addControl(drawControl);
    map.addControl(new CustomButton());

    if (shape) {
      const loadedData = L.geoJSON(parse(shape));
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
  }, [map, drawnItems, shape]);

  const handleSave = () => {
    const shape = drawnItems.toGeoJSON();
    onSave(shape);
  };

  return (
    <>
    </>
  );
};

export default DrawControl;