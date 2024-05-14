package com.proyectoIntegrador.gameShare.servicio;

import com.proyectoIntegrador.gameShare.entidad.Categoria;
import com.proyectoIntegrador.gameShare.repositorio.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoriaServicio {
    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    public List<Categoria> buscarTodasCategorias() {
        return categoriaRepositorio.findAll();
    }

    public Categoria buscarCategoriaPorId(Long id) {
        return categoriaRepositorio.findById(id).orElse(null);
    }

    public Categoria guardarCategoria(Categoria categoria) {
        return categoriaRepositorio.save(categoria);
    }

    public void borrarCategoria(Long id) {
        categoriaRepositorio.deleteById(id);
    }
}
