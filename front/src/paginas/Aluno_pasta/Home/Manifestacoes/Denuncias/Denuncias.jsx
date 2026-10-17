import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './D_CSS.module.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Denuncias/Header/D_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Denuncias/Footer/D_Footer';

const ENVOLVIDOS_COL1 = [
  'Diretores', 
  'Pais ou responsáveis',
  'Desconhecido',
  'Funcionarios administrativas', 
  'Visitantes',
];

const ENVOLVIDOS_COL2 = [
  'Monitores',
  'Vigilantes de serviço',
  'Coordenadores pedagógicos',
  'Outros',
];

export default function Denuncias() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const formRef = useRef(null); // 🔥 Faltou essa!


  const [selectedEnvolvidos, setSelectedEnvolvidos] = useState([]);
  const [files, setFiles]                           = useState([]);
  const [submitted, setSubmitted]                   = useState(false);
  const [protocol, setProtocol]                     = useState('');
  const [loading, setLoading]                       = useState(false);

  // Fechar modal com ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape' && submitted) {
        handleNovaDenuncia();
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [submitted]);

  // ── Envolvidos ──────────────────────────────────────────────────────────────
  function toggleEnvolvido(nome) {
    setSelectedEnvolvidos(prev =>
      prev.includes(nome) ? prev.filter(e => e !== nome) : [...prev, nome]
    );
  }

  function removeEnvolvido(nome) {
    setSelectedEnvolvidos(prev => prev.filter(e => e !== nome));
  }

  // ── Arquivos ─────────────────────────────────────────────────────────────────
  function handleFileChange(e) {
    const novos = Array.from(e.target.files);
    setFiles(prev => [...prev, ...novos]);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  // ── Submit ────────────────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const proto = `DEN-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

function handleNovaDenuncia() {
  setSubmitted(false);
  setProtocol('');
  setSelectedEnvolvidos([]);
  setFiles([]);
  
  
  // 🔥 Reseta os campos do formulário
  formRef.current?.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });

}

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className={styles.body}>
      <main>
        <Header />

        <section className={styles.denunciaSection}>
          <div className={styles.container}>

            {/* ── CABEÇALHO ─────────────────────────────────────────────────── */}
            <header className={styles.denunciaHeader}>
              <h1>DENÚNCIA</h1>
              <p>Comunique um ato ilícito praticado por agentes públicos</p>
              <br />
              <h2>Dados de manifestação</h2>
              <p>Preencha os campos referentes à sua manifestação.</p>
            </header>

            {/* ════════════════════════════════════════════════════════════════
                FORMULÁRIO
            ════════════════════════════════════════════════════════════════ */}
            <form ref={formRef} className={styles.complaintForm} onSubmit={handleSubmit}>

              {/* SEÇÃO 1 — DADOS BÁSICOS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Dados Básicos</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="titulo" className={styles.obrigatorio}>Título</label>
                  <input type="text" id="titulo" required placeholder="Digite um título para sua denúncia" />
                </div>
              </div>

              {/* SEÇÃO 2 — DETALHES DA DENÚNCIA */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Detalhes da Denúncia</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="assunto" className={styles.obrigatorio}>Assunto</label>
                  <div className={styles.selectWrapper}>
                    <select id="assunto" required defaultValue="">
                      <option value="" disabled>Nos diga sobre o que a denúncia é</option>
                      <option value="assunto1">Problemas com Infraestrutura</option>
                      <option value="assunto2">Questões Pedagógicas</option>
                      <option value="assunto3">Problemas com Funcionários</option>
                      <option value="assunto4">Questões de Segurança</option>
                      <option value="assunto5">Outros</option>
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

                <div className={styles.formGroup}>
                  <label htmlFor="descricao" className={styles.obrigatorio}>Descrição</label>
                  <textarea
                    id="descricao"
                    placeholder="Descreva o fato, relate os detalhes sobre sua manifestação."
                    required
                  />
                </div>
              </div>

              {/* SEÇÃO 3 — DETALHES ADICIONAIS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Detalhes Adicionais</h3>
                <p className={styles.sectionDescription}>
                  Nos conte mais a fundo o motivo da sua denúncia. Lembre-se que estamos
                  aqui para te escutar e fazer as medidas cabíveis.
                </p>

                {/* Envolvidos */}
                <div className={styles.questionBox} style={{ position: 'relative' }}>
                  <label className={styles.obrigatorio}>Quem são os envolvidos?</label>

                  {/* Input invisível para segurar o required */}
                  <input
                    type="text"
                    required
                    value={selectedEnvolvidos.length > 0 ? 'ok' : ''}
                    onChange={() => {}}
                    style={{
                      opacity: 0,
                      width: 1,
                      height: 1,
                      position: 'absolute',
                      bottom: 0,
                      left: 20,
                      pointerEvents: 'none'
                    }}
                  />

                  <div className={styles.involvedOptions}>
                    {[ENVOLVIDOS_COL1, ENVOLVIDOS_COL2].map((col, ci) => (
                      <div key={ci} className={styles.optionCategory}>
                        <div className={styles.optionButtons}>
                          {col.map(nome => (
                            <button
                              key={nome}
                              type="button"
                              onClick={() => toggleEnvolvido(nome)}
                              className={`${styles.involvedOption} ${
                                selectedEnvolvidos.includes(nome) ? styles.selected : ''
                              }`}
                            >
                              {nome}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.selectedOptions}>
                    <label>Envolvidos selecionados:</label>
                    <div className={styles.selectedTags}>
                      {selectedEnvolvidos.map(nome => (
                        <span key={nome} className={styles.selectedTag}>
                          {nome}
                          <span
                            className={styles.removeTag}
                            onClick={() => removeEnvolvido(nome)}
                          >
                            &times;
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="data" className={styles.opicional}>Quando aconteceu?</label>
                  <input type="date" id="data" />
                </div>
              </div>

              {/* SEÇÃO 4 — AÇÕES TOMADAS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Ações Tomadas</h3>

                <div className={styles.questionBox}>
                  <label className={styles.obrigatorio}>
                    Você entrou em contato com algum auxiliar da sua unidade escolar?
                  </label>
                  <div className={styles.radioGroup}>
                    {['sim', 'nao'].map(v => (
                      <label key={`auxiliar-${v}`} className={styles.radioOption}>
                        <input 
                          type="radio" 
                          name="contatoAuxiliar"
                          value={v} 
                          required 
                        />
                        <span className={styles.radioCustom} />
                        {v === 'sim' ? 'Sim' : 'Não'}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.questionBox}>
                  <label className={styles.obrigatorio}>
                    Deseja relatar o caso às autoridades?
                  </label>
                  <div className={styles.radioGroup}>
                    {['sim', 'nao'].map(v => (
                      <label key={`autoridades-${v}`} className={styles.radioOption}>
                        <input 
                          type="radio" 
                          name="relatarAutoridades"
                          value={v} 
                          required 
                        />
                        <span className={styles.radioCustom} />
                        {v === 'sim' ? 'Sim' : 'Não'}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* SEÇÃO 5 — ANEXOS */}
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
                    <span className={styles.btnText}>ENVIAR DENÚNCIA</span>
                  )}
                </button>
              </div>
            </form>

            {/* ── Modal Pop-up de Sucesso ── */}
            <div
              className={`${styles.successOverlay} ${submitted ? styles.active : ''}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) handleNovaDenuncia();
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

                <h2 className={styles.modalSuccessTitle}>Denúncia Registrada!</h2>
                <p className={styles.modalSuccessMessage}>
                  Sua denúncia foi enviada e será analisada pela nossa equipe.
                  Obrigado por contribuir para um ambiente melhor.
                </p>

                <div className={styles.modalProtocol}>{protocol}</div>
                <p className={styles.modalSuccessMessage}>
                  Anote o número de protocolo para acompanhar o andamento.
                </p>

                <div className={styles.modalActions}>
                  <button className={styles.modalNewBtn} onClick={handleNovaDenuncia}>
                    Nova Denúncia
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
