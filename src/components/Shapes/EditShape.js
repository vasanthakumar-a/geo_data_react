import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import DrawControl from "../Map/DrawControl";
import { useMutation } from "@tanstack/react-query";
import { createNewShape, getShape, updateShape } from "../../api/auth";
import { InputText } from "primereact/inputtext";

const EditShape = ({ action }) => {
  const { id } = useParams();
  const [shape, setShape] = useState(null);
  const [shapeName, setShapeName] = useState("sample text");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setShapeName(e.target.value);
  };

  const newShapeMutation = useMutation({
    mutationFn: createNewShape,
    onSuccess: (data) => {
      navigate(`/edit/${data.id}`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const editShapeMutation = useMutation({
    mutationFn: updateShape,
    onSuccess: (data) => {},
    onError: (error) => {
      alert(error.message);
    },
  });

  const getShapeMutation = useMutation({
    mutationFn: getShape,
    onSuccess: (data) => {
      setShapeName(data.name);
      setShape(data.geometry);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  useEffect(() => {
    const fetchShape = async () => {
      if (action === "edit") {
        try {
          getShapeMutation.mutate({ id });
        } catch (error) {
          console.error("Error fetching shape:", error);
        }
      }
    };

    fetchShape();
  }, [id, action]);

  if (!shape && action === "edit") {
    return <p>Loading shape data...</p>;
  }

  const saveShapes = (data) => {
    const geoLoc = data.features[0]?.geometry;
    const shapeName = document.getElementById("shapeName");
    if (geoLoc) {
      if (action === "edit") {
        editShapeMutation.mutate({ id: id, shapeParams: {name: shapeName.value, geometry: geoLoc} });
      }
      if (action === "new") {
        newShapeMutation.mutate({ id: id, name: shapeName.value, geometry: geoLoc });
      }
    } else {
      alert("Please do Draw a Geometry");
    }
  };

  return (
    <>
    <div className="flex flex-wrap justify-center align-items-center mb-3 gap-5">
      <h2 className=" text-black">Shape Name :</h2>
      <InputText id="shapeName" placeholder="shapeName" className="p-invalid mr-2 border-2 border-black-700" value={shapeName} onChange={handleNameChange} />

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
        <DrawControl onSave={saveShapes} shape={shape} setShape={setShape} />
      </MapContainer>
    </>
  );
};

export default EditShape;
