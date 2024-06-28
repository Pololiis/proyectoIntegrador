import React, { useState } from "react";
import "./galeriaImagenes.css";
import { Button, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px',
  
};

function GaleriaImagenes({ titulo, descripcion, imagenes }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleVerMasClick = () => {
    setMostrarModal(true);
  };

  const handleClose = () => {
    setMostrarModal(false);
  };

  // Repetir la segunda imagen 6 veces
  const imagenesRepetidas = new Array(6).fill(imagenes[1]);

  return (
    <div className="container-galeria">
      <div className="titulo-descripcion-detalle">
        <p>{descripcion}</p>
      </div>
      <div className="galeria-imagenes">
        <div className="columna-izquierda">
          <div className="imagen-principal">
            <img src={imagenes[0]} alt="imagen principal" />
          </div>
        </div>
        <div className="columna-derecha">
          <div className="imagenes-secundarias">
            {imagenesRepetidas.slice(0, 4).map((imagen, index) => (
              <div key={index} className="imagen-secundaria">
                <img src={imagen} alt={`Imagen ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="ver-mas">
            <Button variant="contained" color="primary" onClick={handleVerMasClick}>
              Ver más
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={mostrarModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          {imagenes.map((imagen, index) => (
            <div key={index} className="imagen-modal">
              <img src={imagen} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}

export default GaleriaImagenes;
