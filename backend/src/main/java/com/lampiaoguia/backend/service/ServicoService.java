package com.lampiaoguia.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.lampiaoguia.backend.model.Servico;
import com.lampiaoguia.backend.model.StatusServicoEnum;
import com.lampiaoguia.backend.repository.ServicoRepository;

@Service
public class ServicoService {
	 
	private final ServicoRepository repository;
	
	public ServicoService(ServicoRepository repository) {
		this.repository = repository;
	}
	
	// READ: lista só os serviços aprovados, com busca opcional por nome
	public List<Servico> listarAprovados(String nome) {
		if (nome == null || nome.isBlank()) {
			return repository.findByStatus(StatusServicoEnum.aprovado);
		}
		return repository.findByStatusAndNomeContainingIgnoreCase(StatusServicoEnum.aprovado, nome);
	}
	
	// READ: Lista os serviços que esperam decisão do administrador
	public List<Servico> listarPendentes() {
		return repository.findByStatus(StatusServicoEnum.pendente);
	}
	
	//READ: busca um serviço pelo ID, ou avisa que não existe
	public Servico buscarPorId(Integer id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado"));
	}
	
	// CREATE: usúario comum sugere, e o serviço nasce pendente
	public Servico sugerir(Servico servico, Integer usuarioId) {
		servico.setId(null);
		servico.setStatus(StatusServicoEnum.pendente);
		servico.setCriadoPor(usuarioId);
		return repository.save(servico);
	}
	
	// CREATE: administrador cadastra, e o serviço já nasce aprovado
	public Servico cadastrar(Servico servico, Integer adminId) {
		servico.setId(null);
		servico.setStatus(StatusServicoEnum.aprovado);
		servico.setCriadoPor(adminId);
		servico.setRevisadoPor(adminId);
		return repository.save(servico);
	}
	
	//UPDATE: troca as informações do serviço (não mexe no status)
	public Servico atualizar(Integer id, Servico dados) {
		Servico servico = buscarPorId(id);
		servico.setNome(dados.getNome());
		servico.setCategoria(dados.getCategoria());
		servico.setCidade(dados.getCidade());
		servico.setEstado(dados.getEstado());
		servico.setEndereco(dados.getEndereco());
		servico.setDescricao(dados.getDescricao());
		return repository.save(servico);
	}
	
	// DECIDIR: administrador aprova, rejeita ou arquiva
	public Servico aprovar(Integer id, Integer adminId) {
		return mudarStatus(id, StatusServicoEnum.aprovado, adminId);
	}
	
	public Servico rejeitar(Integer id, Integer adminId) {
		return mudarStatus(id, StatusServicoEnum.rejeitado, adminId);
	}
	
	public Servico arquivar(Integer id, Integer adminId) {
		return mudarStatus(id,StatusServicoEnum.arquivado, adminId);
	}
	
	private Servico mudarStatus(Integer id, StatusServicoEnum novoStatus, Integer adminId) {
		Servico servico = buscarPorId(id);
		servico.setStatus(novoStatus);
		servico.setRevisadoPor(adminId);
		return repository.save(servico);
	}
}	