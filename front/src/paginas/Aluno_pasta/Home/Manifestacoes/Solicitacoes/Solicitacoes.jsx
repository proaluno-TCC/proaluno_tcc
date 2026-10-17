import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SO_CSS.module.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Solicitacoes/Header/SO_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Solicitacoes/Footer/SO_Footer';

// ── Dados estáticos ────────────────────────────────────────────
const CATEGORIES = [
  { value: 'INFORMATIVOS',    label: 'Informativos'    },
  { value: 'SERVICOS',        label: 'Serviços'        },
  { value: 'INFRAESTRUTURA',  label: 'Infraestrutura'  },
  { value: 'ACADEMICO',       label: 'Acadêmico'       },
  { value: 'ADMINISTRATIVO',  label: 'Administrativo'  },
  { value: 'OUTROS',         label: 'Outros'          },
];

// 🔥 Adicionado: A lista de urgências que estava faltando e quebrando o componente
const URGENCIAS = [
  { value: 'BAIXA', label: 'Baixa' },
  { value: 'MEDIA', label: 'Média' },
  { value: 'ALTA',  label: 'Alta'  },
];

export default function Solicitacoes() {
  const navigate     = useNavigate();
  const fileInputRef = useRef(null);
  const formRef      = useRef(null);

  // Estados dos formulários
  const [selectedCats, setSelectedCats] = useState([]);
  const [files, setFiles]               = useState([]);
  const [submitted, setSubmitted]       = useState(false);
  const [protocol, setProtocol]         = useState('');
  const [loading, setLoading]           = useState(false);

  // ── Categorias ────────────────────────────────────────────────
  function toggleCategory(cat) {
    setSelectedCats(prev =>
      prev.find(c => c.value === cat.value)
        ? prev.filter(c => c.value !== cat.value)
        : [...prev, cat]
    );
  }

  function removeCategory(value) {
    setSelectedCats(prev => prev.filter(c => c.value !== value));
  }

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

    // Aqui você pegará os dados para enviar para o seu backend Java futuramente
    const formData = new FormData(formRef.current);
    const dataToSend = Object.fromEntries(formData.entries());
    console.log("Dados coletados para o Java:", dataToSend);

    setTimeout(() => {
      const proto = `SOL-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovaSolicitacao() {
    setSubmitted(false);
    setProtocol('');
    setFiles([]);
    setSelectedCats([]);

    formRef.current?.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className={styles.body}>
      <main>
        <Header />

        <section className={styles.solicitacaoSection}>
          <div className={styles.container}>

            {/* ── CABEÇALHO ──────────────────────────────────────── */}
            <header className={styles.solicitacaoHeader}>
              <h1>SOLICITAÇÃO</h1>
              <p>Peça um atendimento ou prestação de serviço personalizado e particular</p>
              <br />
              <h2>Dados da solicitação</h2>
              <p>Preencha os campos referentes à sua solicitação</p>
            </header>

            {/* ════════════════════════════════════════════════════
                FORMULÁRIO
            ════════════════════════════════════════════════════ */}
            <form ref={formRef} className={styles.solicitationForm} onSubmit={handleSubmit}>

              {/* SEÇÃO 1 — DADOS BÁSICOS */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Dados Básicos</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="titulo" className={styles.obrigatorio}>Título</label>
                  <input type="text" id="titulo" name="titulo" placeholder="Digite um título para sua solicitação" required />
                </div>
              </div>

              {/* SEÇÃO 2 — CATEGORIA E URGÊNCIA */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Categoria e Urgência</h3>

                {/* Categoria */}
                <div className={styles.formGroup}>
                  <label htmlFor="categoria" className={styles.obrigatorio}>Categoria da solicitação</label>
                  <div className={styles.selectWrapper}>
                    <select id="categoria" name="categoria" required defaultValue="">
                      <option value="" disabled>Selecione uma opção</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                    <div className={styles.selectArrow}>
                      <i className="fas fa-chevron-down" />
                    </div>
                  </div>
                </div>

                {/* Nível de Urgência */}
                <div className={styles.formGroup}>
                  <label className={styles.obrigatorio}>Nível de Urgência</label>
                  <div className={styles.radioGroup}>
                    {URGENCIAS.map(({ value, label }) => (
                      <label key={value} className={styles.radioOption}>
                        <input type="radio" name="urgencia" value={value} required />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* SEÇÃO 3 — DETALHES DA SOLICITAÇÃO */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Detalhes da Solicitação</h3>
                <p className={styles.sectionDescription}>
                  Descreva detalhadamente sua solicitação. Quanto mais informações
                  você fornecer, melhor poderemos atendê-lo.
                </p>

                {/* Descrição */}
                <div className={styles.questionBox}>
                  <label htmlFor="descricao" className={styles.obrigatorio}>Descreva sua solicitação</label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva detalhadamente o que você precisa"
                    required
                  />
                </div>

                {/* Motivo */}
                <div className={styles.questionBox}>
                  <label htmlFor="motivo" className={styles.obrigatorio}>Qual o motivo desta solicitação?</label>
                  <textarea
                    id="motivo"
                    name="motivo"
                    placeholder="Explique por que esta solicitação é necessária"
                    required
                  />
                </div>

                {/* Observações */}
                <div className={styles.questionBox}>
                  <label htmlFor="observacoes" className={styles.opicional}>Observações adicionais</label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    placeholder="Alguma informação adicional que considere importante"
                  />
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
                    <span className={styles.btnText}>ENVIAR SOLICITAÇÃO</span>
                  )}
                </button>
              </div>
            </form>

            {/* ── Modal Pop-up de Sucesso ── */}
            <div
              className={`${styles.successOverlay} ${submitted ? styles.active : ''}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) handleNovaSolicitacao();
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

                <h2 className={styles.modalSuccessTitle}>Solicitação Registrada!</h2>
                <p className={styles.modalSuccessMessage}>
                  Sua solicitação foi enviada e será analisada pela nossa equipe.
                  Obrigado por contribuir para um ambiente melhor.
                </p>

                <div className={styles.modalProtocol}>{protocol}</div>
                <p className={styles.modalSuccessMessage}>
                  Anote o número de protocolo para acompanhar o andamento.
                </p>

                <div className={styles.modalActions}>
                  <button className={styles.modalNewBtn} onClick={handleNovaSolicitacao}>
                    Nova Solicitação
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