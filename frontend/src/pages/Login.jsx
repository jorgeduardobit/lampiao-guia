
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import './Login.css';

function Login({ usuario, onLogin, onLogout }) {
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [enviando, setEnviando] = useState(false);

    const cadastroConcluido =
        location.state?.cadastroConcluido === true;

    async function entrar(evento) {
        evento.preventDefault();
        setErro('');
        setEnviando(true);

        try {
            const resposta = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.trim(),
                    senha
                })
            });

            if (resposta.status === 401) {
                setErro('E-mail ou senha inválidos.');
                return;
            }

            if (!resposta.ok) {
                throw new Error('Erro ao realizar login.');
            }

            const dados = await resposta.json();

            const usuarioLogado = {
                id: dados.id,
                nome: dados.nome,
                perfil: dados.perfil
            };

            onLogin(usuarioLogado);
            setSenha('');

        } catch {
            setErro('Não foi possível realizar o login.');
        } finally {
            setEnviando(false);
        }
    }

    function sair() {
        onLogout();
        setEmail('');
        setSenha('');
        setErro('');
    }

    return (
        <main className="login-pagina">
            <section className="login-container">
                {usuario ? (
                    <>
                        <h1>Olá, {usuario.nome}!</h1>

                        <p>
                            Você entrou no Lampião Guia.
                            Agora pode explorar os serviços da comunidade.
                        </p>

                        <div className="login-acoes">
                            <Link
                                to="/"
                                className="login-link-explorar"
                            >
                                Explorar serviços
                            </Link>

                            <button type="button" onClick={sair}>
                                Sair da conta
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Boas-vindas de volta!</h1>

                        <p>
                            Entre para compartilhar suas experiências.
                        </p>

                        {cadastroConcluido && (
                            <p
                                role="status"
                                className="login-sucesso"
                            >
                                Conta criada com sucesso!
                                Entre para continuar.
                            </p>
                        )}

                        <form onSubmit={entrar}>
                            <label htmlFor="login-email">
                                E-mail
                            </label>

                            <input
                                id="login-email"
                                type="email"
                                value={email}
                                onChange={(evento) =>
                                    setEmail(evento.target.value)
                                }
                                autoComplete="email"
                                required
                            />

                            <label htmlFor="login-senha">
                                Senha
                            </label>

                            <input
                                id="login-senha"
                                type="password"
                                value={senha}
                                onChange={(evento) =>
                                    setSenha(evento.target.value)
                                }
                                autoComplete="current-password"
                                required
                            />

                            {erro && (
                                <p role="alert" className="login-erro">
                                    {erro}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={enviando}
                            >
                                {enviando ? 'Entrando...' : 'Entrar'}
                            </button>
                        </form>

                        <p>
                            Ainda não tem uma conta?{' '}
                            <Link to="/cadastro">
                                Cadastre-se
                            </Link>
                        </p>
                    </>
                )}
            </section>
        </main>
    );
}

export default Login;
