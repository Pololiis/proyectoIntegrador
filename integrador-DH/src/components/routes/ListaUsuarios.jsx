import React from 'react'
import { useState, useEffect } from 'react';

const ListaUsuarios = () => {

  const url = "http://localhost:8080/usuarios"
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.get(url);
      setUsuarios(response.data);
      } catch (error) {
      console.error("Hubo un error al hacer la solicitud:", error);
      }
    };
  
    fetchData();
    }, []);	

return (

  <div className="container-main">
    <div className="container-cards-section flex">
      <h2>Usuarios</h2>
      <div className="container-cards borde flex">
        {usuarios.map((plataforma) => (
          <div key={plataforma.id} className="card">
            <img src={plataforma.imagen} alt={plataforma.nombre} />
            <h2>{plataforma.nombre}</h2>
            <button onClick={() => eliminarPlataforma(plataforma.id)}>Eliminar</button>
            <button onClick={() => editarPlataforma(plataforma.id)}>Editar</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};


export default ListaUsuarios