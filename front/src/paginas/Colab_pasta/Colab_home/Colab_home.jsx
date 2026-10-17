import { useNavigate } from "react-router-dom";
import styles from "./CH_CSS.module.css";
import {
  CATEGORIES,
  GUIDES,
  calcularResumo,
} from "./CH_JS.js";

import Header from "../../Complementos/Colab/Header/C_Header.jsx";
import Footer from "../../Complementos/Colab/Footer/C_Footer.jsx";

export default function ColabHome({ registry = {} }) {
  const navigate = useNavigate();
  const { counts, total, stats } = calcularResumo(registry);

  const abrirCategoria = (categoria) => {
    navigate(categoria.route);
  };

  return (
    <div>
      <Header />

    <div className={styles.po}>

      <main className={styles.wrap}>
        <section id="painel" className={styles.hero}>
          <div>
            <h1>Manifestações aguardando a sua resposta</h1>
            <p>
              Os alunos registram as manifestações. Cabe a você analisar cada
              caso, responder ao aluno e atualizar o status do protocolo.
            </p>

            <ul className={styles.heroRole}>
              <li>
                <i>1</i>
                <span>Abra o tipo de manifestação e escolha um protocolo.</span>
              </li>
              <li>
                <i>2</i>
                <span>Responda ao aluno e atualize o status do caso.</span>
              </li>
              <li>
                <i>3</i>
                <span>Mantenha o sigilo e respeite o prazo institucional.</span>
              </li>
            </ul>
          </div>

          <div className={styles.stats}>
            {stats.map((item) => (
              <div className={styles.stat} key={item.label}>
                <b>{item.value}</b>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="manifestacoes">
          <div className={styles.secHead}>
            <div>
              <h2>Manifestações por tipo</h2>
              <p>
                Escolha um tipo para ver os protocolos registrados pelos alunos
                e responder.
              </p>
            </div>
            <span className={styles.secHint}>{total} registros no total</span>
          </div>

          <div className={styles.grid}>
            {CATEGORIES.map((categoria) => (
              <button
                key={categoria.id}
                type="button"
                className={styles.card}
                style={{
                  "--c": categoria.color,
                  "--tint": categoria.tint,
                }}
                onClick={() => abrirCategoria(categoria)}
              >
                <img
                  className={styles.cardImg}
                  src={categoria.img}
                  alt=""
                />

                <div className={styles.cardB}>
                  <div className={styles.cardT}>
                    <h3>{categoria.label}</h3>
                    <span className={styles.chip}>
                      {counts[categoria.id]} registros
                    </span>
                  </div>

                  <div className={styles.cardF}>
                    <span>Ver e responder</span>
                    <span aria-hidden="true">➔</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="diretrizes">
          <div className={styles.secHead}>
            <div>
              <h2>Diretrizes de atendimento</h2>
              <p>O que a Ouvidoria espera de cada resposta.</p>
            </div>
          </div>

          <div className={styles.guides}>
            {GUIDES.map((guia) => (
              <div className={styles.guide} key={guia.t}>
                <h3>{guia.t}</h3>
                <p>{guia.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </div>
  );
}
