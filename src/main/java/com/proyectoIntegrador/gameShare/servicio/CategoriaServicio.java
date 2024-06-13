package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.dto.CategoriaDTO;
import com.proyectoIntegrador.gameShare.entidad.Categoria;
import com.proyectoIntegrador.gameShare.entidad.Videojuego;
import com.proyectoIntegrador.gameShare.repositorio.CategoriaRepositorio;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
@AllArgsConstructor
public class CategoriaServicio {
    private CategoriaRepositorio categoriaRepositorio;
    public Categoria registrarCategoria(CategoriaDTO categoria) {

        Boolean categoriaExiste = categoriaRepositorio.existsByNombre(categoria.getNombre());

        if(!categoriaExiste) {
            Categoria categoriaAGuardar = new Categoria();
            categoriaAGuardar.setNombre(categoria.getNombre());
            categoriaAGuardar.setDescripcion(categoria.getDescripcion());
            categoriaAGuardar.setImagen(categoria.getImagen());

            return categoriaRepositorio.save(categoriaAGuardar);
        }

        return null;
    }

    public List<Categoria> buscarTodasCategorias() {
        return categoriaRepositorio.findAll();
    }

    public Categoria buscarCategoriaPorId(Long id) {
        return categoriaRepositorio.findById(id).orElse(null);
    }

    public void borrarCategoria(Long id) {
        categoriaRepositorio.deleteById(id);
    }
}
