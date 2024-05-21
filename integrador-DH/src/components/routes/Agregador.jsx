import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./agregador.css"; // Estilos personalizados

const Agregador = () => {
  const [mensaje, setMensaje] = useState("");
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(2, "El nombre es muy corto")
      .max(50, "El nombre es muy largo"),
    descripcion: Yup.string()
      .required("La descripción es requerida")
      .min(5, "La descripción es muy corta")
      .max(200, "La descripción es muy larga"),
    imagenes: Yup.array()
      .min(1, "Al menos una imagen es requerida")
      .max(5, "Máximo 5 imágenes permitidas"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("descripcion", values.descripcion);
    imagenesSeleccionadas.forEach((imagen) => {
      formData.append("imagenes", imagen);
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

      setMensaje("Producto agregado con éxito");
      resetForm();
      setImagenesSeleccionadas([]);
    } catch (error) {
      setMensaje("Error al enviar el producto");
      console.error("Error al enviar el objeto:", error);
    }

    setSubmitting(false);
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
    <div className="container my-5 container-form">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <h2 className="text-center mb-4">Agregar Producto</h2>
          <Formik
            initialValues={{ nombre: "", descripcion: "" }}
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
                  <label className="form-label">Imágenes:</label>
                  <input
                    className={`form-control`}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagenChange}
                  />
                </div>
                <div className="mb-3 img-btn-borrar  d-flex borde">
                  {imagenesSeleccionadas.map((imagen, index) => (
                    <div key={index} className="imagen-preview borde">
                      <img
                        src={URL.createObjectURL(imagen)}
                        alt={`Imagen ${index + 1}`}
                        className=" img-seleccionada"
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
