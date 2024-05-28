// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const ListaVideojuegos = () => {
//   // const videojuegosHard = [
//   //   {
//   //     id: 1,
//   //     nombre: "Persona 5: Royal",
//   //     descripcion: "Los eventos de Persona 5 se desarrollan en Tokio y narran los sucesos de vida de Ren Amamiya, después de ser transferido al Instituto Shujin, al ser condenado a un año de libertad condicional por un delito de agresión del que fue falsamente acusado. Durante el curso escolar, él y varios de sus compañeros despiertan los poderes de sus Personas y se convierten en los \"Ladrones Fantasma de Corazones\" (Phantom Thieves of Hearts), justicieros enmascarados que se dedican a recorrer un mundo sobrenatural llamado Metaverso, robando y cambiando los deseos corruptos en el corazón de la gente.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/P5R-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/P5R-2.jpg"]
//   //   },
//   //   {
//   //     id: 2,
//   //     nombre: "Resident Evil 4",
//   //     descripcion: "En Resident Evil 4 , el agente especial Leon S. Kennedy es enviado en una misión para rescatar a la hija del presidente de los Estados Unidos que ha sido secuestrada. Al encontrar su camino hacia una aldea rural en Europa, se enfrenta a nuevas amenazas que se alejan de los tradicionales enemigos zombis pesados ​​de las entregas anteriores de la serie. León lucha contra nuevas criaturas horribles infestadas por una nueva amenaza llamada Las Plagas y se enfrenta a un grupo agresivo de enemigos, incluidos aldeanos controlados mentalmente que están vinculados a Los Iluminados, el misterioso culto que está detrás del secuestro.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/img1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/img2.jpg"]
//   //   },
//   //   {
//   //     id: 3,
//   //     nombre: "Elden Ring",
//   //     descripcion: "Recorre este impresionante mundo a pie o a caballo, en solitario u online con otros jugadores. Sumérgete en las verdes llanuras, en los pantanos agobiantes, en las montañas tortuosas, en unos castillos que no auguran nada bueno y en otros parajes majestuosos.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/ER1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/ER2.jpg"]
//   //   },
//   //   {
//   //     id: 4,
//   //     nombre: "The Legend of Zelda: Tears of the Kingdom",
//   //     descripcion: "Secuela directa de Breath of the Wild, por lo que narra la historia del reino de Hyrule luego de que la malicia de Ganon, un aura maligna que ha contaminado el mundo, se desata. Ahora será responsabilidad de Link y Zelda salvar al reino, aunque nada será tan fácil como suena.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Zelda-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Zelda-2.jpg"]
//   //   },
//   //   {
//   //     id: 5,
//   //     nombre: "Baldur's Gate 3",
//   //     descripcion: "El título está ambientado en el año 1492 DR, 120 años después de los eventos de Baldur's Gate 2. El protagonista fue capturado e implantado con un parásito que lo convertirá en una fuerza oscura, pero logra escaparse y encontrarse con otros sobrevivientes.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/BG1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/BG2.jpg"]
//   //   },
//   //   {
//   //     id: 6,
//   //     nombre: "Super Mario Odyssey",
//   //     descripcion: "Reuniendo el espíritu de las plataformas clásicas, y apostando por un cambio de ambientación, Super Mario Odyssey nos invitará a encarnar una vez más al fontanero más famoso del ocio electrónico en una aventura en la que visitaremos nuevos y diversos mundos, reinos y lugares enigmáticos a bordo de nuestra aeronave.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/SMO-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/SMO-2.jpg"]
//   //   },
//   //   {
//   //     id: 7,
//   //     nombre: "Persona 4 Golden",
//   //     descripcion: "Persona 4 se lleva a cabo en un pueblo ficticio de Japón conocido como Inaba, y se encuentra en unas llanuras de inundación; tiene su propio instituto escolar y distritos de venta. Homicidios inexplicables se han estado presentando en este pequeño pueblo, donde los cuerpos de las víctimas aparecen colgando de antenas de televisión; se desconoce el motivo/causa de su muerte. Al mismo tiempo, corre el rumor de que ver la tele apagada en una medianoche lluviosa revelará el alma gemela de esa persona. El juego sigue a los personajes al Mundo TV, una dimensión llena de criaturas llamadas Sombras.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/P4G-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/P4G-2.jpg"]
//   //   },
//   //   {
//   //     id: 8,
//   //     nombre: "The Last of Us Remasterizado",
//   //     descripcion: "Joel, un superviviente de carácter recio, es contratado para sacar de contrabando a Ellie, una niña de 14 años, fuera de una opresiva zona de cuarentena. Lo que comienza como un pequeño trabajo pronto se convierte en un viaje brutal y desgarrador, ya que ambos deben atravesar los EE. UU.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/TLOU-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/TLOU-2.jpg"]
//   //   },
//   //   {
//   //     id: 9,
//   //     nombre: "Grand Theft Auto V",
//   //     descripcion: "Cuando un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se ven involucrados con lo peor y más desquiciado del mundo criminal, del gobierno de los EE. UU. y de la industria del espectáculo, tendrán que llevar a cabo una serie de peligrosos golpes para sobrevivir en una ciudad implacable en la que no pueden confiar en nadie. Y mucho menos los unos en los otros.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/GTAV-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/GTAV-2.jpg"]
//   //   },
//   //   {
//   //     id: 10,
//   //     nombre: "Portal 2",
//   //     descripcion: "Después de demostrar cómo tenía que ser un juego de puzles en primer persona con el primer Portal (2007), siendo una aventura tan redonda que parecía difícilmente mejorable, Valve se volvió a superar, un título más ambicioso, complejo y simpático, y con modo cooperativo, para ofrecer uno de los mejores juegos de puzles de la historia.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Portal-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Portal-2.jpg"]
//   //   },
//   //   {
//   //     id: 11,
//   //     nombre: "The Elder Scrolls V: Skyrim",
//   //     descripcion: "La historia se centra en los esfuerzos del personaje, Dovahkiin (Sangre de dragón), para derrotar a Alduin, un dragón o «dovah» que, según la profecía, destruirá el mundo.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Skyrim-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Skyrim-2.jpg"]
//   //   },
//   //   {
//   //     id: 12,
//   //     nombre: "BioShock",
//   //     descripcion: "BioShock 2 es un videojuego de terror y de disparos en primera persona, desarrollado por 2K Marin, y la segunda parte y secuela de BioShock.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/BS-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/BS2.jpg"]
//   //   },
//   //   {
//   //     id: 13,
//   //     nombre: "God of War",
//   //     descripcion: "God of War es la vuelta de Kratos a los videojuegos tras la trilogía original. Esta nueva entrega para PlayStation 4, si bien mantendrá varios de los ingredientes indivisibles de su jugabilidad, apostará por un nuevo comienzo para el personaje y una ambientación nórdica, ofreciéndonos una perspectiva más madura y realista de la mitología de dioses y monstruos milenarios habitual en la serie de títulos. En God of War, Kratos será un guerrero más curtido y pasivo, pues tendrá que desempeñar el rol de padre en un frío y hostil escenario, al que parece haberse retirado para olvidar su pasado.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/GoW1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/GoW2.jpg"]
//   //   },
//   //   {
//   //     id: 14,
//   //     nombre: "The Witcher 3: Wild Hunt",
//   //     descripcion: "El jugador controlará una vez más a Geralt de Rivia, el afamado cazador de monstruos, (también conocido como el Lobo Blanco) y se enfrentará a un diversificadísimo bestiario y a unos peligros de unas dimensiones nunca vistas hasta el momento en la serie, mientras recorre los reinos del Norte. Durante su aventura, tendrá que hacer uso de un gran arsenal de armas, armaduras y todo tipo de magias para enfrentarse al que hasta ahora ha sido su mayor desafío, la cacería salvaje.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Witcher1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Witcher2.jpg"]
//   //   },
//   //   {
//   //     id: 15,
//   //     nombre: "Ori and the Will of the Wisps",
//   //     descripcion: "Ori and the Will of the Wisps es la continuación del emblemático videojuego de plataformas y aventuras Ori and the Blind Forest, desarrollado por Moon Studios. Se trata de una secuela que sigue ofreciéndonos un estilo impecable a nivel visual y jugable.",
//   //     imagenes: ["https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Ori-1.jpg", "https://gameshare-bucket.s3.sa-east-1.amazonaws.com/Ori-2.jpg"]
//   //   }
//   // ];

//   //  const url = `http://localhost:8080/videojuegos`;
//   //  const [videoJuegos, setVideoJuegos] = useState([]);
//   //setVideoJuegos(videojuegosHard)
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get(url);
//   //       const listaJuegos = response.data;
//   //       setVideoJuegos(listaJuegos);
//   //     } catch (error) {
//   //       console.error("Hubo un error al hacer la solicitud:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   const url = `http://localhost:8080/videojuegos`;
//   const [videoJuegos, setVideoJuegos] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(url);
//         const listaJuegos = response.data;
//         setVideoJuegos(listaJuegos);
//       } catch (error) {
//         console.error("Hubo un error al hacer la solicitud:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEliminar = async (id) => {
//     try {
//       await axios.delete(`${url}/${id}`);
//       setVideoJuegos(videojuegos.filter((juego) => juego.id !== id));
//     } catch (error) {
//       console.error("Error al eliminar el videojuego:", error);
//     }
//   };

//   const handleEditar = async (id, datosActualizados) => {
//     try {
//       //  const response = await axios.put(`${API_URL}/${id}`, datosActualizados);
//       //  setJuegos(juegos.map(juego => (juego.id === id ? response.data : juego)));
//     } catch (error) {
//       console.error("Error al editar el videojuego:", error);
//     }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <table
//         style={{
//           borderCollapse: "collapse",
//           width: "80%",
//           margin: "20px auto",
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid black", padding: "8px" }}>
//               Nombre
//             </th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>
//               Descripción
//             </th>
//             {/* <th style={{ border: '1px solid black', padding: '8px' }}>Cantidad de Imágenes</th> */}
//             <th style={{ border: "1px solid black", padding: "8px" }}>
//               Acciones
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {videojuegosHard.map((juego) => (
//             <tr key={juego.id}>
//               <td style={{ border: "1px solid black", padding: "8px" }}>
//                 {juego.nombre}
//               </td>
//               <td style={{ border: "1px solid black", padding: "8px" }}>
//                 {juego.descripcion}
//               </td>
//               {/* <td style={{ border: '1px solid black', padding: '8px' }}>{juego.imagenes.length}</td> */}
//               <td style={{ border: "1px solid black", padding: "8px" }}>
//                 <button
//                   onClick={() => handleEditar(juego.id)}
//                   style={{ marginRight: "10px" }}
//                 >
//                   Editar
//                 </button>
//                 <button onClick={() => handleEliminar(juego.id)}>
//                   Eliminar
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListaVideojuegos;

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Modal, Button, Form } from 'react-bootstrap';

const ListaVideojuegos = () => {
  const url = `http://localhost:8080/videojuegos`;
  const [videoJuegos, setVideoJuegos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentJuego, setCurrentJuego] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagenes: []
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [juegoAEliminar, setJuegoAEliminar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setVideoJuegos(response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowConfirmModal = (id) => {
    setJuegoAEliminar(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setJuegoAEliminar(null);
  };

  const handleConfirmEliminar = async () => {
    try {
      await axios.delete(`${url}/${juegoAEliminar}`);
      setVideoJuegos(videoJuegos.filter((juego) => juego.id !== juegoAEliminar));
      handleCloseConfirmModal();
    } catch (error) {
      console.error("Error al eliminar el videojuego:", error);
    }
  };

  const handleEditar = (juego) => {
    setCurrentJuego(juego);
    setFormData({
      nombre: juego.nombre,
      descripcion: juego.descripcion,
      imagenes: juego.imagenes.join(", ")
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentJuego(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedJuego = {
        ...currentJuego,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        imagenes: formData.imagenes.split(", ")
      };
      const response = await axios.put(`${url}/${currentJuego.id}`, updatedJuego);
      setVideoJuegos(videoJuegos.map(juego => juego.id === currentJuego.id ? response.data : juego));
      handleCloseModal();
    } catch (error) {
      console.error("Error al editar el videojuego:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {videoJuegos.map((juego) => (
          <div key={juego.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={juego.imagenes[0]}
                className="card-img-top"
                alt={juego.nombre}
              />
              <div className="card-body">
                <h3>ID: {juego.id}</h3>
                <h5 className="card-title">{juego.nombre}</h5>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditar(juego)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleShowConfirmModal(juego.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentJuego && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Videojuego</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imágenes (separadas por comas)</Form.Label>
                <Form.Control
                  type="text"
                  name="imagenes"
                  value={formData.imagenes}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este videojuego?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaVideojuegos;

