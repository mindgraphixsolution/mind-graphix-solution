
import { 
  Palette, Code, Smartphone, Video, ShoppingCart, BarChart, 
  Lightbulb, Terminal, LineChart, Headphones, Search, PenTool, Rocket, 
  Home, Info, Briefcase, Image, Users, Mail
} from 'lucide-react';
import { NavItem, Service, PortfolioItem, TeamMember, Statistic, Testimonial, BlogPost } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', href: '/', icon: Home },
  { label: 'À propos', href: '/about', icon: Info },
  { label: 'Services', href: '/services', icon: Briefcase },
  { label: 'Portfolio', href: '/portfolio', icon: Image },
  { label: 'Équipe', href: '/team', icon: Users },
  { label: 'Contact', href: '/contact', icon: Mail },
];

// --- DATA: FRENCH ---
const SERVICES_FR: Service[] = [
  {
    id: "design-graphique",
    title: "Design Graphique",
    subtitle: "Identité visuelle & Communication",
    description: "Création d'identités visuelles percutantes, logos, supports print et éléments graphiques qui renforcent votre image de marque.",
    features: ["Création de logos", "Charte graphique", "Supports print", "Design réseaux sociaux", "Illustrations", "Retouche photo"],
    pricing: "À partir de 98.000 FCFA",
    duration: "3-7 jours",
    gradient: "from-pink-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    icon: Palette
  },
  {
    id: "developpement-web",
    title: "Développement Web",
    subtitle: "Sites & Applications sur mesure",
    description: "Sites web et applications sur mesure, performants et sécurisés, conçus avec les dernières technologies du marché (React, Node.js).",
    features: ["Sites responsives", "PWA", "CMS (WordPress, Strapi)", "API & Backend", "SEO technique", "Maintenance"],
    pricing: "À partir de 525.000 FCFA",
    duration: "2-6 semaines",
    gradient: "from-blue-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    icon: Code
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    subtitle: "Expériences utilisateur optimisées",
    description: "Interfaces intuitives et expériences utilisateur optimisées pour maximiser l'engagement et la conversion.",
    features: ["Recherche utilisateur", "Wireframes", "Design d'interfaces", "Tests d'utilisabilité", "Design systems", "Mobile First"],
    pricing: "À partir de 394.000 FCFA",
    duration: "1-4 semaines",
    gradient: "from-green-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
    icon: Smartphone
  },
  {
    id: "motion-design",
    title: "Motion Design",
    subtitle: "Animations & Vidéos captivantes",
    description: "Animations et vidéos captivantes pour dynamiser votre communication et renforcer votre storytelling.",
    features: ["Animations 2D/3D", "Vidéos promo", "Motion graphics", "Logo animé", "Montage vidéo", "VFX"],
    pricing: "À partir de 262.000 FCFA",
    duration: "1-3 semaines",
    gradient: "from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    icon: Video
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    subtitle: "Solutions de vente en ligne",
    description: "Solutions e-commerce complètes pour vendre en ligne avec une expérience client optimisée.",
    features: ["Boutiques en ligne", "Paiements sécurisés", "Gestion stocks", "Dashboards", "Conversion", "Multi-devises"],
    pricing: "À partir de 787.000 FCFA",
    duration: "3-8 semaines",
    gradient: "from-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    icon: ShoppingCart
  },
  {
    id: "seo-marketing",
    title: "SEO & Marketing",
    subtitle: "Visibilité & Acquisition",
    description: "Stratégies digitales pour améliorer votre visibilité en ligne et générer plus de leads qualifiés.",
    features: ["Audit SEO", "Optimisation", "Contenu", "Google Ads", "Analytics", "Social Media"],
    pricing: "À partir de 197.000 FCFA/mois",
    duration: "Suivi continu",
    gradient: "from-yellow-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
    icon: BarChart
  }
];

const SERVICES_EN: Service[] = [
  {
    id: "design-graphique",
    title: "Graphic Design",
    subtitle: "Visual Identity & Communication",
    description: "Creation of impactful visual identities, logos, print materials, and graphic elements that strengthen your brand image.",
    features: ["Logo Creation", "Brand Guidelines", "Print Materials", "Social Media Design", "Illustrations", "Photo Retouching"],
    pricing: "From 98,000 FCFA",
    duration: "3-7 days",
    gradient: "from-pink-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    icon: Palette
  },
  {
    id: "developpement-web",
    title: "Web Development",
    subtitle: "Custom Sites & Applications",
    description: "High-performance, secure custom websites and applications designed with the latest market technologies (React, Node.js).",
    features: ["Responsive Sites", "PWA", "CMS Integration", "API & Backend", "Technical SEO", "Maintenance"],
    pricing: "From 525,000 FCFA",
    duration: "2-6 weeks",
    gradient: "from-blue-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    icon: Code
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    subtitle: "Optimized User Experiences",
    description: "Intuitive interfaces and optimized user experiences to maximize engagement and conversion.",
    features: ["User Research", "Wireframes", "Interface Design", "Usability Testing", "Design Systems", "Mobile First"],
    pricing: "From 394,000 FCFA",
    duration: "1-4 weeks",
    gradient: "from-green-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
    icon: Smartphone
  },
  {
    id: "motion-design",
    title: "Motion Design",
    subtitle: "Captivating Animations & Video",
    description: "Captivating animations and videos to boost your communication and strengthen your storytelling.",
    features: ["2D/3D Animation", "Promo Videos", "Motion Graphics", "Animated Logos", "Video Editing", "VFX"],
    pricing: "From 262,000 FCFA",
    duration: "1-3 weeks",
    gradient: "from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    icon: Video
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    subtitle: "Online Sales Solutions",
    description: "Complete e-commerce solutions to sell online with an optimized customer experience.",
    features: ["Online Stores", "Secure Payments", "Inventory Mgmt", "Analytics Dash", "Conversion Opt", "Multi-currency"],
    pricing: "From 787,000 FCFA",
    duration: "3-8 weeks",
    gradient: "from-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    icon: ShoppingCart
  },
  {
    id: "seo-marketing",
    title: "SEO & Marketing",
    subtitle: "Visibility & Acquisition",
    description: "Digital strategies to improve your online visibility and generate more qualified leads.",
    features: ["SEO Audit", "Optimization", "Content Strategy", "Google Ads", "Analytics", "Social Media"],
    pricing: "From 197,000 FCFA/mo",
    duration: "Ongoing",
    gradient: "from-yellow-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
    icon: BarChart
  }
];

const TESTIMONIALS_FR: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Koné",
    role: "Directrice Marketing",
    company: "FasoTech",
    content: "Mind Graphix a transformé notre vision en une réalité digitale époustouflante. Leur attention aux détails est inégalée.",
    rating: 5,
    image: "https://placehold.co/200x200/5e35b1/ffffff?text=SK"
  },
  {
    id: 2,
    name: "Marc Ouedraogo",
    role: "CEO",
    company: "Immo Burkina",
    content: "Le site web qu'ils ont conçu a doublé nos leads en 3 mois. Une équipe professionnelle et réactive.",
    rating: 5,
    image: "https://placehold.co/200x200/2563eb/ffffff?text=MO"
  },
  {
    id: 3,
    name: "Aïcha Diallo",
    role: "Fondatrice",
    company: "Beauty Queen",
    content: "Le branding qu'ils ont créé pour ma marque est juste magnifique. Je recommande vivement !",
    rating: 5,
    image: "https://placehold.co/200x200/db2777/ffffff?text=AD"
  }
];

const TESTIMONIALS_EN: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Koné",
    role: "Marketing Director",
    company: "FasoTech",
    content: "Mind Graphix transformed our vision into a stunning digital reality. Their attention to detail is unmatched.",
    rating: 5,
    image: "https://placehold.co/200x200/5e35b1/ffffff?text=SK"
  },
  {
    id: 2,
    name: "Marc Ouedraogo",
    role: "CEO",
    company: "Immo Burkina",
    content: "The website they designed doubled our leads in 3 months. A professional and responsive team.",
    rating: 5,
    image: "https://placehold.co/200x200/2563eb/ffffff?text=MO"
  },
  {
    id: 3,
    name: "Aïcha Diallo",
    role: "Founder",
    company: "Beauty Queen",
    content: "The branding they created for my brand is just magnificent. I highly recommend them!",
    rating: 5,
    image: "https://placehold.co/200x200/db2777/ffffff?text=AD"
  }
];

const PORTFOLIO_FR: PortfolioItem[] = [
  {
    id: 1,
    title: 'Plateforme Éducative LMS',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
    description: 'Système de gestion de l\'apprentissage complet pour une université privée.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    client: 'EduTech Faso'
  },
  {
    id: 2,
    title: 'Identité Tech Startup',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800',
    description: 'Branding minimaliste et futuriste pour une fintech.',
    tags: ['Branding', 'Illustrator', 'Figma'],
    client: 'NovaPay'
  },
  {
    id: 3,
    title: 'Boutique Mode & Bio',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    description: 'Shopify headless avec prévisualisation 3D des produits.',
    tags: ['Shopify', 'Three.js', 'Next.js'],
    client: 'Koco Bio'
  }
];

const PORTFOLIO_EN: PortfolioItem[] = [
  {
    id: 1,
    title: 'LMS Education Platform',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
    description: 'Complete Learning Management System for a private university.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    client: 'EduTech Faso'
  },
  {
    id: 2,
    title: 'Tech Startup Identity',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800',
    description: 'Minimalist and futuristic branding for a fintech.',
    tags: ['Branding', 'Illustrator', 'Figma'],
    client: 'NovaPay'
  },
  {
    id: 3,
    title: 'Fashion & Organic Store',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    description: 'Headless Shopify with 3D product preview.',
    tags: ['Shopify', 'Three.js', 'Next.js'],
    client: 'Koco Bio'
  }
];

// --- BLOG POSTS ---
const BLOG_POSTS_FR: BlogPost[] = [
  {
    id: '1',
    title: 'L\'IA au service du Design',
    excerpt: 'Comment l\'intelligence artificielle transforme le métier de designer en 2025.',
    content: 'Dans le monde du design graphique, l\'intelligence artificielle générative n\'est plus une menace, mais un allié puissant...',
    category: 'Tech',
    author: 'Badior OUATTARA',
    date: '15 Mars 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    featured: true,
    tags: ['IA', 'Design', 'Futur']
  },
  {
    id: '2',
    title: 'Le Minimalisme Digital',
    excerpt: 'Pourquoi moins c\'est plus dans le web moderne.',
    content: 'Le minimalisme n\'est pas seulement une absence de décoration, c\'est une présence de clarté...',
    category: 'Design',
    author: 'Émilie Rousseau',
    date: '10 Mars 2025',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
    tags: ['UX', 'Minimalisme']
  }
];

const BLOG_POSTS_EN: BlogPost[] = [
  {
    id: '1',
    title: 'AI in Design Service',
    excerpt: 'How artificial intelligence is transforming the designer\'s job in 2025.',
    content: 'In the world of graphic design, generative AI is no longer a threat, but a powerful ally...',
    category: 'Tech',
    author: 'Badior OUATTARA',
    date: 'March 15, 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    featured: true,
    tags: ['AI', 'Design', 'Future']
  },
  {
    id: '2',
    title: 'Digital Minimalism',
    excerpt: 'Why less is more in the modern web.',
    content: 'Minimalism is not just an absence of decoration, it is a presence of clarity...',
    category: 'Design',
    author: 'Émilie Rousseau',
    date: 'March 10, 2025',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
    tags: ['UX', 'Minimalism']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Badior OUATTARA',
    role: 'Lead Developer & Graphiste',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400',
    socials: { linkedin: '#', behance: '#' }
  },
  {
    id: 2,
    name: 'Faïz Phillippe SANON',
    role: 'Senior Developer',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=400',
    socials: { github: '#', linkedin: '#' }
  },
  {
    id: 3,
    name: 'Émilie Rousseau',
    role: 'Lead UX/UI Designer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    socials: { dribbble: '#', behance: '#' }
  },
  {
    id: 4,
    name: 'Antoine Morel',
    role: 'Motion Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    socials: { dribbble: '#' }
  }
];

export const STATISTICS: Statistic[] = [
  { label: 'Projets Réussis', value: 150, suffix: '+' },
  { label: 'Clients Satisfaits', value: 98, suffix: '%' },
  { label: 'Années d\'Expérience', value: 5, suffix: '+' },
  { label: 'Heures de Code', value: 12000, suffix: '+' },
];

export const FAQS_FR = [
  { question: "Combien coûte un site internet ?", answer: "Le coût dépend de la complexité. Un site vitrine commence autour de 250.000 FCFA, tandis qu'un e-commerce complet nécessite un budget plus conséquent. Utilisez notre simulateur pour une estimation précise." },
  { question: "Quels sont vos délais ?", answer: "En moyenne, un site vitrine prend 2 semaines. Des projets plus complexes comme des applications sur mesure peuvent prendre 4 à 8 semaines." },
  { question: "Offrez-vous un service de maintenance ?", answer: "Oui ! Nous proposons des forfaits de maintenance mensuels pour assurer la sécurité, les mises à jour et les sauvegardes de votre site." },
  { question: "Le site sera-t-il optimisé pour Google (SEO) ?", answer: "Absolument. Tous nos sites sont conçus avec les meilleures pratiques SEO techniques : vitesse, structure sémantique, balises meta et responsive design." },
  { question: "Puis-je mettre à jour le site moi-même ?", answer: "Oui, nous intégrons un panneau d'administration (CMS) facile à utiliser qui vous permet de modifier textes et images sans toucher au code." },
  { question: "Acceptez-vous les paiements en plusieurs fois ?", answer: "Oui, nous demandons généralement un acompte de 40% au démarrage, 30% à la validation du design, et le solde à la livraison." }
];

export const FAQS_EN = [
  { question: "How much does a website cost?", answer: "Cost depends on complexity. A showcase site starts around 250,000 FCFA. Use our calculator for a precise estimate." },
  { question: "What are your deadlines?", answer: "On average, a showcase site takes 2 weeks. Complex projects can take 4-8 weeks." },
  { question: "Do you offer maintenance?", answer: "Yes! We offer monthly maintenance packages for security, updates, and backups." },
  { question: "Will the site be SEO optimized?", answer: "Absolutely. All our sites are built with SEO best practices in mind." },
  { question: "Can I update the site myself?", answer: "Yes, we integrate an easy-to-use CMS for you to manage content." },
  { question: "Do you accept installment payments?", answer: "Yes, typically 40% upfront, 30% at design validation, and balance on delivery." }
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "250.000 FCFA",
    desc: "Idéal pour les petites entreprises.",
    features: ["Site Vitrine (1-5 pages)", "Design Responsive", "Formulaire", "SEO de base"]
  },
  {
    name: "Business",
    price: "500.000 FCFA",
    desc: "Pour les entreprises en croissance.",
    recommended: true,
    features: ["Site Dynamique", "CMS", "Design Premium", "SEO Avancé", "Support 1 mois"]
  },
  {
    name: "E-Commerce",
    price: "850.000 FCFA",
    desc: "Vendez vos produits en ligne.",
    features: ["Boutique complète", "Paiements sécurisés", "Stocks", "Dashboard", "Support 3 mois"]
  }
];

export const CONTACT_INFO = {
  address: "Secteur N°4, Bobo-Dioulasso, Burkina Faso",
  phone: "+226 01 51 11 46",
  email: "mindgraphixsolution@gmail.com",
  hours: "Lun - Sam: 09h - 18h"
};

export const DATA_BY_LANG = {
  fr: {
    services: SERVICES_FR,
    testimonials: TESTIMONIALS_FR,
    portfolio: PORTFOLIO_FR,
    faqs: FAQS_FR,
    team: TEAM_MEMBERS,
    blog: BLOG_POSTS_FR
  },
  en: {
    services: SERVICES_EN,
    testimonials: TESTIMONIALS_EN,
    portfolio: PORTFOLIO_EN,
    faqs: FAQS_EN,
    team: TEAM_MEMBERS,
    blog: BLOG_POSTS_EN
  }
};

// Default exports
export const SERVICES = SERVICES_FR;
export const TESTIMONIALS = TESTIMONIALS_FR;
export const PORTFOLIO_ITEMS = PORTFOLIO_FR;
export const FAQS = FAQS_FR;
// Added missing BLOG_POSTS export to fix the import error in mockDatabase.ts
export const BLOG_POSTS = BLOG_POSTS_FR;
