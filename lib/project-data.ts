export type ProjectPreview = "mobile" | "dashboard" | "portal" | "automation" | "website"

export type PortfolioProject = {
  title: string
  category: "Web App" | "Mobile" | "Dados & IA" | "Automação" | "UI / UX"
  description: string
  objective: string
  role: string
  tags: string[]
  features: string[]
  accent: "violet" | "mint"
  preview: ProjectPreview
  cover?: string
  link?: string
  github?: string
}

export const projectFilters = [
  "Todos",
  "Apps",
  "Web",
  "Dados",
  "Automação",
  "UI/UX",
] as const

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "NexFit",
    category: "Mobile",
    description: "Aplicativo fitness pensado para organizar treinos, acompanhar evolução e criar uma experiência mobile mais completa para alunos e personal trainers.",
    objective: "Criar uma experiência mobile clara para acompanhar treinos, rotina e progresso sem depender de controles espalhados.",
    role: "Produto digital, interface e desenvolvimento mobile.",
    tags: ["Firebase", "Supabase", "Flutter", "SQL"],
    features: ["Organização de treinos", "Acompanhamento de evolução", "Rotina de alunos", "Interface responsiva"],
    accent: "violet",
    preview: "mobile",
    cover: "/NexFit.png",
  },
  {
    title: "GlicLog",
    category: "Mobile",
    description: "Aplicativo para registrar medições de glicemia, acompanhar histórico e facilitar o controle diário de informações importantes de saúde.",
    objective: "Facilitar o registro recorrente de glicemia e oferecer uma leitura organizada da evolução dos dados.",
    role: "Concepção, UI/UX e desenvolvimento do aplicativo.",
    tags: ["Flutter", "Firebase", "SQL"],
    features: ["Registro de medições", "Histórico organizado", "Acompanhamento diário", "Interface acessível"],
    accent: "mint",
    preview: "mobile",
    cover: "/GlicLog.png",
  },
  {
    title: "Portal de Fornecedores",
    category: "Web App",
    description: "Sistema para centralizar documentos, informações e etapas de homologação de fornecedores em um fluxo mais organizado.",
    objective: "Reduzir controles manuais e tornar o acompanhamento de fornecedores mais claro para a operação.",
    role: "Mapeamento do fluxo, interface e desenvolvimento web.",
    tags: ["Java", "Python", "Next.js", "React", "SQL", "Firebase"],
    features: ["Cadastro de fornecedores", "Envio de documentos", "Status de homologação", "Consulta centralizada"],
    accent: "violet",
    preview: "portal",
  },
  {
    title: "Dashboard de Indicadores",
    category: "Dados & IA",
    description: "Painéis para visualizar dados, acompanhar indicadores e transformar informações operacionais em leitura rápida e clara.",
    objective: "Apoiar a tomada de decisão com indicadores reunidos em um painel de leitura simples e direta.",
    role: "Organização dos dados, definição dos indicadores e visualização.",
    tags: ["React", "Tailwind CSS", "Python"],
    features: ["Indicadores consolidados", "Filtros por período", "Leitura operacional", "Apoio à decisão"],
    accent: "mint",
    preview: "dashboard",
    cover: "/AquaMectris.png",
    link: "https://aquac-metrics.vercel.app/",
  },
  {
    title: "Clone da página Microsoft",
    category: "Web App",
    description: "Clone da página institucional da Microsoft desenvolvido para praticar estruturação de layout, estilização responsiva e interações com JavaScript.",
    objective: "Reproduzir a organização visual e os principais elementos da página da Microsoft usando tecnologias fundamentais da web.",
    role: "Estrutura HTML, estilização CSS e interações em JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    features: ["Layout responsivo", "Seções institucionais", "Navegação estruturada", "Interações com JavaScript"],
    accent: "violet",
    preview: "website",
    cover: "/Microsoft.png",
    link: "https://pagina-microsoft.vercel.app/",
  },
  {
    title: "Constrein",
    category: "Web App",
    description: "Portfólio institucional desenvolvido para apresentar a empresa, fortalecer sua presença profissional e comunicar seus serviços de forma clara e estratégica.",
    objective: "Organizar a presença digital da marca em uma experiência responsiva, direta e fácil de navegar.",
    role: "Interface, identidade visual aplicada e desenvolvimento front-end.",
    tags: ["Tailwind CSS", "React", "Python", "Figma"],
    features: ["Layout responsivo", "Apresentação de serviços", "Contato facilitado", "Navegação clara"],
    accent: "mint",
    preview: "website",
    cover: "/Constrein (2).png",
    link: "https://constrein.vercel.app/",
  },
  {
    title: "Ologix",
    category: "Web App",
    description: "IA integrada ao GlicLog para auxiliar no gerenciamento do controle glicêmico e no acompanhamento de pessoas com diabetes.",
    objective: "Criar uma interface profissional que comunique serviços e facilite o acesso às informações principais.",
    role: "UI/UX e desenvolvimento front-end.",
    tags: ["Next.js", "Tailwind", "Web"],
    features: ["Páginas institucionais", "Design responsivo", "Hierarquia visual", "Performance web"],
    accent: "violet",
    preview: "website",
    cover: "/OLOGIX.png",
    link: "https://ologix.vercel.app/",
  },
  {
    title: "Ikaros Solutions",
    category: "UI / UX",
    description: "Portfólio real voltado para a área elétrica, apresentando serviços e soluções com tecnologia inteligente.",
    objective: "Definir uma linguagem visual consistente e transformar a proposta da marca em uma interface fácil de compreender.",
    role: "Pesquisa visual, estrutura da interface e prototipação.",
    tags: ["Tailwind CSS", "React", "Python", "Figma"],
    features: ["Sistema visual", "Prototipação", "Organização de conteúdo", "Fluxos de navegação"],
    accent: "mint",
    preview: "website",
    cover: "/Karkachi.png",
    link: "https://ikarosolutions.vercel.app/",
  },
  {
    title: "Verde Floresta",
    category: "UI / UX",
    description: "Dashboard para controle de compras e dados dos compradores.",
    objective: "Criar uma apresentação digital mais clara para a marca, valorizando conteúdo e identidade sem excesso visual.",
    role: "Direção visual, arquitetura da informação e UI.",
    tags: ["Figma", "Python", "React", "Tailwind"],
    features: ["Identidade aplicada", "Layout editorial", "Responsividade", "Leitura simplificada"],
    accent: "violet",
    preview: "website",
    cover: "/VerdeFloresta.png",
    link: "https://verde-floresta.vercel.app/",
  },
]
