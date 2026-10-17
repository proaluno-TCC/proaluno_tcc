export const RECLAMACOES_INICIAIS = {
  1: {
    titulo: "Ar-condicionado quebrado na sala 12 causando calor excessivo",
    assunto: "Infraestrutura",
    descricao:
      "Sou aluno do 2º ano do ensino médio e venho relatar que o ar-condicionado da sala 12 está quebrado há mais de duas semanas. Nas aulas do período da tarde a temperatura fica insuportável, o que atrapalha a concentração durante as provas. Já avisamos o inspetor de alunos, mas ainda não houve conserto. Pedimos que o reparo seja feito o quanto antes.",
    local: "Sala 12 - Bloco B",
    data: "18/08/2026",
    contato: "Sim, inspetor de alunos",
    urgente: "Sim",
    status: "analise",
    protocolo: "15-08",
    dataResumo: "18/08/2026",
    respostas: [],
  },
  2: {
    titulo: "Demora para contratar professores substitutos",
    assunto: "Falta de professores",
    descricao:
      "Já estamoss no terceiro tri e ainda não contrataram um professor substituto para a matéria de lip. Inclusiva, nas provas trimestrais anteriores, tivemos que fazer a prova das matérias técnicas mesmo sem ter aula de algumas matérias por causa da falta de professores.",
    local: "Escola",
    data: "10/03/2026",
    contato: "Sim, secretaria escolar",
    urgente: "Não",
    status: "resolvido",
    protocolo: "22-03",
    dataResumo: "10/03/2026",
    respostas: [
      {
        autor: "Secretaria Escolar",
        data: "13/03/2026",
        texto:
          "Pedimos perdão por essa falha, as devidas medidas ja foram tomadas e o novo professor de lip chegará na próxima semana.",
      },
    ],
  },
  3: {
    titulo: "Falta de suco ou água na cantina na hora do almoço",
    assunto: "Alimentação escolar",
    descricao:
      "Sou aluna do 1º ano e não consigo comer sem dar um gole de água logo em seguida. Mas, a escola prefere nos dar comida e engolir no seco",
    local: "Cantina ",
    data: "05/08/2026",
    contato: "Sim, nutricionista da escola",
    urgente: "Não",
    status: "respondido",
    protocolo: "31-07",
    dataResumo: "05/08/2026",
    respostas: [
      {
        autor: "Nutricionista Escolar",
        data: "07/08/2026",
        texto:
          "A partir da próxima semana o cardápio passará a incluir duas opções de bebida para auxiliar na ingestão da comida",
      },
    ],
  },
  4: {
    titulo: "Wi-fi instável no laboratório de informática durante as aulas",
    assunto: "Infraestrutura tecnológica",
    descricao:
      "Durante as aulas de informática do 2º ano, a conexão de wi-fi cai constantemente, o que impede a realização das atividades práticas propostas pelo professor. Isso já aconteceu em pelo menos quatro aulas seguidas. Pedimos uma verificação do roteador ou do plano de internet contratado pela escola.",
    local: "Laboratório de Informática",
    data: "12/08/2026",
    contato: "Sim, coordenação de TI",
    urgente: "Sim",
    status: "analise",
    protocolo: "40-08",
    dataResumo: "12/08/2026",
    respostas: [],
  },
  5: {
    titulo: "Barulho excessivo nos corredores durante o período de provas",
    assunto: "Convivência escolar",
    descricao:
      "Durante a semana de provas, um grupo de alunos tem conversado alto e passam gritando e imitando animais, prejudicando quem está estudando ou revisando o conteúdo antes das avaliações. Já pedimos silêncio algumas vezes, mas a situação se repete quase todos os dias. Solicitamos que um monitor acompanhe o espaço nesse período.",
    local: "Corredores",
    data: "20/08/2026",
    contato: "Não",
    urgente: "Não",
    status: "analise",
    protocolo: "44-08",
    dataResumo: "20/08/2026",
    respostas: [],
  },
  6: {
    titulo: "Uniforme esgotado na loja conveniada há duas semanas",
    assunto: "Uniforme escolar",
    descricao:
      "A loja conveniada que vende o uniforme da escola está sem calças e camisetas no meu tamanho há mais de duas semanas. Meu uniforme antigo já está pequeno e não consigo comprar um novo. Gostaria de saber quando o estoque será reposto ou se a escola pode indicar outro fornecedor temporariamente.",
    local: "Loja conveniada",
    data: "22/07/2026",
    contato: "Sim, secretaria escolar",
    urgente: "Não",
    status: "resolvido",
    protocolo: "27-07",
    dataResumo: "22/07/2026",
    respostas: [
      {
        autor: "Secretaria Escolar",
        data: "25/07/2026",
        texto:
          "O fornecedor confirmou a reposição do estoque para esta semana. Enquanto isso, autorizamos o uso do uniforme antigo ou de uma camiseta lisa na cor do uniforme, sem prejuízo para o aluno.",
      },
    ],
  },
  7: {
    titulo: "Conflito de horário entre aula de educação física e simulado do ENEM",
    assunto: "Grade curricular",
    descricao:
      "O simulado do ENEM marcado para o dia 30 coincide com o horário da aula de educação física, que é obrigatória e conta nota no boletim. Vários colegas do 3º ano estão na mesma situação e não sabem se devem priorizar o simulado ou a aula. Pedimos que a coordenação avalie um ajuste na grade só para esse dia.",
    local: "Coordenação pedagógica",
    data: "24/07/2026",
    contato: "Sim, coordenação pedagógica",
    urgente: "Sim",
    status: "respondido",
    protocolo: "35-07",
    dataResumo: "24/07/2026",
    respostas: [
      {
        autor: "Coordenação Pedagógica",
        data: "26/07/2026",
        texto:
          "A aula de educação física do dia 30 foi remanejada para o período da tarde apenas para as turmas do 3º ano, para que todos possam participar do simulado sem prejuízo na frequência.",
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
  { key: "todas", label: "Todas as reclamações" },
  { key: "analise", label: "Em análise" },
  { key: "respondido", label: "Respondidas" },
  { key: "resolvido", label: "Resolvidas" },
];

export const hojeFormatado = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};
