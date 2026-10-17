import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './L_CSS.module.css';

import logo from '../../../imagens/logo_pa_branca2.png';
import aluno from '../../../imagens/aluno.png';
import colab from '../../../imagens/colab.png';

export default function Login() {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS(styles.particlesJs || 'particles-js', {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
          opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
          size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
          line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.2, width: 1 },
          move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
      });
    }
  }, []);

  const handleHelpClick = () => {
    alert('Precisa de ajuda? Entre em contato com o suporte técnico.');
  };

  return (
    <>
      <main className={styles.loginSection}>
        <div className={styles.mainContainer}>
          <section className={styles.infoPanel} aria-labelledby="brand-heading">
            <h1 id="brand-heading" className={styles.srOnly}>
              Proaluno - Educação que ouve, educação que avança
            </h1>
            <div className={styles.logoContainer}>
              <img 
                src={logo}
                alt="Logo Proaluno" 
                className={styles.logoImgMain} 
              />
            </div>
            <div className={styles.sloganContainer}>
              <div className={styles.sloganText}>
                <div className={styles.sloganMain}>Educação que ouve, educação que avança</div>
              </div>
            </div>
          </section>
          
          <section className={styles.loginPanel} aria-labelledby="login-heading">
            <div className={styles.loginContent}>
              <h2 id="login-heading" className={styles.loginTitle}>Faça seu login aqui</h2>
              <p className={styles.loginSubtitle}>Deseja entrar como:</p>
              <div className={styles.loginOptions}>
                
                <Link to="/aluno_login" className={styles.optionCard} aria-label="Entrar como Aluno">
                  <img 
                    src={aluno}
                    alt="Ícone de aluno" 
                    className={`${styles.optionIcon} ${styles.studentIcon}`} 
                  />
                  <span className={styles.optionLabel}>Aluno</span>
                  <span className={styles.optionDescription}>Acesse a página inicial do aluno</span>
                </Link>

                <Link to="/colab_login" className={styles.optionCard} aria-label="Entrar como Colaborador">
                  <img 
                    src={colab}
                    alt="Ícone de colaborador" 
                    className={styles.optionIcon} 
                  />
                  <span className={styles.optionLabel}>Colaborador</span>
                  <span className={styles.optionDescription}>Acesse a página do colaborador</span>
                </Link>
                
              </div>
            </div>
          </section>
        </div>
        
        {/* Elementos decorativos flutuantes */}
        <div className={styles.floatingElements} aria-hidden="true">
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
        </div>
        
        {/* Sistema de partículas */}
        <div id="particles-js" className={styles.particlesJs} aria-hidden="true"></div>

        {/* Botão de Ajuda */}
        {/* <button 
          className={`${styles.helpButton} ${styles.pulseGlow}`} 
          onClick={handleHelpClick}
          aria-label="Ajuda e Suporte"
          title="Precisa de Ajuda?"
        >
          ?
        </button> */}
        
      </main>   
    </>
  );
}