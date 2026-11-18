package com.lampiaoguia.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lampiaoguia.backend.model.Avaliacao;

import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Integer> {
	
	List<Avaliacao> findByServicoIdOrderByDataAvaliacaoDesc(Integer servicoId);
	
	boolean existsByUsuarioIdAndServicoId(Integer usuarioId, Integer servicoId);
	
	void deleteByUsuarioId(Integer usuarioId);
	

}
