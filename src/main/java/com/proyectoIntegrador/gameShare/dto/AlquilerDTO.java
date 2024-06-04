package com.proyectoIntegrador.gameShare.dto;

import java.util.Date;

public class AlquilerDTO {

    private int idAlquiler;
    private Date fechaReserva;
    private int duracionAlquiler;
    private Long usuariosId;
    private Long videojuegosId;

    //Getters y Setters

    public int getIdAlquiler() {
        return idAlquiler;
    }

    public void setIdAlquiler(int idAlquiler) {
        this.idAlquiler = idAlquiler;
    }

    public Date getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(Date fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public int getDuracionAlquiler() {
        return duracionAlquiler;
    }

    public void setDuracionAlquiler(int duracionAlquiler) {
        this.duracionAlquiler = duracionAlquiler;
    }

    public Long getUsuariosId() {
        return usuariosId;
    }

    public void setUsuariosId(Long usuariosId) {
        this.usuariosId = usuariosId;
    }

    public Long getVideojuegosId() {
        return videojuegosId;
    }

    public void setVideojuegosId(Long videojuegosId) {
        this.videojuegosId = videojuegosId;
    }
}
