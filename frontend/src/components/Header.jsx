
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import './Header.css';

function Header({ escuro = false, usuario, onLogout }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuContaRef = useRef(null);
    const navigate = useNavigate();

    function fecharMenu() {
        setMenuAberto(false);
        menuContaRef.current?.removeAttribute('open');
    }

    function alternarMenu() {
        setMenuAberto((anterior) => !anterior);
        menuContaRef.current?.removeAttribute('open');
    }

    function sairDaConta() {
        fecharMenu();
        onLogout();
        navigate('/');
    }

    // Fecha o menu da conta ao clicar fora ou apertar Escape.
    useEffect(() => {
        function clicarFora(evento) {
            if (
                menuContaRef.current &&
                !menuContaRef.current.contains(evento.target)
            ) {
                menuContaRef.current.removeAttribute('open');
            }
        }

        function pressionarTecla(evento) {
            if (evento.key === 'Escape') {
                menuContaRef.current?.removeAttribute('open');
                setMenuAberto(false);
            }
        }

        document.addEventListener('pointerdown', clicarFora);
        document.addEventListener('keydown', pressionarTecla);

        return () => {
            document.removeEventListener('pointerdown', clicarFora);
            document.removeEventListener('keydown', pressionarTecla);
        };
    }, []);

    return (
        <header className={`header ${escuro ? 'header--escuro' : ''}`}>

            <Link
                to="/"
                className="header-logo-texto"
                onClick={fecharMenu}
            >
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
                aria-label="Navegação principal"
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

                {!usuario ? (
                    <NavLink
                        to="/login"
                        className="header-botao"
                        onClick={fecharMenu}
                    >
                        Entrar
                    </NavLink>
                ) : (
                    <details
                        className="header-conta"
                        ref={menuContaRef}
                    >
                        <summary className="header-botao header-conta-botao">
                            <span>{usuario.nome}</span>
                            <span
                                className="header-conta-seta"
                                aria-hidden="true"
                            >
                                ▾
                            </span>
                        </summary>

                        <div className="header-conta-menu">
                            <Link
                                to="/perfil"
                                onClick={fecharMenu}
                            >
                                Meu perfil
                            </Link>

                            <Link
                                to="/sugerir"
                                onClick={fecharMenu}
                            >
                                Sugerir estabelecimento
                            </Link>

                            {usuario.perfil === 'admin' && (
                                <Link
                                    to="/moderacao"
                                    onClick={fecharMenu}
                                >
                                    Moderação
                                </Link>
                            )}

                            <button
                                type="button"
                                className="header-conta-sair"
                                onClick={sairDaConta}
                            >
                                Sair da conta
                            </button>
                        </div>
                    </details>
                )}
            </nav>
        </header>
    );
}

export default Header;
