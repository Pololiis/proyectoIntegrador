import React, { useState } from 'react';
import './panel.css'; // Asegúrate de crear y enlazar este archivo de estilos

import ListaUsuarios from './ListaUsuarios';
import ListaVideojuegos from './ListaVideojuegos';
import CrearUsuario from './crearUsuario';
import Agregador from './Agregador';
import AbmPlataforma from './AbmPlataforma';
import ListaPlataformas from './ListaPlataformas'

const Panel = () => {
  const [componenteActivo, setComponenteActivo] = useState(null);

  const renderComponente = () => {
    switch (componenteActivo) {
      case 'usuarios':
        return <CrearUsuario />;
      case 'videojuegos':
        return <Agregador />;
      case 'plataforma':
        return <AbmPlataforma />;
      case 'listaUsuarios':
        return <ListaUsuarios />;
      case 'listaVideojuegos':
        return <ListaVideojuegos />;
      case 'listaPlataformas':
        return <ListaPlataformas />;
      default:
        return <div>Bienvenido al panel de administración</div>;
    }
  };

  return (
    <>
      <div>PANEL DE ADMINISTRACIÓN.</div>
      <div className="button-row">
        <button className="btn-panel" onClick={() => setComponenteActivo('usuarios')}>Registrar Usuarios</button>
        <button className="btn-panel" onClick={() => setComponenteActivo('videojuegos')}>Agregar Videojuegos</button>
        <button className="btn-panel" onClick={() => setComponenteActivo('plataforma')}>Crear Categorías</button>
        <button className="btn-panel" onClick={() => setComponenteActivo('listaUsuarios')}>Lista de Usuarios</button>
        <button className="btn-panel" onClick={() => setComponenteActivo('listaVideojuegos')}>Lista de Videojuegos</button>
        <button className="btn-panel" onClick={() => setComponenteActivo('listaPlataformas')}>Lista de Categorías</button>
      </div>
      <div className="componente-activo">
        {renderComponente()}
      </div>
    </>
  );
}

export default Panel;
