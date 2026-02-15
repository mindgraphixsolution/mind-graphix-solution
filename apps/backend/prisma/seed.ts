import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  try {
    // ========================================================================
    // 1. CREATE USERS
    // ========================================================================
    console.log('📝 Creating users...');

    const superAdmin = await prisma.user.upsert({
      where: { email: 'admin@mindgraphix.com' },
      update: {},
      create: {
        email: 'admin@mindgraphix.com',
        passwordHash: await bcrypt.hash('Admin@12345', 10),
        firstName: 'Badior',
        lastName: 'OUATTARA',
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        phone: '+226 01 51 11 46',
        bio: 'Lead Developer & Graphiste',
      },
    });

    console.log(`✅ Created super admin: ${superAdmin.email}\n`);

    // ========================================================================
    // 2. HERO SECTION
    // ========================================================================
    console.log('🚀 Seeding Hero Section...');
    await prisma.heroSection.upsert({
      where: { id: 'default-hero' },
      update: {},
      create: {
        id: 'default-hero',
        titlePrefix: "MIND",
        titleSpan: "GRAPHIX",
        titleSuffix: "SOLUTION",
        description: "Nous fusionnons l'art du design émotionnel avec la puissance d'un code performant pour sculpter des expériences web qui ne se contentent pas d'exister, mais qui dominent.",
        ctaPrimary: "Lancer mon Projet",
        ctaSecondary: "Explorer le Portfolio",
        isActive: true,
      }
    });

    // ========================================================================
    // 3. STATISTICS
    // ========================================================================
    console.log('📊 Seeding Statistics...');
    const stats = [
      { label: 'Projets Réussis', value: 150, order: 0, isActive: true },
      { label: 'Clients Satisfaits', value: 98, order: 1, isActive: true },
      { label: 'Années d\'Expérience', value: 5, order: 2, isActive: true },
      { label: 'Heures de Code', value: 12000, order: 3, isActive: true },
    ];

    for (const stat of stats) {
      await prisma.stat.upsert({
        where: { id: `stat-${stat.order}` },
        update: stat,
        create: {
          id: `stat-${stat.order}`,
          ...stat
        }
      });
    }

    // ========================================================================
    // 4. SERVICES
    // ========================================================================
    console.log('🛠️ Seeding Services...');
    const services = [
      {
        title: "Design Graphique",
        description: "Création d'identités visuelles percutantes, logos, supports print et éléments graphiques qui renforcent votre image de marque.",
        icon: "Palette",
        order: 0,
        pricing: "À partir de 98.000 FCFA",
        features: ["Création de logos", "Charte graphique", "Supports print", "Design réseaux sociaux", "Illustrations", "Retouche photo"],
        gradient: "from-pink-500 to-purple-600",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
        isActive: true,
      },
      {
        title: "Développement Web",
        description: "Sites web et applications sur mesure, performants et sécurisés, conçus avec les dernières technologies du marché (React, Node.js).",
        icon: "Code",
        order: 1,
        pricing: "À partir de 525.000 FCFA",
        features: ["Sites responsives", "PWA", "CMS (WordPress, Strapi)", "API & Backend", "SEO technique", "Maintenance"],
        gradient: "from-blue-500 to-cyan-600",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        isActive: true,
      },
      {
        title: "UI/UX Design",
        description: "Interfaces intuitives et expériences utilisateur optimisées pour maximiser l'engagement et la conversion.",
        icon: "Smartphone",
        order: 2,
        pricing: "À partir de 394.000 FCFA",
        features: ["Recherche utilisateur", "Wireframes", "Design d'interfaces", "Tests d'utilisabilité", "Design systems", "Mobile First"],
        gradient: "from-green-500 to-teal-600",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
        isActive: true,
      },
      {
        title: "Motion Design",
        description: "Animations et vidéos captivantes pour dynamiser votre communication et renforcer votre storytelling.",
        icon: "Video",
        order: 3,
        pricing: "À partir de 262.000 FCFA",
        features: ["Animations 2D/3D", "Vidéos promo", "Motion graphics", "Logo animé", "Montage vidéo", "VFX"],
        gradient: "from-orange-500 to-red-600",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        isActive: true,
      },
      {
        title: "E-commerce",
        description: "Solutions e-commerce complètes pour vendre en ligne avec une expérience client optimisée.",
        icon: "ShoppingCart",
        order: 4,
        pricing: "À partir de 787.000 FCFA",
        features: ["Boutiques en ligne", "Paiements sécurisés", "Gestion stocks", "Dashboards", "Conversion", "Multi-devises"],
        gradient: "from-indigo-500 to-purple-600",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        isActive: true,
      },
      {
        title: "SEO & Marketing",
        description: "Stratégies digitales pour améliorer votre visibilité en ligne et générer plus de leads qualifiés.",
        icon: "BarChart",
        order: 5,
        pricing: "À partir de 197.000 FCFA/mois",
        features: ["Audit SEO", "Optimisation", "Contenu", "Google Ads", "Analytics", "Social Media"],
        gradient: "from-yellow-500 to-orange-600",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
        isActive: true,
      }
    ];

    for (const service of services) {
      await prisma.service.upsert({
        where: { id: `service-${service.order}` },
        update: service,
        create: {
          id: `service-${service.order}`,
          ...service
        }
      });
    }

    // ========================================================================
    // 5. TEAM MEMBERS
    // ========================================================================
    console.log('👥 Seeding Team Members...');
    const team = [
      {
        name: 'Badior OUATTARA',
        role: 'Lead Developer & Graphiste',
        image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400',
        linkedin: '#',
        order: 0,
        isActive: true,
      },
      {
        name: 'Faïz Phillippe SANON',
        role: 'Senior Developer',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=400',
        github: '#',
        linkedin: '#',
        order: 1,
        isActive: true,
      },
      {
        name: 'Émilie Rousseau',
        role: 'Lead UX/UI Designer',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        order: 2,
        isActive: true,
      },
      {
        name: 'Antoine Morel',
        role: 'Motion Designer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        order: 3,
        isActive: true,
      }
    ];

    for (const member of team) {
      await prisma.teamMember.upsert({
        where: { id: `team-${member.order}` },
        update: member,
        create: {
          id: `team-${member.order}`,
          ...member
        }
      });
    }

    // ========================================================================
    // 6. PORTFOLIO
    // ========================================================================
    console.log('🎨 Seeding Portfolio...');
    const portfolio = [
      {
        title: 'Plateforme Éducative LMS',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        description: 'Système de gestion de l\'apprentissage complet pour une université privée.',
        tags: ['React', 'Node.js', 'PostgreSQL'],
        order: 0,
        isActive: true,
      },
      {
        title: 'Identité Tech Startup',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800',
        description: 'Branding minimaliste et futuriste pour une fintech.',
        tags: ['Branding', 'Illustrator', 'Figma'],
        order: 1,
        isActive: true,
      },
      {
        title: 'Boutique Mode & Bio',
        category: 'ecommerce',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
        description: 'Shopify headless avec prévisualisation 3D des produits.',
        tags: ['Shopify', 'Three.js', 'Next.js'],
        order: 2,
        isActive: true,
      }
    ];

    for (const item of portfolio) {
      await prisma.portfolioItem.upsert({
        where: { id: `portfolio-${item.order}` },
        update: item,
        create: {
          id: `portfolio-${item.order}`,
          ...item
        }
      });
    }

    // ========================================================================
    // 7. TESTIMONIALS
    // ========================================================================
    console.log('💬 Seeding Testimonials...');
    const testimonials = [
      {
        name: "Sarah Koné",
        role: "Directrice Marketing",
        company: "FasoTech",
        content: "Mind Graphix a transformé notre vision en une réalité digitale époustouflante. Leur attention aux détails est inégalée.",
        rating: 5,
        avatar: "https://placehold.co/200x200/5e35b1/ffffff?text=SK",
        isActive: true,
      },
      {
        name: "Marc Ouedraogo",
        role: "CEO",
        company: "Immo Burkina",
        content: "Le site web qu'ils ont conçu a doublé nos leads en 3 mois. Une équipe professionnelle et réactive.",
        rating: 5,
        avatar: "https://placehold.co/200x200/2563eb/ffffff?text=MO",
        isActive: true,
      },
      {
        name: "Aïcha Diallo",
        role: "Fondatrice",
        company: "Beauty Queen",
        content: "Le branding qu'ils ont créé pour ma marque est juste magnifique. Je recommande vivement !",
        rating: 5,
        avatar: "https://placehold.co/200x200/db2777/ffffff?text=AD",
        isActive: true,
      }
    ];

    for (let i = 0; i < testimonials.length; i++) {
      const test = testimonials[i];
      await prisma.testimonial.upsert({
        where: { id: `testimonial-${i}` },
        update: test,
        create: {
          id: `testimonial-${i}`,
          ...test
        }
      });
    }

    // ========================================================================
    // 8. FAQ
    // ========================================================================
    console.log('❓ Seeding FAQs...');
    const faqs = [
      { question: "Combien coûte un site internet ?", answer: "Le coût dépend de la complexité. Un site vitrine commence autour de 250.000 FCFA, tandis qu'un e-commerce complet nécessite un budget plus conséquent. Utilisez notre simulateur pour une estimation précise.", order: 0, isActive: true },
      { question: "Quels sont vos délais ?", answer: "En moyenne, un site vitrine prend 2 semaines. Des projets plus complexes comme des applications sur mesure peuvent prendre 4 à 8 semaines.", order: 1, isActive: true },
      { question: "Offrez-vous un service de maintenance ?", answer: "Oui ! Nous proposons des forfaits de maintenance mensuels pour assurer la sécurité, les mises à jour et les sauvegardes de votre site.", order: 2, isActive: true },
      { question: "Le site sera-t-il optimisé pour Google (SEO) ?", answer: "Absolument. Tous nos sites sont conçus avec les meilleures pratiques SEO techniques : vitesse, structure sémantique, balises meta et responsive design.", order: 3, isActive: true },
      { question: "Puis-je mettre à jour le site moi-même ?", answer: "Oui, nous intégrons un panneau d'administration (CMS) facile à utiliser qui vous permet de modifier textes et images sans toucher au code.", order: 4, isActive: true },
      { question: "Acceptez-vous les paiements en plusieurs fois ?", answer: "Oui, nous demandons généralement un acompte de 40% au démarrage, 30% à la validation du design, et le solde à la livraison.", order: 5, isActive: true }
    ];

    for (const faq of faqs) {
      await prisma.fAQ.upsert({
        where: { id: `faq-${faq.order}` },
        update: faq,
        create: {
          id: `faq-${faq.order}`,
          ...faq
        }
      });
    }

    // ========================================================================
    // 9. PARTNERS
    // ========================================================================
    console.log('🤝 Seeding Partners...');
    const partners = [
      { name: "Orange", logo: "https://placehold.co/200x100/ff6600/ffffff?text=Orange", order: 0, isActive: true },
      { name: "Canal+", logo: "https://placehold.co/200x100/000000/ffffff?text=Canal+", order: 1, isActive: true },
      { name: "CFAO", logo: "https://placehold.co/200x100/003399/ffffff?text=CFAO", order: 2, isActive: true },
      { name: "Coris Bank", logo: "https://placehold.co/200x100/cc0000/ffffff?text=Coris", order: 3, isActive: true },
      { name: "Ecobank", logo: "https://placehold.co/200x100/0066cc/ffffff?text=Ecobank", order: 4, isActive: true },
      { name: "TotalEnergies", logo: "https://placehold.co/200x100/ff0000/ffffff?text=Total", order: 5, isActive: true }
    ];

    for (const partner of partners) {
      await prisma.partner.upsert({
        where: { id: `partner-${partner.order}` },
        update: partner,
        create: {
          id: `partner-${partner.order}`,
          ...partner
        }
      });
    }

    // ========================================================================
    // 10. BLOG POSTS
    // ========================================================================
    console.log('📝 Seeding Blog Posts...');
    const posts = [
      {
        title: 'L\'IA au service du Design',
        slug: 'ia-au-service-du-design',
        content: 'Dans le monde du design graphique, l\'intelligence artificielle générative n\'est plus une menace, mais un allié puissant...',
        excerpt: 'Comment l\'intelligence artificielle transforme le métier de designer en 2025.',
        category: 'Tech',
        author: 'Badior OUATTARA',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
        tags: ['IA', 'Design', 'Futur'],
        published: true,
      },
      {
        title: 'Le Minimalisme Digital',
        slug: 'le-minimalisme-digital',
        content: 'Le minimalisme n\'est pas seulement une absence de décoration, c\'est une présence de clarté...',
        excerpt: 'Pourquoi moins c\'est plus dans le web moderne.',
        category: 'Design',
        author: 'Émilie Rousseau',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
        tags: ['UX', 'Minimalisme'],
        published: true,
      }
    ];

    for (const post of posts) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {
          ...post,
          author: `${superAdmin.firstName} ${superAdmin.lastName}`
        },
        create: {
          ...post,
          author: `${superAdmin.firstName} ${superAdmin.lastName}`
        }
      });
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ DATABASE SEEDING COMPLETED SUCCESSFULLY ✨\n');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('🔥 Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
