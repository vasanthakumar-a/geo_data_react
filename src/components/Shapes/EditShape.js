import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import DrawControl from "../Map/DrawControl";
import { useMutation } from "@tanstack/react-query";
import { createNewShape } from '../../api/auth';

const EditShape = ({ action }) => {
  const { id } = useParams();
  const [shape, setShape] = useState(null);
  const [savedShapes, setSavedShapes] = useState(null);
  const [shapeName, setShapeName] = useState("sample text");

  const handleNameChange = (e) => {
    setShapeName(e.target.value);
  };

  const newShapeMutation = useMutation({
    mutationFn: createNewShape,
    onSuccess: (data) => {
      
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  useEffect(() => {
    const fetchShape = async () => {
      if (action === "edit") {
        try {
          // const response = await axiosInstance.get(`/shapes/${id}`);
          // setShape(response.data);

          const savedData = localStorage.getItem("savedShapes");
          if (savedData) {
            setSavedShapes(JSON.parse(savedData));
          }
        } catch (error) {
          console.error("Error fetching shape:", error);
        }
      }
    };

    fetchShape();
  }, [id, action]);

  if (!savedShapes && action === "edit") {
    return <p>Loading shape data...</p>;
  }

  const saveShapes = (data) => {
    const geoLoc = data.features[0]?.geometry
    const shapeName = document.getElementById('shapeName')
    if(action==='edit') {

    }
    console.log({name: shapeName.value, geometry: geoLoc});
    debugger

    if(action==='new') {
      if(geoLoc) {
        newShapeMutation.mutate({name: shapeName.value, geometry: geoLoc})
      } else {
        alert('Please do Draw a Geometry') 
      }
    }

    localStorage.setItem("savedShapes", JSON.stringify(data));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <h2>Name : </h2>
        <input type="text" id="shapeName" value={shapeName} onChange={handleNameChange} />
      </div>
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
      <button onClick={saveShapes}>Map Saving</button>
    </>
  );
};

export default EditShape;
