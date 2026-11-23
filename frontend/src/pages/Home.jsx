import './Home.css';

function Home() {
    return (
        <main className="home">
<svg
    className="home-faixa"
    viewBox="0 0 600 650"
    aria-hidden="true"
    fill="none"
    strokeWidth="19"
    strokeLinecap="round"
>
    <defs>
        <path
        id="curva-orgulho"
        d="M -80 -180 C 100 -10, 230 40, 390 70 S 560 200, 780 90"
        />
    </defs>
    <use href="#curva-orgulho" stroke="#E34B35" transform="translate(0 -45)" />
    <use href="#curva-orgulho" stroke="#F58220" transform="translate(0 -27)" />
    <use href="#curva-orgulho" stroke="#F6C445" transform="translate(0 -9)" />
    <use href="#curva-orgulho" stroke="#39865B" transform="translate(0 9)" />
    <use href="#curva-orgulho" stroke="#2878B8" transform="translate(0 27)" />
    <use href="#curva-orgulho" stroke="#7B285F" transform="translate(0 45)" />
</svg>
                <div className="home-conteudo">
                <h1>Encontre lugares onde o respeito faz parte do atendimento.</h1>

                <p>
                    Descubra serviços avaliados pela comunidade LGBTQIA+
                    e compartilhe suas experiências.
                </p>
            </div>
        </main>
    );
}

export default Home;