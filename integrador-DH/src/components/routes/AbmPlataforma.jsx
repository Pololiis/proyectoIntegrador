import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./abmPlataforma.css"; // Estilos personalizados

const AbmPlataforma = () => {
  const [mensaje, setMensaje] = useState("");
  // const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(2, "El nombre es muy corto")
      .max(50, "El nombre es muy largo"),
    // imagen: Yup.mixed().required("Una imagen es requerida"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
   
    // el append
    const data = { nombre: values.nombre };


    try {
      const response = await axios.post(
        "http://localhost:8080/plataformas",
        data
      );
      console.log(response);

      setMensaje("Categoría agregada con éxito");
      resetForm();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      setMensaje("Error al crear la categoría");
    } finally {
      setSubmitting(false);
    }
  };

  // const handleImagenChange = (event) => {
  //   const file = event.currentTarget.files[0];
  //   setImagenSeleccionada(file);
  // };

  // const handleBorrarImagen = () => {
  //   setImagenSeleccionada(null);
  // };

  return (
    <div className="container my-5 container-form">
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
          <h2 className="text-center mb-4">Crear Categoría</h2>
          <Formik
            initialValues={{ nombre: "" }}
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
                {/* <div className="mb-3">
                  <label className="form-label">Imágen:</label>
                  <input
                    className={`form-control`}
                    type="file"
                    accept="image/*"
                    onChange={handleImagenChange}
                  />
                </div>
                {imagenSeleccionada && (
                  <div className="mb-3 img-btn-borrar d-flex">
                    <div className="imagen-preview borde">
                      <img
                        src={URL.createObjectURL(imagenSeleccionada)}
                        alt="Imagen seleccionada"
                        className="img-seleccionada"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={handleBorrarImagen}
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                )}
                */}
                <button
                  className="btn btn-bd-primary w-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Crear Categoría
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

export default AbmPlataforma;
