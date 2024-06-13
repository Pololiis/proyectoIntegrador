import React, { useState } from "react";
import "./galeriaImagenes.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


function GaleriaImagenes({ titulo, descripcion, imagenes, plataforma }) {

  const [mostrarMas, setMostrarMas] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleVerMasClick = () => {
    setMostrarMas(!mostrarMas);
  };

  const handleAlquilarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleReserva = async () => {
    if (!startDate || !endDate) {
      alert("Por favor, seleccione un rango de fechas válido.");
      return;
    }

    const reservaData = {
      fechaReserva: startDate,
      duracionAlquiler: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)), // Duración en días
      usuariosId: usuarioId, // Id del usuario
      videojuegosId: videojuegoId // Id del videojuego
    };

    try {
      await axios.post('/api/alquileres', reservaData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Reserva realizada con éxito.");
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      alert("Hubo un error al realizar la reserva. Por favor, inténtelo de nuevo.");
    }
  };

  const imagenesRepetidas = new Array(9).fill(imagenes[1]);

  return (
    <div className="container-galeria">
      <div className="titulo-descripcion-detalle">
        
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
       
      </div>
      
   
       
      <div className="row">

        <div className="col-lg-6 d-flex flex-column align-items-center">
          <div className="img-principal-container mb-3">
            <img
              src={imagenes[0]}
              alt="imagen principal"
              className="img-fluid img-principal"
            />
            
          </div>
          <div className="btn-group">
            <button className=" btn-accion">
              Comprar
            </button>
            <button className="btn-accion " onClick={handleAlquilarClick}>
              Alquilar
            </button>   {showCalendar && (
            <div className="calendario-container">
              <DatePicker
                selected={startDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                monthsShown={2}
                inline
                minDate={new Date()}
              />
              <button className="btn btn-primary mt-3" onClick={handleReserva}>
                Confirmar Reserva
              </button>
            </div>
          )}

          </div>

        </div>
        
        
        <div className="col-lg-6 d-flex flex-wrap justify-content-around align-content-start">
          {imagenesRepetidas.slice(0, mostrarMas ? imagenesRepetidas.length : 4).map((imagen, index) => (
            <div key={index} className="container-img-secundaria">
              <img
                src={imagen}
                alt={`Imagen ${index + 1}`}
                className="img-secundaria"
              />
            </div>
          ))}
          
          <div className="col-12 text-end mt-2">
            <button className="btn btn-primary btn-accion" onClick={handleVerMasClick}>
              {mostrarMas ? "Ver menos" : "Ver más"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GaleriaImagenes;


/* 
import React, { useState } from "react";
import "./galeriaImagenes.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function GaleriaImagenes({ titulo, descripcion, imagenes, videojuegoId, usuarioId, token }) {
  const [mostrarMas, setMostrarMas] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleVerMasClick = () => {
    setMostrarMas(!mostrarMas);
  };

  const handleAlquilarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleReserva = async () => {
    if (!startDate || !endDate) {
      alert("Por favor, seleccione un rango de fechas válido.");
      return;
    }

    const reservaData = {
      fechaReserva: startDate,
      duracionAlquiler: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)), // Duración en días
      usuariosId: usuarioId, // Id del usuario
      videojuegosId: videojuegoId // Id del videojuego
    };

    try {
      await axios.post('/api/alquileres', reservaData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Reserva realizada con éxito.");
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      alert("Hubo un error al realizar la reserva. Por favor, inténtelo de nuevo.");
    }
  };

  const imagenesRepetidas = new Array(10).fill(imagenes[1]);

  return (
    <div className="container-galeria">
      <div className="titulo-descripcion-detalle">
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
        {token && ( // Renderizar botones solo si el token está presente
          <div className="btn-group">
            <button className="btn-accion">
              Comprar
            </button>
            <button className="btn-accion" onClick={handleAlquilarClick}>
              Alquilar
            </button>   
            {showCalendar && (
              <div className="calendario-container">
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  inline
                  minDate={new Date()}
                />
                <button className="btn btn-primary mt-3" onClick={handleReserva}>
                  Confirmar Reserva
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-lg-6 d-flex flex-column align-items-center">
          <div className="img-principal-container mb-3">
            <img
              src={imagenes[0]}
              alt="imagen principal"
              className="img-fluid img-principal"
            />
          </div>
        </div>
        <div className="col-lg-6 d-flex flex-wrap justify-content-around align-content-start">
          {imagenesRepetidas.slice(0, mostrarMas ? imagenesRepetidas.length : 4).map((imagen, index) => (
            <div key={index} className="container-img-secundaria">
              <img
                src={imagen}
                alt={`Imagen ${index + 1}`}
                className="img-secundaria"
              />
            </div>
          ))}
          <div className="col-12 text-end mt-2">
            <button className="btn btn-primary btn-accion" onClick={handleVerMasClick}>
              {mostrarMas ? "Ver menos" : "Ver más"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GaleriaImagenes;
*/ 