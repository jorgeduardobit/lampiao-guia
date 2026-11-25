
import { useEffect, useState } from 'react';
import './ResumoAvaliacoes.css';

function ResumoAvaliacoes({ servicoId }) {
    const [resumo, setResumo] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        setCarregando(true);
        setErro('');
        setResumo(null);

        fetch(
            `http://localhost:8080/servicos/${servicoId}/avaliacoes/media`,
            { signal: controller.signal }
        )
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Erro ao consultar avaliações');
                }

                return resposta.json();
            })
            .then((dados) => {
                setResumo(dados);
            })
            .catch((falha) => {
                if (falha.name !== 'AbortError') {
                    setErro('Não foi possível carregar as avaliações.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            });

        return () => controller.abort();
    }, [servicoId]);

    return (
        <section className="detalhes-secao resumo-avaliacoes">
            <h2>Avaliações da comunidade</h2>

            {carregando && <p>Carregando avaliações...</p>}

            {erro && <p role="alert">{erro}</p>}

            {!carregando && !erro && resumo?.totalAvaliacoes === 0 && (
                <p>
                    Este serviço ainda não recebeu avaliações.
                    Seja a primeira pessoa a compartilhar sua experiência!
                </p>
            )}

            {!carregando && !erro && resumo?.totalAvaliacoes > 0 && (
                <div className="resumo-avaliacoes-nota">
                    <strong>
                        {resumo.mediaGeral != null
                            ? resumo.mediaGeral.toLocaleString('pt-BR', {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1
                            })
                            : 'Sem nota'}
                    </strong>

                    <p>
                        {resumo.totalAvaliacoes}
                        {resumo.totalAvaliacoes === 1
                            ? ' avaliação'
                            : ' avaliações'}
                    </p>
                </div>
            )}
        </section>
    );
}

export default ResumoAvaliacoes;
