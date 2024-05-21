import "./volver.css";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Volver = () => {
  const navigate = useNavigate();

  const volverAtras = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <Link to="#" className="btn btn-bd-secondary link-volver mr-auto"  onClick={volverAtras}>
      ← Volver
    </Link>
  );
}

export default Volver;