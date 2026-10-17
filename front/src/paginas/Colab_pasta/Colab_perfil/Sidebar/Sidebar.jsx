import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeMenu = 'perfil', onLogout }) => {
  const menuItems = [
    { id: 'perfil', label: 'Perfil', iconClass: 'fa-solid fa-circle-user', href: '/colab_perfil' },
    // { id: 'manifestacoes', label: 'Manifestações', iconClass: 'fa-solid fa-address-book', href: '/manifestacoes' },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Espaçamento superior */}
      <div className={styles.gap}></div>
   
      {/* Informações do Usuário */}
      <div className={styles.userInfo}>
        <div className={styles.userAvatar}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className={styles.userDetails}>
          <span className={styles.userName}>Manoel Jailton</span>
          <span className={styles.userRM}>RM 99999999</span>
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
              {/* Se o item usar classe do FontAwesome, renderiza a tag <i>, senão renderiza o texto/emoji */}
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
          <i class="fa-solid fa-right-to-bracket"></i>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;