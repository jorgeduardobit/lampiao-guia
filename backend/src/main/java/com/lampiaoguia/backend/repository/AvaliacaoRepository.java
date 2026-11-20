package com.lampiaoguia.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lampiaoguia.backend.model.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Integer> {
	
	List<Avaliacao> findByServicoIdOrderByDataAvaliacaoDesc(Integer servicoId);
	
	boolean existsByUsuarioIdAndServicoId(Integer usuarioId, Integer servicoId);
	
	void deleteByUsuarioId(Integer usuarioId);
	

}
