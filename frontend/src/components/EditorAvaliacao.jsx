
import { useState } from 'react';
import './FormularioAvaliacao.css';
import './EditorAvaliacao.css';

const criterios = [
    { campo: 'notaIdentidadeGenero', nome: 'Respeito à identidade de gênero' },
    { campo: 'notaNaoDiscriminacao', nome: 'Ausência de discriminação' },
    { campo: 'notaInclusao', nome: 'Inclusão e diversidade' },
    { campo: 'notaAcolhimento', nome: 'Acolhimento' },
    { campo: 'notaAtencaoResolucao', nome: 'Atenção e resolução' }
];

function EditorAvaliacao({ avaliacao, usuarioId, onSalva, onCancelar }) {
    const [notas, setNotas] = useState({
        notaIdentidadeGenero: avaliacao.notaIdentidadeGenero,
        notaNaoDiscriminacao: avaliacao.notaNaoDiscriminacao,
        notaInclusao: avaliacao.notaInclusao,
        notaAcolhimento: avaliacao.notaAcolhimento,
        notaAtencaoResolucao: avaliacao.notaAtencaoResolucao
    });

    const [comentario, setComentario] = useState(avaliacao.comentario || '');
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    function alterarNota(campo, valor) {
        setNotas((anteriores) => ({
            ...anteriores,
            [campo]: valor
        }));
    }

    async function salvar(evento) {
        evento.preventDefault();
        setSalvando(true);
        setErro('');

        try {
            const resposta = await fetch(
                `http://localhost:8080/avaliacoes/${avaliacao.id}?usuarioId=${usuarioId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...notas,
                        comentario: comentario.trim()
                    })
                }
            );

            if (resposta.status === 403) {
                setErro('Você não pode editar esta avaliação.');
                return;
            }

            if (!resposta.ok) {
                throw new Error('Erro ao atualizar avaliação');
            }

            onSalva();

        } catch {
            setErro('Não foi possível salvar as alterações.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form className="formulario-avaliacao editor-avaliacao" onSubmit={salvar}>
            <h3>Editar sua avaliação</h3>

            {criterios.map((criterio) => (
                <fieldset key={criterio.campo}>
                    <legend>{criterio.nome}</legend>

                    <div className="formulario-avaliacao-estrelas">
                        {[1, 2, 3, 4, 5].map((nota) => (
                            <label
                                key={nota}
                                className={`avaliacao-estrela ${
                                    nota <= notas[criterio.campo] ? 'ativa' : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`edicao-${avaliacao.id}-${criterio.campo}`}
                                    value={nota}
                                    checked={notas[criterio.campo] === nota}
                                    onChange={() =>
                                        alterarNota(criterio.campo, nota)
                                    }
                                    aria-label={`${nota} de 5 estrelas`}
                                    required
                                />

                                <span aria-hidden="true">★</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            ))}

            <div className="formulario-avaliacao-campo">
                <label htmlFor={`comentario-edicao-${avaliacao.id}`}>
                    Seu comentário
                </label>

                <textarea
                    id={`comentario-edicao-${avaliacao.id}`}
                    rows={4}
                    value={comentario}
                    onChange={(evento) => setComentario(evento.target.value)}
                />
            </div>

            {erro && <p role="alert">{erro}</p>}

            <div className="editor-avaliacao-acoes">
                <button type="submit" disabled={salvando}>
                    {salvando ? 'Salvando...' : 'Salvar alterações'}
                </button>

                <button
                    type="button"
                    className="editor-avaliacao-cancelar"
                    onClick={onCancelar}
                    disabled={salvando}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default EditorAvaliacao;
