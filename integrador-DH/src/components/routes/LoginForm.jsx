import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./loginForm.css"; // Estilos personalizados

const LoginForm = ({ onLoginSuccess }) => {
const [mensaje, setMensaje] = useState("");


const validationSchema = Yup.object().shape({
email: Yup.string()
    .required("El email es requerido")
    .matches(
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    "*El email es invalido"
    ),
contrasenia: Yup.string().required("La contraseña es requerida"),
});

const handleSubmit = async (values, { setSubmitting, resetForm }) => {
try {
    const response = await axios.post(
    "http://localhost:8080/conectarse",
    {
        email: values.email,
        contrasenia: values.contrasenia,
    }
    );

    if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    onLoginSuccess(response.data.user);

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

return (
<div className="container my-5 container-form">
    <div className="row justify-content-center">
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
                className="btn btn-primary w-100"
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
