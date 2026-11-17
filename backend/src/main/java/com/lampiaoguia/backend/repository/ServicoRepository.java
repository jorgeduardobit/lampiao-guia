package com.lampiaoguia.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lampiaoguia.backend.model.Servico;
import com.lampiaoguia.backend.model.StatusServicoEnum;

public interface ServicoRepository extends JpaRepository<Servico, Integer> {
	
	List<Servico> findByStatus(StatusServicoEnum status);
	
	List<Servico> findByStatusAndNomeContainingIgnoreCase(StatusServicoEnum status, String nome);
}
