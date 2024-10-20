import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getAllShapes } from "../../api/auth";

const ListShapes = () => {
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const mutation = useMutation({
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

  useEffect(() => {
    const fetchShapes = async () => {
      mutation.mutate();
    };

    fetchShapes();
  }, []);

  const handleNew = () => {
    navigate(`/new`);
  }

  const handleEdit = (shapeId) => {
    navigate(`/edit/${shapeId}`);
  };

  if (loading) {
    return <p>Loading shapes...</p>;
  }

  return (
    <>
      <h1>Shape List</h1>
      <button onClick={() => handleNew()}>New</button>
      <button onClick={() => navigate(`/edit/1`)}>Edit</button>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {shapes?.map((shape, index) => (
            <tr key={shape.id}>
              <td>{index + 1}</td>
              <td>{shape.name}</td>
              <td>
                <button onClick={() => handleEdit(shape.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListShapes;
