import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DrawControl from "../Map/DrawControl";
import { useMutation } from "@tanstack/react-query";
import { createNewShape, getShape, updateShape } from "../../api/auth";
import { InputText } from "primereact/inputtext";
import { parse } from "terraformer-wkt-parser";

const EditShape = ({ action }) => {
  const { id } = useParams();
  const [shape, setShape] = useState(null);
  const [shapeName, setShapeName] = useState("sample text");
  const navigate = useNavigate();

  const mapRef = useRef();

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

      if (data.geometry && mapRef.current) {
        const loadedData = L.geoJSON(parse(data.geometry));
        const bounds = loadedData.getBounds();
        mapRef.current.fitBounds(bounds);
      }
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
  }, [id, action, shape, getShapeMutation]);

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
   <div className="bg-gradient-to-t from-gray-800 to-gray-700 font-[sans-serif] p-6">
      <div className="grid md:grid-cols-2 items-center sm:gap-12 gap-6 max-w-6xl mx-auto min-h-[200px]">
        <div>
          <h3 className="sm:text-5xl text-3xl text-white font-bold uppercase tracking-wider">Geo Data App</h3>
          <h6 className="sm:text-2xl text-xl text-gray-300 mb-1.5 tracking-wide">Shape Name</h6>
        </div>

        <div className="bg-gray-100 flex p-1 rounded-full focus-within:bg-white">
          <input type='text' placeholder='Enter Shape Name' className="w-full outline-none bg-transparent text-gray-800 text-base px-4 py-3" value={shapeName} onChange={handleNameChange} />
        </div>
      </div>
      <div className="container mx-auto">
      <MapContainer
        ref={mapRef}
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DrawControl onSave={saveShapes} shape={shape} setShape={setShape} />
      </MapContainer>
    </div>
    </div>
    </>
  );
};

export default EditShape;
