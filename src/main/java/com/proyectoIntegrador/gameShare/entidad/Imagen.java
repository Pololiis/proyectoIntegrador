package com.proyectoIntegrador.gameShare.entidad;

import jakarta.persistence.*;
import jdk.jfr.Label;
import lombok.Data;

@Entity
@Data
@Table(name = "Imagenes")
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) //Validación de datos: el nombre no puede ser nulo ni vacio
    private String nombre;
    
    @Lob //indica que el atributo data puede almacenar objetos grandes
    private byte[] data;

    //Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
