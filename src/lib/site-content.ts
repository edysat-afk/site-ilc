import type { Route } from "next";

export const siteNavigation: ReadonlyArray<{ href: Route; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/mastermind-infraestrutura-e-logistica", label: "Mastermind" },
  { href: "/servicos", label: "Serviços" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/contato", label: "Contato" },
];

export const company = {
  name: "ILC – Infraestrutura e Logística Conectada",
  tagline:
    "O mais novo centro de inteligência e inovação em infraestrutura e logística, conciliando conhecimento, informação, networking e oportunidades de negócios.",
  address:
    "Centro Empresarial Norte, Sl 233, 235 – SRTVN Qd. 701, Conj. C, Brasília/DF – CEP: 70719903",
  email: "gerencia.comercial@ilclog.com",
  mission:
    "Desenvolver e transmitir conhecimentos e projetos voltados para infraestrutura e logística, das áreas aquaviária, ferroviária e rodoviária, a partir de uma visão integrada sobre a infraestrutura, no Brasil e exterior.",
  vision:
    "Ser referência em soluções logísticas integradas inteligentes e eficazes com profissionais e produtos sempre customizados às necessidades de seus clientes.",
  values: [
    "Propulsão do Conhecimento",
    "Desenvolvimento Sustentável",
    "Inovação Tecnológica de Qualidade",
  ],
  audiences: [
    "Empresas de infraestrutura",
    "Fundos de investimento",
    "Empresas de consultoria especializada",
    "Instituições privadas e públicas nacionais e internacionais",
  ],
};

export const leaders = [
  {
    initials: "AT",
    name: "Adalberto Tokarski",
    role: "Diretor Executivo",
    phone: "(61) 99942-1123",
    bio: "Engenheiro Civil com MBA em Regulação pela FGV. Acumulou mais de 15 anos na ANTAQ em cargos de gestão, com atuação em planejamento hidroviário, regulação e desenvolvimento setorial.",
  },
  {
    initials: "EV",
    name: "Edeon Vaz Ferreira",
    role: "Diretor Financeiro",
    phone: "(61) 98111-9889",
    bio: "Administrador de Empresas com mais de 40 anos de experiência em logística do agronegócio, relações institucionais e apoio ao desenvolvimento de corredores logísticos.",
  },
  {
    initials: "FF",
    name: "Fabianne Ferreira",
    role: "Gerente Comercial",
    phone: "(61) 99325-9222",
    bio: "Responsável pelo relacionamento comercial e atendimento consultivo a organizações interessadas em soluções estratégicas no setor.",
  },
];

export const services = [
  {
    slug: "gestao-de-projetos-estrategicos",
    title: "Gestão de Projetos Estratégicos",
    excerpt:
      "Planejamento, execução e monitoramento de projetos com alinhamento entre objetivos estratégicos, logística e infraestrutura.",
    bullets: [
      "Análise minuciosa de necessidades e metas",
      "Planos personalizados para transporte e infraestrutura",
      "Controle de prazo, custo e qualidade",
      "Busca contínua por inovação em gestão",
    ],
    paragraphs: [
      "Na era da competitividade empresarial, a gestão de projetos estratégicos é essencial para garantir o sucesso e a sustentabilidade das organizações. Na área de infraestrutura e logística, onde cada movimento conta, a habilidade de planejar, executar e monitorar projetos de forma estratégica é ainda mais crucial.",
      "A abordagem da ILC começa com uma análise detalhada das necessidades do cliente e evolui para um plano de execução que considera todos os aspectos do projeto, da logística de transporte à otimização da infraestrutura existente.",
      "Durante a execução, a equipe supervisiona cada etapa do projeto, buscando cumprimento de prazos, controle de custos, qualidade do trabalho entregue e excelência operacional.",
    ],
    accent: "blue",
  },
  {
    slug: "consultoria-personalizada",
    title: "Consultoria Personalizada",
    excerpt:
      "Estratégias sob medida para melhorar eficiência, reduzir custos e responder aos desafios específicos de cada operação.",
    bullets: [
      "Abordagem holística do negócio",
      "Identificação de gargalos e oportunidades",
      "Estratégias sob medida para eficiência e redução de custos",
      "Soluções sustentáveis para crescimento de longo prazo",
    ],
    paragraphs: [
      "Na era da personalização, a consultoria personalizada emerge como diferencial essencial para empresas que buscam otimizar suas operações de infraestrutura e logística. Cada organização possui necessidades únicas e desafios específicos.",
      "A ILC trabalha em estreita colaboração com o cliente para entender objetivos, mapear gargalos e desenhar soluções adaptadas, desde a análise inicial até a implementação das propostas.",
      "O compromisso não está apenas em resolver problemas imediatos, mas em construir soluções sustentáveis, capazes de impulsionar competitividade e crescimento consistente.",
    ],
    accent: "gold",
  },
  {
    slug: "treinamento-e-palestras-tecnicas",
    title: "Treinamento e Palestras Técnicas",
    excerpt:
      "Capacitação especializada com conteúdo atualizado, flexível e aderente às demandas reais da infraestrutura e logística.",
    bullets: [
      "Conteúdo técnico atualizado",
      "Especialistas com experiência prática",
      "Formato adaptável às necessidades da empresa",
      "Foco em excelência operacional e crescimento sustentável",
    ],
    paragraphs: [
      "O conhecimento é fundamental para o sucesso em infraestrutura e logística. Por isso, a ILC oferece treinamentos e palestras técnicas pensados para capacitar equipes com habilidades relevantes para os desafios do setor.",
      "Os programas são conduzidos por profissionais experientes e altamente qualificados, que reúnem anos de expertise prática e visão aplicada ao mercado.",
      "A abordagem flexível permite personalizar conteúdos para as demandas específicas de cada organização, ampliando o impacto sobre desempenho, eficiência e tomada de decisão.",
    ],
    accent: "green",
  },
  {
    slug: "defesa-de-pautas-e-projetos-estrategicos",
    title: "Defesa de Pautas e Projetos Estratégicos",
    excerpt:
      "Atuação institucional e estratégica para articular demandas, investimentos e políticas voltadas ao avanço do setor.",
    bullets: [
      "Relações públicas e governamentais",
      "Articulação junto a autoridades e stakeholders",
      "Estratégias de comunicação persuasivas",
      "Fomento a políticas e iniciativas para o setor",
    ],
    paragraphs: [
      "Em um cenário em que infraestrutura e logística têm papel central no desenvolvimento econômico e social, a defesa de pautas e projetos estratégicos torna-se imperativa.",
      "A ILC oferece um serviço especializado de relações públicas e governamentais, com atuação dedicada à promoção de políticas e investimentos que fortaleçam o setor.",
      "A proposta é construir soluções alinhadas aos interesses dos clientes e do ecossistema logístico, com foco em resultados, influência qualificada e parcerias duradouras.",
    ],
    accent: "purple",
  },
];

export const mastermind = {
  title: "MASTERMIND Infraestrutura e Logística",
  subtitle: "Conhecimento estratégico para quem toma decisões.",
  description:
    "Em formato híbrido, o programa é estruturado em 10 módulos de 4 horas cada, totalizando 40 horas de imersão em temas críticos da infraestrutura nacional.",
  methodology: [
    "Pinga-Fogo: análise dos bastidores do setor e insights estratégicos",
    "Pílulas do Conhecimento: benchmarking internacional sobre o tema do módulo",
    "Relatoria Técnica: exposição aprofundada conduzida por especialista de referência",
    "Debate e Conclusões: discussão estruturada voltada a aplicações práticas",
  ],
  highlights: [
    "Desde 2022, o programa é realizado com sucesso contínuo",
    "Participação de empresas privadas, instituições públicas e órgãos federais",
    "Ambiente de aprendizado colaborativo e formulação de soluções concretas",
  ],
  tracks: ["Infra 2023", "Infra 2024", "Infra 2025", "Infra 2026", "Portos"],
  sessionsPreview: [
    {
      number: "01",
      date: "15 Jan 2026",
      title: "Contexto da Infraestrutura Brasileira 2026: Cenários e Perspectivas",
      speaker: "Luis Henrique Baldez",
      status: "Prévia gratuita",
    },
    {
      number: "02",
      date: "22 Jan 2026",
      title: "Ferrogrão e o futuro das ferrovias privadas no Brasil",
      speaker: "Adalberto Tokarski",
      status: "Restrita",
    },
    {
      number: "03",
      date: "05 Fev 2026",
      title: "FICO-FIOL: integração multimodal Centro-Norte",
      speaker: "Edeon Vaz Ferreira",
      status: "Restrita",
    },
  ],
};