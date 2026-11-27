
import EditarPerfil from '../components/EditarPerfil';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import './MeuPerfil.css';

function MeuPerfil({ usuario, onAtualizarUsuario }) {
    const [dadosPerfil, setDadosPerfil] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [editando, setEditando] = useState(false);
    const [mensagem, setMensagem] = useState('');

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
                    </>
                )}

            </section>
        </main>
    );
}

export default MeuPerfil;
