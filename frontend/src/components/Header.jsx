import './Header.css';

function Header({ escuro = false }) {
  return (
    <header className={`header ${escuro ? 'header--escuro' : ''}`}>
      
    <a href="/" className="header-logo-texto">
        <img
            src="/images/logo-lampiao-guia-creme.png"
            alt="Lampião Guia"
            className="header-logo-imagem"
        />
    </a>

      <nav className="header-nav">
        <a href="/" className="header-link ativo">Início</a>
        <a href="/servicos" className="header-link">Serviços</a>
        <a href="/sobre" className="header-link">Sobre</a>
        <a href="/login" className="header-botao">Entrar</a>
      </nav>
    </header>
  );
}

export default Header;