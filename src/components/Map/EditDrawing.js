import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import DrawControl from './DrawControl';

const EditDrawing = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [drawing, setDrawing] = useState(null);

    useEffect(() => {
        const savedDrawings = JSON.parse(localStorage.getItem('drawings')) || [];
        const drawingToEdit = savedDrawings.find((item) => item.id === id);
        if (drawingToEdit) {
            setDrawing(drawingToEdit.geoJson);
        }
    }, [id]);

    const handleSave = (updatedGeoJson) => {
        const savedDrawings = JSON.parse(localStorage.getItem('drawings')) || [];
        const updatedDrawings = savedDrawings.map((item) =>
            item.id === id ? { ...item, geoJson: updatedGeoJson } : item
        );
        localStorage.setItem('drawings', JSON.stringify(updatedDrawings));

        navigate('/');
    };

    return (
        <div>
            <h1>Edit Drawing</h1>
            {drawing ? (
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <DrawControl onSave={handleSave} savedShapes={drawing} />
                </MapContainer>
            ) : (
                <p>Loading drawing...</p>
            )}
        </div>
    );
};

export default EditDrawing;
