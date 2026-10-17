import React, { useState, useRef, useEffect } from 'react';
import styles from './AP_CSS.module.css';
import Sidebar from './Sidebar/Sidebar';
import Header from '../../Complementos/Aluno/Header/Header';
import Footer from '../../Complementos/Aluno/Footer/Footer';
import { atualizarUsuario } from '../../../services/api';
import { useSincronizarUsuario } from '../../../hooks/useSincronizarUsuario';

const AlunoPerfil = () => {
  useSincronizarUsuario();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');

  const [profileData, setProfileData] = useState({
    id: usuarioLogado?.id ?? null,
    displayName: usuarioLogado?.name ?? '',
    email: usuarioLogado?.email ?? '',
    role: usuarioLogado?.role ?? 'Aluno',
    identifier: usuarioLogado?.identifier ?? '',
    status: usuarioLogado?.status ?? 'Ativo',
  });

  const [profilePicture, setProfilePicture] = useState('NN');
  const [profileBanner, setProfileBanner] = useState(null);

  useEffect(() => {
    const atualizar = () => {
      const u = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
      if (u) {
        setProfileData(prev => ({
          ...prev,
          displayName: u.name,
          email: u.email,
          role: u.role,
          identifier: u.identifier,
          status: u.status,
        }));
      }
    };
    window.addEventListener('usuarioAtualizado', atualizar);
    return () => window.removeEventListener('usuarioAtualizado', atualizar);
  }, []);

  const [editingPassword, setEditingPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!usuarioLogado) {
      showToast('Usuário não encontrado. Faça login novamente.', 'error');
    }
  }, []);

  const startEditingPassword = () => {
    setPasswordValue('');
    setEditingPassword(true);
  };

  const cancelEditingPassword = () => {
    setEditingPassword(false);
    setPasswordValue('');
  };

  const savePassword = async () => {
    if (passwordValue.trim().length < 6) {
      showToast('A senha precisa ter no mínimo 6 caracteres.', 'error');
      return;
    }

    if (!profileData.id) {
      showToast('Não foi possível identificar seu usuário. Faça login novamente.', 'error');
      return;
    }

    setSalvando(true);
    try {
      const payload = {
        name: profileData.displayName,
        email: profileData.email,
        role: profileData.role,
        identifier: profileData.identifier,
        status: profileData.status,
        password: passwordValue.trim(),
      };

      await atualizarUsuario(profileData.id, payload);

      setEditingPassword(false);
      setPasswordValue('');
      showToast('Senha atualizada com sucesso!');
    } catch (err) {
      showToast('Erro ao salvar: ' + err.message, 'error');
    } finally {
      setSalvando(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePicture(URL.createObjectURL(file));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileBanner(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/';
  };

  // Botão "Sair da conta" do perfil: pede confirmação e reaproveita o handleLogout
  const handleLogoutClick = () => {
    if (saindo) return;
    if (!window.confirm('Tem certeza que deseja sair da sua conta?')) return;
    setSaindo(true);
    handleLogout();
  };

  return (
    <div className={styles.appLayout}>
      {toast && (
        <div
          style={{
            position: 'fixed', top: 16, right: 16, zIndex: 999,
            padding: '12px 20px', borderRadius: 8,
            background: toast.type === 'error' ? '#fef2f2' : '#f0fdf4',
            color: toast.type === 'error' ? '#b91c1c' : '#15803d',
            border: `1px solid ${toast.type === 'error' ? '#fecaca' : '#bbf7d0'}`,
            fontWeight: 600, fontSize: '0.9rem',
          }}
        >
          {toast.message}
        </div>
      )}

      <Header />

      <div className={styles.pageWrapper}>
        <Sidebar activeMenu="perfil" onLogout={handleLogout} />
        <div className={styles.mainContent}>
          <section className={styles.profilePage}>
            <div className={styles.backgroundDecorations}>
              <div className={styles.decoItem} style={{ left: '5%', top: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)' }} />
              <div className={styles.decoItem} style={{ left: '-5%', top: '30%', width: '250px', height: '250px', background: 'radial-gradient(circle, var(--purple-secondary) 0%, transparent 70%)' }} />
              <div className={styles.decoItem} style={{ right: '-10%', top: '25%', width: '350px', height: '350px', background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)' }} />
              <div className={styles.decoItem} style={{ right: '10%', top: '10%', width: '200px', height: '200px', background: 'radial-gradient(circle, var(--purple-secondary) 0%, transparent 70%)' }} />
            </div>

            <div className={styles.pageContent}>
              <main className={styles.profileCard}>
                <div className={styles.profileHeader}>
                  <div
                    className={styles.profileBanner}
                    style={profileBanner ? { backgroundImage: `url(${profileBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  />
                  <div className={styles.profilePictureWrapper}>
                    <div className={styles.profilePicture}>
                      {typeof profilePicture === 'string' && profilePicture.startsWith('blob:') ? (
                        <img src={profilePicture} alt="Profile"
                          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : profilePicture}
                    </div>
                  </div>
                  <div className={styles.profileActions}>
                    <button className={styles.profileAction} onClick={() => fileInputRef.current.click()}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Trocar Foto
                    </button>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }}
                      accept="image/*" onChange={handlePhotoChange} />

                    <input type="file" ref={bannerInputRef} style={{ display: 'none' }}
                      accept="image/*" onChange={handleBannerChange} />
                  </div>
                </div>

                <div className={styles.profileBody}>
                  <form className={styles.userForm} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formGroup}>
                      <label>Nome</label>
                      <div className={styles.formValueBox}>{profileData.displayName || '—'}</div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Identificador (RM)</label>
                      <div className={styles.formValueBox}>{profileData.identifier || '—'}</div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>E-mail</label>
                      <div className={styles.formValueBox}>{profileData.email || '—'}</div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Senha</label>
                      {editingPassword ? (
                        <div className={styles.editMode}>
                          <input
                            type="password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            className={styles.editInput}
                            placeholder="Nova senha (mín. 6 caracteres)"
                            autoFocus
                          />
                          <div className={styles.editActions}>
                            <button onClick={savePassword} className={styles.saveBtn} disabled={salvando}>
                              {salvando ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button onClick={cancelEditingPassword} className={styles.cancelBtn}>Cancelar</button>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.formValueBoxWithAction}>
                          <span>••••••••••••••</span>
                          <button
                            type="button"
                            onClick={startEditingPassword}
                            className={styles.changeLink}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            Alterar senha
                          </button>
                        </div>
                      )}
                    </div>
                  </form>

                  <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogoutClick}
                    disabled={saindo}
                    style={saindo ? { opacity: 0.7, cursor: 'not-allowed' } : undefined}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                      <path d="M16 17l5-5-5-5" />
                      <path d="M21 12H9" />
                    </svg>
                    {saindo ? 'Saindo...' : 'Sair da conta'}
                  </button>
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

export default AlunoPerfil;
