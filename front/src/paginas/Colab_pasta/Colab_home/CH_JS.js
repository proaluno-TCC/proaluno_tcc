// Dados e lógica da página Colab_home

import dem from "../../../imagens/m_denuncias.png";
import elm from "../../../imagens/m_elogios.png";
import rem from "../../../imagens/m_reclamacoes.png";
import som from "../../../imagens/m_solicitacoes.png";
import sum from "../../../imagens/m_sugestoes.png";

export const LOGO = "";

export const CATEGORIES = [
  {
    id: "denuncias",
    label: "Denúncias",
    description: "Casos graves, infrações de conduta, segurança e bullying.",
    count: 6,
    prazo: "Responder em até 5 dias úteis",
    color: "#B3261E",
    tint: "rgba(179,38,30,0.12)",
    route: "/colab/manifestacoes/denuncias",
    img: dem,
  },
  {
    id: "reclamacoes",
    label: "Reclamações",
    description: "Insatisfações com serviços, prazos e infraestrutura.",
    count: 12,
    prazo: "Responder em até 5 dias úteis",
    color: "#B45309",
    tint: "rgba(217,119,6,0.15)",
    route: "/colab/manifestacoes/reclamacoes",
    img: rem,
  },
  {
    id: "elogios",
    label: "Elogios",
    description: "Reconhecimento a professores, projetos e setores.",
    count: 24,
    prazo: "Encaminhar ao setor elogiado",
    color: "#1D5A9E",
    tint: "rgba(2,119,189,0.13)",
    route: "/colab/manifestacoes/elogios",
    img: elm,
  },
  {
    id: "sugestoes",
    label: "Sugestões",
    description: "Ideias e propostas para melhoria da instituição.",
    count: 18,
    prazo: "Encaminhar à coordenação",
    color: "#7B3FB8",
    tint: "rgba(123,63,184,0.13)",
    route: "/colab/manifestacoes/sugestoes",
    img: sum,
  },
  {
    id: "solicitacoes",
    label: "Solicitações",
    description:
      "Pedidos formais de providências administrativas e acadêmicas.",
    count: 9,
    prazo: "Encaminhar à coordenação",
    color: "#1F7A3E",
    tint: "rgba(46,125,50,0.14)",
    route: "/colab/manifestacoes/solicitacoes",
    img: som,
  },
];

export const NAV = [
  { label: "Painel", href: "#painel" },
  { label: "Manifestações", href: "#manifestacoes" },
  { label: "Diretrizes", href: "#diretrizes" },
  { label: "Suporte", href: "/colab/contato" },
];

export const GUIDES = [
  {
    t: "Sigilo obrigatório",
    d: "Preserve a identidade dos estudantes que registraram a manifestação, conforme o regulamento interno.",
  },
  {
    t: "Prazo institucional",
    d: "Responda denúncias e reclamações em até 5 dias úteis e atualize o status a cada resposta.",
  },
  {
    t: "Encaminhamento correto",
    d: "Envie solicitações e sugestões à coordenação responsável, com cópia técnica.",
  },
];

/**
 * Calcula os números do painel com os registros recebidos.
 * Formato esperado: { denuncias: { 1: { status: "analise" } }, elogios: {...} }
 */
export function calcularResumo(registry = {}) {
  const counts = {};
  let total = 0;
  let analise = 0;
  let respondidos = 0;
  let resolvidos = 0;

  CATEGORIES.forEach((categoria) => {
    const registros = Object.values(registry[categoria.id] || {});
    counts[categoria.id] = registros.length;
    total += registros.length;

    registros.forEach((registro) => {
      if (registro.status === "analise") analise += 1;
      else if (registro.status === "respondido") respondidos += 1;
      else if (registro.status === "resolvido") resolvidos += 1;
    });
  });

  const stats = [
    { label: "Total de registros", value: total },
    { label: "Aguardando análise", value: analise },
    { label: "Respondidos", value: respondidos },
    { label: "Resolvidos", value: resolvidos },
  ];

  return { counts, total, stats };
}
