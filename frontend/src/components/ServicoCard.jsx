import { Link } from 'react-router';
import './ServicoCard.css';

function ServicoCard({ servico }) {
    return (
        <Link
            to={`/servicos/${servico.id}`}
            className="servico-card"
        >
            <div className="servico-card-conteudo">
                <h3>{servico.nome}</h3>

                <p>
                    {servico.categoria} • {servico.cidade}, {servico.estado}
                </p>
            </div>

            <span className="servico-card-seta" aria-hidden="true">
                ↗
            </span>
        </Link>
    );
}

export default ServicoCard;
