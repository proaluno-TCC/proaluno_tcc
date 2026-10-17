import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeMenu = 'perfil', onLogout }) => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');

  const nome = usuarioLogado?.name || 'Usuário';
  const identificador = usuarioLogado?.identifier || '—';

  const iniciais = nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('');

  const menuItems = [
    { id: 'perfil', label: 'Perfil', iconClass: 'fa-solid fa-circle-user', href: '/aluno_perfil' },
    { id: 'manifestacoes', label: 'Manifestações', iconClass: 'fa-solid fa-address-book', href: '/aluno_perfil/manifestacoes' },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Espaçamento superior */}
      <div className={styles.gap}></div>

      {/* Informações do Usuário */}
      <div className={styles.userInfo}>
        <div className={styles.userAvatar}>
          {iniciais || (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          )}
        </div>
        <div className={styles.userDetails}>
          <span className={styles.userName}>{nome}</span>
          <span className={styles.userRM}>{identificador !== '—' ? `RM ${identificador}` : '—'}</span>
        </div>
      </div>

      {/* Menu de Navegação */}
      <nav className={styles.navMenu}>
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`${styles.navItem} ${activeMenu === item.id ? styles.navItemActive : ''}`}
          >
            <span className={styles.navIcon}>
              {item.iconClass.startsWith('fa') ? (
                <i className={item.iconClass}></i>
              ) : (
                item.iconClass
              )}
            </span>
            <span className={styles.navLabel}>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Botão de Logout */}
      <div className={styles.logoutSection}>
        <button className={styles.logoutButton} onClick={onLogout}>
          <i className="fa-solid fa-right-to-bracket"></i>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
