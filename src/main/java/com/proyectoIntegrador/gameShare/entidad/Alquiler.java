package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "alquiler")
public class Alquiler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alquiler")
    private int idAlquiler;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_reserva")
    private Date fechaReserva;

    @Column(name = "duracion_alquiler")
    private int duracionAlquiler;

    @ManyToOne
    @JoinColumn(name = "usuarios_id", nullable = false) // Revisar el nombre de la columna en la BD
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "Videojuegos_id", nullable = false) // Revisar el nombre de la columna en la BD
    private Videojuego videojuego;

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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Videojuego getVideojuego() {
        return videojuego;
    }

    public void setVideojuego(Videojuego videojuego) {
        this.videojuego = videojuego;
    }
}
