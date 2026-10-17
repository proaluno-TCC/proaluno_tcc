import { useEffect } from 'react';
import { buscarUsuarioPorId } from '../services/api';

const INTERVALO_MS = 20000; // 20 segundos

export function useSincronizarUsuario() {
  useEffect(() => {
    const verificar = async () => {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
      if (!usuarioLogado?.id) return;

      try {
        const atual = await buscarUsuarioPorId(usuarioLogado.id);

        // Se o backend desativou/excluiu o usuário, força logout
        if (atual.status === 'Inativo') {
          localStorage.removeItem('usuarioLogado');
          window.location.href = '/';
          return;
        }

        const mudou =
          atual.name !== usuarioLogado.name ||
          atual.email !== usuarioLogado.email ||
          atual.role !== usuarioLogado.role ||
          atual.identifier !== usuarioLogado.identifier;

        if (mudou) {
          const atualizado = { ...usuarioLogado, ...atual };
          localStorage.setItem('usuarioLogado', JSON.stringify(atualizado));
          window.dispatchEvent(new Event('usuarioAtualizado'));
        }
      } catch (err) {
        console.error('Erro ao sincronizar usuário:', err);
      }
    };

    verificar(); // já checa uma vez ao montar
    const intervalo = setInterval(verificar, INTERVALO_MS);
    return () => clearInterval(intervalo);
  }, []);
}
