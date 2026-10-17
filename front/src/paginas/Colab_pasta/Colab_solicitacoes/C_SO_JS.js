export const SOLICITACOES_INICIAIS = {
  1: {
    titulo: "Oficinas de raciocínio lógico para os alunos do 1º e 2º ano",
    assunto: "Atividades extracurriculares",
    descricao:
      "Solicitamos a criação de oficinas semanais de raciocínio lógico e resolução de problemas, no contraturno, para alunos do 1º e 2º ano. Muitos colegas têm dificuldade com questões de lógica em provas e simulados, e uma atividade prática ajudaria bastante na preparação para o ENEM. Podemos ajudar a divulgar e reunir os interessados.",
    local: "Coordenação pedagógica",
    itens: "1 oficina semanal (turma de até 30 alunos)",
    data: "15/09/2026",
    urgente: "Não",
    status: "analise",
    protocolo: "14-09",
    dataResumo: "15/09/2026",
    respostas: [],
  },
  2: {
    titulo: "Novos ventiladores para as salas do 2º andar",
    assunto: "Infraestrutura",
    descricao:
      "Os ventiladores das salas 08, 09 e 10 estão com barulho excessivo e alguns já não giram na velocidade máxima. No período da tarde o calor atrapalha a concentração e as provas. Pedimos a compra de novos ventiladores de parede ou de teto para essas três salas.",
    local: "Salas 08, 09 e 10 - 2º andar",
    itens: "6 ventiladores (2 por sala)",
    data: "28/08/2026",
    urgente: "Sim",
    status: "respondido",
    protocolo: "38-08",
    dataResumo: "28/08/2026",
    respostas: [
      {
        autor: "Setor Administrativo",
        data: "01/09/2026",
        texto:
          "A compra foi aprovada e os ventiladores estão em processo de cotação. A previsão de instalação é de até três semanas.",
      },
    ],
  },
  3: {
    titulo: "Troca da lousa da sala 07",
    assunto: "Materiais e equipamentos",
    descricao:
      "A lousa da sala 07 está muito riscada e manchada, e o pincel não apaga completamente. Os alunos do fundo da sala têm dificuldade de ler o que é escrito, principalmente em aulas de exatas. Solicitamos a troca por uma lousa nova ou, se possível, uma lousa branca.",
    local: "Sala 07 - Bloco A",
    itens: "1 lousa nova",
    data: "03/09/2026",
    urgente: "Não",
    status: "analise",
    protocolo: "41-09",
    dataResumo: "03/09/2026",
    respostas: [],
  },
  4: {
    titulo: "Conserto da porta quebrada da sala 15",
    assunto: "Manutenção",
    descricao:
      "A porta da sala 15 está com a dobradiça solta e não fecha direito, deixando entrar o barulho do corredor durante as aulas. Em alguns momentos ela cai da posição, o que pode machucar quem estiver passando. Pedimos o conserto ou a troca da porta o quanto antes.",
    local: "Sala 15 - Bloco B",
    itens: "Conserto ou troca de 1 porta",
    data: "10/07/2026",
    urgente: "Sim",
    status: "resolvido",
    protocolo: "26-07",
    dataResumo: "10/07/2026",
    respostas: [
      {
        autor: "Setor de Manutenção",
        data: "14/07/2026",
        texto:
          "A dobradiça foi substituída e a porta foi reajustada. Qualquer novo problema pode ser informado pelo mesmo protocolo.",
      },
    ],
  },
  5: {
    titulo: "Cadeiras para o laboratório de informática",
    assunto: "Laboratório de informática",
    descricao:
      "O laboratório de informática tem 30 computadores, mas apenas 22 cadeiras em bom estado. Em aulas com a turma completa, alguns alunos precisam dividir o computador ou trazer cadeiras de outras salas. Solicitamos a reposição das cadeiras que estão faltando.",
    local: "Laboratório de Informática",
    itens: "8 cadeiras",
    data: "20/08/2026",
    urgente: "Não",
    status: "respondido",
    protocolo: "33-08",
    dataResumo: "20/08/2026",
    respostas: [
      {
        autor: "Direção",
        data: "25/08/2026",
        texto:
          "Recebemos o pedido e as cadeiras serão remanejadas do depósito enquanto a compra de novas unidades é avaliada.",
      },
    ],
  },
  6: {
    titulo: "Mais materiais para o laboratório de química",
    assunto: "Laboratório de química",
    descricao:
      "O laboratório de química está com poucos béqueres, tubos de ensaio e luvas para o número de alunos por turma, o que limita as aulas práticas. Solicitamos a reposição desses itens e a compra de mais óculos de proteção, para que todos possam realizar os experimentos com segurança.",
    local: "Laboratório de Química",
    itens: "Béqueres, tubos de ensaio, luvas e óculos de proteção",
    data: "08/09/2026",
    urgente: "Não",
    status: "analise",
    protocolo: "43-09",
    dataResumo: "08/09/2026",
    respostas: [],
  },
  7: {
    titulo: "Reposição do bebedouro do pátio",
    assunto: "Infraestrutura",
    descricao:
      "O bebedouro do pátio principal parou de funcionar e os alunos estão precisando entrar na fila do único bebedouro do corredor durante o intervalo. Pedimos o conserto ou a substituição do equipamento para evitar longas filas e garantir água para todos.",
    local: "Pátio principal",
    itens: "1 bebedouro (conserto ou substituição)",
    data: "12/06/2026",
    urgente: "Sim",
    status: "resolvido",
    protocolo: "21-06",
    dataResumo: "12/06/2026",
    respostas: [
      {
        autor: "Setor Administrativo",
        data: "18/06/2026",
        texto:
          "Um novo bebedouro foi instalado no pátio e já está em funcionamento. Obrigado por avisar.",
      },
    ],
  },
};

export const STATUS_META = {
  analise: { label: "Aberta", bg: "#FFF1DE", text: "#B4680B", bar: "#D68A1F" },
  respondido: { label: "Em andamento", bg: "#E5F0FB", text: "#1D5A9E", bar: "#0277BD" },
  resolvido: { label: "Atendida", bg: "#E4F6E3", text: "#2A7F25", bar: "#4EBF48" },
};

export const FILTERS = [
  { key: "todas", label: "Todas as solicitações" },
  { key: "analise", label: "Abertas" },
  { key: "respondido", label: "Em andamento" },
  { key: "resolvido", label: "Atendidas" },
];

export const hojeFormatado = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};
