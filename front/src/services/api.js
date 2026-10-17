const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function handleResponse(res) {
  if (!res.ok) {
    const erro = await res.json().catch(() => ({ mensagem: `Erro ${res.status}` }));
    throw new Error(erro.mensagem || erro.message || `Erro ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function listarUsuarios() {
  const res = await fetch(`${API_URL}/api/usuarios`);
  return handleResponse(res);
}

export async function criarUsuario(dadosFront) {
  const res = await fetch(`${API_URL}/api/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosFront),
  });
  return handleResponse(res);
}

export async function atualizarUsuario(id, dadosFront) {
  const res = await fetch(`${API_URL}/api/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosFront),
  });
  return handleResponse(res);
}

export async function excluirUsuario(id) {
  const res = await fetch(`${API_URL}/api/usuarios/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}

// Substitui a chamada direta por /api/usuarios/:id (que não existe no backend).
// Busca todos os usuários e filtra no front até a rota GET /api/usuarios/:id existir no servidor.
export async function buscarUsuarioPorId(id) {
  const usuarios = await listarUsuarios();
  const usuario = usuarios.find(u => String(u.id) === String(id));
  if (!usuario) throw new Error('Usuário não encontrado');
  return usuario;
}
