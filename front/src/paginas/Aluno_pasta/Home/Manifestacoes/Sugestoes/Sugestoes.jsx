import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SU_CSS.module.css';
import '../../../../Complementos/global.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Sugestoes/Header/SU_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Sugestoes/Footer/SU_Footer';

export default function Sugestoes() {
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
      const proto = `SUG-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovaSugestao() {
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

        <section className={styles.sugestaoSection}>
          <div className={styles.container}>

            {/* ── CABEÇALHO ──────────────────────────────────────── */}
            <header className={styles.sugestaoHeader}>
              <h1>SUGESTÃO</h1>
              <p>Envie uma ideia ou proposta para melhoria do seu ambiente escolar</p>
              <br />
              <h2>Dados de manifestação</h2>
              <p>Preencha os campos referentes à sua sugestão.</p>
            </header>

            {/* ════════════════════════════════════════════════════
                FORMULÁRIO
            ════════════════════════════════════════════════════ */}
            <form ref={formRef} className={styles.suggestionForm} onSubmit={handleSubmit}>

              {/* SEÇÃO 1 — DADOS BÁSICOS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Dados Básicos</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="titulo" className={styles.obrigatorio}>Título</label>
                  <input type="text" id="titulo" placeholder="Digite um título para sua sugestão" required />
                </div>
              </div>

              {/* SEÇÃO 2 — CATEGORIA */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Categoria</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="categoria" className={styles.obrigatorio}>Categoria da sugestão</label>
                  <div className={styles.selectWrapper}>
                    <select id="categoria" required defaultValue="">
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="informativos">Informativos</option>
                      <option value="servicos">Serviços</option>
                      <option value="infraestrutura">Infraestrutura</option>
                      <option value="academico">Acadêmico</option>
                      <option value="administrativo">Administrativo</option>
                      <option value="outros">Outros</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <i className="fas fa-chevron-down" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SEÇÃO 3 — DETALHES DA SUGESTÃO */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Detalhes da Sugestão</h3>
                <p className={styles.sectionDescription}>
                  Compartilhe suas ideias para melhorar nossa escola. Lembre-se que estamos
                  aqui para te escutar e fazer as medidas cabíveis.
                </p>

                {/* Sugestão */}
                <div className={styles.questionBox}>
                  <label className={styles.obrigatorio}>Qual a sua sugestão?</label>
                  <textarea placeholder="Algumas ideias" required />
                </div>
              </div>

              {/* SEÇÃO 4 — ANEXOS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Anexos</h3>

                <div className={`${styles.questionBox} ${styles.fileUploadBox}`}>
                  <label className={styles.opicional}>
                    Nos ajuda anexando vídeos, áudios, qualquer arquivo que possa ajudar
                    no caso
                  </label>
                  <div
                    className={styles.uploadArea}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="fas fa-cloud-upload-alt" />
                    <p>Clique para enviar arquivos</p>
                    <p className={styles.smallText}>Formatos aceitos: JPG, PNG, PDF, DOC (máx. 10MB)</p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className={styles.fileList}>
                    {files.map((f, i) => (
                      <div key={i} className={styles.fileItem}>
                        {f.name}
                        <span
                          className={styles.removeFile}
                          onClick={() => removeFile(i)}
                        >
                          &times;
                        </span>
                      </div>
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
                    <span className={styles.btnText}>ENVIAR SUGESTÃO</span>
                  )}
                </button>
              </div>
            </form>

            {/* ── Modal Pop-up de Sucesso ── */}
            <div
              className={`${styles.successOverlay} ${submitted ? styles.active : ''}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) handleNovaSugestao();
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

                <h2 className={styles.modalSuccessTitle}>Sugestão Registrada!</h2>
                <p className={styles.modalSuccessMessage}>
                  Sua sugestão foi enviada e será analisada pela nossa equipe.
                  Obrigado por contribuir para um ambiente melhor.
                </p>

                <div className={styles.modalProtocol}>{protocol}</div>
                <p className={styles.modalSuccessMessage}>
                  Anote o número de protocolo para acompanhar o andamento.
                </p>

                <div className={styles.modalActions}>
                  <button className={styles.modalNewBtn} onClick={handleNovaSugestao}>
                    Nova Sugestão
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
