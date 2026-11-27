
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import BarraBusca from '../components/BarraBusca';
import ServicoCard from '../components/ServicoCard';
import './Servicos.css';

function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [buscaAplicada, setBuscaAplicada] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        setCarregando(true);
        setErro('');
        setServicos([]);

        const url = buscaAplicada
            ? `http://localhost:8080/servicos?nome=${encodeURIComponent(buscaAplicada)}`
            : 'http://localhost:8080/servicos';

        fetch(url, {
            signal: controller.signal
        })
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Erro ao buscar serviços');
                }

                return resposta.json();
            })
            .then((dados) => {
                setServicos(dados);
            })
            .catch((falha) => {
                if (falha.name !== 'AbortError') {
                    setErro('Não foi possível carregar os serviços.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            });

        return () => controller.abort();
    }, [buscaAplicada]);

    return (
        <main className="servicos-pagina">
            <section className="servicos-container">

                <header className="servicos-cabecalho">
                    <span className="servicos-etiqueta">
                        O GUIA DA COMUNIDADE
                    </span>

                    <h1>Explore os serviços</h1>

                    <p>
                        Encontre estabelecimentos e descubra
                        experiências compartilhadas pela
                        comunidade LGBTQIA+.
                    </p>
                </header>

                <section
                    className="servicos-busca"
                    aria-label="Pesquisar estabelecimentos"
                >
                    <BarraBusca onBuscar={setBuscaAplicada} />
                </section>

                <section className="servicos-resultados">
                    <div className="servicos-resultados-cabecalho">
                        <div>
                            <h2>Estabelecimentos</h2>

                            {!carregando && !erro && (
                                <p>
                                    {servicos.length === 1
                                        ? '1 estabelecimento encontrado'
                                        : `${servicos.length} estabelecimentos encontrados`}
                                </p>
                            )}
                        </div>

                        <Link
                            to="/sugerir"
                            className="servicos-sugerir"
                        >
                            Sugerir um lugar
                        </Link>
                    </div>

                    {carregando && (
                        <p>Carregando estabelecimentos...</p>
                    )}

                    {erro && (
                        <p role="alert">{erro}</p>
                    )}

                    {!carregando && !erro && servicos.length === 0 && (
                        <p className="servicos-vazio">
                            {buscaAplicada
                                ? `Nenhum estabelecimento encontrado para "${buscaAplicada}".`
                                : 'Ainda não existem estabelecimentos aprovados.'}
                        </p>
                    )}

                    {!carregando && !erro && servicos.length > 0 && (
                        <div className="servicos-lista">
                            {servicos.map((servico) => (
                                <ServicoCard
                                    key={servico.id}
                                    servico={servico}
                                />
                            ))}
                        </div>
                    )}
                </section>

            </section>
        </main>
    );
}

export default Servicos;
