import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const ListaVideojuegos = () => {
  const url = `http://localhost:8080/videojuegos`;
  const token = localStorage.getItem("token");
  const [videoJuegos, setVideoJuegos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentJuego, setCurrentJuego] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: [],  // Asegurar que siempre es un array
    plataforma: "",
    caracteristicaIds: [],
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [juegoAEliminar, setJuegoAEliminar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [juegosResponse, categoriasResponse, caracteristicasResponse] =
          await Promise.all([
            axios.get(url),
            axios.get(`http://localhost:8080/categorias`),
            axios.get(`http://localhost:8080/caracteristicas/listar`),
          ]);
        setVideoJuegos(juegosResponse.data);
        setCategorias(categoriasResponse.data);
        setCaracteristicas(caracteristicasResponse.data);
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
      await axios.delete(`${url}/${juegoAEliminar}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
      imagen: [], // No se pueden previsualizar archivos en input de tipo file
      plataforma: juego.categoria ? juego.categoria.id : "",
      caracteristicaIds: juego.caracteristicas
        ? juego.caracteristicas.map((caracteristica) => caracteristica.id)
        : [],
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentJuego(null);
  };

  const handleChange = (e) => {
    const { name, value, options, files } = e.target;
    if (name === "caracteristicaIds") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else if (name === "imagen") {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", currentJuego.id);
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("plataforma", formData.plataforma);

      formData.caracteristicaIds.forEach((caracteristicaId) => {
        formDataToSend.append("caracteristicas", caracteristicaId);
      });

      // Añadir imágenes sólo si están presentes
      if (formData.imagen.length > 0) {
        formData.imagen.forEach((file, index) => {
          formDataToSend.append("imagen", file);
        });
      } else {
        formDataToSend.append("imagen", new Blob(), "imagen");
      }

      const response = await axios.put(`${url}/${currentJuego.id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setVideoJuegos(
        videoJuegos.map((juego) =>
          juego.id === currentJuego.id ? response.data : juego
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error al editar el videojuego:", error);
    }
  };

  const handleAgregar = () => {
    setCurrentJuego(null);
    setFormData({
      nombre: "",
      descripcion: "",
      imagen: [],
      plataforma: "",
      caracteristicaIds: [],
    });
    setShowModal(true);
  };

  const handleAgregarNuevo = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("plataforma", formData.plataforma);

      formData.caracteristicaIds.forEach((caracteristicaId) => {
        formDataToSend.append("caracteristicas", caracteristicaId);
      });

      if (formData.imagen.length > 0) {
        formData.imagen.forEach((file, index) => {
          formDataToSend.append("imagen", file);
        });
      } else {
        formDataToSend.append("imagen", new Blob(), "imagen");
      }

      const response = await axios.post(`${url}/nuevo`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setVideoJuegos([...videoJuegos, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error("Error al agregar el videojuego:", error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleAgregar}>
        Agregar Videojuego
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {videoJuegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.nombre}</td>
              <td>
                {juego.categoria ? juego.categoria.nombre : "Sin Categoría"}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEditar(juego)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleShowConfirmModal(juego.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentJuego ? "Editar Videojuego" : "Agregar Videojuego"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="imagen">
              <Form.Label>Imágenes</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
                multiple
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="plataforma">  {/* Cambiado de categoriaId a plataforma */}
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="plataforma"  // Cambiado de categoriaId a plataforma
                value={formData.plataforma}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="caracteristicaIds">
              <Form.Label>Características</Form.Label>
              <Form.Control
                as="select"
                name="caracteristicaIds"
                multiple
                value={formData.caracteristicaIds}
                onChange={handleChange}
              >
                {caracteristicas.map((caracteristica) => (
                  <option key={caracteristica.id} value={caracteristica.id}>
                    {caracteristica.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={currentJuego ? handleSaveChanges : handleAgregarNuevo}
          >
            {currentJuego ? "Guardar Cambios" : "Agregar Videojuego"}
          </Button>
        </Modal.Footer>
      </Modal>

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
