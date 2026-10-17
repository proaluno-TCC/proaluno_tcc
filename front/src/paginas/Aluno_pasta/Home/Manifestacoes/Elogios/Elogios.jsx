import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './E_CSS.module.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Elogios/Header/E_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Elogios/Footer/E_Footer';

export default function Elogios() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const formRef = useRef(null); // 🔥 Nova referência

  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [protocol, setProtocol] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Arquivos ──────────────────────────────────────────────────
  function handleFileChange(e) {
    const novos = Array.from(e.target.files);
    setFiles(prev => [...prev, ...novos]);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  // ── Submit ────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const proto = `ELO-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovoElogio() {
    setSubmitted(false);
    setProtocol('');
    setFiles([]);
    
    // 🔥 Reseta o formulário e rola pro topo
    formRef.current?.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className={styles.body}>
      <main>
        <Header />

        <section className={styles.elogioSection}>
          <div className={styles.container}>

            {/* ── CABEÇALHO ──────────────────────────────────────── */}
            <header className={styles.elogioHeader}>
              <h1>ELOGIO</h1>
              <p>Expresse sua satisfação com seu ambiente escolar ou funcionários</p>
              <br />
              <h2>Dados da manifestação</h2>
              <p>Preencha os campos referentes ao seu elogio</p>
            </header>

            {/* ════════════════════════════════════════════════════
                FORMULÁRIO
            ════════════════════════════════════════════════════ */}
            <form ref={formRef} className={styles.elogioForm} onSubmit={handleSubmit}>

              {/* SEÇÃO 1 — DADOS BÁSICOS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Dados Básicos</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="titulo" className={styles.obrigatorio}>Título</label>
                  <input type="text" id="titulo" placeholder="Digite um título para seu elogio" required />
                </div>
              </div>

              {/* SEÇÃO 2 — DETALHES DO ELOGIO */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Detalhes do Elogio</h3>
                <p className={styles.sectionDescription}>
                  Reconheça quem fez a diferença! Sua gratidão inspira e motiva nossa comunidade.
                </p>

                <div className={styles.questionBox}>
                  <label htmlFor="quemElogiar" className={styles.obrigatorio}>Quem você gostaria de elogiar?</label>
                  <input type="text" id="quemElogiar" placeholder="Nome, cargo ou setor" required />
                </div>

                <div className={styles.questionBox}>
                  <label htmlFor="motivo" className={styles.obrigatorio}>Por que você gostaria de elogiar?</label>
                  <textarea
                    id="motivo"
                    placeholder="Conte sobre o projeto com você e por que gostaria de obter esse reconhecimento."
                    required
                  />
                </div>

                <div className={styles.questionBox}>
                  <label className={styles.obrigatorio}>Você gostaria que esse reconhecimento fosse compartilhado publicamente?</label>
                  <div className={styles.radioGroup}>
                    {['sim', 'nao'].map(v => (
                      <label key={`autoridades-${v}`} className={styles.radioOption}>
                        <input 
                          type="radio" 
                          name="relatarAutoridades"
                          value={v} 
                          required 
                        />
                        {v === 'sim' ? 'Sim' : 'Não'}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUBMIT */}
              <div className={styles.submitWrapper}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <div className={styles.btnLoader}>
                      <div className={styles.loaderDot} />
                      <div className={styles.loaderDot} />
                      <div className={styles.loaderDot} />
                    </div>
                  ) : (
                    <span className={styles.btnText}>ENVIAR ELOGIO</span>
                  )}
                </button>
              </div>
            </form>

            {/* ── Modal Pop-up de Sucesso ── */}
            <div
              className={`${styles.successOverlay} ${submitted ? styles.active : ''}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) handleNovoElogio();
              }}
            >
              <div className={styles.successModalContent}>
                <div className={styles.modalSuccessIcon}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className={styles.modalSuccessTitle}>Elogio Registrado!</h2>
                <p className={styles.modalSuccessMessage}>
                  Seu elogio foi enviado e será compartilhado com a equipe.
                  Obrigado por reconhecer quem faz a diferença!
                </p>

                <div className={styles.modalProtocol}>{protocol}</div>
                <p className={styles.modalSuccessMessage}>
                  Anote o número de protocolo para acompanhar o andamento.
                </p>

                <div className={styles.modalActions}>
                  <button className={styles.modalNewBtn} onClick={handleNovoElogio}>
                    Novo Elogio
                  </button>
                  <button className={styles.modalHomeBtn} onClick={() => navigate('/home')}>
                    Voltar para Home
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
