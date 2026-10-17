import { useEffect, useMemo, useState } from "react";
import styles from "./C_E_CSS.module.css";
import { ELOGIOS_INICIAIS, STATUS_META, FILTERS, hojeFormatado } from "./C_E_JS";

import Header from "../../Complementos/Colab/Header/C_Header.jsx";
import Footer from "../../Complementos/Colab/Footer/C_Footer.jsx";

export default function ProalunoElogios() {
  const [elogiosDB, setElogiosDB] = useState(ELOGIOS_INICIAIS);
  const [filtro, setFiltro] = useState("todas");
  const [modalId, setModalId] = useState(null);
  const [campoBusca, setCampoBusca] = useState("");
  const [buscaAtiva, setBuscaAtiva] = useState("");
  const [rascunhoResposta, setRascunhoResposta] = useState("");
  const [novoStatus, setNovoStatus] = useState("analise");
  const [confirmacao, setConfirmacao] = useState(false);

  const elogios = useMemo(
    () => Object.entries(elogiosDB).map(([id, d]) => ({ id: Number(id), ...d })),
    [elogiosDB]
  );

  const contagens = useMemo(() => {
    const c = { todas: elogios.length, analise: 0, respondido: 0, resolvido: 0 };
    elogios.forEach((d) => { c[d.status] += 1; });
    return c;
  }, [elogios]);

  const elogiosFiltrados = elogios.filter((d) => {
    const passaStatus = filtro === "todas" || d.status === filtro;
    const passaBusca =
      !buscaAtiva || d.protocolo.toLowerCase().includes(buscaAtiva.toLowerCase());
    return passaStatus && passaBusca;
  });

  const modalData = modalId ? elogiosDB[modalId] : null;

  const handleConsultar = () => setBuscaAtiva(campoBusca.trim());
  const handleLimparBusca = () => {
    setCampoBusca("");
    setBuscaAtiva("");
  };

  const abrirModal = (id) => {
    setModalId(id);
    setRascunhoResposta("");
    setNovoStatus(elogiosDB[id].status);
    setConfirmacao(false);
  };

  const fecharModal = () => {
    setModalId(null);
    setConfirmacao(false);
  };

  const handleEnviarResposta = () => {
    const texto = rascunhoResposta.trim();
    if (!texto || !modalId) return;

    setElogiosDB((prev) => ({
      ...prev,
      [modalId]: {
        ...prev[modalId],
        status: novoStatus,
        respostas: [
          ...prev[modalId].respostas,
          { autor: "Você (colaborador)", data: hojeFormatado(), texto },
        ],
      },
    }));
    setRascunhoResposta("");
    setConfirmacao(true);
  };

  useEffect(() => {
    if (!modalId) return undefined;
    const onKey = (e) => e.key === "Escape" && fecharModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalId]);

  const total = contagens.todas || 1;

  return (
<div>    
  <Header />

    <div className={styles["pa-root"]}>
      <div className={styles["pa-page"]}>
        <div className={styles["pa-page-head"]}>
          <div>
            <h1 className={styles["pa-page-title"]}>Elogios</h1>
            <p className={styles["pa-page-sub"]}>
              Acompanhe os elogios enviados por alunos do ensino médio sobre professores,
              funcionários e iniciativas da escola. Use o número de protocolo para
              localizar um registro específico.
            </p>
          </div>
          <div className={styles["pa-overview"]} aria-label="Resumo por status">
            <div className={styles["pa-overview-total"]}>
              <strong>{contagens.todas}</strong>
              <span>registros no total</span>
            </div>
            <div
              className={styles["pa-overview-bar"]}
              role="img"
              aria-label={`${contagens.analise} recebidos, ${contagens.respondido} compartilhados, ${contagens.resolvido} arquivados`}
            >
              {["analise", "respondido", "resolvido"].map((k) =>
                contagens[k] > 0 ? (
                  <span
                    key={k}
                    style={{ flexGrow: contagens[k] / total, flexBasis: 0, backgroundColor: STATUS_META[k].bar }}
                  />
                ) : null
              )}
            </div>
            <div className={styles["pa-overview-legend"]}>
              {["analise", "respondido", "resolvido"].map((k) => (
                <span className={styles["pa-legend-item"]} key={k}>
                  <span className={styles["pa-legend-dot"]} style={{ backgroundColor: STATUS_META[k].bar }} />
                  {contagens[k]} {STATUS_META[k].label.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </div>

        <main className={styles["pa-panel"]}>
          <div className={styles["pa-toolbar"]}>
            <div className={styles["pa-tabs"]} role="tablist" aria-label="Filtrar por status">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={filtro === f.key}
                  className={`${styles["pa-tab"]}${filtro === f.key ? " " + styles.active : ""}`}
                  onClick={() => setFiltro(f.key)}
                >
                  {f.label}
                  <span className={styles["pa-tab-count"]}>{contagens[f.key]}</span>
                </button>
              ))}
            </div>
            <div className={styles["pa-search"]}>
              <div className={styles["pa-search-field"]}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar protocolo, ex: 12-08"
                  className={styles["pa-search-input"]}
                  aria-label="Número do protocolo"
                  value={campoBusca}
                  onChange={(e) => setCampoBusca(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleConsultar()}
                />
              </div>
              <button className={styles["pa-btn-primary"]} onClick={handleConsultar}>
                Consultar
              </button>
            </div>
          </div>

          {buscaAtiva && (
            <div className={styles["pa-search-hint"]}>
              <span>Resultados para o protocolo "{buscaAtiva}"</span>
              <button onClick={handleLimparBusca}>Limpar busca</button>
            </div>
          )}

          <div className={styles["pa-list-meta"]}>
            <span>Mais recentes primeiro</span>
            <span aria-hidden="true">•</span>
            <span>
              <strong>{elogiosFiltrados.length}</strong>{" "}
              {elogiosFiltrados.length === 1 ? "resultado" : "resultados"}
            </span>
          </div>

          {elogiosFiltrados.length === 0 ? (
            <div className={styles["pa-empty"]}>
              <p className={styles["pa-empty-title"]}>Nenhum elogio encontrado</p>
              <p>Revise o número de protocolo ou remova os filtros aplicados.</p>
              {(buscaAtiva || filtro !== "todas") && (
                <button onClick={() => { handleLimparBusca(); setFiltro("todas"); }}>
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className={styles["pa-list"]}>
              {elogiosFiltrados.map((d) => {
                const meta = STATUS_META[d.status];
                return (
                  <button
                    className={styles["pa-row"]}
                    key={d.id}
                    onClick={() => abrirModal(d.id)}
                    aria-label={`Ver detalhes do protocolo ${d.protocolo}: ${d.titulo}`}
                  >
                    <span className={styles["pa-row-bar"]} style={{ backgroundColor: meta.bar }} />
                    <span className={styles["pa-row-body"]}>
                      <span className={styles["pa-row-top"]}>
                        <span className={styles["pa-protocolo"]}>Nº {d.protocolo}</span>
                        <span className={styles["pa-badge"]} style={{ backgroundColor: meta.bg, color: meta.text }}>
                          {meta.label}
                        </span>
                        {d.divulgar === "Sim" && <span className={styles["pa-tag"]}>Para o mural</span>}
                      </span>
                      <span className={styles["pa-row-title"]} style={{ display: "block" }}>{d.titulo}</span>
                      <span className={styles["pa-row-meta"]}>
                        <span>{d.assunto}</span>
                        <span>Registrado em {d.dataResumo}</span>
                        {d.respostas.length > 0 && (
                          <span>
                            {d.respostas.length} {d.respostas.length === 1 ? "resposta" : "respostas"}
                          </span>
                        )}
                      </span>
                    </span>
                    <svg className={styles["pa-row-chevron"]} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {modalData && (
        <div
          className={styles["pa-overlay"]}
          onClick={(e) => e.target === e.currentTarget && fecharModal()}
        >
          <aside className={styles["pa-drawer"]} role="dialog" aria-modal="true" aria-labelledby="pa-drawer-title">
            <div className={styles["pa-drawer-head"]}>
              <button className={styles["pa-close"]} onClick={fecharModal} aria-label="Fechar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <div className={styles["pa-drawer-head-top"]}>
                <span className={styles["pa-protocolo"]}>Protocolo {modalData.protocolo}</span>
                <span
                  className={styles["pa-badge"]}
                  style={{
                    backgroundColor: STATUS_META[modalData.status].bg,
                    color: STATUS_META[modalData.status].text,
                  }}
                >
                  {STATUS_META[modalData.status].label}
                </span>
                {modalData.divulgar === "Sim" && <span className={styles["pa-tag"]}>Para o mural</span>}
              </div>
              <h2 className={styles["pa-drawer-title"]} id="pa-drawer-title">{modalData.titulo}</h2>
            </div>

            <div className={styles["pa-drawer-body"]}>
              <h3 className={styles["pa-section-title"]}>Descrição</h3>
              <p className={styles["pa-description"]}>{modalData.descricao}</p>

              <dl className={styles["pa-facts"]}>
                <div className={styles["pa-fact"]}>
                  <dt>Assunto</dt>
                  <dd>{modalData.assunto}</dd>
                </div>
                <div className={styles["pa-fact"]}>
                  <dt>Quando aconteceu</dt>
                  <dd>{modalData.data}</dd>
                </div>
                <div className={`${styles["pa-fact"]} ${styles.wide}`}>
                  <dt>Quem está sendo elogiado</dt>
                  <dd>{modalData.quemElogiado}</dd>
                </div>
                <div className={`${styles["pa-fact"]} ${styles.wide}`}>
                  <dt>Divulgar no mural da escola?</dt>
                  <dd>{modalData.divulgar}</dd>
                </div>
              </dl>

              <div className={styles["pa-response-section"]}>
                <h3>Histórico de respostas</h3>
                <p className={styles["pa-response-lead"]}>
                  Sua resposta fica registrada no histórico do protocolo e pode
                  ser usada para atualizar o status do caso.
                </p>

                {modalData.respostas.length > 0 ? (
                  <div className={styles["pa-thread"]}>
                    {modalData.respostas.map((r, i) => (
                      <div className={styles["pa-response-item"]} key={i}>
                        <span className={styles["pa-response-avatar"]} aria-hidden="true">
                          {r.autor.trim().charAt(0).toUpperCase()}
                        </span>
                        <div className={styles["pa-response-card"]}>
                          <div className={styles["pa-response-item-head"]}>
                            <span className={styles["pa-response-author"]}>{r.autor}</span>
                            <span className={styles["pa-response-date"]}>{r.data}</span>
                          </div>
                          <p className={styles["pa-response-text"]}>{r.texto}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles["pa-no-response"]}>Ainda não há respostas para esta manifestação.</p>
                )}

                <div className={styles["pa-form"]}>
                  <label className={styles["pa-form-label"]} htmlFor="pa-resposta">Nova resposta</label>
                  <textarea
                    id="pa-resposta"
                    className={styles["pa-response-textarea"]}
                    placeholder="Escreva a resposta que será enviada ao autor do elogio..."
                    value={rascunhoResposta}
                    onChange={(e) => {
                      setRascunhoResposta(e.target.value);
                      setConfirmacao(false);
                    }}
                  />
                  <div className={styles["pa-form-row"]}>
                    <div className={styles["pa-status-wrap"]}>
                      <label htmlFor="pa-status-select">Atualizar status para</label>
                      <select
                        id="pa-status-select"
                        className={styles["pa-status-select"]}
                        value={novoStatus}
                        onChange={(e) => setNovoStatus(e.target.value)}
                      >
                        <option value="analise">Recebido</option>
                        <option value="respondido">Compartilhado</option>
                        <option value="resolvido">Arquivado</option>
                      </select>
                    </div>
                    <button
                      className={styles["pa-btn-primary"]}
                      onClick={handleEnviarResposta}
                      disabled={!rascunhoResposta.trim()}
                    >
                      Enviar resposta
                    </button>
                  </div>
                  {confirmacao && (
                    <p className={styles["pa-response-confirm"]} role="status">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                      Resposta registrada com sucesso.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
      </div>
                    <Footer />
    </div>
    
  );
}
