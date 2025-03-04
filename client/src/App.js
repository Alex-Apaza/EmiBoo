import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [datos, setDatos] = useState([]);

    // Función para obtener datos del backend
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/datos');
            const data = await response.json();
            setDatos(data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    // Llamar a la función al cargar el componente
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Datos desde SQL Server</h1>
            <ul>
                {datos.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;