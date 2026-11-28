
import { Link } from 'react-router';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-faixa" aria-hidden="true" />

            <div className="footer-conteudo">
                <div className="footer-principal">

                    <div className="footer-marca">
                        <Link to="/" aria-label="Ir para a página inicial">
                            <img
                                src="/images/logo-lampiao-guia-creme.png"
                                alt="Lampião Guia"
                                className="footer-logo"
                            />
                        </Link>

                        <p className="footer-slogan">
                            Informação, respeito e comunidade.
                        </p>

                        <p className="footer-frase">
                            Um guia feito pela comunidade,
                            para a comunidade.
                        </p>
                    </div>

                    <nav
                        className="footer-navegacao"
                        aria-label="Navegação do rodapé"
                    >
                        <h2>Explore</h2>

                        <Link to="/">Início</Link>
                        <Link to="/servicos">Serviços</Link>
                        <Link to="/sobre">Sobre o projeto</Link>
                        <Link to="/sugerir">
                            Sugerir estabelecimento
                        </Link>
                    </nav>

                    <div className="footer-projeto">
                        <h2>Sobre o Lampião Guia</h2>

                        <p>
                            Portal colaborativo de avaliações de
                            estabelecimentos e serviços pela
                            comunidade LGBTQIA+.
                        </p>

                        <a
                            href="https://github.com/jorgeduardobit/lampiao-guia"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ver projeto no GitHub ↗
                        </a>
                    </div>
                </div>

                <div className="footer-inferior">
                    <p>
                        © {new Date().getFullYear()} Lampião Guia
                    </p>

                    <p>
                        Projeto Recode - Transforma Futuros
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
