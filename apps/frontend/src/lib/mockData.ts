/**
 * ============================================================================
 * 📦 DONNÉES MOCKÉES (FALLBACKS) - Expérience Utilisateur Premium
 * ============================================================================
 * 
 * Ces données sont utilisées lorsque l'API backend n'est pas disponible.
 * Elles sont localisées en Français pour assurer une continuité de service
 * professionnelle et "nickel clean".
 * 
 * @author Mind Graphix Premium
 * @version 1.0.0
 */

export const MOCK_DATA = {
  hero: {
     titlePrefix: 'Solutions Innovantes pour',
     titleSpan: 'Entreprises Modernes',
     titleSuffix: 'avec Mind Graphix',
     description: 'Propulsez votre marque avec un design et une technologie de pointe. Nous transformons vos idées en réalité numérique.',
     ctaPrimary: 'Démarrer un Projet',
     ctaSecondary: 'En savoir plus',
     stats: [
       { label: 'Projets Terminés', value: 150 },
       { label: 'Clients Satisfaits', value: 85 },
       { label: 'Experts', value: 12 },
     ],
   },
  stats: [
    { id: '1', label: 'Projets Terminés', value: '150', suffix: '+', iconName: 'Activity' },
    { id: '2', label: 'Clients Satisfaits', value: '85', suffix: '', iconName: 'Globe2' },
    { id: '3', label: 'Experts', value: '12', suffix: '', iconName: 'Code2' },
    { id: '4', label: 'Années d\'Expérience', value: '5', suffix: '+', iconName: 'Server' },
  ],
  services: [
    { id: '1', title: 'Développement Web', description: 'Des sites web sur mesure conçus avec les technologies modernes.', icon: 'Globe', features: ['React/Next.js', 'Node.js', 'Responsive Design'], gradient: 'from-blue-500 to-cyan-500' },
    { id: '2', title: 'Design Graphique', description: 'Des visuels époustouflants pour l\'identité de votre marque.', icon: 'Palette', features: ['Logo Design', 'Branding', 'UI/UX'], gradient: 'from-purple-500 to-pink-500' },
    { id: '3', title: 'Marketing Digital', description: 'Développez votre présence en ligne et votre portée.', icon: 'BarChart', features: ['SEO', 'SEM', 'Social Media'], gradient: 'from-orange-500 to-red-500' },
  ],
  portfolio: [
    { id: '1', title: 'Plateforme E-commerce', category: 'web', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800', tags: ['Next.js', 'Stripe'], description: 'Une plateforme e-commerce complète avec gestion des stocks et paiements sécurisés.' },
    { id: '2', title: 'Identité de Marque', category: 'design', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800', tags: ['Branding', 'Illustrator'], description: 'Refonte complète de l\'identité visuelle pour une startup technologique.' },
    { id: '3', title: 'Application Mobile', category: 'app', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800', tags: ['React Native', 'Firebase'], description: 'Application mobile de livraison de repas avec suivi en temps réel.' },
    { id: '4', title: 'Site Institutionnel', category: 'web', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800', tags: ['Next.js', 'Tailwind'], description: 'Site institutionnel moderne pour un cabinet de conseil.' },
    { id: '5', title: 'MedConnect Pro', category: 'web', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', tags: ['Télémédecine', 'WebRTC'], description: 'Plateforme de télémédecine sécurisée connectant patients et praticiens.' },
    { id: '6', title: 'ImmoVision 360', category: 'web', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800', tags: ['Immobilier', '3D'], description: 'Système de gestion immobilière avec visites virtuelles.' },
    { id: '7', title: 'FinTrack Solution', category: 'app', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800', tags: ['Fintech', 'Sécurité'], description: 'Application de gestion financière optimisée.' },
    { id: '8', title: 'EduSphere LMS', category: 'web', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800', tags: ['E-learning', 'LMS'], description: 'Écosystème d\'apprentissage en ligne évolutif.' },
    { id: '9', title: 'Industrial IoT Hub', category: 'web', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', tags: ['IoT', 'Analytics'], description: 'Tableau de bord de monitoring industriel.' },
    { id: '10', title: 'UrbanRide App', category: 'app', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800', tags: ['Transport', 'IA'], description: 'Application de transport urbain intelligent.' },
    { id: '11', title: 'EcoSphere Dashboard', category: 'web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', tags: ['Ecotech', 'Big Data'], description: 'Interface de monitoring environnemental.' },
    { id: '12', title: 'Artisan Connect', category: 'ecommerce', image: 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=800', tags: ['Marketplace', 'Mobile-First'], description: 'Place de marché premium pour artisans locaux.' },
    { id: '13', title: 'HealthAI Analytics', category: 'web', image: 'https://images.unsplash.com/photo-1504868584819-f8eec0b6d730?auto=format&fit=crop&q=80&w=800', tags: ['IA', 'Santé'], description: 'Outil d\'analyse prédictive pour cliniques.' },
    { id: '14', title: 'CyberShield Portal', category: 'web', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', tags: ['Sécurité', 'SaaS'], description: 'Portail de gestion de cybersécurité.' },
    { id: '15', title: 'Global Logistics Hub', category: 'app', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', tags: ['Logistique', 'Blockchain'], description: 'Système de suivi de fret international.' },
    { id: '16', title: 'Zenith VR Real Estate', category: 'design', image: 'https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&q=80&w=800', tags: ['VR/AR', 'Immobilier'], description: 'Expérience de visite virtuelle haute fidélité.' },
  ],
  testimonials: [
    { id: '1', name: 'Jean Dupont', role: 'CEO', company: 'Tech Corp', content: 'Mind Graphix a dépassé nos attentes. Leur attention aux détails est inégalée.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Sophie Martin', role: 'Directrice Marketing', company: 'Brand Co', content: 'Professionnel, créatif et efficace. Fortement recommandé pour tout projet numérique.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=2' },
  ],
  team: [
    { 
      id: '1', 
      name: 'Badior', 
      role: 'Fondateur & Développeur Graphiste', 
      image: '/img/profiljpg.jpg',
      bio: 'Visionnaire à l\'origine de Mind Graphix, fusionnant expertise technique et créativité artistique pour redéfinir les standards du design digital.',
      skills: ['UI/UX Design', 'Branding', 'Fullstack Dev', 'Stratégie'],
      iconName: 'Palette',
      linkedin: 'https://linkedin.com/in/badior-ouattara',
      github: 'https://github.com/badior'
    },
    { 
      id: '2', 
      name: 'Faïz Philippe', 
      role: 'Lead Programmation & Test QA', 
      image: '/img/Faiz.jpeg',
      bio: 'Architecte logiciel garant de la robustesse et de la performance, Faïz Philippe assure que chaque ligne de code répond aux exigences de qualité les plus strictes.',
      skills: ['Architecture Logicielle', 'Tests Automatisés', 'Node.js', 'Performance'],
      iconName: 'Code',
      linkedin: 'https://linkedin.com/in/faiz-philippe',
      github: 'https://github.com/faizphilippe'
    },
    { 
      id: '3', 
      name: 'Steve', 
      role: 'Expert Cybersécurité & Design UX', 
      image: '/img/steve.jpeg',
      bio: 'Spécialiste de la protection des données et de l\'expérience utilisateur, Steve conçoit des interfaces aussi sécurisées qu\'intuitives.',
      skills: ['Cybersécurité', 'UX Design', 'Audit de Code', 'Accessibilité'],
      iconName: 'Terminal',
      linkedin: '#',
      github: '#'
    },
    { 
      id: '4', 
      name: 'Léa', 
      role: 'Responsable Communication & Social Media', 
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
      bio: 'Ambassadrice de l\'image de marque, Léa orchestre la présence digitale et cultive l\'engagement communautaire à travers des stratégies narratives percutantes.',
      skills: ['Communication Digitale', 'Social Media', 'Content Strategy', 'Publicité'],
      iconName: 'Sparkles',
      linkedin: '#',
      github: '#'
    }
  ],
  faqs: [
    { id: '1', question: 'Combien de temps dure un projet typique ?', answer: 'La durée varie selon l\'ampleur, mais la plupart prennent 4 à 8 semaines.' },
    { id: '2', question: 'Proposez-vous un support continu ?', answer: 'Oui, nous proposons divers forfaits de maintenance et de support.' },
  ],
  partners: [
    { id: '1', name: 'Partenaire 1', logo: 'https://logo.clearbit.com/google.com' },
    { id: '2', name: 'Partenaire 2', logo: 'https://logo.clearbit.com/microsoft.com' },
  ],
  blog: [
    { id: '1', title: 'Le Futur du Web Design', slug: 'future-web-design', excerpt: 'Exploration des tendances à venir en 2026.', content: 'Contenu complet ici...', createdAt: new Date().toISOString() },
    { id: '2', title: 'Maîtriser les React Server Components', slug: 'mastering-rsc', excerpt: 'Plongée profonde dans les RSC.', content: 'Contenu complet ici...', createdAt: new Date().toISOString() },
  ],
};
