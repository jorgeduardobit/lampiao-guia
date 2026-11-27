
import { useState } from 'react';

function EditarPerfil({ perfil, onSalvo, onCancelar }) {
    const [nome, setNome] = useState(perfil.nome);
    const [email, setEmail] = useState(perfil.email);
    const [senha, setSenha] = useState('');
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    async function salvar(evento) {
        evento.preventDefault();
        setErro('');

        if (senha && senha.length < 8) {
            setErro('A nova senha deve ter pelo menos 8 caracteres.');
            return;
        }

        setSalvando(true);

        try {
            const resposta = await fetch(
                `http://localhost:8080/usuarios/${perfil.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome.trim(),
                        email: email.trim(),
                        senha: senha || null
                    })
                }
            );

            if (resposta.status === 409) {
                setErro('Este e-mail já está cadastrado.');
                return;
            }

            if (!resposta.ok) {
                throw new Error('Erro ao atualizar o perfil');
            }

            const perfilAtualizado = await resposta.json();
            setSenha('');
            onSalvo(perfilAtualizado);

        } catch {
            setErro('Não foi possível salvar as alterações.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form className="perfil-formulario" onSubmit={salvar}>
            <h2>Editar minhas informações</h2>

            <label htmlFor="perfil-nome">Nome</label>
            <input
                id="perfil-nome"
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                maxLength={100}
                required
            />

            <label htmlFor="perfil-email">E-mail</label>
            <input
                id="perfil-email"
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                maxLength={150}
                required
            />

            <label htmlFor="perfil-senha">Nova senha (opcional)</label>
            <input
                id="perfil-senha"
                type="password"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                minLength={8}
                autoComplete="new-password"
                placeholder="Deixe em branco para manter a senha"
            />

            {erro && <p role="alert">{erro}</p>}

            <div className="perfil-formulario-acoes">
                <button type="submit" disabled={salvando}>
                    {salvando ? 'Salvando...' : 'Salvar alterações'}
                </button>

                <button
                    type="button"
                    onClick={onCancelar}
                    disabled={salvando}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default EditarPerfil;
