import EditorAvaliacao from './EditorAvaliacao';
import { useEffect, useState } from 'react';
import './ListaAvaliacoes.css';

function ListaAvaliacoes({ servicoId, usuario, onAlterada }) {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [excluindoId, setExcluindoId] = useState(null);
    const [erroExclusao, setErroExclusao] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        setCarregando(true);
        setErro('');

        fetch(
            `http://localhost:8080/servicos/${servicoId}/avaliacoes`,
            { signal: controller.signal }
        )
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Erro ao carregar avaliações');
                }

                return resposta.json();
            })
            .then((dados) => setAvaliacoes(dados))
            .catch((falha) => {
                if (falha.name !== 'AbortError') {
                    setErro('Não foi possível carregar os relatos.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            });

        return () => controller.abort();
    }, [servicoId]);

    // Função de exclusão: fora do useEffect
    async function excluirAvaliacao(avaliacaoId) {
        const confirmou = window.confirm(
            'Tem certeza de que deseja excluir sua avaliação?'
        );

        if (!confirmou) {
            return;
        }

        setErroExclusao('');
        setExcluindoId(avaliacaoId);

        try {
            const resposta = await fetch(
                `http://localhost:8080/avaliacoes/${avaliacaoId}?usuarioId=${usuario.id}`,
                {
                    method: 'DELETE'
                }
            );

            if (resposta.status === 403) {
                setErroExclusao('Você não pode excluir esta avaliação.');
                return;
            }

            if (!resposta.ok) {
                throw new Error('Erro ao excluir avaliação');
            }

            setAvaliacoes((anteriores) =>
                anteriores.filter(
                    (avaliacao) => avaliacao.id !== avaliacaoId
                )
            );

            onAlterada?.();

        } catch {
            setErroExclusao('Não foi possível excluir a avaliação.');
        } finally {
            setExcluindoId(null);
        }
    }

    function calcularMedia(avaliacao) {
        const notas = [
            avaliacao.notaIdentidadeGenero,
            avaliacao.notaNaoDiscriminacao,
            avaliacao.notaInclusao,
            avaliacao.notaAcolhimento,
            avaliacao.notaAtencaoResolucao
        ];

        const soma = notas.reduce((total, nota) => total + nota, 0);

        return soma / notas.length;
    }

    return (
        <section className="lista-avaliacoes">
            <h2>Relatos da comunidade</h2>

            {erroExclusao && <p role="alert">{erroExclusao}</p>}

            {carregando && <p>Carregando relatos...</p>}

            {erro && <p role="alert">{erro}</p>}

            {!carregando && !erro && avaliacoes.length === 0 && (
                <p>Ainda não há relatos publicados.</p>
            )}

            {!carregando && !erro && avaliacoes.map((avaliacao) => {
                const media = calcularMedia(avaliacao);
                const estrelas = Math.round(media);

                return (
                    <article
                        className="lista-avaliacoes-item"
                        key={avaliacao.id}
                    >
                        <div className="lista-avaliacoes-cabecalho">
                            <strong>Avaliação da comunidade</strong>

                            {avaliacao.dataAvaliacao && (
                                <time dateTime={avaliacao.dataAvaliacao}>
                                    {new Date(
                                        avaliacao.dataAvaliacao
                                    ).toLocaleDateString('pt-BR')}
                                </time>
                            )}
                        </div>

                        <div className="lista-avaliacoes-nota">
                            <span aria-hidden="true">
                                {'★'.repeat(estrelas)}
                                {'☆'.repeat(5 - estrelas)}
                            </span>

                            <strong>
                                {media.toFixed(1).replace('.', ',')}/5
                            </strong>
                        </div>

                        {avaliacao.comentario?.trim() && (
                            <p>{avaliacao.comentario}</p>
                        )}

                        {usuario &&
                            Number(usuario.id) === Number(avaliacao.usuarioId) &&
                            editandoId !== avaliacao.id && (
                                <button
                                    type="button"
                                    className="lista-avaliacoes-editar"
                                    onClick={() => setEditandoId(avaliacao.id)}
                                >
                                    Editar avaliação
                                </button>
                            )}

                        {editandoId === avaliacao.id &&
                            usuario &&
                            Number(usuario.id) === Number(avaliacao.usuarioId) && (
                                <EditorAvaliacao
                                    avaliacao={avaliacao}
                                    usuarioId={usuario.id}
                                    onCancelar={() => setEditandoId(null)}
                                    onSalva={() => {
                                        setEditandoId(null);
                                        onAlterada?.();
                                    }}
                                />
                            )}
                        {usuario &&
                            Number(usuario.id) === Number(avaliacao.usuarioId) && (
                                <button
                                    type="button"
                                    className="lista-avaliacoes-excluir"
                                    onClick={() => excluirAvaliacao(avaliacao.id)}
                                    disabled={excluindoId === avaliacao.id}
                                >
                                    {excluindoId === avaliacao.id
                                        ? 'Excluindo...'
                                        : 'Excluir avaliação'}
                                </button>
                            )}
                    </article>
                );
            })}
        </section>
    );
}

export default ListaAvaliacoes;
