
import { useState } from 'react';
import { Link } from 'react-router';
import './SugerirServico.css';

const dadosIniciais = {
    nome: '',
    categoria: '',
    cidade: '',
    estado: '',
    endereco: '',
    descricao: ''
};

function SugerirServico({ usuario }) {
    const [dados, setDados] = useState(dadosIniciais);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    function alterarCampo(evento) {
        const { name, value } = evento.target;

        setDados((anteriores) => ({
            ...anteriores,
            [name]: name === 'estado'
                ? value.toUpperCase()
                : value
        }));
    }

    async function enviarSugestao(evento) {
        evento.preventDefault();

        if (!usuario) return;

        setEnviando(true);
        setErro('');
        setSucesso('');

        try {
            const resposta = await fetch(
                `http://localhost:8080/servicos/sugestoes?usuarioId=${usuario.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: dados.nome.trim(),
                        categoria: dados.categoria.trim(),
                        cidade: dados.cidade.trim(),
                        estado: dados.estado.trim(),
                        endereco: dados.endereco.trim(),
                        descricao: dados.descricao.trim()
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error('Erro ao cadastrar sugestão');
            }

            setSucesso(
                'Sugestão enviada com sucesso! ' +
                'O estabelecimento aguardará aprovação.'
            );

            setDados(dadosIniciais);

        } catch {
            setErro('Não foi possível enviar sua sugestão.');
        } finally {
            setEnviando(false);
        }
    }

    if (!usuario) {
        return (
            <main className="sugestao-pagina">
                <section className="sugestao-container">
                    <h1>Sugira um estabelecimento</h1>
                    <p>
                        Você precisa entrar na sua conta
                        para enviar uma sugestão.
                    </p>
                    <Link to="/login" className="sugestao-link-login">
                        Entrar na minha conta
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="sugestao-pagina">
            <section className="sugestao-container">
                <h1>Sugira um estabelecimento</h1>

                <p>
                    Conhece um lugar que deveria fazer parte
                    do Lampião Guia? Compartilhe sua sugestão!
                </p>
                <p className="sugestao-legenda">
                    <span className="campo-obrigatorio" aria-hidden="true">*</span>
                    {' '}Campos obrigatórios
                </p>
                
                <form onSubmit={enviarSugestao}>
                    {[
                        { nome: 'nome', rotulo: 'Nome', limite: 150 },
                        { nome: 'categoria', rotulo: 'Categoria', limite: 50 },
                        { nome: 'cidade', rotulo: 'Cidade', limite: 80 },
                        { nome: 'estado', rotulo: 'Estado (UF)', limite: 2 }
                    ].map((campo) => (
                        <div className="sugestao-campo" key={campo.nome}>
                            <label htmlFor={campo.nome}>
                                {campo.rotulo}
                                <span className="campo-obrigatorio" aria-hidden="true"> *</span>
                            </label>

                            <input
                                id={campo.nome}
                                name={campo.nome}
                                type="text"
                                value={dados[campo.nome]}
                                onChange={alterarCampo}
                                maxLength={campo.limite}
                                minLength={campo.nome === 'estado' ? 2 : 1}
                                pattern={
                                    campo.nome === 'estado'
                                        ? '[A-Za-z]{2}'
                                        : undefined
                                }
                                required
                            />
                        </div>
                    ))}

                    <div className="sugestao-campo">
                        <label htmlFor="endereco">Endereço (opcional)</label>
                        <input
                            id="endereco"
                            name="endereco"
                            type="text"
                            value={dados.endereco}
                            onChange={alterarCampo}
                            maxLength={200}
                        />
                    </div>

                    <div className="sugestao-campo">
                        <label htmlFor="descricao">
                            Descrição (opcional)
                        </label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            rows={5}
                            value={dados.descricao}
                            onChange={alterarCampo}
                        />
                    </div>

                    {erro && <p role="alert" className="sugestao-erro">{erro}</p>}

                    {sucesso && (
                        <p role="status" className="sugestao-sucesso">
                            {sucesso}
                        </p>
                    )}

                    <button type="submit" disabled={enviando}>
                        {enviando ? 'Enviando...' : 'Enviar sugestão'}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default SugerirServico;
