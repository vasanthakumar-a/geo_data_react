import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import DrawControl from "../Map/DrawControl";

const EditShape = ({ action }) => {
  const { id } = useParams();
  const [shape, setShape] = useState(null);
  const [savedShapes, setSavedShapes] = useState(null);

  useEffect(() => {
    const fetchShape = async () => {
      if (action === 'edit') {
      try {
        // const response = await axiosInstance.get(`/shapes/${id}`);
        // setShape(response.data);

        const savedData = localStorage.getItem("savedShapes");
        if (savedData) {
          setSavedShapes(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error fetching shape:', error);
      }
      }
    };

    fetchShape();
  }, [id, action]);

  if (!savedShapes && action === 'edit') {
    return <p>Loading shape data...</p>;
  }

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
      <DrawControl
        onSave={saveShapes}
        savedShapes={savedShapes}
        setSavedShapes={setSavedShapes}
      />
    </MapContainer>
  );
};

export default EditShape;
