import FormularioAvaliacao from '../components/FormularioAvaliacao';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import ResumoAvaliacoes from '../components/ResumoAvaliacoes';
import './DetalhesServico.css';
import ListaAvaliacoes from '../components/ListaAvaliacoes';
import EditarServico from '../components/EditarServico';

function DetalhesServico({ usuario }) {
    const { id } = useParams();
    const [versaoAvaliacoes, setVersaoAvaliacoes] = useState(0);
    const [servico, setServico] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [editando, setEditando] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();
    const [arquivando, setArquivando] = useState(false);
    const [erroArquivamento, setErroArquivamento] = useState('');

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

    async function arquivarServico() {
        const confirmou = window.confirm(
            `Tem certeza de que deseja arquivar "${servico.nome}"?`
        );

        if (!confirmou) return;

        setArquivando(true);
        setErroArquivamento('');

        try {
            const resposta = await fetch(
                `http://localhost:8080/servicos/${id}/arquivar?adminId=${usuario.id}`,
                {
                    method: 'PATCH'
                }
            );

            if (!resposta.ok) {
                throw new Error('Erro ao arquivar estabelecimento');
            }

            navigate('/');

        } catch {
            setErroArquivamento(
                'Não foi possível arquivar o estabelecimento.'
            );
        } finally {
            setArquivando(false);
        }
    }

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

                            {usuario?.perfil === 'admin' && (
                                <button
                                    type="button"
                                    className="detalhes-botao-editar"
                                    onClick={() => {
                                        setMensagem('');
                                        setEditando(true);
                                    }}
                                >
                                    
                                Editar estabelecimento
                            </button>
                        )}

                        {usuario?.perfil === 'admin' &&
                            servico.status === 'aprovado' && (
                                <button
                                    type="button"
                                    className="detalhes-botao-arquivar"
                                    onClick={arquivarServico}
                                    disabled={arquivando}
                                >
                                    {arquivando
                                        ? 'Arquivando...'
                                        : 'Arquivar estabelecimento'}
                                </button>
                            )}

                        {erroArquivamento && (
                            <p role="alert">{erroArquivamento}</p>
                        )}
                    </section>

                        {mensagem && <p role="status">{mensagem}</p>}

                        {editando && usuario?.perfil === 'admin' && (
                            <EditarServico
                                servico={servico}
                                onCancelar={() => setEditando(false)}
                                onSalvo={(servicoAtualizado) => {
                                    setServico(servicoAtualizado);
                                    setEditando(false);
                                    setMensagem('Estabelecimento atualizado com sucesso!');
                                }}
                            />
                        )}

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
