
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./agregador.css"; // Estilos personalizados

const Agregador = () => {
  const [mensaje, setMensaje] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResponse, caracteristicasResponse] = await Promise.all(
          [
            axios.get("http://localhost:8080/categorias"),
            axios.get("http://localhost:8080/caracteristicas/listar"),
          ]
        );
        setCategorias(categoriasResponse.data);
        setCaracteristicas(caracteristicasResponse.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(2, "El nombre es muy corto")
      .max(50, "El nombre es muy largo"),
    descripcion: Yup.string()
      .required("La descripción es requerida")
      .min(5, "La descripción es muy corta")
      .max(200, "La descripción es muy larga"),
    categoria: Yup.string().required("La plataforma es requerida"),
    imagenes: Yup.array()
      .min(1, "Al menos una imagen es requerida")
      .max(5, "Máximo 5 imágenes permitidas"),
    caracteristicas: Yup.array().required(
      "Seleccione al menos una característica"
    ),
  });









  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("descripcion", values.descripcion);
    formData.append("categoria", values.categoria);
    values.caracteristicas.forEach((caracteristica) => {
      formData.append("caracteristicas", caracteristica);
    });
    imagenesSeleccionadas.forEach((imagen) => {
      formData.append("imagen", imagen);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/videojuegos/nuevo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      setMensaje("Producto agregado con éxito");
      resetForm();
      setImagenesSeleccionadas([]);
    } catch (error) {
      console.error("Error al enviar el producto:", error);
      setMensaje("Error al enviar el producto");
    } finally {
      setSubmitting(false);
    }
  };

















  const handleImagenChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    setImagenesSeleccionadas([...imagenesSeleccionadas, ...files]);
  };

  const handleBorrarImagen = (index) => {
    setImagenesSeleccionadas(
      imagenesSeleccionadas.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="container my-5 m-auto container-form">
      <div className="restringido row justify-content-center">
        <div className="col-12 col-md-8">
          <h2 className="text-center mb-4">No disponible.</h2>
          <h4 className="text-center mb-6">
            Esta funcionalidad no está disponible en dispositivos móviles.
          </h4>
        </div>
      </div>
      <div className="row justify-content-center formulario">
        <div className="col-12 col-md-8">
          <h2 className="text-center mb-4">Agregar Producto</h2>
          <Formik
            initialValues={{
              nombre: "",
              descripcion: "",
              categoria: "",
              caracteristicas: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <Field
                    className={`form-control ${
                      errors.nombre && touched.nombre
                        ? "is-invalid"
                        : touched.nombre
                        ? "is-valid"
                        : ""
                    }`}
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción:</label>
                  <Field
                    as="textarea"
                    className={`form-control ${
                      errors.descripcion && touched.descripcion
                        ? "is-invalid"
                        : touched.descripcion
                        ? "is-valid"
                        : ""
                    }`}
                    name="descripcion"
                    placeholder="Descripción"
                    style={{ resize: "none" }}
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Plataforma:</label>
                  <Field
                    as="select"
                    className={`form-control ${
                      errors.categoria && touched.categoria
                        ? "is-invalid"
                        : touched.categoria
                        ? "is-valid"
                        : ""
                    }`}
                    name="categoria"
                  >
                    <option value="" label="Seleccionar plataforma" />
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="categoria"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Características:</label>
                  <Field
                    as="select"
                    className={`form-control ${
                      errors.caracteristicas && touched.caracteristicas
                        ? "is-invalid"
                        : touched.caracteristicas
                        ? "is-valid"
                        : ""
                    }`}
                    name="caracteristicas"
                    multiple
                  >
                    {caracteristicas.map((caracteristica) => (
                      <option key={caracteristica.id} value={caracteristica.id}>
                        {caracteristica.nombre}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="caracteristicas"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Imágenes:</label>
                  <input
                    className={`form-control`}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagenChange}
                  />
                </div>
                <div className="mb-3 img-btn-borrar d-flex">
                  {imagenesSeleccionadas.map((imagen, index) => (
                    <div key={index} className="imagen-preview borde">
                      <img
                        src={URL.createObjectURL(imagen)}
                        alt={`Imagen ${index + 1}`}
                        className="img-seleccionada"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleBorrarImagen(index)}
                      >
                        Borrar
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Agregar Producto
                </button>
              </Form>
            )}
          </Formik>
          {mensaje && (
            <div
              className={`alert ${
                mensaje.includes("éxito") ? "alert-success" : "alert-danger"
              } mt-4`}
              role="alert"
            >
              {mensaje}
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default Agregador;
