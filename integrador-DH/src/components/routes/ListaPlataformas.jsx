import React, { useState, useEffect } from "react";
import "./listaPlataformas.css";
import axios from "axios";
import CardPlataforma from "../common/CardPlataforma";

const ListaPlataformas = () => {


  return (
    <div className="container-main">
      <div className="container-cards-section flex">
        <h2>Plataformas</h2>
        <div className="container-cards flex">
         <CardPlataforma/>
        </div>
      </div>
    </div>
  );
};

export default ListaPlataformas;
