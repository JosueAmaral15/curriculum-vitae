export type Experience = {
  title: string;
  company: string;
  period: string;
  highlights: string[];
};

export const portfolio = {
  name: "Josué Amaral",
  role: "DevOps Engineer · Python Full-Stack Developer",
  location: "Itaboraí, Rio de Janeiro, Brasil",
  email: "josueamaral15@gmail.com",
  links: {
    website: "https://curriculum-vitae-virid.vercel.app/",
    github: "https://github.com/JosueAmaral15",
    linkedin: "https://www.linkedin.com/in/josue-amaral-tech/",
    whatsapp: "https://wa.me/5521999526162",
    lattes: "https://lattes.cnpq.br/6814784579109841",
    books: "https://uiclap.bio/josueaamaral15",
    geogebra: "https://www.geogebra.org/u/josueamaral15",
    instagram: "https://instagram.com/artistajosueamaral",
    youtube: "https://www.youtube.com/@josueamaral8283",
    resumePortuguese: "https://drive.google.com/file/d/1VoY2UIx88nkXsJkAqSFHyi-lRZgi3NGc/view?usp=sharing",
    resumeEnglish: "https://drive.google.com/file/d/1g8W1cba8fXClofpGLdz0alF3MaVJQgZm/view?usp=sharing",
  },
  summary:
    "Profissional de tecnologia que une engenharia de software, automação de infraestrutura e pesquisa em algoritmos para construir produtos confiáveis, claros e sustentáveis.",
  capabilities: [
    { title: "Full-stack engineering", detail: "Python, Node.js, React, TypeScript, APIs e bancos SQL/NoSQL." },
    { title: "DevOps pragmático", detail: "Docker, CI/CD, Linux, automação Bash/Python, gestão de ambientes e rollback." },
    { title: "Algoritmos & IA", detail: "Estruturas de dados, otimização, redes neurais e modelagem matemática aplicada." },
  ],
  experiences: [
    {
      title: "Artificial Intelligence Engineer",
      company: "MindSIM · Brasil · Remoto",
      period: "mar. 2026 – ago. 2026 · 6 meses",
      highlights: [
        "Implantação de modelos de IA conhecidos, incluindo LLMs, CatBoost, TFT e Regressão Linear.",
        "Implementação de front-end para painel de otimização de simulação e busca por otimização de algoritmos para percursos e rotas de grafos.",
        "Criação de estruturas híbridas de IA e codificação paralela com modelos de IA para ganhar performance, reduzir tempo de entrega e acelerar investigação técnica.",
        "Uso de fórmulas matemáticas de autoria própria para resolução de tarefas e revisão bibliográfica de artigos em inglês sobre otimização de algoritmos com IA.",
        "Uso de ferramentas complementares de programação para investigação e otimização, incluindo Visual Studio Code, Codex e ChatGPT, além de protocolos de autoria própria para preparar a produção de código de IA.",
      ],
    },
    {
      title: "Desenvolvedor de Software",
      company: "Diamond Service Informática LTDA · Stimulsoft",
      period: "2025",
      highlights: [
        "Desenvolvimento e manutenção de geradores de relatórios complexos com foco em precisão de dados.",
        "Otimização de queries e processos de backend para melhorar a geração de documentos.",
      ],
    },
    {
      title: "Desenvolvedor Full-Stack & DevOps Freelancer",
      company: "Projetos internacionais · Austrália e Brasil",
      period: "2025",
      highlights: [
        "Entrega e deploy de aplicações web completas em Python, Node.js e React.",
        "Automação de ambientes e deployment para reduzir tempo de entrega e erro humano.",
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      name: "Clarify",
      label: "Private software project",
      description: "A private desktop application for structured text and JSON workflows. Technical details are available on request.",
      href: undefined,
    },
    {
      name: "Protocolo Simplicidade",
      label: "Governança de desenvolvimento",
      description: "Framework próprio para práticas de segurança, qualidade, documentação e rollback em projetos solo e de produção.",
      href: "https://github.com/JosueAmaral15/protocolos-simplicidade",
    },
  ],
  education: [
    "Tecnologia em Sistemas de Computação · Universidade Federal Fluminense (2021–2024)",
    "Mestrado em Computação, foco em IA aplicada à Saúde · não concluído",
  ],
  stack: ["Python", "TypeScript", "React", "Next.js", "Node.js", "Docker", "GitHub Actions", "Linux", "PostgreSQL", "MongoDB"],
};
