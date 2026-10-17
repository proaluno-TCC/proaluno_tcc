import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './L_CSS.css';

import logo from '../../../imagens/logo_pa_branca2.png';
import aluno from '../../../imagens/aluno.png';
import colab from '../../../imagens/colab.png';

export default function Login() {
  useEffect(() => {
    // Carrega o script do particles.js dinamicamente se necessário, ou inicializa caso já esteja global
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
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
      <main className="login-section">
        <div className="main-container">
          <section className="info-panel" aria-labelledby="brand-heading">
            <h1 id="brand-heading" className="sr-only">
              Proaluno - Educação que ouve, educação que avança
            </h1>
            <div className="logo-container">
              <img 
                src={logo}
                alt="Logo Proaluno" 
                className="logo-img-main" 
              />
            </div>
            <div className="slogan-container">
              <div className="slogan-text">
                <div className="slogan-main">Educação que ouve, educação que avança</div>
              </div>
            </div>
          </section>
          
          <section className="login-panel" aria-labelledby="login-heading">
            <div className="login-content">
              <h2 id="login-heading" className="login-title">Faça seu login aqui</h2>
              <p className="login-subtitle">Deseja entrar como:</p>
              <div className="login-options">
                
                <Link to="/aluno_login" className="option-card" aria-label="Entrar como Aluno">
                  <img 
                    src={aluno}
                    alt="Ícone de aluno" 
                    className="option-icon student-icon" 
                  />
                  <span className="option-label">Aluno</span>
                  <span className="option-description">Acesse a página inicial do aluno</span>
                </Link>

                <Link to="/colab_login" className="option-card" aria-label="Entrar como Colaborador">
                  <img 
                    src={colab}
                    alt="Ícone de colaborador" 
                    className="option-icon" 
                  />
                  <span className="option-label">Colaborador</span>
                  <span className="option-description">Acesse a página do colaborador</span>
                </Link>
                
              </div>
            </div>
          </section>
        </div>
        
        {/* Elementos decorativos flutuantes */}
        <div className="floating-elements" aria-hidden="true">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        
        {/* Sistema de partículas */}
        <div id="particles-js" aria-hidden="true"></div>

        {/* Botão de Ajuda */}
        <button 
          className="help-button pulse-glow" 
          onClick={handleHelpClick}
          aria-label="Ajuda e Suporte"
          title="Precisa de Ajuda?"
        >
          ?
        </button>
        
      </main>   
    </>
  );
}