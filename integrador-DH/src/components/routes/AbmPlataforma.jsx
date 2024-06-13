import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./abmPlataforma.css"; // Estilos personalizados

const AbmPlataforma = () => {
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("token");

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(2, "El nombre es muy corto")
      .max(50, "El nombre es muy largo"),
    descripcion: Yup.string()
      .required("La descripción es requerida")
      .min(10, "La descripción es muy corta")
      .max(200, "La descripción es muy larga"),
    imagen: Yup.mixed().required("Una imagen es requerida"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("descripcion", values.descripcion);
    formData.append("imagen", values.imagen);

    try {
      const response = await axios.post(
        "http://localhost:8080/categorias/nuevo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(token);
      setMensaje("Categoría agregada con éxito");
      resetForm();
      console.log(response);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      setMensaje(
        "Error al crear la categoría: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container m-auto my-5 container-form">
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
          <h2 className="text-center mb-4">Agregar Plataforma</h2>
          <Formik
            initialValues={{
              nombre: "",
              descripcion: "",
              imagen: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              setFieldValue,
              errors,
              touched,
              values,
            }) => (
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
                    className={`form-control ${
                      errors.descripcion && touched.descripcion
                        ? "is-invalid"
                        : touched.descripcion
                        ? "is-valid"
                        : ""
                    }`}
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Imagen:</label>
                  <input
                    className={`form-control ${
                      errors.imagen && touched.imagen
                        ? "is-invalid"
                        : touched.imagen
                        ? "is-valid"
                        : ""
                    }`}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("imagen", event.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage
                    name="imagen"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {values.imagen && (
                  <div className="mb-3 img-btn-borrar d-flex">
                    <div className="imagen-preview borde">
                      <img
                        src={URL.createObjectURL(values.imagen)}
                        alt="Imagen seleccionada"
                        className="img-seleccionada"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => setFieldValue("imagen", null)}
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                )}

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Agregar Plataforma
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
