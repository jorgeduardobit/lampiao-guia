
import { useState } from 'react';
import { Link } from 'react-router';
import './FormularioAvaliacao.css';

const criterios = [
    { campo: 'notaIdentidadeGenero', nome: 'Respeito à identidade de gênero' },
    { campo: 'notaNaoDiscriminacao', nome: 'Ausência de discriminação' },
    { campo: 'notaInclusao', nome: 'Inclusão e diversidade' },
    { campo: 'notaAcolhimento', nome: 'Acolhimento' },
    { campo: 'notaAtencaoResolucao', nome: 'Atenção e resolução' }
];

const notasIniciais = {
    notaIdentidadeGenero: '',
    notaNaoDiscriminacao: '',
    notaInclusao: '',
    notaAcolhimento: '',
    notaAtencaoResolucao: ''
};

function FormularioAvaliacao({ servicoId, usuario, onPublicada }) {
    const [notas, setNotas] = useState(notasIniciais);
    const [comentario, setComentario] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    function alterarNota(campo, valor) {
        setNotas((anteriores) => ({
            ...anteriores,
            [campo]: valor === '' ? '' : Number(valor)
        }));
    }

    async function publicar(evento) {
        evento.preventDefault();
        setErro('');
        setSucesso('');
        setEnviando(true);

        try {
            const resposta = await fetch(
                `http://localhost:8080/servicos/${servicoId}/avaliacoes?usuarioId=${usuario.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...notas,
                        comentario: comentario.trim()
                    })
                }
            );

            if (resposta.status === 409) {
                setErro('Você já avaliou este serviço.');
                return;
            }

            if (!resposta.ok) {
                throw new Error('Erro ao publicar avaliação.');
            }

            setSucesso('Sua avaliação foi publicada com sucesso!');
            setNotas(notasIniciais);
            setComentario('');
            onPublicada?.();

        } catch {
            setErro('Não foi possível publicar sua avaliação.');
        } finally {
            setEnviando(false);
        }
    }

    if (!usuario) {
        return (
            <section className="formulario-avaliacao">
                <h2>Compartilhe sua experiência</h2>
                <p>Entre na sua conta para avaliar este serviço.</p>
                <Link
                    to="/login"
                    className="formulario-avaliacao-entrar"
                >
                    Entrar para avaliar
                </Link>
            </section>
        );
    }

    return (
        <section className="formulario-avaliacao">
            <h2>Deixe sua avaliação</h2>

            <p>
                Como foi sua experiência com este serviço?
                Sua opinião pode ajudar outras pessoas.
            </p>

            <form onSubmit={publicar}>
                {criterios.map((criterio) => (
                    <fieldset
                        className="formulario-avaliacao-campo"
                        key={criterio.campo}
                    >
                        <legend>{criterio.nome}</legend>

                        <div className="formulario-avaliacao-estrelas">
                            {[1, 2, 3, 4, 5].map((nota) => (
                                <label
                                    key={nota}
                                    className={`avaliacao-estrela ${
                                        nota <= notas[criterio.campo]
                                            ? 'ativa'
                                            : ''
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={criterio.campo}
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
                    <label htmlFor="comentario-avaliacao">
                        Conte sua experiência (opcional)
                    </label>

                    <textarea
                        id="comentario-avaliacao"
                        rows={4}
                        value={comentario}
                        onChange={(evento) =>
                            setComentario(evento.target.value)
                        }
                    />
                </div>

                {erro && <p role="alert">{erro}</p>}
                {sucesso && <p role="status">{sucesso}</p>}

                <button type="submit" disabled={enviando}>
                    {enviando ? 'Publicando...' : 'Publicar avaliação'}
                </button>
            </form>
        </section>
    );
}

export default FormularioAvaliacao;
