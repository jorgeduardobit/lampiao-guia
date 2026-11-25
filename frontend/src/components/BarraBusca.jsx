
import { useState } from 'react';
import './BarraBusca.css';

function BarraBusca({ onBuscar }) {
    const [termo, setTermo] = useState('');

    function enviarBusca(evento) {
        evento.preventDefault();
        onBuscar(termo.trim());
    }

    return (
        <form className="barra-busca" onSubmit={enviarBusca}>
            <label htmlFor="busca-servicos">
                Encontre um serviço
            </label>

            <div className="barra-busca-campo">
                <button
                    type="submit"
                    aria-label="Pesquisar serviços"
                >
                    ⌕
                </button>

                <input
                    id="busca-servicos"
                    type="search"
                    placeholder="Buscar pelo nome do serviço..."
                    value={termo}
                    onChange={(evento) => setTermo(evento.target.value)}
                />
            </div>
        </form>
    );
}

export default BarraBusca;
