import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

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
    imagen: [],
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
      imagen: juego.imagen,
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
    const { name, value, options, files } = e.target;
    if (name === "caracteristicaIds") {
      const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else if (name === "imagen") {
      setFormData({ ...formData, [name]: files });
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
        imagen: formData.imagen,
        categoria: formData.categoriaId ? { id: formData.categoriaId } : null,
        caracteristicas: formData.caracteristicaIds.map(id => ({ id }))
      };
      const response = await axios.put(`${url}/${currentJuego.id}`, updatedJuego);
      setVideoJuegos(videoJuegos.map(juego => juego.id === currentJuego.id ? response.data : juego));
      handleCloseModal();
    } catch (error) {
      console.error("Error al editar el videojuego:", error);
    }
  };


  const handleImagenChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Obtenemos los archivos seleccionados
    setFormData({ ...formData, imagen: selectedFiles }); // Actualizamos el estado con los archivos seleccionados
  };
  



  const handleAgregar = () => {
    setCurrentJuego(null);
    setFormData({
      nombre: "",
      descripcion: "",
      imagen: [],
      categoriaId: "",
      caracteristicaIds: []
    });
    setShowModal(true);
  };

  const handleAgregarNuevo = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("categoria", formData.categoriaId);
  
      formData.caracteristicaIds.forEach((caracteristicaId) => {
        formDataToSend.append("caracteristicas", caracteristicaId);
      });
  
      // Iteramos sobre los archivos seleccionados y los agregamos al FormData
      for (let i = 0; i < formData.imagen.length; i++) {
        formDataToSend.append(`imagen_${i}`, formData.imagen[i]);
      }
  
      const response = await axios.post(`${url}/nuevo`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setVideoJuegos([...videoJuegos, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error("Error al agregar el videojuego:", error);
    }
  };
  














  return (
    <div className="container m-auto">
      <Button variant="primary" className="my-3" onClick={handleAgregar}>
        Agregar Videojuego
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {videoJuegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.id}</td>
              <td>{juego.nombre}</td>
              <td>{juego.categoria ? juego.categoria.nombre : "N/A"}</td>
              <td className="col-sm-1">
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => handleEditar(juego)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="link"
                  className="p-0 ms-2"
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
          <Modal.Title>{currentJuego ? "Editar Videojuego" : "Agregar Videojuego"}</Modal.Title>
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
  <Form.Label>Imágenes</Form.Label>
  <Form.Control
    type="file"
    name="imagen"
    multiple  // Permite seleccionar múltiples archivos
    onChange={handleImagenChange}  // Manejar el cambio de imágenes
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
                  <option value="">Seleccione una categoría</option>
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
            <Button variant="primary" onClick={currentJuego ? handleSaveChanges : handleAgregarNuevo}>
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