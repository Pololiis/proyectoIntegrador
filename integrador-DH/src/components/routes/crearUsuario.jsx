import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import emailjs from 'emailjs-com';
import "./crearUsuario.css"; // Estilos personalizados


const CrearUsuario = () => {
  const [mensaje, setMensaje] = useState("");

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(2, "El nombre es muy corto")
      .max(50, "El nombre es muy largo")
      .matches(/^[A-Z]+$/i, "*Nombre invalido"),
    apellido: Yup.string()
      .required("El apellido es requerido")

      .min(2, "El apellido es muy corto")
      .max(50, "El apellido es muy largo"),

    email: Yup.string()
      .required("El email es requerido")
      .matches(
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        "*El email es invalido"
      ),

    fechaNacimiento: Yup.date()
      .required("La fecha de nacimiento es requerida")
      .nullable(),
    contrasenia: Yup.string()
      .required("La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(12, "La contraseña no debe tener más de 12 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "*La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
      ),
  });


  const sendEmail = (usuarioEmail, usuarioName) => {
    console.log('Enviando email a:', usuarioEmail, usuarioName);

    const templateParams = {
      to_email: usuarioEmail,
      to_name: usuarioName,
    };

    emailjs.send('service_edy99o7', 'template_fk62684', templateParams, 'xuAeGJr1E_Q9WvTkO')
      .then((response) => {
        console.log('Email enviado exitosamente!', response.status, response.text);
      }, (error) => {
        console.error('Error al enviar el email:', error);
      });
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Valores del formulario:', values);

    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("apellido", values.apellido);
    formData.append("email", values.email);
    formData.append("contrasenia", values.contrasenia);
    formData.append("rol", "usuario");

    try {
      const response = await axios.post(
        "http://localhost:8080/usuarios/nuevo",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      setMensaje("Usuario Registrado con éxito");
      resetForm();

      console.log('Llamando a sendEmail con:', values.email, values.nombre);
      sendEmail(values.email, values.nombre);

    } catch (error) {
      console.error("Error al registrar el Usuario:", error);
      setMensaje("Error al registrar el Usuario");
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <div className="container  m-auto register">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <h2 className="text-center mb-4">Registrar Usuario</h2>
          <Formik
            initialValues={{
              nombre: "",
              apellido: "",
              email: "",
              fechaNacimiento: "",
              contrasenia: "",
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
                  <label className="form-label">Apellido:</label>
                  <Field
                    className={`form-control ${
                      errors.apellido && touched.apellido
                        ? "is-invalid"
                        : touched.apellido
                        ? "is-valid"
                        : ""
                    }`}

                    type="text"

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
                      errors.email && touched.email
                        ? "is-invalid"
                        : touched.email
                        ? "is-valid"
                        : ""
                    }`}
                    type="email"

                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">

                  <label className="form-label">Fecha de Nacimiento:</label>
                  <Field
                    className={`form-control ${
                      errors.fechaNacimiento && touched.fechaNacimiento
                        ? "is-invalid"
                        : touched.fechaNacimiento
                        ? "is-valid"
                        : ""
                    }`}
                    type="date"
                    name="fechaNacimiento"
                  />
                  <ErrorMessage
                    name="fechaNacimiento"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">

                  <label className="form-label">Contraseña:</label>
                  <Field
                    className={`form-control ${
                      errors.contrasenia && touched.contrasenia
                        ? "is-invalid"
                        : touched.contrasenia
                        ? "is-valid"
                        : ""
                    }`}

                    type="password"
                    name="contrasenia"
                    placeholder="Contraseña"

                  />
                  <ErrorMessage
                    name="contrasenia"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <button
                  className="btn btn-bd-primary w-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Registrarse
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

