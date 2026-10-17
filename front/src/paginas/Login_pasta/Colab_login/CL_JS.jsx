import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useColabLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMsg, setEmailMsg] = useState({ text: '', type: '' });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryMsg, setRecoveryMsg] = useState({ text: '', type: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const [particles, setParticles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const emailAdmin = 'admin@fieb.edu.br';

  const normalizarEmail = (value) => value.trim().toLowerCase();

  const isAdminEmail = (value) => normalizarEmail(value) === emailAdmin;

  const isDocenteEmail = (value) =>
    /^[^\s@]+@docente\.fieb\.edu\.br$/i.test(value.trim());

  const isAllowedEmail = (value) =>
    isAdminEmail(value) || isDocenteEmail(value);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }, (_, id) => {
      const size = Math.random() * 6 + 2;
      return {
        id,
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`,
      };
    });
    setParticles(generatedParticles);
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim() || isAllowedEmail(value)) {
      setEmailMsg({ text: '', type: '' });
    } else {
      setEmailMsg({
        text: 'O e-mail precisa terminar em @docente.fieb.edu.br.',
        type: 'invalid',
      });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value || value.length >= 6) {
      setPasswordMsg({ text: '', type: '' });
    } else {
      setPasswordMsg({
        text: 'A senha precisa ter no mínimo 6 caracteres.',
        type: 'invalid',
      });
    }
  };

  const handleRecoveryEmailChange = (e) => {
    const value = e.target.value;
    setRecoveryEmail(value);

    if (!value.trim() || isAllowedEmail(value)) {
      setRecoveryMsg({ text: '', type: '' });
    } else {
      setRecoveryMsg({
        text: 'O e-mail precisa terminar em @docente.fieb.edu.br.',
        type: 'invalid',
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const emailValido = isAllowedEmail(email);
    const senhaValida = password.length >= 6;

    if (!emailValido) {
      setEmailMsg({
        text: 'O e-mail precisa terminar em @docente.fieb.edu.br.',
        type: 'invalid',
      });
    } else {
      setEmailMsg({ text: '', type: '' });
    }

    if (!senhaValida) {
      setPasswordMsg({
        text: 'A senha precisa ter no mínimo 6 caracteres.',
        type: 'invalid',
      });
    } else {
      setPasswordMsg({ text: '', type: '' });
    }

    if (!emailValido || !senhaValida) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setPasswordMsg({
          text: 'E-mail ou senha incorretos.',
          type: 'invalid',
        });
        return;
      }

      const usuario = await response.json();
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

      const tipo = (usuario.tipoUsuario || '').toLowerCase();

      if (tipo === 'administrador' || isAdminEmail(email)) {
        navigate('/admin_home');
        return;
      }

      navigate('/colab_home');
    } catch (error) {
      setPasswordMsg({
        text: 'Não foi possível conectar ao servidor. Tente novamente.',
        type: 'invalid',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();

    if (!isAllowedEmail(recoveryEmail)) {
      setRecoveryMsg({
        text: 'O e-mail precisa terminar em @docente.fieb.edu.br.',
        type: 'invalid',
      });
      return;
    }

    setShowSuccess(true);
  };

  return {
    email,
    password,
    emailMsg,
    passwordMsg,
    isModalOpen,
    setIsModalOpen,
    recoveryEmail,
    recoveryMsg,
    showSuccess,
    setShowSuccess,
    particles,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleRecoveryEmailChange,
    handleLoginSubmit,
    handleRecoverySubmit,
  };
}
