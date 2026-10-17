import { useState, useMemo, useEffect } from 'react';
import {
    UserPlus,
    UserCheck,
    UserX,
    Search,
    Edit3,
    Trash2,
    Plus,
    X,
    CheckCircle2,
    AlertCircle,
    Lock,
    ShieldCheck,
    User,
    ChevronRight,
    Filter,
} from 'lucide-react';

import { useSincronizarUsuario } from '../../../hooks/useSincronizarUsuario';
import styles from './ADH_CSS.module.css';
import Header from '../../Complementos/Admin/Header/AD_Header';
import Footer from '../../Complementos/Admin/Footer/AD_Footer';
import { listarUsuarios, criarUsuario, atualizarUsuario, excluirUsuario } from '../../../services/api';

export default function HomeAdm() {
    useSincronizarUsuario();
    const [users, setUsers] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoleFilter, setSelectedRoleFilter] = useState('Todos');

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Aluno',
        identifier: '',
        status: 'Ativo'
    });

    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    async function carregarUsuarios() {
        try {
            setCarregando(true);
            const dados = await listarUsuarios();
            setUsers(dados);
        } catch (err) {
            showToast('Erro ao carregar usuários: ' + err.message, 'error');
        } finally {
            setCarregando(false);
        }
    }

    const showToast = (message, type = 'success') => {
        setToastMessage({ message, type });
        setTimeout(() => {
            setToastMessage(null);
        }, 4000);
    };

    const handleOpenAddModal = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'Aluno',
            identifier: '',
            status: 'Ativo'
        });
        setIsAddModalOpen(true);
    };

    const handleOpenEditModal = (user) => {
        setCurrentUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            identifier: user.identifier,
            status: user.status
        });
        setIsEditModalOpen(true);
    };

    const handleOpenDeleteModal = (user) => {
        setCurrentUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleSaveAddUser = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        if (formData.password.length < 6) {
            showToast('A senha deve ter no mínimo 6 caracteres.', 'error');
            return;
        }

        try {
            const novoUsuario = await criarUsuario(formData);
            setUsers([novoUsuario, ...users]);
            setIsAddModalOpen(false);
            showToast(`Usuário ${novoUsuario.name} cadastrado com sucesso!`);
        } catch (err) {
            showToast('Erro ao cadastrar usuário: ' + err.message, 'error');
        }
    };

    const handleSaveEditUser = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        if (formData.password && formData.password.length < 6) {
            showToast('A nova senha deve ter no mínimo 6 caracteres.', 'error');
            return;
        }

        const payload = { ...formData };
        if (!payload.password) {
            delete payload.password;
        }

        try {
            const atualizado = await atualizarUsuario(currentUser.id, payload);
            setUsers(users.map(u => u.id === currentUser.id ? atualizado : u));
            setIsEditModalOpen(false);
            setCurrentUser(null);
            showToast(`Cadastro de ${formData.name} atualizado com sucesso!`);
        } catch (err) {
            showToast('Erro ao atualizar usuário: ' + err.message, 'error');
        }
    };

    const handleDeleteUserConfirm = async () => {
        if (!currentUser) return;

        try {
            await excluirUsuario(currentUser.id);
            setUsers(users.filter(u => u.id !== currentUser.id));
            setIsDeleteModalOpen(false);
            showToast(`Usuário ${currentUser.name} foi removido com sucesso.`, 'info');
            setCurrentUser(null);
        } catch (err) {
            showToast('Erro ao excluir usuário: ' + err.message, 'error');
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.identifier || '').toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole = selectedRoleFilter === 'Todos' || user.role === selectedRoleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, selectedRoleFilter]);

    const scrollToManagement = () => {
        const element = document.getElementById('gestao-usuarios');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (carregando) {
        return (
            <div>
                <Header />
                <div className={styles.container}>
                    <p style={{ padding: '3rem', textAlign: 'center' }}>Carregando usuários...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />

            <div className={styles.container}>

                {toastMessage && (
                    <div
                        className={`${styles.toast} ${
                            toastMessage.type === 'error'
                                ? styles.toastError
                                : toastMessage.type === 'info'
                                    ? styles.toastInfo
                                    : styles.toastSuccess
                        }`}>
                        {toastMessage.type === 'error' ? <AlertCircle className="w-5 h-5 text-rose-600" /> :
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        <span>{toastMessage.message}</span>
                        <button onClick={() => setToastMessage(null)} className={styles.modalCloseBtn}>
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <section id="inicio" className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Bem-vindo à área do Administrador<br />da Ouvidoria Educacional
                        </h1>
                        <p className={styles.heroDescription}>
                            Gerencie o acesso de alunos, professores e colaboradores ao sistema ProAluno com facilidade, transparência e máxima segurança.
                        </p>
                        <button
                            onClick={scrollToManagement}
                            className={styles.heroBtn}
                        >
                            <span>Gerenciar Usuários</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            Funções do Administrador
                            <span className={styles.titleLine}></span>
                        </h2>
                    </div>

                    <div className={styles.cardsGrid}>
                        <div className={styles.card}>
                            <div className={styles.cardIconBox}>
                                <UserPlus className="w-10 h-10" />
                            </div>
                            <h3 className={styles.cardTitle}>Adicionar Usuário</h3>
                            <p className={styles.cardDescription}>
                                Cadastre novos alunos ou colaboradores no sistema com permissões personalizadas para acesso à ouvidoria.
                            </p>
                            <button
                                onClick={handleOpenAddModal}
                                className={styles.cardBtn}
                            >
                                Adicionar
                            </button>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardIconBox}>
                                <UserCheck className="w-10 h-10" />
                            </div>
                            <h3 className={styles.cardTitle}>Editar Usuário</h3>
                            <p className={styles.cardDescription}>
                                Atualize dados cadastrais, e-mails, permissões de usuários e altere status de acesso a qualquer momento.
                            </p>
                            <button
                                onClick={scrollToManagement}
                                className={styles.cardBtn}
                            >
                                Editar
                            </button>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardIconBox}>
                                <UserX className="w-10 h-10" />
                            </div>
                            <h3 className={styles.cardTitle}>Excluir Usuário</h3>
                            <p className={styles.cardDescription}>
                                Remova perfis inativos ou desvinculados do sistema PROALUNO mantendo o histórico e integridade do banco.
                            </p>
                            <button
                                onClick={scrollToManagement}
                                className={styles.cardBtn}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </section>

                <section id="gestao-usuarios" className={styles.section}>
                    <div className={styles.tableContainer}>
                        <div className={styles.tableHeader}>
                            <div className={styles.tableHeaderTop}>
                                <div>
                                    <h2 className={styles.tableMainTitle}>Gestão de Usuários Cadastrados</h2>
                                    <p className={styles.tableSubTitle}>Visualize, filtre e gerencie todas as contas do ecossistema PROALUNO</p>
                                </div>
                                <button
                                    onClick={handleOpenAddModal}
                                    className={styles.btnPrimary}
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Novo Usuário</span>
                                </button>
                            </div>

                            <div className={styles.filterRow}>
                                <div className={styles.searchBox}>
                                    <Search className={styles.searchIcon} />
                                    <input
                                        type="text"
                                        placeholder="Buscar por nome, e-mail ou matrícula/RM..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                </div>

                                <div className={styles.selectBox}>
                                    <Filter className={styles.filterIcon} />
                                    <select
                                        value={selectedRoleFilter}
                                        onChange={(e) => setSelectedRoleFilter(e.target.value)}
                                        className={styles.filterSelect}
                                    >
                                        <option value="Todos">Todas as Funções</option>
                                        <option value="Aluno">Alunos</option>
                                        <option value="Colaborador">Colaboradores</option>
                                        <option value="Administrador">Administradores</option>
                                    </select>
                                    <div className={styles.selectArrow}>▼</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.tableResponsive}>
                            <table className={styles.table}>
                                <thead>
                                <tr>
                                    <th className={styles.th}>Usuário / Nome</th>
                                    <th className={styles.th}>Identificação</th>
                                    <th className={styles.th}>Função / Cargo</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th} style={{ textAlign: 'right' }}>Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td className={styles.td}>
                                                <div className={styles.userCell}>
                                                    <div className={styles.tableAvatar}>
                                                        {(user.name || '?').charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className={styles.userName}>{user.name}</div>
                                                        <div className={styles.userEmail}>{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={styles.td}>
                                                <span className={styles.identifierCode}>{user.identifier}</span>
                                            </td>
                                            <td className={styles.td}>
                                                    <span className={`${styles.roleTag} ${
                                                        user.role === 'Aluno' ? styles.roleAluno :
                                                                user.role === 'Colaborador' ? styles.roleColab :
                                                                    styles.roleAdmin
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                            </td>
                                            <td className={styles.td}>
                                                    <span className={`${styles.statusIndicator} ${
                                                        user.status === 'Ativo' ? styles.statusAtivo : styles.statusInativo
                                                    }`}>
                                                        <span className={`${styles.statusDot} ${
                                                            user.status === 'Ativo' ? styles.dotAtivo : styles.dotInativo
                                                        }`}></span>
                                                        {user.status}
                                                    </span>
                                            </td>
                                            <td className={styles.td}>
                                                <div className={styles.actionsCell}>
                                                    <button
                                                        onClick={() => handleOpenEditModal(user)}
                                                        className={styles.iconBtn}
                                                        title="Editar usuário"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenDeleteModal(user)}
                                                        className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                                                        title="Excluir usuário"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className={styles.td} style={{ textAlign: 'center', padding: '3rem' }}>
                                            Nenhum usuário encontrado para os critérios informados.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.tableFooter}>
                            <span>Exibindo <strong>{filteredUsers.length}</strong> de <strong>{users.length}</strong> usuários</span>
                            <span>Sistema Atualizado PROALUNO 2026</span>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.tableContainer} style={{ padding: '2rem' }}>
                        <h3 className={styles.tableMainTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            Boas Práticas de Gestão Administrativa
                        </h3>
                        <div className={styles.guidelinesGrid}>
                            <div className={styles.guidelineCard}>
                                <div className={styles.guidelineIcon}>
                                    <Lock className="w-5 h-5" />
                                </div>
                                <h4 className={styles.guidelineTitle}>Confidencialidade</h4>
                                <p className={styles.guidelineText}>
                                    Garanta a privacidade dos dados de alunos e servidores cadastrados no sistema.
                                </p>
                            </div>

                            <div className={styles.guidelineCard}>
                                <div className={styles.guidelineIcon}>
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h4 className={styles.guidelineTitle}>Controle de Acessos</h4>
                                <p className={styles.guidelineText}>
                                    Mantenha as permissões adequadas a cada perfil (Aluno, Professor ou Colaborador).
                                </p>
                            </div>

                            <div className={styles.guidelineCard}>
                                <div className={styles.guidelineIcon}>
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <h4 className={styles.guidelineTitle}>Manutenção de Dados</h4>
                                <p className={styles.guidelineText}>
                                    Mantenha e-mails corporativos e matrículas sempre atualizados na base.
                                </p>
                            </div>

                            <div className={styles.guidelineCard}>
                                <div className={styles.guidelineIcon}>
                                    <User className="w-5 h-5" />
                                </div>
                                <h4 className={styles.guidelineTitle}>Inativação Consciente</h4>
                                <p className={styles.guidelineText}>
                                    Desative cadastros de usuários desligados mantendo o histórico de ouvidoria intacto.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {isAddModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <div className={styles.modalHeaderTitle}>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Cadastrar Novo Usuário</span>
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className={styles.modalCloseBtn}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveAddUser} className={styles.modalForm}>
                                <div>
                                    <label className={styles.formLabel}>Nome Completo *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: João Silva Prado"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div>
                                    <label className={styles.formLabel}>E-mail Institucional *</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Ex: joao.silva@fieb.edu.br"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div>
                                    <label className={styles.formLabel}>Senha de Acesso *</label>
                                    <input
                                        type="password"
                                        required
                                        placeholder="Mínimo 6 caracteres"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <div>
                                        <label className={styles.formLabel}>Função / Cargo</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className={styles.formSelect}
                                        >
                                            <option value="Aluno">Aluno</option>
                                            <option value="Colaborador">Colaborador</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={styles.formLabel}>Identificador (RM/MAT)</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: RM 123456"
                                            value={formData.identifier}
                                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                            className={styles.formInput}
                                        />
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className={styles.btnSecondary}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.btnPrimary}
                                    >
                                        Salvar Usuário
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isEditModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <div className={styles.modalHeaderTitle}>
                                    <Edit3 className="w-5 h-5" />
                                    <span>Editar Usuário</span>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className={styles.modalCloseBtn}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveEditUser} className={styles.modalForm}>
                                <div>
                                    <label className={styles.formLabel}>Nome Completo *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div>
                                    <label className={styles.formLabel}>E-mail Institucional *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div>
                                    <label className={styles.formLabel}>Nova Senha (opcional)</label>
                                    <input
                                        type="password"
                                        placeholder="Deixe em branco para não alterar"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <div>
                                        <label className={styles.formLabel}>Função / Cargo</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className={styles.formSelect}
                                        >
                                            <option value="Aluno">Aluno</option>
                                            <option value="Colaborador">Colaborador</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={styles.formLabel}>Status de Acesso</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className={styles.formSelect}
                                        >
                                            <option value="Ativo">Ativo</option>
                                            <option value="Inativo">Inativo</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className={styles.formLabel}>Identificador (RM/MAT)</label>
                                    <input
                                        type="text"
                                        value={formData.identifier}
                                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className={styles.btnSecondary}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.btnPrimary}
                                    >
                                        Atualizar Dados
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isDeleteModalOpen && currentUser && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader} style={{ backgroundColor: '#e11d48' }}>
                                <div className={styles.modalHeaderTitle}>
                                    <AlertCircle className="w-5 h-5" />
                                    <span>Confirmar Exclusão</span>
                                </div>
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className={styles.modalCloseBtn}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className={styles.modalForm}>
                                <p className={styles.guidelineText} style={{ fontSize: '0.875rem', color: '#1e293b' }}>
                                    Tem certeza que deseja excluir o usuário <strong>{currentUser.name}</strong> ({currentUser.email})?
                                </p>
                                <div style={{ padding: '0.75rem', backgroundColor: '#fffbeb', borderRadius: '0.75rem', border: '1px solid #fde68a', color: '#92400e', fontSize: '0.75rem' }}>
                                    Esta ação removerá as credenciais de acesso do usuário do painel PROALUNO.
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className={styles.btnSecondary}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDeleteUserConfirm}
                                        className={styles.btnDanger}
                                    >
                                        Confirmar Exclusão
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </div>
    );
}