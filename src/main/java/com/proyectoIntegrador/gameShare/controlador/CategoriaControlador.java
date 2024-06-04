package com.proyectoIntegrador.gameShare.controlador;

import com.proyectoIntegrador.gameShare.entidad.Categoria;
import com.proyectoIntegrador.gameShare.servicio.CategoriaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaControlador {
    @Autowired
    private CategoriaServicio categoriaServicio;

    @GetMapping
    public List<Categoria> buscarTodaCategorias(){
        return categoriaServicio.buscarTodasCategorias();
    }

    @GetMapping("/{id}")
    public Categoria buscarCategoriaPorId(@PathVariable Long id) {
        return categoriaServicio.buscarCategoriaPorId(id);
    }

    @PostMapping("/nuevo")
    public Categoria guardarCategoria(@RequestBody Categoria categoria) {
        return categoriaServicio.guardarCategoria(categoria);
    }

    @DeleteMapping("/{id}")
    public void borrarCategoria(@PathVariable Long id) {
        categoriaServicio.borrarCategoria(id);
    }

}
