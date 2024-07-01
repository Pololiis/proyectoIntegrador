import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import './listarReservas.css';

const ListarReservas = ({ usuarioId }) => {
    const { token } = useAuthContext();
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}alquiler/usuario/${usuarioId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReservas(response.data);
            } catch (error) {
                console.error("Error obteniendo las reservas:", error);
            }
        };

        if (usuarioId) {
            fetchReservas();
        }
    }, [usuarioId, token]);

    return (
        <div className="container-main">
            <h2>Mis Reservas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Videojuego</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                        <th>Comentarios</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.length > 0 ? (
                        reservas.map((reserva) => (
                            <tr key={reserva.id}>
                                <td>{reserva.id}</td>
                                <td>{reserva.videojuego?.nombre || "N/A"}</td>
                                <td>{new Date(reserva.fechaInicio).toLocaleDateString()}</td>
                                <td>{new Date(reserva.fechaFin).toLocaleDateString()}</td>
                                <td>{reserva.texto}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No tienes reservas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListarReservas;








