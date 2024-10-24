import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteShape, getAllShapes } from "../../api/auth";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import FileUploadCard from "./FileUploadCard";

const ListShapes = () => {
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const allShapesMutation = useMutation({
    mutationFn: getAllShapes,
    onSuccess: (data) => {
      setShapes(data);
      localStorage.setItem("shapes", JSON.stringify(data));
      setLoading(false);
    },
    onError: (error) => {
      const storedShapes = JSON.parse(localStorage.getItem("shapes"));
      if (storedShapes) {
        setShapes(storedShapes);
      }
      setLoading(false);
      alert(error.message);
    },
  });

  const deleteShapeMutation = useMutation({
    mutationFn: deleteShape,
    onSuccess: (data) => {
      navigate('/')
      allShapesMutation.mutate();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  useEffect(() => {
    const fetchShapes = async () => {
      allShapesMutation.mutate();
    };

    fetchShapes();
  }, []);

  const handleNew = () => {
    navigate(`/new`);
  };

  const handleEdit = (shapeId) => {
    navigate(`/edit/${shapeId}`);
  };

  const handleDelete = (shapeId) => {
    deleteShapeMutation.mutate({id: shapeId});
  };

  if (loading) {
    return <p>Loading shapes...</p>;
  }

  return (
    <>
      <Dialog
        header="File Upload"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <FileUploadCard visbleFalse={() => setVisible(false)} />
      </Dialog>

      <div className="bg-gray-100 md:px-10 px-4 py-12 font-[sans-serif]">
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mb-4">Shapes List</h1>
        </div>
        <div className="flex justify-end gap-10">
          <Button
            className="font-bold mb-4"
            label="File Upload"
            icon="pi pi-upload"
            onClick={() => setVisible(true)}
          />
          <Button
            className="font-bold mb-4 mr-5"
            label="New"
            icon="pi pi-plus-circle"
            onClick={() => handleNew()}
          />
        </div>
        <DataTable value={shapes} showGridlines paginator rows={10} className="w-full">
          <Column field="name" header="Name" />
          <Column
            header="Actions"
            body={(rowData) => (
              <div>
                <button
                  onClick={() => handleEdit(rowData.id)}
                  className="p-button p-button-info p-button-text mr-6"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rowData.id)}
                  className="p-button p-button-danger p-button-text"
                >
                  Delete
                </button>
              </div>
            )}
          />
        </DataTable>
      </div>
      </div>
    </>
  );
};

export default ListShapes;
