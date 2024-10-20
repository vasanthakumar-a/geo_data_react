import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";

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
    map.addControl(drawControl);

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
      <button
        onClick={handleSave}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      >
        Save Map
      </button>
    </>
  );
};

const Map = () => {
  const [savedShapes, setSavedShapes] = useState(null);

  useEffect(() => {
      const savedData = localStorage.getItem('savedShapes');
      if (savedData) {
          setSavedShapes(JSON.parse(savedData));
      }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("savedShapes");
    if (savedData) {
      setSavedShapes(JSON.parse(savedData));
      setSavedShapes(JSON.parse(savedData));
    }
  }, []);

  const saveShapes = (data) => {
    localStorage.setItem("savedShapes", JSON.stringify(data));
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <DrawControl onSave={saveShapes} savedShapes={savedShapes} setSavedShapes={setSavedShapes} />
    </MapContainer>
  );
};

export default Map;
