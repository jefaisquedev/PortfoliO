import lovetap from "./assets/lovetap.png";
import visionduel from "./assets/visionduel.png";
import lumora from "./assets/lumora.png";
import bugemon from "./assets/bugemon.png";
import bddproject from "./assets/bdd.png";

export type Project = {
  id: number;
  title: string;
  subtitle: string;
  tags: string[];
  image: string;
  imagePosition?: string;
  shortDesc: string;
  fullDesc: string;
  problem: string;
  tech: string[];
  demo: string;
  github: string;
  /** Lien direct vers le projet. Si renseigné, un clic sur la carte ouvre ce lien. */
  link?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "LOVETAP — Interface Web",
    subtitle: "Application de gestion relationnelle temps-réel",
    tags: ["React", "Node.js", "PrismaORM", "Redis", "JWT Auth", "Docker"],
    image: lovetap,
    imagePosition: "center 20%",
    shortDesc: "Application web temps-réel de gestion de tâches en équipe avec tableaux Kanban et drag-and-drop.",
    fullDesc: "LoveTap est une application web pensée mobile collaborative permettant à deux personnes d'intéragir en temps réel à l'aide de différents outils implémentés. Capsules temporelles avec ouverture programmée, partage d'humeur, liaison âme-soeur. Interface pensée pour la mise en relation éfficace et faciliter les échanges.",
    problem: "J'ai conçu ce projet pour expérimenter la mise en place d'une application web temps-réel avec une architecture moderne et scalable.",
    tech: ["React 18", "Node.js", "Express", "PrismaORM", "Redis", "JWT Auth", "Docker"],
    demo: "#",
    github: "#",
  },
{
  id: 2,
  title: "LUMORA — Site E-commerce",
  subtitle: "Boutique en ligne mise à la vente (côté administrateur)",
  tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "shadcn/ui"],
  image: lumora,
  shortDesc: "Application e-commerce complète pour la marque fictive LUMORA : catalogue, fiches produit, panier, wishlist et back-office admin.",
  fullDesc: "Projet de démonstration full-stack front pour une marque de cosmétiques véganes. La vitrine propose une page d’accueil animée, un catalogue filtrable (catégories, type de peau, prix), des fiches produit détaillées, un panier, une liste de souhaits, des pages marque (Our Story, Why LUMORA) et un parcours utilisateur (connexion, inscription, mot de passe oublié). Un espace admin (/admin) permet de gérer l’inventaire, créer/éditer des produits avec upload multi-images, suivre les clients et configurer les paramètres — le tout persisté en localStorage côté navigateur. Stack moderne : Next.js 16 (App Router), React 18, TypeScript, Tailwind CSS et composants shadcn/ui (Radix UI). Prêt pour un déploiement Netlify.",
  problem: "Concevoir une expérience d’achat en ligne moderne et crédible pour une marque beauté, avec une vitrine soignée et un back-office produit exploitable, sans backend lourd en phase de prototypage.",
  tech: ["Next.js 16 (App Router)", "React 18", "TypeScript", "Tailwind CSS", "shadcn/ui (Radix UI)", "react-hook-form + Zod", "Motion (animations)", "Recharts", "localStorage (CRUD admin)", "Netlify (déploiement)"],
  demo: "https://pr-sentation-template.vercel.app/",
  github: "https://github.com/EkueAYITE/Pr-sentation_Template",
},
  {
    id: 3,
    title: "BUGEMON — Application",
    subtitle: "Jeu de combats similaire à Pokémon à réaliser pour un projet universitaire",
    tags: ["JavaScript", "Maven", "PostgreSQL", "Docker", "JWT"],
    image: bugemon,
    shortDesc: "Backend complet avec authentification JWT, CRUD articles, commentaires et upload de fichiers.",
    fullDesc: "DevBlog API est une API RESTful robuste exposant des endpoints pour gérer articles, commentaires, tags, et utilisateurs. Authentification JWT avec refresh tokens, upload d'images via Multer, pagination cursor-based, mise en cache Redis et documentation Swagger complète.",
    problem: "Concevoir un jeu de combats similaire à Pokémon, réalisé en dernière année de bachelier dans un groupe de 10 personnes.",
    tech: ["Maven", "Java", "PostgreSQL", "Docker", "JWT", "JUnit", "JavaFX", "GSON"],
    demo: "#",
    github: "#",
  },
  {
    id: 4,
    title: "VISION-DUEL — Interface Web",
    subtitle: "Certification et comparaison de modèles IA (chat / pas chat)",
    tags: ["React", "Vite", "Flask", "PyTorch", "Pillow", "ngrok"],
    image: visionduel,
    shortDesc: "Application web pour certifier une IA de classification d'images et comparer deux modèles via duel, stress test et incertitude.",
    fullDesc: "Vision-Duel est une application web interactive permettant de comparer deux modèles de classification d'images (chat / pas chat) à travers trois scénarios de test : duel direct, stress test et analyse d'incertitude. Le frontend Vite/React (port 3000) communique avec un backend Flask (port 5000) qui héberge les modèles PyTorch. L'architecture prévoit une démonstration publique via ngrok et génération de QR code pour les visiteurs en stand.",
    problem: "Comment évaluer et comparer objectivement des modèles de vision par l'interaction utilisateur, dans un contexte de démonstration publique (stand) avec accès mobile simple via QR code ?",
    tech: ["React", "Vite", "Flask", "Flask-CORS", "PyTorch", "Pillow", "Python", "ngrok"],
    demo: "#",
    github: "#",
  },
  {
    id: 5,
    title: "STIB, l'ultime frontière — Application CLI",
    subtitle: "Planificateur d'itinéraires multimodaux en temps réel (STIB, TEC, De Lijn, SNCB)",
    tags: ["Java", "Maven", "Dijkstra", "GTFS", "JUnit"],
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=480&fit=crop&auto=format",
    shortDesc: "Application Java de recherche d'itinéraires sur le réseau belge (STIB, TEC, De Lijn, SNCB) avec Dijkstra adapté aux horaires GTFS.",
    fullDesc: "ProjetAlgo2 construit un graphe temporel à partir de données GTFS (CSV) couvrant quatre opérateurs belges : 67 635 arrêts, ~19 M arêtes (transport + marche). L'algorithme de Dijkstra est adapté pour minimiser le temps d'arrivée en intégrant horaires, temps d'attente, correspondances (pénalité 180–300 s), passage à minuit et marche à pied (Haversine, seuil 800 m). Optimisations : indexation spatiale 100×100, mapping stopId → entiers, heures en secondes. Interface CLI interactive avec recherche simple ou avancée (modes, compagnies, distance de marche, nb de changements). Suite de 24 tests JUnit 5.",
    problem: "Comment modéliser un réseau de transport multimodal à l'échelle nationale et calculer l'itinéraire le plus rapide en temps quasi réel (~140 ms), en conciliant contraintes horaires, préférences utilisateur et performance mémoire ?",
    tech: ["Java 17", "Maven", "JUnit 5", "Dijkstra", "GTFS / CSV", "Haversine", "Index spatial", "PriorityQueue", "TransportGraph"],
    demo: "#",
    github: "https://github.com/ilyass-oa/ProjetAlgo2",
  },
  {
    id: 6,
    title: "ProjetBDD — Application Web",
    subtitle: "Jeu RPG web avec base de données relationnelle PostgreSQL à réaliser pour un projet universitaire",
    tags: ["PHP", "PostgreSQL", "PDO"],
    image: bddproject,
    shortDesc: "Application web RPG : comptes joueurs, personnages, combats, quêtes, inventaire et PNJ, le tout piloté par une base PostgreSQL.",
    fullDesc: "ProjetBDD est une application web PHP connectée à PostgreSQL modélisant un univers RPG complet. Les joueurs s'inscrivent, créent des personnages (classes, stats), combattent des monstres, gèrent un inventaire (armes, armures, potions, artefacts), acceptent des quêtes et interagissent avec des PNJ. Le schéma relationnel couvre l'héritage d'objets, les relations many-to-many (personnage/sort, personnage/quête) et les récompenses de loot. Plus de 1 000 personnages, 190 quêtes, 100 monstres et 150 objets sont chargés via des scripts Python (CSV, JSON, XML).",
    problem: "Concevoir et exploiter une base relationnelle riche (normalisation, contraintes, jointures complexes) dans un contexte concret, au-delà d'exemples académiques simplistes.",
    tech: ["PHP", "PostgreSQL", "PDO", "Python", "Tailwind CSS", "HTML/CSS", "JSON", "XML", "CSV"],
    demo: "#",
    github: "https://github.com/ambamba01/ProjetBDD",
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
