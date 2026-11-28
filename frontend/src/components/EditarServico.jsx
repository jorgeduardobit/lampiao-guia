
import { useState } from 'react';
import { CATEGORIAS_SERVICO } from '../constants/categorias';
import './EditarServico.css';

function EditarServico({ servico, onSalvo, onCancelar }) {
    const [dados, setDados] = useState({
        nome: servico.nome,
        categoria: servico.categoria || '',
        cidade: servico.cidade,
        estado: servico.estado,
        endereco: servico.endereco || '',
        descricao: servico.descricao || ''
    });

    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    const categoriaAntiga =
        dados.categoria !== '' &&
        !CATEGORIAS_SERVICO.includes(dados.categoria);

    function alterarCampo(evento) {
        const { name, value } = evento.target;

        setDados((anteriores) => ({
            ...anteriores,
            [name]: name === 'estado'
                ? value.toUpperCase()
                : value
        }));
    }

    async function salvar(evento) {
        evento.preventDefault();

        setErro('');

        if (!CATEGORIAS_SERVICO.includes(dados.categoria)) {
            setErro('Selecione uma categoria válida antes de salvar.');
            return;
        }

        setSalvando(true);

        try {
            const resposta = await fetch(
                `http://localhost:8080/servicos/${servico.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: dados.nome.trim(),
                        categoria: dados.categoria,
                        cidade: dados.cidade.trim(),
                        estado: dados.estado.trim(),
                        endereco: dados.endereco.trim(),
                        descricao: dados.descricao.trim()
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error('Erro ao atualizar estabelecimento');
            }

            const servicoAtualizado = await resposta.json();
            onSalvo(servicoAtualizado);

        } catch {
            setErro('Não foi possível salvar as alterações.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form className="editar-servico" onSubmit={salvar}>
            <h2>Editar estabelecimento</h2>

            <div className="editar-servico-campo">
                <label htmlFor="editar-nome">
                    Nome <span aria-hidden="true">*</span>
                </label>

                <input
                    id="editar-nome"
                    name="nome"
                    value={dados.nome}
                    onChange={alterarCampo}
                    maxLength={150}
                    required
                />
            </div>

            {/* Categoria padronizada */}
            <div className="editar-servico-campo">
                <label htmlFor="editar-categoria">
                    Categoria <span aria-hidden="true">*</span>
                </label>

                <select
                    id="editar-categoria"
                    name="categoria"
                    value={dados.categoria}
                    onChange={alterarCampo}
                    required
                >
                    <option value="">
                        Selecione uma categoria
                    </option>

                    {categoriaAntiga && (
                        <option value={dados.categoria} disabled>
                            Categoria antiga: {dados.categoria}
                        </option>
                    )}

                    {CATEGORIAS_SERVICO.map((categoria) => (
                        <option
                            key={categoria}
                            value={categoria}
                        >
                            {categoria}
                        </option>
                    ))}
                </select>

                {categoriaAntiga && (
                    <p className="editar-categoria-aviso">
                        Este estabelecimento utiliza uma categoria
                        antiga. Selecione uma das novas opções
                        antes de salvar.
                    </p>
                )}
            </div>

            <div className="editar-servico-campo">
                <label htmlFor="editar-cidade">
                    Cidade <span aria-hidden="true">*</span>
                </label>

                <input
                    id="editar-cidade"
                    name="cidade"
                    value={dados.cidade}
                    onChange={alterarCampo}
                    maxLength={80}
                    required
                />
            </div>

            <div className="editar-servico-campo">
                <label htmlFor="editar-estado">
                    Estado (UF) <span aria-hidden="true">*</span>
                </label>

                <input
                    id="editar-estado"
                    name="estado"
                    value={dados.estado}
                    onChange={alterarCampo}
                    maxLength={2}
                    minLength={2}
                    pattern="[A-Za-z]{2}"
                    required
                />
            </div>

            <div className="editar-servico-campo">
                <label htmlFor="editar-endereco">
                    Endereço
                </label>

                <input
                    id="editar-endereco"
                    name="endereco"
                    value={dados.endereco}
                    onChange={alterarCampo}
                    maxLength={200}
                />
            </div>

            <div className="editar-servico-campo">
                <label htmlFor="editar-descricao">
                    Descrição
                </label>

                <textarea
                    id="editar-descricao"
                    name="descricao"
                    value={dados.descricao}
                    onChange={alterarCampo}
                    rows={4}
                />
            </div>

            {erro && <p role="alert">{erro}</p>}

            <div className="editar-servico-acoes">
                <button type="submit" disabled={salvando}>
                    {salvando
                        ? 'Salvando...'
                        : 'Salvar alterações'}
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

export default EditarServico;
