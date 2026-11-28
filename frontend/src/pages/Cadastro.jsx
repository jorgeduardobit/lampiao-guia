
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Cadastro.css';

function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');

    async function cadastrarUsuario(evento) {
        evento.preventDefault();

        setErro('');
        setEnviando(true);

        try {
            const resposta = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome.trim(),
                    email: email.trim(),
                    senha
                })
            });

            if (resposta.status === 409) {
                setErro('Já existe uma conta com este e-mail.');
                return;
            }

            if (!resposta.ok) {
                throw new Error('Falha ao cadastrar usuário.');
            }

            // Cadastro concluído: encaminha para o login.
            navigate('/login', {
                replace: true,
                state: {
                    cadastroConcluido: true
                }
            });

        } catch {
            setErro('Não foi possível realizar o cadastro.');
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="cadastro-pagina">
            <section className="cadastro-container">
                <h1>Faça parte do Lampião Guia</h1>

                <p>
                    Crie sua conta para compartilhar experiências
                    e contribuir com a comunidade.
                </p>

                <form onSubmit={cadastrarUsuario}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(evento) => setNome(evento.target.value)}
                        maxLength={100}
                        autoComplete="name"
                        required
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                        maxLength={150}
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(evento) => setSenha(evento.target.value)}
                        minLength={8}
                        autoComplete="new-password"
                        required
                    />

                    {erro && (
                        <p role="alert" className="cadastro-erro">
                            {erro}
                        </p>
                    )}

                    <button type="submit" disabled={enviando}>
                        {enviando ? 'Cadastrando...' : 'Criar conta'}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Cadastro;
