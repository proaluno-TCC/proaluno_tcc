import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PM_CSS.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../../../Complementos/Aluno/Header/Header';
import Footer from '../../../Complementos/Aluno/Footer/Footer';

const manifestacoesCards = [
  {
    id: 'denuncia',
    titulo: 'Denúncia',
    descricao: 'Registre irregularidades ou condutas que violem as normas institucionais.',
    icon: 'fa-solid fa-triangle-exclamation',
    cor: 'var(--red-primary)',
    rota: '/manifestacoes/denuncias'
  },
  {
    id: 'reclamacao',
    titulo: 'Reclamação',
    descricao: 'Problemas ou insatisfações que precisam ser resolvidos pela equipe.',
    icon: 'fa-solid fa-circle-exclamation',
    cor: 'var(--yellow-primary)',
    rota: '/manifestacoes/reclamacoes'
  },
  {
    id: 'solicitacao',
    titulo: 'Solicitação',
    descricao: 'Peça informações, serviços ou recursos para o seu dia a dia.',
    icon: 'fa-solid fa-clipboard-list',
    cor: 'var(--green-primary)',
    rota: '/manifestacoes/solicitacoes'
  },
  {
    id: 'elogio',
    titulo: 'Elogio',
    descricao: 'Reconheça pessoas ou iniciativas que fizeram a diferença.',
    icon: 'fa-solid fa-face-smile',
    cor: 'var(--blue-primary)',
    rota: '/manifestacoes/elogios'
  },
  {
    id: 'sugestao',
    titulo: 'Sugestão',
    descricao: 'Envie ideias para melhorar o ambiente e os processos.',
    icon: 'fa-solid fa-lightbulb',
    cor: 'var(--violet-primary)',
    rota: '/manifestacoes/sugestoes'
  }
];

const Perfil_M = () => {
  const navigate = useNavigate();

  const [protocol, setProtocol] = useState('');
  const [status] = useState({
    title: 'Em Análise',
    badge: 'Em Andamento',
    description: 'A equipe da Ouvidoria está analisando o conteúdo da manifestação para entender os detalhes do caso. Nessa etapa, verificamos se todas as informações foram preenchidas corretamente e avaliamos qual será o melhor encaminhamento ou solução.'
  });

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  return (
    <div className={styles.appLayout}>         {/* ✅ Module no lugar de "body" */}
      <Header />

      <div className={styles.pageWrapper}>
        <Sidebar activeMenu="manifestacoes" onLogout={handleLogout} />
        <div className={styles.mainContent}>
          <section className={styles.profilePage}>
            <div className={styles.backgroundDecorations}>
              <div className={styles.decoItem} style={{ left: '5%', top: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)' }} />
              <div className={styles.decoItem} style={{ left: '-5%', top: '30%', width: '250px', height: '250px', background: 'radial-gradient(circle, var(--purple-secondary) 0%, transparent 70%)' }} />
              <div className={styles.decoItem} style={{ right: '-10%', top: '25%', width: '350px', height: '350px', background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)' }} />
              <div className={styles.decoItem} style={{ right: '10%', top: '10%', width: '200px', height: '200px', background: 'radial-gradient(circle, var(--purple-secondary) 0%, transparent 70%)' }} />
            </div>

            <div className={styles.pageContent}>
              {/* ═══════════ SEÇÃO: CARDS DE MANIFESTAÇÃO ═══════════ */}
              <div style={{ width: '100%', marginBottom: '3rem' }}>
                <div className={styles.manifestHeader}>
                  <h1>Manifestações</h1>
                  <p>Escolha o tipo de manifestação que você deseja registrar</p>
                </div>

                <div className={styles.manifestGrid}>
                  {manifestacoesCards.map((card) => (
                    <div
                      key={card.id}
                      className={styles.manifestCard}
                      onClick={() => navigate(card.rota)}
                      style={{ '--card-color': card.cor }}
                    >
                      <div className={styles.manifestCardIcon}>
                        <i className={card.icon}></i>
                      </div>
                      <h3>{card.titulo}</h3>
                      <p>{card.descricao}</p>
                      <span className={styles.manifestCardAction}>
                        Acessar <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ═══════════ SEÇÃO: ACOMPANHAR PROTOCOLO ═══════════ */}
              <main className={styles.profileCard}>
                <div className={styles.manifestationSection}>
                  <p className={styles.manifestationSubtitle}>Acompanhe sua Manifestação</p>
                  <h2 className={styles.manifestationTitle}>Consulte o Andamento</h2>
                  <p className={styles.manifestationDescription}>
                    Informe o número de protocolo fornecido no momento do registro para verificar o status atualizado.
                  </p>

                  <div className={styles.protocolGroup}>
                    <label>Número do Protocolo</label>
                    <input
                      type="text"
                      className={styles.protocolInput}
                      placeholder="Ex: SUG-123456"
                      value={protocol}
                      onChange={(e) => setProtocol(e.target.value)}
                    />
                  </div>

                  <h3 className={styles.statusHeading}>Status Atual</h3>
                  <div className={styles.statusCard}>
                    <div className={styles.statusTitle}>
                      {status.title}
                      <span className={`${styles.statusBadge} ${styles.statusAnalysis}`}>
                        {status.badge}
                      </span>
                    </div>
                    <p className={styles.statusDescription}>{status.description}</p>
                  </div>
                </div>

                <hr className={styles.divider} />
              </main>
            </div>
          </section>
        </div>
      </div>

    </div>
  );
};

export default Perfil_M;
