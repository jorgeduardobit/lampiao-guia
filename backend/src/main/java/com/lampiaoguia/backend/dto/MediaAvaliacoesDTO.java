package com.lampiaoguia.backend.dto;

public record MediaAvaliacoesDTO(
		int totalAvaliacoes,
		Double mediaGeral,
		Double mediaIdentidadeGenero,
		Double mediaNaoDiscriminacao,
		Double mediaInclusao,
		Double mediaAcolhimento,
		Double mediaAtencaoResolucao) {

}
