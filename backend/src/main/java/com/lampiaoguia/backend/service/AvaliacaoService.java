package com.lampiaoguia.backend.service;

import java.util.List;
import java.util.stream.IntStream;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.lampiaoguia.backend.dto.MediaAvaliacoesDTO;
import com.lampiaoguia.backend.model.Avaliacao;
import com.lampiaoguia.backend.model.Servico;
import com.lampiaoguia.backend.model.StatusServicoEnum;
import com.lampiaoguia.backend.repository.AvaliacaoRepository;
import com.lampiaoguia.backend.repository.ServicoRepository;
import com.lampiaoguia.backend.repository.UsuarioRepository;

@Service
public class AvaliacaoService {
	
	private final AvaliacaoRepository repository;
	private final ServicoRepository servicoRepository;
	private final UsuarioRepository usuarioRepository;
	
	public AvaliacaoService(AvaliacaoRepository repository,
							ServicoRepository servicoRepository,
							UsuarioRepository usuarioRepository) {
		this.repository = repository;
		this.servicoRepository = servicoRepository;
		this.usuarioRepository = usuarioRepository;
	}
	
	// CREATE: publica uma avaliação nova
	public Avaliacao publicar(Avaliacao avaliacao) {
		if (avaliacao.getUsuarioId() == null || avaliacao.getServicoId() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe o usuário e o serviço");
		}
		validarNotas(avaliacao);
		
		Servico servico = servicoRepository.findById(avaliacao.getServicoId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado"));
		if (servico.getStatus() != StatusServicoEnum.aprovado) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Só é possível avaliar serviços aprovados");
		}
		if (!usuarioRepository.existsById(avaliacao.getUsuarioId())) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
		}
		if (repository.existsByUsuarioIdAndServicoId(avaliacao.getUsuarioId(), avaliacao.getServicoId())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Você já avaliou este serviço");
		}
		
		avaliacao.setId(null);
		return repository.save(avaliacao);
		}

	// READ> lista as avaliações de um serviço, da mais nova para a mais antiga
	public List<Avaliacao> listarPorServico(Integer servicoId) {
		if (!servicoRepository.existsById(servicoId)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado");
		}
		return repository.findByServicoIdOrderByDataAvaliacaoDesc(servicoId);
	}
	
	// UPDATE: só o autor troca o comentário e as notas
	public Avaliacao editar(Integer id, Integer usuarioId, Avaliacao dados) {
		Avaliacao avaliacao = buscarPorId(id);
		verificarAutor(avaliacao, usuarioId);
		validarNotas(dados);
		
		avaliacao.setComentario(dados.getComentario());
		avaliacao.setNotaIdentidadeGenero(dados.getNotaIdentidadeGenero());
		avaliacao.setNotaNaoDiscriminacao(dados.getNotaNaoDiscriminacao());
		avaliacao.setNotaInclusao(dados.getNotaInclusao());
		avaliacao.setNotaAcolhimento(dados.getNotaAcolhimento());
		avaliacao.setNotaAtencaoResolucao(dados.getNotaAtencaoResolucao());
		return repository.save(avaliacao);
	}
	
	//DELETE:  só o autor apaga a própria avaliação
	public void excluir(Integer id, Integer usuarioId) {
		Avaliacao avaliacao = buscarPorId(id);
		verificarAutor(avaliacao, usuarioId);
		repository.delete(avaliacao);
	}
	
	//READ: calcula a média geral e por critério de um serviço
	public MediaAvaliacoesDTO calcularMedia(Integer servicoId) {
		List<Avaliacao> avaliacoes = listarPorServico(servicoId);
		if (avaliacoes.isEmpty()) {
			return new MediaAvaliacoesDTO(0, null, null, null, null, null, null);
		}
		
		double identidadeGenero = media(avaliacoes.stream().mapToInt(Avaliacao::getNotaIdentidadeGenero));
		double naoDiscriminacao = media(avaliacoes.stream().mapToInt(Avaliacao::getNotaNaoDiscriminacao));
		double inclusao = media(avaliacoes.stream().mapToInt(Avaliacao::getNotaInclusao));
		double acolhimento = media(avaliacoes.stream().mapToInt(Avaliacao::getNotaAcolhimento));
		double atencaoResolucao = media (avaliacoes.stream().mapToInt(Avaliacao::getNotaAtencaoResolucao));
		double geral = (identidadeGenero + naoDiscriminacao + inclusao + acolhimento + atencaoResolucao) / 5;
		
		return new MediaAvaliacoesDTO(avaliacoes.size(), arredondar(geral), arredondar(identidadeGenero),
				arredondar(naoDiscriminacao), arredondar(inclusao), arredondar(acolhimento), arredondar(atencaoResolucao));
	}
	
	private double media(IntStream notas) {
		return notas.average().orElse(0);
	}
	
	private double arredondar(double valor) {
		return Math.round(valor * 10.0) / 10.0;
	}
	
	
	private Avaliacao buscarPorId(Integer id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Avaliação não encontrada"));
	}
	
	private void verificarAutor(Avaliacao avaliacao, Integer usuarioId) {
		if (usuarioId == null || !usuarioId.equals(avaliacao.getUsuarioId())) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Só o autor pode alterar esta avaliação");
		}
	}
	
    private void validarNotas(Avaliacao a) {
        validarNota(a.getNotaIdentidadeGenero());
        validarNota(a.getNotaNaoDiscriminacao());
        validarNota(a.getNotaInclusao());
        validarNota(a.getNotaAcolhimento());
        validarNota(a.getNotaAtencaoResolucao());
    }
    
    private void validarNota(Integer nota) {
        if (nota == null || nota < 1 || nota > 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "As notas devem ser números de 1 a 5");
        }
    }
}
