package com.lampiaoguia.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.lampiaoguia.backend.model.Usuario;
import com.lampiaoguia.backend.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
	
	private final UsuarioService service;
	
	public UsuarioController(UsuarioService service) {
		this.service = service;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario cadastrar(@RequestBody Usuario usuario) {
		return service.cadastrar(usuario);
	}
	
	@GetMapping("/{id}")
	public Usuario buscar(@PathVariable Integer id) {
		return service.buscarPorId(id);
	}
	
	@PutMapping("/{id}")
	public Usuario atualizar(@PathVariable Integer id, @RequestBody Usuario dados) {
		return service.atualizar(id, dados);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable Integer id) {
		service.excluir(id);
	}

}
