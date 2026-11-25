
import { useState } from 'react';
import './Header.css';

function Header({ escuro = false }) {
    const [menuAberto, setMenuAberto] = useState(false);

    function alternarMenu() {
        setMenuAberto(!menuAberto);
    }

    function fecharMenu() {
        setMenuAberto(false);
    }

    return (
        <header className={`header ${escuro ? 'header--escuro' : ''}`}>

            <a href="/" className="header-logo-texto">
                <img
                    src="/images/logo-lampiao-guia-creme.png"
                    alt="Lampião Guia"
                    className="header-logo-imagem"
                />
            </a>

            <button
                type="button"
                className="header-menu-botao"
                onClick={alternarMenu}
                aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menuAberto}
                aria-controls="menu-principal"
            >
                <span aria-hidden="true">
                    {menuAberto ? '✕' : '☰'}
                </span>
            </button>

            <nav
                id="menu-principal"
                className={`header-nav ${menuAberto ? 'header-nav--aberto' : ''}`}
            >
                <a href="/" className="header-link ativo" onClick={fecharMenu}>
                    Início
                </a>

                <a href="/servicos" className="header-link" onClick={fecharMenu}>
                    Serviços
                </a>

                <a href="/sobre" className="header-link" onClick={fecharMenu}>
                    Sobre
                </a>

                <a href="/login" className="header-botao" onClick={fecharMenu}>
                    Entrar
                </a>
            </nav>

        </header>
    );
}

export default Header;
