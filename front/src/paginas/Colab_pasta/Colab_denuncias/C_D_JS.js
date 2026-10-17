export const DENUNCIAS_INICIAIS = {
  1: {
    titulo: "Falha na segurança da escola e entrada de pessoas não autorizadas",
    assunto: "Questões de segurança",
    descricao:
      "Sou aluno do curso de redes e venho denunciar a falta de controle de acesso na portaria principal. A ausência de porteiros e a inoperância das câmeras têm permitido a livre entrada de pessoas não autorizadas, gerando insegurança entre estudantes e funcionários, especialmente no período noturno. Solicito a averiguação imediata da administração, o retorno da identificação obrigatória na entrada e o reforço da equipe de segurança.",
    envolvidos: "Desconhecido",
    data: "04/08/2026",
    contato: "Não",
    autoridades: "Não",
    status: "analise",
    protocolo: "67-42",
    dataResumo: "20/08/2026",
    respostas: [],
  },
  2: {
    titulo: "Ausência constante de professor e atraso no conteúdo da matéria",
    assunto: "Problemas acadêmicos",
    descricao:
      "Venho por meio desta relatar a ausência frequente do professor de Matemática, Sr. Carlos, que faltou 12 das últimas 20 aulas programadas. O conteúdo está extremamente atrasado e os alunos estão preocupados com a preparação para o vestibular. Já tentamos contato com a coordenação, mas não obtivemos retorno satisfatório. Solicitamos providências urgentes.",
    envolvidos: "Professor Carlos (Matemática)",
    data: "16/03/2026",
    contato: "Sim, coordenação pedagógica",
    autoridades: "Não",
    status: "resolvido",
    protocolo: "12-23",
    dataResumo: "16/08/2026",
    respostas: [
      {
        autor: "Coordenação Pedagógica",
        data: "18/08/2026",
        texto:
          "O caso foi apurado junto à coordenação. O professor foi substituído para as aulas restantes do bimestre e um plano de reposição de conteúdo foi definido com a turma.",
      },
    ],
  },
  3: {
    titulo: "Bullying no intervalo do período da tarde",
    assunto: "Convivência escolar",
    descricao:
      "Gostaria de denunciar casos recorrentes de bullying que estão ocorrendo durante o intervalo da tarde, próximo à quadra de esportes. Um grupo de alunos do 3º ano tem intimidado alunos do 1º ano, com agressões verbais e ameaças físicas. As vítimas têm medo de relatar o ocorrido. Peço que a direção tome providências imediatas para garantir a segurança de todos.",
    envolvidos: "Alunos do 3º ano (não identificados nominalmente)",
    data: "02/08/2026",
    contato: "Não",
    autoridades: "Sim",
    status: "analise",
    protocolo: "89-15",
    dataResumo: "02/07/2026",
    respostas: [],
  },
  4: {
    titulo: "Infiltração e goteira na sala 203",
    assunto: "Infraestrutura",
    descricao:
      "A sala 08 está com infiltração grave no teto, causando goteiras constantes que molham os materiais dos alunos e equipamentos elétricos. Já foi relatado à manutenção há mais de 15 dias, mas até o momento nenhuma providência foi tomada. A situação está colocando em risco a integridade física dos alunos e o patrimônio da escola.",
    envolvidos: "Setor de manutenção",
    data: "28/07/2026",
    contato: "Sim, manutenção",
    autoridades: "Não",
    status: "respondido",
    protocolo: "45-78",
    dataResumo: "28/07/2026",
    respostas: [
      {
        autor: "Setor de Manutenção",
        data: "30/07/2026",
        texto:
          "A visita técnica está agendada para a próxima semana. A sala permanecerá interditada até a conclusão do reparo do telhado.",
      },
    ],
  },
  5: {
    titulo: "Assédio moral por parte da coordenação",
    assunto: "Conduta profissional",
    descricao:
      "Venho denunciar atitudes de assédio moral praticadas pela coordenadora pedagógica, Sra. Mariana, que constantemente humilha alunos e professores no corredor, faz ameaças de demissão e impõe prazos irrealistas. O clima na equipe está insustentável e vários professores já pediram transferência. Solicito uma investigação interna.",
    envolvidos: "Coordenadora Mariana",
    data: "25/07/2026",
    contato: "Sim, diretoria",
    autoridades: "Não",
    status: "analise",
    protocolo: "34-91",
    dataResumo: "25/07/2026",
    respostas: [],
  },
  6: {
    titulo: "Falta de merenda no período noturno",
    assunto: "Alimentação escolar",
    descricao:
      "Os alunos do período noturno estão há três semanas sem receber merenda de qualidade. Muitas vezes a janta é servida fria, em quantidade insuficiente ou simplesmente não é servida. Os alunos precisam ficar até as 18h sem alimentação adequada, o que prejudica o rendimento e a saúde de todos.",
    envolvidos: "Equipe da cozinha / Nutricionista",
    data: "20/07/2026",
    contato: "Sim, diretoria",
    autoridades: "Sim",
    status: "resolvido",
    protocolo: "56-33",
    dataResumo: "20/07/2026",
    respostas: [
      {
        autor: "Direção",
        data: "22/07/2026",
        texto:
          "O cardápio noturno foi revisado junto à nutricionista responsável e o horário de entrega foi ajustado para garantir que a refeição chegue quente aos alunos.",
      },
    ],
  },
  7: {
    titulo: "Furto de pertences nas salas de aula",
    assunto: "Segurança patrimonial",
    descricao:
      "Nos últimos dois meses, diversos alunos tiveram pertences furtados dentro das salas durante o intervalo. Celulares, materiais e mochilas sumiram sem que ninguém fosse identificado. As câmeras de segurança próximas ao local estão desligadas e a direção não tomou nenhuma atitude até o momento.",
    envolvidos: "Desconhecido",
    data: "15/07/2026",
    contato: "Não",
    autoridades: "Sim",
    status: "respondido",
    protocolo: "78-12",
    dataResumo: "15/07/2026",
    respostas: [
      {
        autor: "Direção",
        data: "17/07/2026",
        texto:
          "As câmeras do corredor foram reativadas e a rondas do período de intervalo foram reforçadas. Pedimos que qualquer novo caso seja reportado imediatamente à coordenação.",
      },
    ],
  },
};

export const STATUS_META = {
  analise: { label: "Em análise", bg: "#FBF0DD", text: "#8A5A12", bar: "#D68A1F" },
  resolvido: { label: "Resolvido", bg: "#E3F3E8", text: "#1F6B3B", bar: "#2E7D32" },
  respondido: { label: "Respondido", bg: "#E5F0FB", text: "#1D5A9E", bar: "#0277BD" },
};

export const FILTERS = [
  { key: "todas", label: "Todas as denúncias" },
  { key: "analise", label: "Em análise" },
  { key: "respondido", label: "Respondidas" },
  { key: "resolvido", label: "Resolvidas" },
];

export const hojeFormatado = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};
