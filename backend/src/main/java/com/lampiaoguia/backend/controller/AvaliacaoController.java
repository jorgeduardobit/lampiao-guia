package com.lampiaoguia.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.lampiaoguia.backend.dto.MediaAvaliacoesDTO;
import com.lampiaoguia.backend.model.Avaliacao;
import com.lampiaoguia.backend.service.AvaliacaoService;

@RestController
public class AvaliacaoController {
	
	private final AvaliacaoService service;
	
	public AvaliacaoController(AvaliacaoService service) {
		this.service = service;
	}
	
	@GetMapping("/servicos/{servicoId}/avaliacoes")
	public List<Avaliacao> listar(@PathVariable Integer servicoId) {
		return service.listarPorServico(servicoId);
	}
	
	@GetMapping("/servicos/{servicoId}/avaliacoes/media")
	public MediaAvaliacoesDTO media(@PathVariable Integer servicoId) {
		return service.calcularMedia(servicoId);
	}
	
	@PostMapping("/servicos/{servicoId}/avaliacoes")
	@ResponseStatus(HttpStatus.CREATED)
	public Avaliacao publicar(@PathVariable Integer servicoId,
							  @RequestParam Integer usuarioId,
							  @RequestBody Avaliacao avaliacao) {
		avaliacao.setServicoId(servicoId);
		avaliacao.setUsuarioId(usuarioId);
		return service.publicar(avaliacao);
	}
	
	@PutMapping("/avaliacoes/{id}")
	public Avaliacao editar(@PathVariable Integer id,
							@RequestParam Integer usuarioId,
							@RequestBody Avaliacao dados) {
		return service.editar(id, usuarioId, dados);
	}
	
	@DeleteMapping("/avaliacoes/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable Integer id, @RequestParam Integer usuarioId) {
		service.excluir(id, usuarioId);
	}
}
