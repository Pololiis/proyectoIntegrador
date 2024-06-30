import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarUsuarios.css'; // Asegúrate de importar el archivo CSS

const ListaUsuarios = () => {
  const url = `${import.meta.env.VITE_API_URL}usuarios`;

  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem("token"); // Reemplaza esto con tu token de autenticación

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };
    fetchData();
  }, [url, token]);

  const handleRolChange = async (id, nuevoRol) => {
    try {
      const response = await axios.put(`${url}/${id}/cambiarRol`, { rol: nuevoRol }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Actualiza la lista de usuarios después de cambiar el rol
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, rol: { nombreRol: nuevoRol } } : usuario
        )
      );
    } catch (error) {
      console.error("Hubo un error al cambiar el rol:", error);
    }
  };

  return (
    <div className="container-main">
      <h2>Lista de Usuarios</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                <select
                  value={usuario.rol.nombreRol}
                  onChange={(e) => handleRolChange(usuario.id, e.target.value)}
                >
                  <option value="USUARIO">USUARIO</option>
                  <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuarios;



