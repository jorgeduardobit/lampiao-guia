
package com.lampiaoguia.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lampiaoguia.backend.model.Servico;
import com.lampiaoguia.backend.model.StatusServicoEnum;

public interface ServicoRepository
        extends JpaRepository<Servico, Integer> {

    List<Servico> findByStatus(StatusServicoEnum status);

    @Query("""
        SELECT s
        FROM Servico s
        WHERE s.status = :status
          AND (
              :nome IS NULL
              OR LOWER(s.nome) LIKE LOWER(
                  CONCAT('%', :nome, '%')
              )
          )
          AND (
              :categoria IS NULL
              OR s.categoria = :categoria
          )
        """)
    List<Servico> buscarPorFiltros(
        @Param("status") StatusServicoEnum status,
        @Param("nome") String nome,
        @Param("categoria") String categoria
    );
}
