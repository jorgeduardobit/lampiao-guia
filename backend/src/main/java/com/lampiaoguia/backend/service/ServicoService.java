
package com.lampiaoguia.backend.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.lampiaoguia.backend.model.Servico;
import com.lampiaoguia.backend.model.StatusServicoEnum;
import com.lampiaoguia.backend.repository.ServicoRepository;

@Service
public class ServicoService {

    private final ServicoRepository repository;

    // Categorias permitidas no Lampião Guia.
    private static final Set<String> CATEGORIAS_PERMITIDAS = Set.of(
        "Alimentação e bebidas",
        "Beleza e estética",
        "Comércio e compras",
        "Hospedagem e turismo",
        "Lazer e entretenimento",
        "Educação e cursos",
        "Serviços jurídicos e cartoriais",
        "Serviços profissionais",
        "Outros"
    );

    public ServicoService(ServicoRepository repository) {
        this.repository = repository;
    }

    // Valida a categoria antes de cadastrar ou atualizar.
    private String validarCategoria(String categoria) {

        String categoriaNormalizada =
            categoria == null ? "" : categoria.trim();

        if (!CATEGORIAS_PERMITIDAS.contains(categoriaNormalizada)) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Categoria inválida. Selecione uma categoria permitida."
            );
        }

        return categoriaNormalizada;
    }

    // READ: lista estabelecimentos aprovados.
    // Permite pesquisar por nome, categoria ou ambos.
    public List<Servico> listarAprovados(
            String nome,
            String categoria) {

        String nomeFiltro =
            (nome == null || nome.isBlank())
                ? null
                : nome.trim();

        String categoriaFiltro =
            (categoria == null || categoria.isBlank())
                ? null
                : categoria.trim();

        return repository.buscarPorFiltros(
            StatusServicoEnum.aprovado,
            nomeFiltro,
            categoriaFiltro
        );
    }

    // READ: lista estabelecimentos pendentes de moderação.
    public List<Servico> listarPendentes() {
        return repository.findByStatus(
            StatusServicoEnum.pendente
        );
    }

    // READ: busca um estabelecimento pelo ID.
    public Servico buscarPorId(Integer id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Serviço não encontrado"
            ));
    }

    // CREATE: usuário comum sugere um estabelecimento.
    // A sugestão fica pendente de aprovação.
    public Servico sugerir(Servico servico, Integer usuarioId) {

        servico.setCategoria(
            validarCategoria(servico.getCategoria())
        );

        servico.setId(null);
        servico.setStatus(StatusServicoEnum.pendente);
        servico.setCriadoPor(usuarioId);

        return repository.save(servico);
    }

    // CREATE: administrador cadastra um estabelecimento aprovado.
    public Servico cadastrar(Servico servico, Integer adminId) {

        servico.setCategoria(
            validarCategoria(servico.getCategoria())
        );

        servico.setId(null);
        servico.setStatus(StatusServicoEnum.aprovado);
        servico.setCriadoPor(adminId);
        servico.setRevisadoPor(adminId);

        return repository.save(servico);
    }

    // UPDATE: atualiza as informações do estabelecimento.
    // O status atual é preservado.
    public Servico atualizar(Integer id, Servico dados) {

        String categoriaValidada =
            validarCategoria(dados.getCategoria());

        Servico servico = buscarPorId(id);

        servico.setNome(dados.getNome());
        servico.setCategoria(categoriaValidada);
        servico.setCidade(dados.getCidade());
        servico.setEstado(dados.getEstado());
        servico.setEndereco(dados.getEndereco());
        servico.setDescricao(dados.getDescricao());

        return repository.save(servico);
    }

    // MODERAÇÃO: aprova um estabelecimento.
    public Servico aprovar(Integer id, Integer adminId) {
        return mudarStatus(
            id,
            StatusServicoEnum.aprovado,
            adminId
        );
    }

    // MODERAÇÃO: rejeita uma sugestão.
    public Servico rejeitar(Integer id, Integer adminId) {
        return mudarStatus(
            id,
            StatusServicoEnum.rejeitado,
            adminId
        );
    }

    // MODERAÇÃO: arquiva um estabelecimento.
    public Servico arquivar(Integer id, Integer adminId) {
        return mudarStatus(
            id,
            StatusServicoEnum.arquivado,
            adminId
        );
    }

    // Método auxiliar para alterar o status.
    private Servico mudarStatus(
            Integer id,
            StatusServicoEnum novoStatus,
            Integer adminId) {

        Servico servico = buscarPorId(id);

        servico.setStatus(novoStatus);
        servico.setRevisadoPor(adminId);

        return repository.save(servico);
    }
}
