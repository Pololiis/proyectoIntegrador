import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./loginForm.css";

const LoginForm = ({ onLoginSuccess }) => {
const [mensaje, setMensaje] = useState("");

const validationSchema = Yup.object().shape({
email: Yup.string()
    .required("El email es requerido")
    .email("*El email es invalido"),
contrasenia: Yup.string().required("La contraseña es requerida"),
});

const handleSubmit = async (values, { setSubmitting, resetForm }) => {

  try {
    console.log('Enviando solicitud al servidor...');
    const response = await axios.post(
      "http://localhost:8080/conectarse",
      {
        email: values.email,
        contrasenia: values.contrasenia,

      }
    );
    


    console.log('Respuesta del servidor:', response.data);



    if (response.data.tokenDeAcceso) {
      localStorage.setItem("token", response.data.tokenDeAcceso);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

     
      

      onLoginSuccess(response.data.usuario);
      console.log(localStorage.getItem("usuario"));
      resetForm();
    } else {
      setMensaje("Inicio de sesión fallido");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    setMensaje("Error al iniciar sesión");
  } finally {
    setSubmitting(false);
  }
};
;
return (
<div className="container m-auto login">
    <div className="row justify-content-center ">
    <div className="col-12 col-md-8">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <Formik
        initialValues={{ email: "", contrasenia: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        {({ isSubmitting, errors, touched }) => (
            <Form>
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
                type="text"
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
                Iniciar Sesión
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

export default LoginForm;




