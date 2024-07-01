import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './whatsAppButton.css';

const WhatsAppButton = ({ phoneNumber }) => {
const handleWhatsAppClick = () => {
if (!navigator.onLine) {
    toast.error("No hay conexión a internet. Por favor, verifica tu conexión.");
    return;
}

const url = `https://wa.me/${phoneNumber}`;
window.open(url, "_blank");
toast.success("Mensaje enviado correctamente.");
};

return (
<>
    <button className="whatsapp-button" onClick={handleWhatsAppClick}>
    <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
    </button>
    <ToastContainer />
</>
);
};

export default WhatsAppButton;
