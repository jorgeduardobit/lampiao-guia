package com.lampiaoguia.backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "avaliacoes")
public class Avaliacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "usuario_id")
	private Integer usuarioId;
	
	@Column(name = "servico_id", nullable = false)
	private Integer servicoId;
	
	@Column(columnDefinition = "TEXT")
	private String comentario;
	
	@JdbcTypeCode(SqlTypes.TINYINT)
	@Column(name = "nota_identidade_genero", nullable = false)
	private Integer notaIdentidadeGenero;
	
	@JdbcTypeCode(SqlTypes.TINYINT)
	@Column(name = "nota_inclusao", nullable = false)
	private Integer notaInclusao;
	
	@JdbcTypeCode(SqlTypes.TINYINT)
	@Column(name = "nota_acolhimento", nullable = false)
	private Integer notaAcolhimento;
	
	@JdbcTypeCode(SqlTypes.TINYINT)
	@Column(name = "nota_atencao_resolucao", nullable = false)
	private Integer notaAtencaoResolucao;
	
	@Column(name = "data_avaliacao", nullable = false, updatable = false)
	private LocalDateTime dataAvaliacao;
	
	@PrePersist
	public void definirDataAvaliacao() {
		if (dataAvaliacao == null) {
			dataAvaliacao = LocalDateTime.now();
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(Integer usuarioId) {
		this.usuarioId = usuarioId;
	}

	public Integer getServicoId() {
		return servicoId;
	}

	public void setServicoId(Integer servicoId) {
		this.servicoId = servicoId;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Integer getNotaIdentidadeGenero() {
		return notaIdentidadeGenero;
	}

	public void setNotaIdentidadeGenero(Integer notaIdentidadeGenero) {
		this.notaIdentidadeGenero = notaIdentidadeGenero;
	}

	public Integer getNotaInclusao() {
		return notaInclusao;
	}

	public void setNotaInclusao(Integer notaInclusao) {
		this.notaInclusao = notaInclusao;
	}

	public Integer getNotaAcolhimento() {
		return notaAcolhimento;
	}

	public void setNotaAcolhimento(Integer notaAcolhimento) {
		this.notaAcolhimento = notaAcolhimento;
	}

	public Integer getNotaAtencaoResolucao() {
		return notaAtencaoResolucao;
	}

	public void setNotaAtencaoResolucao(Integer notaAtencaoResolucao) {
		this.notaAtencaoResolucao = notaAtencaoResolucao;
	}

	public LocalDateTime getDataAvaliacao() {
		return dataAvaliacao;
	}

	public void setDataAvaliacao(LocalDateTime dataAvaliacao) {
		this.dataAvaliacao = dataAvaliacao;
	}

}
