
import { Link } from 'react-router';
import './Sobre.css';

const etapas = [
    {
        numero: '01',
        simbolo: '⌕',
        titulo: 'Encontre',
        descricao: 'Explore estabelecimentos e conheça as experiências da comunidade.'
    },
    {
        numero: '02',
        simbolo: '★',
        titulo: 'Avalie',
        descricao: 'Compartilhe sua experiência por meio de cinco critérios de acolhimento.'
    },
    {
        numero: '03',
        simbolo: '✳',
        titulo: 'Participe',
        descricao: 'Sugira novos lugares e ajude a fortalecer nosso guia coletivo.'
    }
];

const criterios = [
    'Respeito à identidade de gênero',
    'Não discriminação',
    'Inclusão e diversidade',
    'Acolhimento',
    'Atenção e resolução'
];

function Sobre() {
    return (
        <main className="sobre-pagina">

            {/* Apresentação da página */}

            <section className="sobre-hero">
                <div className="sobre-hero-conteudo">
                    <span className="sobre-etiqueta">
                        MUITO MAIS QUE UM GUIA
                    </span>

                    <img
                        src="/images/logo-lampiao-guia.png"
                        alt="Lampião Guia"
                        className="sobre-logo"
                    />

                    <h1>Por trás do Lampião Guia</h1>

                    <p>
                        Informação, respeito e comunidade.
                    </p>
                </div>

                {/* Faixas do orgulho LGBTQIA+ */}

                <svg
                    className="sobre-faixas"
                    viewBox="0 0 1440 185"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >

                    {/* Fundo creme atrás das faixas */}

                    <path
                        d="M0 119 C280 75 430 190 720 130 S1160 85 1440 125 L1440 185 L0 185 Z"
                        fill="#F3E9D2"
                    />

                    {/* Vermelho */}

                    <path
                        d="M0 54 C280 10 430 125 720 65 S1160 20 1440 60"
                        stroke="#E84B3A"
                        strokeWidth="16"
                        fill="none"
                    />

                    {/* Laranja */}

                    <path
                        d="M0 67 C280 23 430 138 720 78 S1160 33 1440 73"
                        stroke="#F47A20"
                        strokeWidth="16"
                        fill="none"
                    />

                    {/* Amarelo */}

                    <path
                        d="M0 80 C280 36 430 151 720 91 S1160 46 1440 86"
                        stroke="#F5C443"
                        strokeWidth="16"
                        fill="none"
                    />

                    {/* Verde */}

                    <path
                        d="M0 93 C280 49 430 164 720 104 S1160 59 1440 99"
                        stroke="#3D8A56"
                        strokeWidth="16"
                        fill="none"
                    />

                    {/* Azul */}

                    <path
                        d="M0 106 C280 62 430 177 720 117 S1160 72 1440 112"
                        stroke="#2E80C6"
                        strokeWidth="16"
                        fill="none"
                    />

                    {/* Roxo */}

                    <path
                        d="M0 119 C280 75 430 190 720 130 S1160 85 1440 125"
                        stroke="#7D2B8C"
                        strokeWidth="16"
                        fill="none"
                    />

                </svg>
            </section>

            {/* História e missão */}

            <div className="sobre-conteudo">
                <section className="sobre-missao">

                    <div className="sobre-missao-texto">
                        <span className="sobre-secao-numero">
                            01 / NOSSA MISSÃO
                        </span>

                        <h2>Iluminar caminhos.</h2>

                        <p>
                            O Lampião Guia nasceu de uma ideia simples:
                            transformar experiências compartilhadas
                            pela comunidade LGBTQIA+ em informações
                            úteis para quem procura estabelecimentos
                            e serviços mais acolhedores.
                        </p>

                        <p>
                            Por meio de avaliações, buscamos dar
                            visibilidade às experiências de respeito,
                            inclusão e não discriminação, ajudando
                            outras pessoas a fazer escolhas mais
                            informadas.
                        </p>

                        <p>
                            Nosso nome também presta homenagem ao
                            <em> Lampião da Esquina</em>, jornal
                            brasileiro que se tornou uma importante
                            referência de visibilidade e expressão
                            LGBTQIA+ no final dos anos 1970.
                        </p>
                    </div>

                    <aside className="sobre-citacao">
                        <span aria-hidden="true">✦</span>

                        <blockquote>
                            Um guia feito por nós, para nós,
                            iluminando espaços de acolhimento
                            e respeito.
                        </blockquote>

                        <span aria-hidden="true">✦</span>
                    </aside>
                </section>

                {/* Como funciona */}

                <section className="sobre-funcionamento">
                    <div className="sobre-secao-cabecalho">
                        <span className="sobre-secao-numero">
                            02 / NOSSO GUIA
                        </span>

                        <h2>Como funciona o Guia</h2>

                        <p>
                            Cada experiência ajuda a construir
                            um panorama mais coletivo sobre os lugares
                            que frequentamos.
                        </p>
                    </div>

                    <div className="sobre-etapas">
                        {etapas.map((etapa) => (
                            <article
                                className="sobre-etapa"
                                key={etapa.numero}
                            >
                                <span
                                    className="sobre-etapa-simbolo"
                                    aria-hidden="true"
                                >
                                    {etapa.simbolo}
                                </span>

                                <span className="sobre-etapa-numero">
                                    {etapa.numero}
                                </span>

                                <h3>{etapa.titulo}</h3>

                                <p>{etapa.descricao}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Critérios e ODS */}

                <section className="sobre-compromisso">
                    <div className="sobre-compromisso-texto">
                        <span className="sobre-secao-numero">
                            03 / IMPACTO SOCIAL
                        </span>

                        <h2>Respeito também é um critério.</h2>

                        <p>
                            Nossa proposta está alinhada ao
                            Objetivo de Desenvolvimento Sustentável
                            10 da ONU: Redução das Desigualdades.
                        </p>

                        <p>
                            As avaliações consideram cinco dimensões
                            que ajudam a comunidade a compartilhar
                            experiências de atendimento e acolhimento.
                        </p>
                    </div>

                    <div className="sobre-criterios">
                        <h3>O que avaliamos?</h3>

                        <ol>
                            {criterios.map((criterio) => (
                                <li key={criterio}>
                                    {criterio}
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Convite à comunidade */}

                <section className="sobre-convite">
                    <span
                        className="sobre-convite-estrela"
                        aria-hidden="true"
                    >
                        ✷
                    </span>

                    <h2>O Guia também é seu.</h2>

                    <p>
                        Conhece um estabelecimento que deveria
                        fazer parte do Lampião Guia?
                        Compartilhe sua sugestão e ajude
                        a ampliar nossa rede.
                    </p>

                    <Link
                        to="/sugerir"
                        className="sobre-convite-botao"
                    >
                        Sugerir um estabelecimento
                    </Link>
                </section>
            </div>
        </main>
    );
}

export default Sobre;
