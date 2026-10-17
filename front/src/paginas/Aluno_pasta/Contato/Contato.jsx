import React, { useState } from 'react';
import styles from './C_CSS.module.css';
import './C_JS'

import Header from '../../Complementos/Aluno/Header/Header';
import Footer from '../../Complementos/Aluno/Footer/Footer';

export default function Contato() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors]     = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim())                                newErrors.name    = true;
    if (!formData.email.trim() ||
        !/\S+@\S+\.\S+/.test(formData.email))                newErrors.email   = true;
    if (!formData.message.trim())                             newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setModalOpen(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="body">
      <div className="page-wrapper">
        <Header />
        <main>

          {/* ── Feedback Section ── */}
          <section className={styles.feedbackSection}>
            <div className={styles.feedbackContainer}>

              <div className={styles.feedbackIntro}>
                <h1 className={styles.feedbackTitle}>Deixe seu Feedback</h1>
                <p className={styles.feedbackDescription}>
                  Sua opinião é essencial para melhorarmos continuamente este site da ouvidoria.
                  Conte se conseguiu navegar sem dificuldades, se encontrou o que precisava e como
                  podemos deixar tudo ainda mais claro e fácil para você.
                </p>
              </div>

              <div className={styles.feedbackContentGrid}>

                {/* ── Formulário ── */}
                <div className={styles.formWrapper}>
                  <div className={styles.formCard}>
                    <form onSubmit={handleSubmit}>

                      <div className={styles.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Insira seu nome"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={errors.name ? styles.inputError : ''}
                        />
                        {errors.name && (
                          <div className={styles.errorMessage}>Por favor, insira seu nome</div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Digite seu e-mail"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? styles.inputError : ''}
                        />
                        {errors.email && (
                          <div className={styles.errorMessage}>Por favor, insira um e-mail válido</div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="phone">Telefone Celular</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Digite o número do seu Telefone Celular"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="message">Mensagem</label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          placeholder="Explique sua mensagem com clareza."
                          value={formData.message}
                          onChange={handleInputChange}
                          className={errors.message ? styles.inputError : ''}
                        />
                        {errors.message && (
                          <div className={styles.errorMessage}>Por favor, insira sua mensagem</div>
                        )}
                      </div>

                      <button type="submit" className={styles.submitBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                        Enviar Feedback
                      </button>

                    </form>
                  </div>
                </div>

                {/* ── Contato ── */}
                <div className={styles.contactWrapper}>
                  <div className={styles.contactCard}>
                    <div className={styles.contactSocialIcons}>
                              <div >
                                <a 
                                  href="https://instagram.com/ouvidoriaproaluno" 
                                  className={styles.socialIcon} 
                                  aria-label="Instagram"
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  <i className="fab fa-instagram"></i>
                                </a>
                              </div>
                             
                              <div >
                                <a href="#"className={styles.socialIcon} aria-label="WhatsApp">
                                  <i className="fab fa-whatsapp"></i>
                                </a>
                              </div>
                            </div>
                            <div className={styles.contactDetails}>
                      <p><strong>Email:</strong> proaluno@fieb.edu.br</p>
                      <p><strong>Número:</strong> (11) 99999-9999</p>
                    </div>
                    
                    </div>

                </div>

              </div>
            </div>
          </section>

          {/* ── Modal de Sucesso ── */}
          {modalOpen && (
            <div className={`${styles.successModal} ${styles.successModalActive}`}>
              <div className={styles.modalContent}>
                <div className={styles.successIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h2 className={styles.modalTitle}>Feedback Enviado!</h2>
                <p className={styles.modalMessage}>
                  Obrigado por compartilhar sua opinião conosco. Seu feedback foi recebido com sucesso
                  e será fundamental para melhorarmos nossos serviços.
                </p>
                <button className={styles.modalCloseBtn} onClick={closeModal}>Fechar</button>
              </div>
            </div>
          )}

        </main>
        <Footer />
      </div>
    </div>
  );
}
