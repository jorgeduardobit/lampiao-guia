
import { useEffect, useState } from 'react';
import './ModeracaoServicos.css';

function ModeracaoServicos({ usuario }) {
    const [pendentes, setPendentes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [processandoId, setProcessandoId] = useState(null);
    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState('');

    const ehAdmin = usuario?.perfil === 'admin';

    useEffect(() => {
        if (!ehAdmin) return;

        const controller = new AbortController();

        fetch('http://localhost:8080/servicos/pendentes', {
            signal: controller.signal
        })
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Erro ao buscar sugestões');
                }

                return resposta.json();
            })
            .then((dados) => setPendentes(dados))
            .catch((falha) => {
                if (falha.name !== 'AbortError') {
                    setErro('Não foi possível carregar as sugestões.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            });

        return () => controller.abort();
    }, [ehAdmin]);

    async function decidir(servicoId, decisao) {
        if (decisao === 'rejeitar') {
            const confirmou = window.confirm(
                'Deseja realmente rejeitar esta sugestão?'
            );

            if (!confirmou) return;
        }

        setProcessandoId(servicoId);
        setErro('');
        setMensagem('');

        try {
            const resposta = await fetch(
                `http://localhost:8080/servicos/${servicoId}/${decisao}?adminId=${usuario.id}`,
                { method: 'PATCH' }
            );

            if (!resposta.ok) {
                throw new Error('Erro ao processar sugestão');
            }

            setPendentes((anteriores) =>
                anteriores.filter((servico) => servico.id !== servicoId)
            );

            setMensagem(
                decisao === 'aprovar'
                    ? 'Estabelecimento aprovado com sucesso!'
                    : 'Sugestão rejeitada com sucesso!'
            );

        } catch {
            setErro('Não foi possível processar a sugestão.');
        } finally {
            setProcessandoId(null);
        }
    }

    if (!ehAdmin) {
        return (
            <main className="moderacao-pagina">
                <h1>Acesso administrativo</h1>
                <p>Esta área é destinada à moderação do Lampião Guia.</p>
            </main>
        );
    }

    return (
        <main className="moderacao-pagina">
            <h1>Moderação de estabelecimentos</h1>
            <p>Analise os estabelecimentos sugeridos pela comunidade.</p>

            {carregando && <p>Carregando sugestões...</p>}

            {erro && <p role="alert">{erro}</p>}
            {mensagem && <p role="status">{mensagem}</p>}

            {!carregando && !erro && pendentes.length === 0 && (
                <p>Não existem sugestões pendentes.</p>
            )}

            <div className="moderacao-lista">
                {pendentes.map((servico) => (
                    <article className="moderacao-item" key={servico.id}>
                        <h2>{servico.nome}</h2>

                        <p>
                            {servico.categoria} • {servico.cidade},
                            {' '}{servico.estado}
                        </p>

                        {servico.endereco && <p>{servico.endereco}</p>}
                        {servico.descricao && <p>{servico.descricao}</p>}

                        <div className="moderacao-acoes">
                            <button
                                type="button"
                                onClick={() => decidir(servico.id, 'aprovar')}
                                disabled={processandoId !== null}
                            >
                                Aprovar
                            </button>

                            <button
                                type="button"
                                className="moderacao-rejeitar"
                                onClick={() => decidir(servico.id, 'rejeitar')}
                                disabled={processandoId !== null}
                            >
                                Rejeitar
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default ModeracaoServicos;
