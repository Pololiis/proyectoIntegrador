import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./crearUsuario.css"; // Estilos personalizados

const CrearUsuario = () => {
  const [mensaje, setMensaje] = useState("");

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(2, "El nombre es muy corto")
      .max(50, "El nombre es muy largo"),
    apellido: Yup.string()
      .required("El apellido es requerido")
      .min(5, "El apellido es muy corto")
      .max(200, "El apellido es muy largo"),
      mail: Yup.string()
      .required("El mail es requerido")

  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Create FormData instance
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("apellido", values.apellido);
    formData.append("mail", values.mail );
  
    try {
      // Send POST request to the server
      const response = await axios.post(
        "http://localhost:8080/videojuegos/nuevo",
        formData,
        {
          headers: {  // Correct header key
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Log response for debugging
      console.log(response);
  
      // Display success message and reset form
      setMensaje("Usuario Registrado con éxito");
      resetForm();
    } catch (error) {
      // Display error message
      console.error("Error al registrar el Usuario:", error);
      setMensaje("Error al registrar el Usuario");
    } finally {
      // Ensure submitting state is always reset
      setSubmitting(false);
    }
  };


  return (
    <div className="container my-5 container-form">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <h2 className="text-center mb-4">Registrar Usuario</h2>
          <Formik
            initialValues={{ nombre: "", descripcion: "", mail: "" }}
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
                  <label className="form-label">Apellido:</label>
                  <Field
                    className={`form-control ${
                      errors.apellido && touched.apellido
                        ? "is-invalid"
                        : touched.apellido
                        ? "is-valid"
                        : ""
                    }`}
                    name="apellido"
                    placeholder="Apellido"
                   />
                  <ErrorMessage
                    name="apellido"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">E-Mail:</label>
                  <Field
                    className={`form-control ${
                      errors.mail && touched.mail
                        ? "is-invalid"
                        : touched.mail
                        ? "is-valid"
                        : ""
                    }`}
                    type="text"
                    name="mail"
                    placeholder="mail"
                  />
                  <ErrorMessage
                    name="mail"
                    component="div"
                    className="text-danger"
                  />
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
export default CrearUsuario;
