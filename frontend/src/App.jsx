
import { Routes, Route } from 'react-router';

import Header from './components/Header';
import Home from './pages/Home';
import './App.css';

function PaginaProvisoria({ titulo }) {
    return (
        <main className="pagina-provisoria">
            <h1>{titulo}</h1>
            <p>Esta página está em desenvolvimento.</p>
        </main>
    );
}

function App() {
    return (
        <>
            <Header escuro />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/servicos"
                    element={<PaginaProvisoria titulo="Serviços" />}
                />

                <Route
                    path="/sobre"
                    element={<PaginaProvisoria titulo="Sobre o Lampião Guia" />}
                />

                <Route
                    path="/login"
                    element={<PaginaProvisoria titulo="Entrar" />}
                />
            </Routes>
        </>
    );
}

export default App;
