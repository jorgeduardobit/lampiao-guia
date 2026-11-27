
import EditarPerfil from '../components/EditarPerfil';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './MeuPerfil.css';

function MeuPerfil({ usuario, onAtualizarUsuario, onExcluirConta }) {
    const navigate = useNavigate();

    const [dadosPerfil, setDadosPerfil] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [editando, setEditando] = useState(false);
    const [mensagem, setMensagem] = useState('');

    // Estados da exclusão de conta
    const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
    const [confirmacao, setConfirmacao] = useState('');
    const [excluindo, setExcluindo] = useState(false);
    const [erroExclusao, setErroExclusao] = useState('');

    useEffect(() => {
        if (!usuario?.id) return;

        const controller = new AbortController();

        setCarregando(true);
        setErro('');
        setDadosPerfil(null);

        fetch(`http://localhost:8080/usuarios/${usuario.id}`, {
            signal: controller.signal
        })
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Erro ao consultar perfil');
                }

                return resposta.json();
            })
            .then((dados) => {
                setDadosPerfil(dados);
            })
            .catch((falha) => {
                if (falha.name !== 'AbortError') {
                    setErro('Não foi possível carregar seu perfil.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            });

        return () => controller.abort();
    }, [usuario?.id]);

    function cancelarExclusao() {
        setConfirmandoExclusao(false);
        setConfirmacao('');
        setErroExclusao('');
    }

    async function excluirConta(evento) {
        evento.preventDefault();

        if (confirmacao !== 'EXCLUIR' || !usuario?.id || excluindo) {
            return;
        }

        setExcluindo(true);
        setErroExclusao('');

        try {
            const resposta = await fetch(
                `http://localhost:8080/usuarios/${usuario.id}`,
                {
                    method: 'DELETE'
                }
            );

            if (!resposta.ok) {
                throw new Error('Erro ao excluir conta');
            }

            // Encerra a sessão após a exclusão bem-sucedida
            onExcluirConta();

            // Retorna à página inicial
            navigate('/');

        } catch {
            setErroExclusao(
                'Não foi possível excluir sua conta. Tente novamente.'
            );
        } finally {
            setExcluindo(false);
        }
    }

    if (!usuario) {
        return (
            <main className="perfil-pagina">
                <section className="perfil-container">
                    <h1>Meu perfil</h1>

                    <p>
                        Entre na sua conta para visualizar seu perfil.
                    </p>

                    <Link to="/login" className="perfil-link">
                        Entrar na minha conta
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="perfil-pagina">
            <section className="perfil-container">
                <h1>Meu perfil</h1>

                <p>
                    Aqui você pode consultar as informações
                    da sua conta no Lampião Guia.
                </p>

                {mensagem && (
                    <p role="status">{mensagem}</p>
                )}

                {carregando && (
                    <p>Carregando perfil...</p>
                )}

                {erro && (
                    <p role="alert">{erro}</p>
                )}

                {!carregando && !erro && dadosPerfil && (
                    <>
                        {/* Informações da conta */}

                        <div className="perfil-informacoes">
                            <div className="perfil-campo">
                                <strong>Nome</strong>
                                <p>{dadosPerfil.nome}</p>
                            </div>

                            <div className="perfil-campo">
                                <strong>E-mail</strong>
                                <p>{dadosPerfil.email}</p>
                            </div>

                            {dadosPerfil.perfil === 'admin' && (
                                <div className="perfil-campo">
                                    <strong>Tipo de conta</strong>
                                    <p>Administrador</p>
                                </div>
                            )}
                        </div>

                        {/* Edição de perfil */}

                        {!editando && (
                            <button
                                type="button"
                                className="perfil-botao"
                                onClick={() => {
                                    setMensagem('');
                                    setEditando(true);
                                }}
                            >
                                Editar meu perfil
                            </button>
                        )}

                        {editando && (
                            <EditarPerfil
                                perfil={dadosPerfil}
                                onCancelar={() => {
                                    setEditando(false);
                                }}
                                onSalvo={(perfilAtualizado) => {
                                    setDadosPerfil(perfilAtualizado);

                                    onAtualizarUsuario({
                                        id: perfilAtualizado.id,
                                        nome: perfilAtualizado.nome,
                                        perfil: perfilAtualizado.perfil
                                    });

                                    setEditando(false);

                                    setMensagem(
                                        'Perfil atualizado com sucesso!'
                                    );
                                }}
                            />
                        )}

                        {/* Exclusão de conta */}

                        <section className="perfil-exclusao">
                            <h2>Excluir minha conta</h2>

                            <p>
                                Se você não deseja mais participar
                                do Lampião Guia, pode solicitar
                                a exclusão permanente da sua conta.
                            </p>

                            {!confirmandoExclusao && (
                                <button
                                    type="button"
                                    className="perfil-botao-excluir"
                                    onClick={() => {
                                        setMensagem('');
                                        setErroExclusao('');
                                        setConfirmandoExclusao(true);
                                    }}
                                >
                                    Excluir minha conta
                                </button>
                            )}

                            {confirmandoExclusao && (
                                <form
                                    className="perfil-confirmacao"
                                    onSubmit={excluirConta}
                                >
                                    <p>
                                        <strong>Atenção:</strong> esta
                                        operação é permanente e não
                                        poderá ser desfeita.
                                    </p>

                                    <p>
                                        Suas avaliações serão mantidas
                                        de forma desvinculada da sua conta.
                                    </p>

                                    <label htmlFor="confirmar-exclusao">
                                        Digite <strong>EXCLUIR</strong> para
                                        confirmar:
                                    </label>

                                    <input
                                        id="confirmar-exclusao"
                                        type="text"
                                        value={confirmacao}
                                        onChange={(evento) => {
                                            setConfirmacao(evento.target.value);
                                        }}
                                        autoComplete="off"
                                        disabled={excluindo}
                                        required
                                    />

                                    {erroExclusao && (
                                        <p role="alert">{erroExclusao}</p>
                                    )}

                                    <div className="perfil-exclusao-acoes">
                                        <button
                                            type="submit"
                                            className="perfil-confirmar-exclusao"
                                            disabled={
                                                confirmacao !== 'EXCLUIR' ||
                                                excluindo
                                            }
                                        >
                                            {excluindo
                                                ? 'Excluindo...'
                                                : 'Confirmar exclusão'}
                                        </button>

                                        <button
                                            type="button"
                                            className="perfil-cancelar-exclusao"
                                            onClick={cancelarExclusao}
                                            disabled={excluindo}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </section>
                    </>
                )}
            </section>
        </main>
    );
}

export default MeuPerfil;
