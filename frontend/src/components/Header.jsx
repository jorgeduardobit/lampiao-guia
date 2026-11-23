import './Header.css';

function Header() {
    return (
        <header className="header">
            <a href="/" className="header-logo">
            Lampião Guia 
            </a>

            <nav className="header-nav">
                <a href="/">Início</a>
                <a href="/servicos">Serviços</a>
                <a href="/login">Entrar</a>
            </nav>
        </header>
    );
}

export default Header;