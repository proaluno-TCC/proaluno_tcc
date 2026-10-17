import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './R_CSS.module.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Reclamacoes/Header/R_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Reclamacoes/Footer/R_Footer';

export default function Reclamacoes() {
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
      const proto = `REC-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovaReclamacao() {
    setSubmitted(false);
    setProtocol('');
    setFiles([]);
    
    // 🔥 Reseta o formulário e rola pro topo
    formRef.current?.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Render ────────────────────────────────────────────────────
   // ── Render ────────────────────────────────────────────────────
  return (
    <div className={styles.body}>
      <main>
        <Header />

        <section className={styles.reclamacaoSection}>
          <div className={styles.container}>

            {/* ── CABEÇALHO ──────────────────────────────────────── */}
            <header className={styles.reclamacaoHeader}>
              <h1>RECLAMAÇÃO</h1>
              <p>Conte sua insatisfação com seu ambiente escolar ou funcionário</p>
              <br />
              <h2>Dados da reclamação</h2>
              <p>Preencha os campos referentes à sua reclamação</p>
            </header>

            {/* ════════════════════════════════════════════════════
                FORMULÁRIO
            ════════════════════════════════════════════════════ */}
            <form ref={formRef} className={styles.complaintForm} onSubmit={handleSubmit}>

              {/* SEÇÃO 1 — DADOS BÁSICOS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Dados Básicos</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="titulo" className={styles.obrigatorio}>Título</label>
                  <input type="text" id="titulo" placeholder="Digite um título para sua reclamação" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="categoria" className={styles.obrigatorio}>Categoria da reclamação</label>
                  <div className={styles.selectWrapper}>
                    <select id="categoria" required defaultValue="">
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="infraestrutura">Problemas com Infraestrutura</option>
                      <option value="pedagogico">Questões Pedagógicas</option>
                      <option value="funcionarios">Problemas com Funcionários</option>
                      <option value="seguranca">Questões de Segurança</option>
                      <option value="outros">Outros</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <i className="fas fa-chevron-down" />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="local" className={styles.opicional}>Local</label>
                  <input type="text" id="local" placeholder="Onde aconteceu?" />
                </div>
              </div>

              {/* SEÇÃO 2 — DESCRIÇÃO */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Descrição do Fato</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="descricao" className={styles.obrigatorio}>Descrição</label>
                  <textarea
                    id="descricao"
                    placeholder="Descreva o fato, relate os detalhes sobre sua reclamação."
                    required
                  />
                </div>
              </div>

              {/* SEÇÃO 3 — DETALHES ADICIONAIS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Detalhes Adicionais</h3>
                <p className={styles.sectionDescription}>
                  Nos conte mais a fundo o motivo da sua reclamação. Lembre-se que estamos
                  aqui para te escutar e tomar as medidas cabíveis.
                </p>

                <div className={styles.questionBox}>
                  <label htmlFor="envolvidos" className={styles.opicional}>Quem são os envolvidos?</label>
                  <input type="text" id="envolvidos" placeholder="Descreva os envolvidos" />
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
                    <span className={styles.btnText}>ENVIAR RECLAMAÇÃO</span>
                  )}
                </button>
              </div>
            </form>

            {/* ── Modal Pop-up de Sucesso ── */}
            <div
              className={`${styles.successOverlay} ${submitted ? styles.active : ''}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) handleNovaReclamacao();
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

                <h2 className={styles.modalSuccessTitle}>Reclamação Registrada!</h2>
                <p className={styles.modalSuccessMessage}>
                  Sua reclamação foi enviada e será analisada pela nossa equipe.
                  Obrigado por contribuir para um ambiente melhor.
                </p>

                <div className={styles.modalProtocol}>{protocol}</div>
                <p className={styles.modalSuccessMessage}>
                  Anote o número de protocolo para acompanhar o andamento.
                </p>

                <div className={styles.modalActions}>
                  <button className={styles.modalNewBtn} onClick={handleNovaReclamacao}>
                    Nova Reclamação
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
