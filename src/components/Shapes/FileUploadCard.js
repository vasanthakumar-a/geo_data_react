import React, { useState } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import { useMutation } from "@tanstack/react-query";
import { fileUpload } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const FileUploadCard = ({ visbleFalse }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fileUploadMutation = useMutation({
    mutationFn: fileUpload,
    onSuccess: (data) => {
      navigate('/')
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem("token");
    const response = await fetch('http://localhost:3000/geospatial_data', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      navigate('/')
      visbleFalse()
    }
    // fileUploadMutation.mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2"
        />
        <Button
          label="Submit"
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
          icon="pi pi-check"
          onClick={handleSubmit}
          style={{ marginTop: "10px" }}
        />
      </form>
    </>
  );
};

export default FileUploadCard;
