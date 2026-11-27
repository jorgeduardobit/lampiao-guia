import SugerirServico from './pages/SugerirServico';
import { Routes, Route } from 'react-router';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css';
import DetalhesServico from './pages/DetalhesServico';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import ModeracaoServicos from './pages/ModeracaoServicos';
import MeuPerfil from './pages/MeuPerfil';

function PaginaProvisoria({ titulo }) {
    return (
        <main className="pagina-provisoria">
            <h1>{titulo}</h1>
            <p>Esta página está em desenvolvimento.</p>
        </main>
    );
}

function App() {

    const [usuario, setUsuario] = useState(() => {
        try {
            const salvo = sessionStorage.getItem('lampiaoUsuario');
            return salvo ? JSON.parse(salvo) : null;
        } catch {
            return null;
        }
    });

    function fazerLogin(usuarioLogado) {
        sessionStorage.setItem(
            'lampiaoUsuario',
            JSON.stringify(usuarioLogado)
        );

        setUsuario(usuarioLogado);
    }

    function fazerLogout() {
        sessionStorage.removeItem('lampiaoUsuario');
        setUsuario(null);
    }

    return (
        <>
            <Header escuro usuario={usuario} />

            <Routes>
               <Route
                    path="/perfil"
                    element={
                        <MeuPerfil
                            usuario={usuario}
                            onAtualizarUsuario={fazerLogin}
                            onExcluirConta={fazerLogout}
                        />
                            }
                />

                <Route
                    path="/moderacao"
                    element={<ModeracaoServicos usuario={usuario} />}
                
                />
                <Route
                    path="/sugerir"
                    element={<SugerirServico usuario={usuario} />}
                />

              <Route path="/cadastro" element={<Cadastro />} />
              
              <Route
                path="/servicos/:id"
                element={<DetalhesServico usuario={usuario} />}
              />
              
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
                    element={
                        <Login
                            usuario={usuario}
                            onLogin={fazerLogin}
                            onLogout={fazerLogout}
                        />
                            }
                />
            </Routes>
        </>
    );
}

export default App;
