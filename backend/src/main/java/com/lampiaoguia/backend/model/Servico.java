package com.lampiaoguia.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table (name = "servicos")
public class Servico {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, length = 150)
	private String nome;
	
	@Column(nullable = false, length = 50)
	private String categoria;
	
	@Column(nullable = false, length = 80)
	private String cidade;
	
	@Column(nullable = false, columnDefinition = "CHAR(2)")
	private String estado;
	
	@Column(length = 200)
	private String endereco;
	
	@Column(columnDefinition = "TEXT")
	private String descricao;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private StatusServicoEnum status = StatusServicoEnum.pendente;
	
	@Column(name = "criado_por")
	private Integer criadoPor;
	
	@Column(name = "revisado_por")
	private Integer revisadoPor;
	
	@Column(name = "data_criacao", nullable = false, updatable = false)
	private LocalDateTime dataCriacao;
	
	@PrePersist
	public void definirDataCriacao() {
		if (dataCriacao == null) {
			dataCriacao = LocalDateTime.now();
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public StatusServicoEnum getStatus() {
		return status;
	}

	public void setStatus(StatusServicoEnum status) {
		this.status = status;
	}

	public Integer getCriadoPor() {
		return criadoPor;
	}

	public void setCriadoPor(Integer criadoPor) {
		this.criadoPor = criadoPor;
	}

	public Integer getRevisadoPor() {
		return revisadoPor;
	}

	public void setRevisadoPor(Integer revisadoPor) {
		this.revisadoPor = revisadoPor;
	}

	public LocalDateTime getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(LocalDateTime dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
}