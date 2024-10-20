import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";

const ListShapes = () => {
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const response = await axiosInstance.get("/shapes");
        setShapes(response.data);
        localStorage.setItem("shapes", JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shapes:", error);
        const storedShapes = JSON.parse(localStorage.getItem("shapes"));
        if (storedShapes) {
          setShapes(storedShapes);
        }
        setLoading(false);
      }
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
