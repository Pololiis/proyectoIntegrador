import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/index.css";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
import LoginForm from "./routes/LoginForm";
import CrearUsuario from "./routes/crearUsuario";
import Modal from "react-modal";

Modal.setAppElement('#root');

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
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

  const handleLoginSuccess = (user) => {
    setUser(user);
    closeLoginModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const renderUserAvatar = (user) => {
    const initials = user.nombre
      .split(" ")
      .map((name) => name[0])
      .join("");
    return (
      <div className="user-info">
        <Link to="/usuario" className="avatar-link">
          <span className="avatar">{initials}</span>
          <span className="user-name">{user.nombre}</span>
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
                <Link to="/" className="nav-link" aria-current="page">
                  Inicio
                </Link>
              </li>
            </ul>
            <div className="d-flex container-buttons">
              {user ? (
                renderUserAvatar(user)
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

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Formulario de Inicio de Sesión"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button onClick={closeLoginModal} className="close-modal">X</button>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        contentLabel="Formulario de Registro de Usuario"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button onClick={closeRegisterModal} className="close-modal">X</button>
        <CrearUsuario />
      </Modal>
    </>
  );
}

export default NavBar;

