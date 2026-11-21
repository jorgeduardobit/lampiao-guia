package com.lampiaoguia.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.lampiaoguia.backend.model.PerfilEnum;
import com.lampiaoguia.backend.model.Usuario;
import com.lampiaoguia.backend.repository.AvaliacaoRepository;
import com.lampiaoguia.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	private final UsuarioRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final AvaliacaoRepository avaliacaoRepository;
	
	public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder, AvaliacaoRepository avaliacaoRepository) {
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
		this.avaliacaoRepository = avaliacaoRepository;
	}
	

	//CREATE: cria uma conta nova, sempre como usuário comum.
	public Usuario cadastrar(Usuario usuario) {
		validarSenha(usuario.getSenha());
		if (repository.existsByEmail(usuario.getEmail())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma conta com este e-mail");
		}
		usuario.setId(null);
		usuario.setPerfil(PerfilEnum.comum);
		usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
		return repository.save(usuario);
	}
	
	//READ: busca um usuário pelo id, ou avisa que não existe
	public Usuario buscarPorId(Integer id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
	}
	
	// UPDATE: troca nome, e-mail e (se vier uma nova) a senha
	public Usuario atualizar(Integer id, Usuario dados) {
		Usuario usuario = buscarPorId(id);
		
		boolean emailMudou = !usuario.getEmail().equalsIgnoreCase(dados.getEmail());
		if (emailMudou && repository.existsByEmail(dados.getEmail()) ) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma conta com este e-mail.");
		}
		
		usuario.setNome(dados.getNome());
		usuario.setEmail(dados.getEmail());
		
		if (dados.getSenha() != null && !dados.getSenha().isBlank()) {
			validarSenha(dados.getSenha());
			usuario.setSenha(passwordEncoder.encode(dados.getSenha()));
		}
		return repository.save(usuario);
	}
	
	// DELETE: exclui a conta
	@Transactional
	public void excluir(Integer id, boolean apagarAvaliacoes) {
		Usuario usuario = buscarPorId(id);
		if (apagarAvaliacoes) {
			avaliacaoRepository.deleteByUsuarioId(id);
		}
		repository.delete(usuario);
	}
	
	private void validarSenha(String senha) {
		if (senha == null || senha.length() < 8) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A senha deve ter pelo menos 8 caracteres");
		}
	}
}