import FormularioAvaliacao from '../components/FormularioAvaliacao';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import ResumoAvaliacoes from '../components/ResumoAvaliacoes';
import './DetalhesServico.css';
import ListaAvaliacoes from '../components/ListaAvaliacoes';

function DetalhesServico({ usuario }) {
    const { id } = useParams();
    const [versaoAvaliacoes, setVersaoAvaliacoes] = useState(0);
    const [servico, setServico] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        setCarregando(true);
        setErro('');
        setServico(null);

        fetch(`http://localhost:8080/servicos/${id}`, {
            signal: controller.signal
        })
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Serviço não encontrado.');
                }

                return resposta.json();
            })
            .then((dados) => {
                setServico(dados);
            })
            .catch((falha) => {
                if (falha.name !== 'AbortError') {
                    setErro('Não foi possível carregar o serviço.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            });

        return () => controller.abort();
    }, [id]);

    return (
        <main className="detalhes-pagina">
            <Link to="/" className="detalhes-voltar">
                ← Voltar aos serviços
            </Link>

            {carregando && <p>Carregando serviço...</p>}

            {erro && <p role="alert">{erro}</p>}

            {!carregando && !erro && servico && (
                <div className="detalhes-grid">

                    <div className="detalhes-principal">
                        <section className="detalhes-moldura">
                            <span className="detalhes-etiqueta">
                                SERVIÇO DA COMUNIDADE
                            </span>

                            <h1>{servico.nome}</h1>

                            <p>
                                {servico.categoria} • {servico.cidade}, {servico.estado}
                            </p>
                        </section>

                        <section className="detalhes-secao">
                            <h2>Sobre o serviço</h2>

                            <p>
                                {servico.descricao ||
                                    'Este serviço ainda não possui uma descrição cadastrada.'}
                            </p>
                        </section>

                        <ResumoAvaliacoes
                            key={versaoAvaliacoes}
                            servicoId={id}
                        />

                        <ListaAvaliacoes
                            key={`lista-${versaoAvaliacoes}`}
                            servicoId={id}
                            usuario={usuario}
                            onAlterada={() => {
                                setVersaoAvaliacoes((anterior) => anterior + 1);
                            }}
                        />

                        <FormularioAvaliacao
                            servicoId={id}
                            usuario={usuario}
                            onPublicada={() => {
                                setVersaoAvaliacoes((anterior) => anterior + 1);
                            }}
                        />
                    </div>

                    <aside className="detalhes-lateral">
                        <h2>Informações práticas</h2>

                        <p>
                            <strong>Categoria</strong>
                            {servico.categoria}
                        </p>

                        <p>
                            <strong>Localização</strong>
                            {servico.cidade}, {servico.estado}
                        </p>

                        {servico.endereco && (
                            <p>
                                <strong>Endereço</strong>
                                {servico.endereco}
                            </p>
                        )}
                    </aside>

                </div>
            )}
        </main>
    );
}

export default DetalhesServico;
