import React from 'react'
import { useState, useEffect } from 'react';

const ListaUsuarios = () => {
// Estado inicial con un array de plataformas
const [plataformas, setPlataformas] = useState([
  { id: 1, nombre: 'PlayStation 5', imagen: '../plataformas/Anotación 2024-05-26 153650.jpg' },
  { id: 2, nombre: 'Xbox Series X', imagen: '../../assets/plataformas/consola-de-videojuegos-con-gamepad.png' },
  { id: 3, nombre: 'Nintendo Switch', imagen: '../../assets/plataformas/palanca-de-mando.png' },
  // Agrega más plataformas según sea necesario
]);

// const url = `http://localhost:8080/plataformas`;
// const [plataformas, setPlataformas] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(url);
//       const plataformas = response.data;
//       setVideoJuegos(plataformas);
//     } catch (error) {
//       console.error("Hubo un error al hacer la solicitud:", error);
//     }
//   };

//   fetchData();
// }, []);
// // Función para editar una plataforma por id
// const eliminarPlataforma = (id) => {
// 	//logica para editar en la base de datos: tiene que llevar los datos al formulario de creacion y con eso editar.
// };


// // Función para eliminar una plataforma por id
// const eliminarPlataforma = (id) => {
// 	//logica para eliminar en la base de datos.
// };

return (

  <div className="container-main">
    <div className="container-cards-section flex">
      <h2>Plataformas</h2>
      <div className="container-cards borde flex">
        {plataformas.map((plataforma) => (
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