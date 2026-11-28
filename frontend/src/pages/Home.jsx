import BarraBusca from '../components/BarraBusca';
import './Home.css';
import ServicoCard from '../components/ServicoCard';
import { useState, useEffect } from 'react';


function Home() {
const [servicos, setServicos] = useState([]);
const [carregando, setCarregando] = useState(true);
const [erro, setErro] = useState('');
const [buscaAplicada, setBuscaAplicada] = useState('');

useEffect(() => {
    const controller = new AbortController();

    setCarregando(true);
    setErro('');

    const url = buscaAplicada
        ? `http://localhost:8080/servicos?nome=${encodeURIComponent(buscaAplicada)}`
        : 'http://localhost:8080/servicos';

    fetch(url, { signal: controller.signal })
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
    <main className="home">
      <section className="home-hero">
        <div className="home-coluna-texto">
          <img
            className="home-logo-imagem"
            src="/images/logo-lampiao-guia.png"
            alt="Lampião Guia"
          />

          <p className="home-slogan">
              Informação, respeito e comunidade.
          </p>

          <p className="home-descricao">
              Portal colaborativo de avaliações de
              estabelecimentos e serviços pela comunidade LGBTQIA+.
          </p>

          <BarraBusca onBuscar={setBuscaAplicada} />
        </div>

        <div className="home-coluna-ilustracao">
          <img
            className="home-lampiao"
            src="/images/lampiao-ilustracao.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <svg
          className="home-faixas"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
          fill="none"
          strokeWidth="22"
        >
          <defs>
            <path
              id="curva-faixa"
              d="M -40 70 C 180 20, 420 170, 720 120 S 1120 40, 1480 110"
            />
          </defs>

          <use href="#curva-faixa" stroke="#E84B3A" transform="translate(0,-44)" />
          <use href="#curva-faixa" stroke="#F47A20" transform="translate(0,-22)" />
          <use href="#curva-faixa" stroke="#F5C443" transform="translate(0,0)" />
          <use href="#curva-faixa" stroke="#3D8A56" transform="translate(0,22)" />
          <use href="#curva-faixa" stroke="#2E80C6" transform="translate(0,44)" />
          <use href="#curva-faixa" stroke="#7D2B8C" transform="translate(0,66)" />

          <path
          d="M -40 146 C 180 96, 420 246, 720 196 S 1120 116, 1480 186 L 1480 260 L -40 260 Z"
          fill="#F3E9D2"
          />

        </svg>
      </section>

      <section className="home-listagem">
        <h2>Explore os estabelecimentos</h2>
        <p>
          Conheça estabelecimentos e serviços por meio das experiencias compartilhadas pela comunidade LGBTQIA+
        </p>
          
{carregando && (
    <p>Carregando serviços...</p>
)}

{erro && (
    <p role="alert">{erro}</p>
)}

{!carregando && !erro && servicos.length === 0 && (
    <p>
    {buscaAplicada
        ? `Nenhum serviço encontrado para "${buscaAplicada}".`
        : 'Nenhum serviço aprovado encontrado.'}
    </p>
)}

{!carregando && !erro && servicos.length > 0 && (
    <div className="home-servicos-lista">
        {servicos.map((servico) => (
            <ServicoCard
                key={servico.id}
                servico={servico}
            />
        ))}
    </div>
)}


      </section>
    </main>
  );
}

export default Home;