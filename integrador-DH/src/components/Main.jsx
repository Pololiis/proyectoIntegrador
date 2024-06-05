
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";
import BarraBuscador from "./common/BarraBuscador";

import CardPlataforma from "./common/CardPlataforma";


function Main() {

  return (
    <div>

      <div className="bg-h1 flex">
        <div className="container-h1 flex">
          <h1>Bienvenido a</h1>
          <span className="glow text-outline">GameShare</span>


          <a href="#body">
            <button class="btn-father">
              <span class="circle" aria-hidden="true"></span>
              <span class="button-text">Comenzar!</span>
            </button>
          </a>
        </div>
      </div>

      <a name="body"></a>
      <div className="container-cards-section flex">
        <h2>Plataformas</h2>
        <CardPlataforma />
        <BarraBuscador  />
      </div>
    </div>
  );
}

export default Main;

