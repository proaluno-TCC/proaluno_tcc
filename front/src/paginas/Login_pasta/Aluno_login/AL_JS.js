import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAlunoLogin() {
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

  const validateStudentEmail = (value) =>
    /^rm\d+@estudante\.fieb\.edu\.br$/i.test(value.trim());

  useEffect(() => {
    const generated = Array.from({ length: 15 }, (_, i) => {
      const size = Math.random() * 6 + 2;
      return {
        id: i,
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`,
      };
    });
    setParticles(generated);
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim() || validateStudentEmail(value)) {
      setEmailMsg({ text: '', type: '' });
    } else {
      setEmailMsg({
        text: 'Use o formato rm99999@estudante.fieb.edu.br.',
        type: 'invalid',
      });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value || value.length >= 8) {
      setPasswordMsg({ text: '', type: '' });
    } else {
      setPasswordMsg({
        text: 'A senha precisa ter no mínimo 8 caracteres.',
        type: 'invalid',
      });
    }
  };

  const handleRecoveryEmailChange = (e) => {
    const value = e.target.value;
    setRecoveryEmail(value);

    if (!value.trim() || validateStudentEmail(value)) {
      setRecoveryMsg({ text: '', type: '' });
    } else {
      setRecoveryMsg({
        text: 'Use o formato rm99999@estudante.fieb.edu.br.',
        type: 'invalid',
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const emailValido = validateStudentEmail(email);
    const senhaValida = password.length >= 8;

    if (!emailValido) {
      setEmailMsg({
        text: 'Use o formato rm99999@estudante.fieb.edu.br.',
        type: 'invalid',
      });
    } else {
      setEmailMsg({ text: '', type: '' });
    }

    if (!senhaValida) {
      setPasswordMsg({
        text: 'A senha precisa ter no mínimo 8 caracteres.',
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
      navigate('/home');
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

    if (!validateStudentEmail(recoveryEmail)) {
      setRecoveryMsg({
        text: 'Use o formato rm99999@estudante.fieb.edu.br.',
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
