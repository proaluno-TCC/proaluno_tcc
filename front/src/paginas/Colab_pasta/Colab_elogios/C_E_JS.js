export const ELOGIOS_INICIAIS = {
  1: {
    titulo: "Reconhecimento à professora de Biologia pelas aulas práticas",
    assunto: "Reconhecimento a professor",
    descricao:
      "Sou aluno do 2º ano e quero deixar um reconhecimento à professora Ana Beatriz, de Biologia. As aulas práticas de laboratório que ela organizou sobre células tornaram um conteúdo difícil muito mais fácil de entender. Ela sempre explica com paciência e incentiva os alunos a perguntarem sem medo. Gostaria que esse esforço fosse reconhecido pela coordenação.",
    quemElogiado: "Professora Ana Beatriz - Biologia",
    data: "14/08/2026",
    divulgar: "Sim",
    status: "analise",
    protocolo: "12-08",
    dataResumo: "14/08/2026",
    respostas: [],
  },
  2: {
    titulo: "Agradecimento à equipe da cantina pelo cardápio especial da semana da alimentação",
    assunto: "Alimentação escolar",
    descricao:
      "Na semana da alimentação, a equipe da cantina preparou pratos diferentes todos os dias, com frutas e receitas mais saudáveis, além de decorar o espaço com cartazes educativos. Muitos alunos comentaram como a iniciativa deixou o almoço mais interessante. Queremos agradecer o cuidado e a criatividade da equipe.",
    quemElogiado: "Equipe da cantina",
    data: "20/06/2026",
    divulgar: "Sim",
    status: "respondido",
    protocolo: "08-06",
    dataResumo: "20/06/2026",
    respostas: [
      {
        autor: "Direção",
        data: "23/06/2026",
        texto:
          "Agradecemos o carinho do recado! Repassamos o elogio para toda a equipe da cantina, que ficou muito feliz com o reconhecimento dos alunos.",
      },
    ],
  },
  3: {
    titulo: "Elogio ao zelador por manter os corredores sempre limpos",
    assunto: "Serviços gerais",
    descricao:
      "Quero elogiar o seu Roberto, responsável pela limpeza do bloco A. Mesmo durante o horário de maior movimento entre as aulas, ele sempre mantém os corredores e banheiros limpos e organizados. É um trabalho que muitas vezes passa despercebido, mas faz muita diferença no dia a dia da escola.",
    quemElogiado: "Seu Roberto - Serviços gerais",
    data: "02/05/2026",
    divulgar: "Não",
    status: "resolvido",
    protocolo: "19-04",
    dataResumo: "02/05/2026",
    respostas: [
      {
        autor: "Coordenação Administrativa",
        data: "05/05/2026",
        texto:
          "Muito obrigado pelo carinho! O elogio foi entregue pessoalmente ao seu Roberto, que agradeceu muito o reconhecimento do trabalho dele.",
      },
    ],
  },
  4: {
    titulo: "Parabéns à coordenação pela organização da Feira de Ciências",
    assunto: "Eventos escolares",
    descricao:
      "A Feira de Ciências deste ano foi a melhor que já participei. Os espaços dos projetos estavam bem distribuídos, houve tempo suficiente para os visitantes conhecerem cada estande e a premiação foi muito bem conduzida. Dá para perceber o cuidado da coordenação no planejamento do evento.",
    quemElogiado: "Coordenação Pedagógica",
    data: "29/08/2026",
    divulgar: "Sim",
    status: "analise",
    protocolo: "50-08",
    dataResumo: "29/08/2026",
    respostas: [],
  },
  5: {
    titulo: "Elogio ao professor de Educação Física pelo projeto de inclusão",
    assunto: "Educação Física",
    descricao:
      "O professor Diego criou um projeto para incluir alunos com dificuldades motoras nas aulas de educação física, adaptando os jogos para que todos pudessem participar juntos. Isso mudou totalmente a forma como a turma enxerga a matéria. É um exemplo de como um professor pode transformar a convivência entre os alunos.",
    quemElogiado: "Professor Diego - Educação Física",
    data: "11/08/2026",
    divulgar: "Sim",
    status: "analise",
    protocolo: "46-08",
    dataResumo: "11/08/2026",
    respostas: [],
  },
  6: {
    titulo: "Reconhecimento ao Grêmio pelo clube de leitura",
    assunto: "Biblioteca",
    descricao:
      "A bibliotecária Sandra criou um clube de leitura que acontece uma vez por mês e trouxe muitos alunos que antes não gostavam de ler para perto dos livros. As discussões são leves e ela sempre indica títulos que combinam com o gosto de cada aluno. Quero deixar registrado o quanto esse projeto tem feito diferença para mim.",
    quemElogiado: "Sandra - Biblioteca",
    data: "18/03/2026",
    divulgar: "Sim",
    status: "respondido",
    protocolo: "10-03",
    dataResumo: "18/03/2026",
    respostas: [
      {
        autor: "Direção",
        data: "20/03/2026",
        texto:
          "Que alegria receber esse elogio! O clube de leitura vai continuar sendo incentivado e o recado foi compartilhado com a Sandra, que ficou muito emocionada.",
      },
    ],
  },
  7: {
    titulo: "Agradecimento a professora de Física por fornecer aulões nas semanas próximas de vestibulares",
    assunto: "Aulão de Física",
    descricao:
      "Isso nos ajudou demais e nos anos interiores caíram diversas questões referente aos assuntos revisados e ensinados por ela nesses aulões",
    quemElogiado: "Larissa - Professsora de Física",
    data: "30/04/2026",
    divulgar: "Sim",
    status: "resolvido",
    protocolo: "17-04",
    dataResumo: "30/04/2026",
    respostas: [
      {
        autor: "Secretaria Escolar",
        data: "02/05/2026",
        texto:
          "Agradecemos o registro! Repassamos o elogio à professora Larissa, que recebeu o reconhecimento com muita satisfação.",
      },
    ],
  },
};

export const STATUS_META = {
  analise: { label: "Recebido", bg: "#E7F3FF", text: "#1D6FB8", bar: "#7CC4FF" },
  respondido: { label: "Compartilhado", bg: "#E5F0FB", text: "#1D5A9E", bar: "#0277BD" },
  resolvido: { label: "Arquivado", bg: "#E3F3E8", text: "#1F6B3B", bar: "#2E7D32" },
};

export const FILTERS = [
  { key: "todas", label: "Todos os elogios" },
  { key: "analise", label: "Recebidos" },
  { key: "respondido", label: "Compartilhados" },
  { key: "resolvido", label: "Arquivados" },
];

export const hojeFormatado = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};
