import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

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

  <div className="container-main m-auto">
    <div className="container-cards-section flex">
      <h2>Usuarios</h2>
      <div className="container-cards  flex">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="card">
            <h2>{usuario.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};


export default ListaUsuarios