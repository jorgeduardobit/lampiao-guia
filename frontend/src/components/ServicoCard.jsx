
import './ServicoCard.css';

function ServicoCard({ servico }) {
    return (
        <article className="servico-card">
            <div className="servico-card-conteudo">
                <h3>{servico.nome}</h3>

                <p>
                    {servico.categoria} • {servico.cidade}, {servico.estado}
                </p>
            </div>

            <span className="servico-card-seta" aria-hidden="true">
                ↗
            </span>
        </article>
    );
}

export default ServicoCard;
