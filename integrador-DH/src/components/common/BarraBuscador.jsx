import "./buscador.css";
import CardJuego from "./CardJuego";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";

function BarraBuscador() {
  const url = "http://localhost:8080/videojuegos";
  const [videoJuegos, setVideoJuegos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [placeholder, setPlaceholder] = useState("Buscar...");
  const [isExpanded, setIsExpanded] = useState(false); // Nuevo estado

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

      // Actualizar placeholder con la primera sugerencia
      if (suggestions.length > 0) {
         setPlaceholder(`¿Quisiste decir: ${suggestions[0].nombre}?`);
      } else {
        setPlaceholder("Buscar...");
      }
      setIsExpanded(true); // Expande el buscador
    } else {
      setShowSuggestions(false);
      setPlaceholder("Buscar...");
      setIsExpanded(false); // Contrae el buscador
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!busqueda && (!startDate || !endDate)) {
      return; // No realizar búsqueda si los campos están vacíos
    }
    setIsSubmiting(true);

    // Filtrado por nombre y fechas
    const filtered = videoJuegos.filter((videojuego) => {
      const isNameMatch = videojuego.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const isDateMatch = startDate && endDate
        ? new Date(videojuego.disponibilidadInicio) <= new Date(endDate) &&
          new Date(videojuego.disponibilidadFin) >= new Date(startDate)
        : true;
      return isNameMatch && isDateMatch;
    });

    setFilteredData(filtered);
    setShowSuggestions(false);
    setIsSubmiting(false);
    setIsExpanded(true); // Expande el buscador para mostrar los resultados
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setVideoJuegos(response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className={`buscador ${isExpanded ? 'expandido' : 'contraido'}`} maxWidth="md">
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
            disabled={isSubmiting}
          >
            {isSubmiting ? <CircularProgress size={24} /> : "Buscar"}
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
                  setIsExpanded(true); // Expande el buscador si se selecciona una sugerencia
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
        {isSubmiting ? (
          <CircularProgress className="loading-spinner" />
        ) : (
          <div className="container-card flex">
            {filteredData.map((videojuego) => (
              <CardJuego key={videojuego.id} videojuego={videojuego} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}

export default BarraBuscador;