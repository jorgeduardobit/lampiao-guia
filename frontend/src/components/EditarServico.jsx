
import { useState } from 'react';
import './EditarServico.css';

function EditarServico({ servico, onSalvo, onCancelar }) {
    const [dados, setDados] = useState({
        nome: servico.nome,
        categoria: servico.categoria,
        cidade: servico.cidade,
        estado: servico.estado,
        endereco: servico.endereco || '',
        descricao: servico.descricao || ''
    });

    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

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
        setSalvando(true);
        setErro('');

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
                        categoria: dados.categoria.trim(),
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

            {[
                { campo: 'nome', rotulo: 'Nome', limite: 150 },
                { campo: 'categoria', rotulo: 'Categoria', limite: 50 },
                { campo: 'cidade', rotulo: 'Cidade', limite: 80 },
                { campo: 'estado', rotulo: 'Estado (UF)', limite: 2 }
            ].map((item) => (
                <div className="editar-servico-campo" key={item.campo}>
                    <label htmlFor={`editar-${item.campo}`}>
                        {item.rotulo} <span aria-hidden="true">*</span>
                    </label>

                    <input
                        id={`editar-${item.campo}`}
                        name={item.campo}
                        value={dados[item.campo]}
                        onChange={alterarCampo}
                        maxLength={item.limite}
                        minLength={item.campo === 'estado' ? 2 : 1}
                        pattern={
                            item.campo === 'estado'
                                ? '[A-Za-z]{2}'
                                : undefined
                        }
                        required
                    />
                </div>
            ))}

            <div className="editar-servico-campo">
                <label htmlFor="editar-endereco">Endereço</label>
                <input
                    id="editar-endereco"
                    name="endereco"
                    value={dados.endereco}
                    onChange={alterarCampo}
                    maxLength={200}
                />
            </div>

            <div className="editar-servico-campo">
                <label htmlFor="editar-descricao">Descrição</label>
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

export default EditarServico;
