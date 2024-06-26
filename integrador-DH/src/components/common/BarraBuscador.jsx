import "./buscador.css";
import CardJuego from "./CardJuego";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, List, ListItem, CircularProgress, Typography } from "@mui/material";

function BarraBuscador() {
  // const videojuegosUrl = "http://localhost:8080/videojuegos";
  // const alquileresUrl = "http://localhost:8080/alquiler";
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

    // Debug: Log filtered suggestions
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

    // Debug: Log filtered videojuegos
    console.log("Filtered videojuegos:", filteredVideojuegos);

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
        //------------------------------------------------------------

        if (searchEnd < alquilerInicio || searchStart > alquilerFin) {
          console.log("videojuego disponible");
        } else {
          console.log("videojuego no disponible");
        }

        // Debug: Log alquiler dates and search dates
        // console.log(`Checking alquiler for videojuego ${videojuego.id}`);
        // console.log("Alquiler start:", alquilerInicio);
        // console.log("Alquiler end:", alquilerFin);
        // console.log("Search start:", searchStart);
        // console.log("Search end:", searchEnd);

        return searchEnd < alquilerInicio || searchStart > alquilerFin;
      });
      return { videojuego, isAvailable };
    });

    // Debug: Log filtered data
    console.log("Filtered data:", filtered);

    setFilteredData(filtered);
    setShowSuggestions(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    const fetchVideojuegos = async () => {
      try {
        const response = await axios.get(videojuegosUrl);
        setVideoJuegos(response.data);

        // Debug: Log fetched videojuegos
        console.log("Fetched videojuegos:", response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud de videojuegos:", error);
      }
    };

    const fetchAlquileres = async () => {
      try {
        const response = await axios.get(alquileresUrl);
        setAlquileres(response.data);

        // Debug: Log fetched alquileres
        console.log("Fetched alquileres:", response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud de alquileres:", error);
      }
    };

    fetchVideojuegos();
    fetchAlquileres();
  }, []);

  return (
    <Container className="buscador" maxWidth="md">
      <div className="buscador-header">
        <h2>Buscar Videojuegos</h2>
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
            className="buscador-button btn-bd-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Buscar"}
          </Button>
        </form>
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
      </div>

      <section className="cards-src">
        {isSubmitting ? (
          <CircularProgress className="loading-spinner" />
        ) : (
          <div className="container-card flex">
            {filteredData.length > 0 ? (
              filteredData.map(({ videojuego, isAvailable }) =>
                isAvailable ? (
                  <CardJuego key={videojuego.id} videojuego={videojuego} hideImage={!busqueda} />
                ) : (
                  <Typography key={videojuego.id} variant="h6" color="error">
                    Las fechas elegidas no están disponibles para {videojuego.nombre}.
                  </Typography>
                )
              )
            ) : (
              <Typography variant="h6" color="textSecondary">
                No se encontraron resultados.
              </Typography>
            )}
          </div>
        )}
      </section>
    </Container>
  );
}

export default BarraBuscador;
