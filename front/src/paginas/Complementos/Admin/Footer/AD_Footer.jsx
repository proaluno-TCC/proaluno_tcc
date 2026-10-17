import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AD_FO.module.css';

import proaluno_logo_branca from '../../../../imagens/logo_pa_branca.png';

export default function Footer() {
  return (
    <footer className={styles.siteFooter} id="footer">
      <div className={styles.container}>
        <div className={styles.footerContainer}>

          {/* LOGO */}
          <div className={styles.footerLogo}>
            <img src={proaluno_logo_branca} alt="Proaluno Logo" />
          </div>

          {/* LINKS */}
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Institucional</h4>
              <ul>
                <li><a href="/colab_sobre">Sobre Nós</a></li>
                <li><a href="/colab_equipe">Nossa Equipe</a></li>
                {/* <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li> */}
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Manifestações</h4>
              <ul>
                <li><a href="/colab/manifestacoes/denuncias">Denúncias</a></li>
                <li><a href="/colab/manifestacoes/reclamacoes">Reclamações</a></li>
                <li><a href="/colab/manifestacoes/solicitacoes">Solicitações</a></li>
                <li><a href="/colab/manifestacoes/elogios">Elogios</a></li>
                <li><a href="/colab/manifestacoes/sugestoes">Sugestões</a></li>
              </ul>
            </div>

            {/* CONTATO */}
            <div className={styles.footerColumn}>
              <h4>Contato</h4>
              <ul>
                <li>
                  <i className={`fas fa-phone ${styles.contactIcon}`}></i>
                   (11) 9999-9999
                </li>
                <li>
                  <i className={`fas fa-envelope ${styles.contactIcon}`}></i>
                  contato@proaluno.com.br
                </li>
              </ul>

              <div className={styles.footerColumn}>
              <h4>Redes Sociais:</h4>
              </div>

              <div className={styles.socialIcons}>
                <a href="https://instagram.com/ouvidoriaproaluno" 
                                                  className={styles.socialIcon} 
                                                  aria-label="Instagram"
                                                  target="_blank" 
                                                  rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-whatsapp"></i></a>
              </div>
              {/* <br />
              <Link to="/contato" className={styles.footerContactButton}>
                Entre em Contato
              </Link> */}
            </div>

          </div>
        </div>

        {/* COPYRIGHT */}
        <div className={styles.footerBottom}>
          <p>&copy; 2026 PROALUNO - Todos os direitos reservados</p>
        </div>

      </div>
    </footer>
  );
}
