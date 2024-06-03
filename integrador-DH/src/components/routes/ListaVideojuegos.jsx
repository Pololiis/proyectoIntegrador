

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from 'react-bootstrap';

const ListaVideojuegos = () => {
  const url = `http://localhost:8080/videojuegos`;
  const [videoJuegos, setVideoJuegos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentJuego, setCurrentJuego] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagenes: [],
    categoriaId: "",
    caracteristicaIds: []
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [juegoAEliminar, setJuegoAEliminar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [juegosResponse, categoriasResponse, caracteristicasResponse] = await Promise.all([
          axios.get(url),
          axios.get(`http://localhost:8080/categorias`),
          axios.get(`http://localhost:8080/caracteristicas/listar`)
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
      imagenes: juego.imagenes.join(", "),
      categoriaId: juego.categoria ? juego.categoria.id : "",
      caracteristicaIds: juego.caracteristicas ? juego.caracteristicas.map(caracteristica => caracteristica.id) : []
    });
    setShowModal(true);
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentJuego(null);
  };

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "caracteristicaIds") {
      const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedJuego = {
        ...currentJuego,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        imagenes: formData.imagenes.split(", "),
        categoria: formData.categoriaId ? { id: formData.categoriaId } : null,
        caracteristicas: formData.caracteristicaIds.length > 0 ? formData.caracteristicaIds.map(id => ({ id })) : []
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
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  as="select"
                  name="categoriaId"
                  value={formData.categoriaId}
                  onChange={handleChange}
                >
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Características</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="caracteristicaIds"
                  value={formData.caracteristicaIds}
                  onChange={handleChange}
                >
                  {caracteristicas.map(caracteristica => (
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
