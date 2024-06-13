import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/index.css";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
import LoginForm from "./routes/LoginForm";
import CrearUsuario from "./routes/crearUsuario";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      setUsuario(JSON.parse(savedUsuario));
    }
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLoginSuccess = (usuario) => {
    setUsuario(usuario);
    closeLoginModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  const renderUserAvatar = (usuario) => {
    const initials = usuario.nombre
      .split(" ")
      .map((name) => name[0])
      .join("");
    return (
      <div className="user-info">
        <Link to="/usuario" className="avatar-link">
          <span className="avatar">{initials}</span>
          <span className="user-name">{usuario.nombre}</span>
        </Link>
        <button onClick={handleLogout} className="btn btn-logout">
          Cerrar Sesión
        </button>
      </div>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand eslogan">
            <img src={logo} alt="Logo" className="logo" /> ¡Juega más, paga menos!
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link inicio" aria-current="page">
                  Inicio
                </Link>
              </li>
              {usuario && usuario.rol.idRol === 2 && (
                <li className="nav-item">
                  <Link to="/administrador" className="nav-link">
                    Panel de Administración
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex container-buttons">
              {usuario ? (
                renderUserAvatar(usuario)
              ) : (
                <>
                  <button className="btn btn-bd-primary me-2" onClick={openLoginModal}>
                    Iniciar Sesión
                  </button>
                  <button className="btn btn-bd-primary" onClick={openRegisterModal}>
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Modal show={isLoginModalOpen} onHide={closeLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Inicio de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body className="login">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeLoginModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isRegisterModalOpen} onHide={closeRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Registro de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body className="register">
          <CrearUsuario />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRegisterModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;