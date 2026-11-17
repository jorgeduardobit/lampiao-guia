package com.lampiaoguia.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.lampiaoguia.backend.model.Servico;
import com.lampiaoguia.backend.service.ServicoService;

@RestController
@RequestMapping("/servicos")
public class ServicoController {
	
	private final ServicoService service;
	
	public ServicoController(ServicoService service) {
		this.service = service;
	}
	
	@GetMapping
	public List<Servico> listar(@RequestParam(required = false) String nome) {
		return service.listarAprovados(nome);
	}
	
	@GetMapping("/pendentes")
	public List<Servico> listarPendentes() {
		return service.listarPendentes();
	}
	
	@GetMapping("/{id}")
	public Servico buscar(@PathVariable Integer id) {
		return service.buscarPorId(id);
	}
	@PostMapping("/sugestoes")
	@ResponseStatus(HttpStatus.CREATED)
	public Servico sugerir(@RequestBody Servico servico, @RequestParam Integer usuarioId) {
		return service.sugerir(servico,  usuarioId);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Servico cadastrar(@RequestBody Servico servico, @RequestParam Integer adminId) {
		return service.cadastrar(servico, adminId);
	}
	
	@PutMapping("/{id}")
	public Servico atualizar(@PathVariable Integer id, @RequestBody Servico dados) {
		return service.atualizar(id, dados);
	}
	@PatchMapping("/{id}/aprovar")
	public Servico aprovar(@PathVariable Integer id, @RequestParam Integer adminId) {
		return service.aprovar(id, adminId);
	}
	
	@PatchMapping("/{id}/rejeitar")
	public Servico rejeitar(@PathVariable Integer id, @RequestParam Integer adminId) {
		return service.rejeitar(id, adminId);
	}
	
	@PatchMapping("/{id}/arquivar")
	public Servico arquivar(@PathVariable Integer id, @RequestParam Integer adminId) {
		return service.arquivar(id, adminId);
	}
}