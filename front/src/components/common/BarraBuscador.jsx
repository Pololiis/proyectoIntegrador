import "./buscador.css";
import CardJuego from "./CardJuego";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, List, ListItem, CircularProgress, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BarraBuscador() {
  const videojuegosUrl = `${import.meta.env.VITE_API_URL}videojuegos`;
  const alquileresUrl = `${import.meta.env.VITE_API_URL}alquiler`;

  const [videoJuegos, setVideoJuegos] = useState([]);
  const [alquileres, setAlquileres] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [placeholder, setPlaceholder] = useState("Buscar...");

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value;
    setStartDate(selectedStartDate);
    if (endDate && selectedStartDate > endDate) {
      setEndDate(selectedStartDate);
    }
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;
    setEndDate(selectedEndDate);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setBusqueda(searchTerm);

    if (searchTerm.length > 0) {
      const suggestions = videoJuegos.filter((videojuego) =>
        videojuego.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
      setShowSuggestions(true);

      if (suggestions.length > 0) {
        setPlaceholder(`¿Quisiste decir: ${suggestions[0].nombre}?`);
      } else {
        setPlaceholder("Buscar...");
      }
    } else {
      setShowSuggestions(false);
      setPlaceholder("Buscar...");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!busqueda && (!startDate || !endDate)) {
      return; // No realizar búsqueda si los campos están vacíos
    }
    setIsSubmitting(true);

    // Filtrar los videojuegos por nombre
    const filteredVideojuegos = videoJuegos.filter((videojuego) =>
      videojuego.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Filtrar los alquileres según los videojuegos filtrados y fechas
    const filtered = filteredVideojuegos.map((videojuego) => {
      const isAvailable = alquileres.every((alquiler) => {
        if (alquiler.videojuegosId !== videojuego.id) {
          return true;
        }
        const alquilerInicio = new Date(alquiler.fechaInicio);
        const alquilerFin = new Date(alquiler.fechaFin);
        const searchStart = new Date(startDate);
        const searchEnd = new Date(endDate);

        return searchEnd < alquilerInicio || searchStart > alquilerFin;
      });
      return { videojuego, isAvailable };
    });

    setFilteredData(filtered);
    setShowSuggestions(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    const fetchVideojuegos = async () => {
      try {
        const response = await axios.get(videojuegosUrl);
        setVideoJuegos(response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud de videojuegos:", error);
      }
    };

    const fetchAlquileres = async () => {
      try {
        const response = await axios.get(alquileresUrl);
        setAlquileres(response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud de alquileres:", error);
      }
    };

    fetchVideojuegos();
    fetchAlquileres();
  }, []);

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <Container className="buscador d-flex">
      <div className="buscador-header">
        <h2>¡Elige tu próxima aventura!</h2>
        <form onSubmit={handleSubmit} className="buscador-form">
          <TextField
            onChange={handleSearch}
            value={busqueda}
            label="Buscar..."
            variant="outlined"
            placeholder={placeholder}
            className="buscador-input"
            aria-label="Buscar videojuegos"
          />
              {showSuggestions && (
          <List className="buscador-suggestions">
            {filteredSuggestions.map((videojuego) => (
              <ListItem
                key={videojuego.id}
                onClick={() => {
                  setBusqueda(videojuego.nombre);
                  setShowSuggestions(false);
                }}
                className="buscador-suggestion"
                role="option"
              >
                {videojuego.nombre}
              </ListItem>
            ))}
          </List>
        )}
          <TextField
            id="startDate"
            label="Fecha de inicio"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            className="buscador-input"
            inputProps={{
              "aria-label": "Fecha de inicio",
              min: getTodayDate(),
            }}
          />
          <TextField
            id="endDate"
            label="Fecha de fin"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            className="buscador-input"
            inputProps={{
              "aria-label": "Fecha de fin",
              min: startDate,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Buscar"}
          </Button>
        </form>

      </div>

      <section className="cards-src">
        {isSubmitting ? (
          <CircularProgress className="loading-spinner" />
        ) : (
          <div className="container-card flex">
            {filteredData.length > 1 ? (
              <Slider {...settings} className="slider-card">
                {filteredData.map(({ videojuego, isAvailable }) =>
                  isAvailable ? (
                    <CardJuego key={videojuego.id} videojuego={videojuego} hideImage={!busqueda} />
                  ) : (
                    <Typography key={videojuego.id} variant="h6" color="error">
                      Las fechas elegidas no están disponibles para {videojuego.nombre}.
                    </Typography>
                  )
                )}
              </Slider>
            ) : (
              filteredData.map(({ videojuego, isAvailable }) =>
                isAvailable ? (
                  <CardJuego key={videojuego.id} videojuego={videojuego} hideImage={!busqueda} />
                ) : (
                  <Typography key={videojuego.id} variant="h6" color="error">
                    Las fechas elegidas no están disponibles para {videojuego.nombre}.
                  </Typography>
                )
              )
            )}
            {filteredData.length === 0 && (
              <Typography className="buscador-error" variant="h6" color="error">
                No se encontraron resultados para las fechas elegidas. Pruebe con otro rango de fechas
              </Typography>
            )}
          </div>
        )}
      </section>
    </Container>
  );
}

export default BarraBuscador;

