import { useState } from 'react';
import './BarraBusca.css';

function BarraBusca() {
    const [termo, setTermo] = useState('');

    return (
        <div className="barra-busca">
            <label htmlFor="busca-servicos">
                Encontre um serviço
            </label>

            <div className="barra-busca-campo">
                <span aria-hidden="true">⌕</span>

                <input
                id="busca-servicos"
                type="search"
                placeholder="Buscar pelo nome do serviço..."
                value={termo}
                onChange={(evento) => setTermo(evento.target.value)}
                />
            </div>

            {termo && (
                <small className="barra-busca-teste">
                    Você digitou: {termo}
                </small>
            )}
</div>
    );
}

export default BarraBusca;