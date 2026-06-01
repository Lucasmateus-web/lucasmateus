export const profile = {
  name: "Lucas Mateus",
  role: "Desenvolvedor Full Stack",
  tagline: "Web, mobile, dados e automação com design moderno e foco em performance.",
  location: "Recife - Pernambuco",
  email: "lucasmateus.dasilva@outlook.com",
  whatsapp: "(81) 9 9982-8308",
  whatsappUrl:
    "https://wa.me/5581999828308?text=Ol%C3%A1%2C%20Lucas!%20Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.",
  github: "https://github.com/Lucasmateus-web",
  linkedin: "https://www.linkedin.com/in/lucas-mateus-b8abaa30b/",
  available: true,
}

export const stats = [
  { value: 25, suffix: "+", label: "Projetos construídos" },
  { value: 12, suffix: "+", label: "Tecnologias dominadas" },
  { value: 3, suffix: " anos", label: "de experiência" },
  { value: 100, suffix: "%", label: "Foco em qualidade" },
]

export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Flutter",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "Figma",
  "Docker",
  "Pandas",
  "Supabase",
]

export type SkillGroup = {
  title: string
  description: string
  accent: "violet" | "mint"
  skills: { name: string; level: number }[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Front-end & Web",
    description: "Interfaces rápidas, acessíveis e responsivas.",
    accent: "violet",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "UI / UX Design", level: 82 },
    ],
  },
  {
    title: "Back-end & Dados",
    description: "APIs robustas e pipelines de dados.",
    accent: "mint",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 87 },
      { name: "PostgreSQL", level: 80 },
      { name: "Análise de Dados", level: 78 },
    ],
  },
  {
    title: "Mobile & Automação",
    description: "Apps multiplataforma e fluxos automatizados.",
    accent: "violet",
    skills: [
      { name: "Flutter", level: 80 },
      { name: "React Native", level: 72 },
      { name: "Automação (Python)", level: 84 },
      { name: "Docker / DevOps", level: 68 },
    ],
  },
]

export type Project = {
  title: string
  category: string
  description: string
  tags: string[]
  accent: "violet" | "mint"
  link?: string
}

export const projects: Project[] = [
  {
    title: "Nexus Dashboard",
    category: "Web App",
    description:
      "Painel de analytics em tempo real com visualizações interativas, filtros avançados e exportação de relatórios.",
    tags: ["Next.js", "TypeScript", "Recharts", "Supabase"],
    accent: "violet",
  },
  {
    title: "FlowPay Mobile",
    category: "Mobile",
    description:
      "App de finanças pessoais multiplataforma com categorização automática de gastos e metas inteligentes.",
    tags: ["Flutter", "Dart", "Firebase"],
    accent: "mint",
  },
  {
    title: "DataPulse",
    category: "Dados & ML",
    description:
      "Pipeline de ETL e dashboard de previsão de demanda usando Pandas e modelos de séries temporais.",
    tags: ["Python", "Pandas", "scikit-learn"],
    accent: "violet",
  },
  {
    title: "AutoDesk Bot",
    category: "Automação",
    description:
      "Conjunto de scripts de automação que reduziu tarefas repetitivas de equipe em mais de 70%.",
    tags: ["Python", "Selenium", "Cron"],
    accent: "mint",
  },
  {
    title: "Lumina Commerce",
    category: "Web App",
    description:
      "E-commerce headless com checkout otimizado, busca instantânea e CMS para gestão de catálogo.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    accent: "violet",
  },
  {
    title: "Studio Portfolio",
    category: "UI / UX",
    description:
      "Site institucional com micro-interações, modo escuro e animações fluidas baseadas em scroll.",
    tags: ["React", "Framer Motion", "Figma"],
    accent: "mint",
  },
]

export type Experience = {
  role: string
  company: string
  period: string
  description: string
  current?: boolean
}

export const experiences: Experience[] = [
  {
    role: "Assistente de Compras",
    company: "ENGEMAN",
    period: "OUT/2025 — ABR/2026",
    description:
      "Atuação com compras, fornecedores, homologações, documentação, análise de dados e melhoria de processos internos, aproximando tecnologia do dia a dia com dashboards, automações e soluções de apoio operacional.",
  },
  {
    role: "Estagiário",
    company: "ENGEMAN",
    period: "SET/2025 — OUT/2025",
    description:
      "Acompanhamento de processos internos, controle de homologações, análise de dados e desenvolvimento de melhorias operacionais utilizando Excel, Power BI e automações.",
  },
  {
    role: "Jovem Aprendiz",
    company: "ENGEMAN",
    period: "OUT/2023 — MAI/2025",
    description:
      "Apoio às rotinas administrativas da área de Compras e Suprimentos, organização documental, acompanhamento de fornecedores e suporte operacional.",
  },
]

export type Education = {
  course: string
  institution: string
  period: string
  description: string
}

export const education: Education[] = [
  {
    course: "Engenharia de Software",
    institution: "WYDEN UNIFAVIP",
    period: "Cursando",
    description: "Formação superior com foco em desenvolvimento de software, banco de dados, lógica, arquitetura e soluções digitais.",
  },
  {
    course: "Análise de Dados",
    institution: "ALURA",
    period: "Concluído",
    description: "Estudos voltados a organização, interpretação e visualização de dados para apoio à tomada de decisão.",
  },
  {
    course: "Design UI/UX",
    institution: "ALURA",
    period: "Concluído",
    description: "Formação complementar com foco em experiência do usuário, usabilidade e construção de interfaces digitais.",
  },
  {
    course: "Fundamentos de Design",
    institution: "ALURA",
    period: "Concluído",
    description: "Base em composição, cores, tipografia e princípios visuais aplicados a produtos digitais.",
  },
]

export const processSteps = [
  {
    number: "01",
    title: "Descoberta",
    description: "Antes de começar, busco entender bem o contexto do projeto, o objetivo da solução e o que realmente precisa ser resolvido.",
  },
  {
    number: "02",
    title: "Design",
    description: "Organizo a estrutura da interface, penso na experiência do usuário e defino uma direção visual coerente com a proposta.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description: "Transformo a ideia em algo funcional, com atenção à organização do código, desempenho e clareza da implementação.",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Faço os ajustes finais, valido o resultado e preparo o projeto para uso, apresentação ou evolução futura.",
  },
]

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Projetos", href: "#projetos" },
  { label: "Experiência", href: "#experiencia" },
]
