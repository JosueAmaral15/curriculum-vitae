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
    github: "https://github.com/JosueAmaral15",
    linkedin: "https://www.linkedin.com/in/josueamaral25/",
    whatsapp: "https://wa.me/5521999526162",
    lattes: "http://lattes.cnpq.br/6814784579109841",
    geogebra: "https://www.geogebra.org/u/josueamaral15",
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
      label: "System Management JSON Files",
      description: "Gestão de arquivos JSON complexos, com arquitetura robusta e manipulação eficiente de dados estruturados.",
      href: "https://github.com/JosueAmaral15",
    },
    {
      name: "Protocolo Simplicidade",
      label: "Governança de desenvolvimento",
      description: "Framework próprio para práticas de segurança, qualidade, documentação e rollback em projetos solo e de produção.",
      href: "https://github.com/JosueAmaral15",
    },
  ],
  education: [
    "Tecnologia em Sistemas de Computação · Universidade Federal Fluminense (2021–2024)",
    "Mestrado em Computação, foco em IA aplicada à Saúde · não concluído",
  ],
  stack: ["Python", "TypeScript", "React", "Next.js", "Node.js", "Docker", "GitHub Actions", "Linux", "PostgreSQL", "MongoDB"],
};
