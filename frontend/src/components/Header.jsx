
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
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

            <Link to="/" className="header-logo-texto">
                <img
                    src="/images/logo-lampiao-guia-creme.png"
                    alt="Lampião Guia"
                    className="header-logo-imagem"
                />
            </Link>

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
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `header-link ${isActive ? 'ativo' : ''}`
                    }
                    onClick={fecharMenu}
                >
                    Início
                </NavLink>

                <NavLink
                    to="/servicos"
                    className={({ isActive }) =>
                        `header-link ${isActive ? 'ativo' : ''}`
                    }
                    onClick={fecharMenu}
                >
                    Serviços
                </NavLink>

                <NavLink
                    to="/sobre"
                    className={({ isActive }) =>
                        `header-link ${isActive ? 'ativo' : ''}`
                    }
                    onClick={fecharMenu}
                >
                    Sobre
                </NavLink>

                <NavLink
                    to="/login"
                    className="header-botao"
                    onClick={fecharMenu}
                >
                    Entrar
                </NavLink>
            </nav>

        </header>
    );
}

export default Header;
