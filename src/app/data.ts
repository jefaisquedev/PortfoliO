import lovetap from "./assets/LoveTap.png";

export type ProjectCategory = "Web" | "Mobile" | "CLI" | "API";

export type Project = {
  id: number;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  imagePosition?: string;
  shortDesc: string;
  fullDesc: string;
  problem: string;
  tech: string[];
  demo: string;
  github: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "LoveTap",
    subtitle: "Application de gestion relationnelle temps-réel",
    category: "Web",
    tags: ["React", "Node.js", "PrismaORM", "Redis", "JWT Auth", "Docker"],
    image: lovetap,
    imagePosition: "center 20%",
    shortDesc: "Application web temps-réel de gestion de tâches en équipe avec tableaux Kanban et drag-and-drop.",
    fullDesc: "LoveTap est une application web pensée mobile collaborative permettant à deux personnes d'intéragir en temps réel à l'aide de différents outils implémentés. Capsules temporelles avec ouverture programmée, partage d'humeur, liaison âme-soeur. Interface pensée pour la mise en relation éfficace et faciliter les échanges.",
    problem: "Ce projet ne répond pas forcément à un besoin réel mais a été conçu pour expérimenter la mise en place d'une application web temps-réel avec une architecture moderne et scalable.",
    tech: ["React 18", "Node.js", "Express", "PrismaORM", "Redis", "Socket.io", "JWT Auth", "Docker"],
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Site e-commerce",
    subtitle: "Outil de vente en ligne",
    category: "Web",
    tags: ["Python", "Click", "OpenWeatherMap"],
    image: "https://images.unsplash.com/photo-1601134467661-3d775b999c5b?w=800&h=480&fit=crop&auto=format",
    shortDesc: "Script Python affichant météo actuelle et prévisions 7 jours en terminal avec coloration syntaxique.",
    fullDesc: "WeatherCLI est un outil en ligne de commande développé en Python qui affiche la météo actuelle, les prévisions sur 7 jours, des graphiques ASCII et des alertes météo en temps réel. Interface terminal colorée via la bibliothèque Rich, données issues de l'API OpenWeatherMap.",
    problem: "Besoin d'un accès rapide aux données météo sans quitter le terminal lors d'une session de développement, sans surcharge d'une application graphique.",
    tech: ["Python 3.11", "Click", "Rich", "OpenWeatherMap API", "Requests", "pytest", "pip"],
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    title: "DevBlog API",
    subtitle: "API RESTful pour blog de développeur",
    category: "API",
    tags: ["Express", "PostgreSQL", "Docker", "JWT"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=480&fit=crop&auto=format",
    shortDesc: "Backend complet avec authentification JWT, CRUD articles, commentaires et upload de fichiers.",
    fullDesc: "DevBlog API est une API RESTful robuste exposant des endpoints pour gérer articles, commentaires, tags, et utilisateurs. Authentification JWT avec refresh tokens, upload d'images via Multer, pagination cursor-based, mise en cache Redis et documentation Swagger complète.",
    problem: "Concevoir une API scalable, sécurisée et bien documentée pour alimenter un frontend React de blog technique, tout en appliquant les bonnes pratiques backend.",
    tech: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "JWT", "Redis", "Docker", "Swagger UI"],
    demo: "#",
    github: "#",
  },
  {
    id: 4,
    title: "DataViz Dashboard",
    subtitle: "Tableau de bord analytique interactif",
    category: "Web",
    tags: ["React", "D3.js", "Python", "FastAPI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=480&fit=crop&auto=format",
    shortDesc: "Dashboard de visualisation de données avec graphiques interactifs et pipeline de traitement Python.",
    fullDesc: "Dashboard analytique permettant de visualiser des jeux de données volumineux via des graphiques interactifs (courbes, histogrammes, heatmaps). Pipeline de traitement Python côté backend, filtres dynamiques cross-graphiques, export en CSV/PNG et mode comparaison temporelle.",
    problem: "Rendre des données CSV complexes accessibles et lisibles à des utilisateurs non techniques via une interface moderne, rapide et responsive.",
    tech: ["React", "D3.js", "Recharts", "Python", "FastAPI", "Pandas", "NumPy", "PostgreSQL"],
    demo: "#",
    github: "#",
  },
  {
    id: 5,
    title: "GoURL Shortener",
    subtitle: "Service de raccourcissement d'URL ultra-rapide",
    category: "API",
    tags: ["Go", "Redis", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=480&fit=crop&auto=format",
    shortDesc: "Microservice haute performance de raccourcissement d'URL avec statistiques de clics en temps réel.",
    fullDesc: "GoURL Shortener est un microservice haute performance développé en Go. Raccourcissement d'URL avec alias personnalisés, redirection instantanée via cache Redis, suivi de clics avec géolocalisation, génération de QR codes et tableau de bord analytique temps réel.",
    problem: "Explorer les performances natives de Go pour construire un service web à haute charge, et mettre en pratique les patterns de microservices (cache, queue, metrics).",
    tech: ["Go", "Gin Framework", "Redis", "PostgreSQL", "Docker", "QR Code gen", "Prometheus"],
    demo: "#",
    github: "#",
  },
  {
    id: 6,
    title: "DevConnects",
    subtitle: "Réseau social mobile pour développeurs",
    category: "Mobile",
    tags: ["React Native", "Firebase", "Expo"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=480&fit=crop&auto=format",
    shortDesc: "Application mobile de networking pour devs : profils, posts, snippets de code et messagerie.",
    fullDesc: "DevConnects est une application mobile React Native permettant aux développeurs de se connecter, partager des projets, poster des snippets de code avec coloration syntaxique, et discuter en messagerie temps réel. Feed personnalisé basé sur les technologies maîtrisées.",
    problem: "LinkedIn est trop généraliste pour les développeurs. Une application centrée sur le code, les projets et la communauté dev était absente du marché mobile.",
    tech: ["React Native", "Expo", "Firebase", "Firestore", "Cloud Functions", "Redux Toolkit"],
    demo: "#",
    github: "#",
  },
];

export const skillCategories = [
  {
    name: "Front-end",
    icon: "Monitor" as const,
    skills: [
      "React", "TypeScript", "Next.js", "Tailwind CSS", "HTML / CSS", "Responsive Design", "UI/UX",
    ],
  },
  {
    name: "Back-end",
    icon: "Server" as const,
    skills: [
      "Node.js", "Express", "Python", "FastAPI", "REST API", "GraphQL",
    ],
  },
  {
    name: "Bases de données",
    icon: "Database" as const,
    skills: [
      "PostgreSQL", "Prisma ORM", "NoSQL",
      "Redis", "MySQL", "SQLite",
    ],
  },
  {
    name: "DevOps & Outils",
    icon: "Cpu" as const,
    skills: [
      "Docker", "Git / GitHub", "GitHub Actions",
      "Linux", "AWS S3", "CI/CD", "Testing (pytest)",
    ],
  },
];

export const ALL_CATEGORIES: Array<"Tous" | ProjectCategory> = ["Tous", "Web", "API", "Mobile", "CLI"];
