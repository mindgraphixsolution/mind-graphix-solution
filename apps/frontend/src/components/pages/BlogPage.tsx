'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, ArrowRight, Calendar, User, Clock, Mic, 
  PlayCircle, TrendingUp, Headphones, Bookmark, Hash 
} from 'lucide-react';
import { BlogPost } from '../../types';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../lib/api';
import NeuralBackground from '../ui/NeuralBackground';

/**
 * Traductions locales pour la page Blog
 */
const TRANSLATIONS = {
  fr: {
    editorial: "MGS Éditorial",
    title: {
      digital: "DIGITAL",
      insights: "INSIGHTS"
    },
    tabs: {
      articles: "Articles",
      podcasts: "Podcasts"
    },
    categories: {
      all: "Tous",
      tech: "Tech",
      design: "Design",
      business: "Business",
      news: "Actualités"
    },
    podcast: {
      title: "MGS",
      subtitle: "Cast",
      desc: "Conversations brutes sur la tech, le design et le futur.",
      listen: "Écouter",
      episode: "Épisode"
    },
    newsletter: {
      title: "Restez à l'",
      titleAccent: "Avant-Garde",
      desc: "Recevez chaque semaine notre sélection d'articles, de ressources et d'inspirations. Pas de spam, juste de la valeur pure.",
      placeholder: "votre@email.com",
      button: "S'abonner"
    },
    readTime: "de lecture",
    guest: "Invité"
  },
  en: {
    editorial: "MGS Editorial",
    title: {
      digital: "DIGITAL",
      insights: "INSIGHTS"
    },
    tabs: {
      articles: "Articles",
      podcasts: "Podcasts"
    },
    categories: {
      all: "All",
      tech: "Tech",
      design: "Design",
      business: "Business",
      news: "News"
    },
    podcast: {
      title: "MGS",
      subtitle: "Cast",
      desc: "Raw conversations about tech, design and the future.",
      listen: "Listen",
      episode: "Episode"
    },
    newsletter: {
      title: "Stay at the",
      titleAccent: "Forefront",
      desc: "Receive our weekly selection of articles, resources and inspiration. No spam, just pure value.",
      placeholder: "your@email.com",
      button: "Subscribe"
    },
    readTime: "read",
    guest: "Guest"
  }
};

const TRENDING_TAGS = (lang: string) => lang === 'fr' ? [
  "Intelligence Artificielle", "Web3 Design", "Révolution No-Code", 
  "SEO 2025", "Green IT", "Cybersécurité", "React 19", "Psychologie UX"
] : [
  "Artificial Intelligence", "Web3 Design", "No-Code Revolution", 
  "SEO 2025", "Green IT", "Cybersecurity", "React 19", "UX Psychology"
];

const PODCAST_EPISODES = (lang: string) => lang === 'fr' ? [
  { id: 1, title: "L'avenir du Web est-il 100% IA ?", duration: "24 min", guest: "Dr. Sarah Connor" },
  { id: 2, title: "Design Systems : Arrêtez de tout refaire", duration: "18 min", guest: "Tom Designer" },
  { id: 3, title: "Le No-Code va-t-il tuer les dévs ?", duration: "32 min", guest: "Alex NoCoder" },
] : [
  { id: 1, title: "Is the Future of Web 100% AI?", duration: "24 min", guest: "Dr. Sarah Connor" },
  { id: 2, title: "Design Systems: Stop Redoing Everything", duration: "18 min", guest: "Tom Designer" },
  { id: 3, title: "Will No-Code Kill Developers?", duration: "32 min", guest: "Alex NoCoder" },
];

const BlogPage: React.FC = () => {
  const { language, t, getData } = useLanguage();
  const currentT = TRANSLATIONS[language];
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'podcasts'>('articles');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await api.getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        // Repli vers les données fictives
        setPosts(getData('blog'));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [getData]);

  const categories = [
    { id: 'All', label: currentT.categories.all },
    { id: 'Tech', label: currentT.categories.tech },
    { id: 'Design', label: currentT.categories.design },
    { id: 'Business', label: currentT.categories.business },
    { id: 'News', label: currentT.categories.news }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = filter === 'All' || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);
  
  const MotionDiv = motion.div as any;

  if (isLoading) {
    return (
      <div className="bg-[var(--bg-primary)] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-main)] min-h-screen">
      
      {/* 1. SECTION HERO CINÉMATIQUE */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[var(--bg-primary)]">
         <div className="absolute inset-0 z-0">
            <NeuralBackground />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-color)]/10 rounded-full blur-[150px] pointer-events-none"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <Breadcrumbs />
            
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mt-12">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
                 className="max-w-3xl"
               >
                  <div className="flex items-center gap-3 mb-6">
                     <span className="px-3 py-1 rounded-full border border-[var(--accent-color)]/30 bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-xs font-bold uppercase tracking-widest animate-pulse">
                        {currentT.editorial}
                     </span>
                     <span className="text-[var(--text-secondary)] text-sm font-mono opacity-50">v.2026.1</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black text-[var(--text-main)] tracking-tighter leading-[0.9] mb-6">
                     {currentT.title.digital} <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-[var(--text-main)] to-[var(--text-secondary)]">
                        {currentT.title.insights}
                     </span>
                  </h1>
                  <p className="text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
                     {t('blog.subtitle')}
                  </p>
               </motion.div>

               {/* Recherche & Onglets */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="w-full lg:w-auto flex flex-col gap-6"
               >
                  <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--text-main)] rounded-full opacity-20 group-hover:opacity-100 blur transition duration-500"></div>
                     <div className="relative flex items-center bg-[var(--bg-surface)]/80 backdrop-blur-xl rounded-full p-2 border border-[var(--border-color)]">
                        <Search className="ml-4 text-[var(--text-secondary)]" size={20} />
                        <input 
                           type="text" 
                           placeholder={t('blog.search_placeholder')} 
                           className="w-full md:w-80 bg-transparent border-none outline-none text-[var(--text-main)] px-4 py-2"
                           value={search} 
                           onChange={(e) => setSearch(e.target.value)} 
                        />
                     </div>
                  </div>

                  <div className="flex bg-[var(--bg-surface)]/50 p-1 rounded-xl backdrop-blur-md border border-[var(--border-color)]">
                     <button 
                        onClick={() => setActiveTab('articles')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-bold transition-all ${activeTab === 'articles' ? 'bg-[var(--text-main)] text-[var(--bg-primary)] shadow-lg' : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'}`}
                     >
                        <TrendingUp size={16} /> {currentT.tabs.articles}
                     </button>
                     <button 
                        onClick={() => setActiveTab('podcasts')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-bold transition-all ${activeTab === 'podcasts' ? 'bg-[var(--text-main)] text-[var(--bg-primary)] shadow-lg' : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'}`}
                     >
                        <Mic size={16} /> {currentT.tabs.podcasts}
                     </button>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 2. DÉFILÉ DES TENDANCES */}
      <div className="bg-[var(--bg-surface)] border-y border-[var(--border-color)] py-4 overflow-hidden relative">
         <div className="flex gap-8 w-max animate-scroll">
            {[...TRENDING_TAGS(language), ...TRENDING_TAGS(language), ...TRENDING_TAGS(language)].map((tag, i) => (
               <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)] font-mono text-sm uppercase tracking-wider">
                  <Hash size={14} className="text-[var(--accent-color)]" /> {tag}
               </div>
            ))}
         </div>
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-surface)] to-transparent pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-surface)] to-transparent pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
         
         <AnimatePresence mode="wait">
            {/* VUE: ARTICLES */}
            {activeTab === 'articles' && (
               <motion.div 
                  key="articles"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               >
                  {/* Filtre par catégorie */}
                  <div className="flex flex-wrap gap-2 mb-12">
                     {categories.map(cat => (
                        <button 
                           key={cat.id} 
                           onClick={() => setFilter(cat.id)} 
                           className={`px-6 py-2 rounded-full font-bold text-sm border transition-all ${filter === cat.id ? 'bg-[var(--text-main)] text-[var(--bg-primary)] border-transparent' : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-color)]'}`}
                        >
                           {cat.label}
                        </button>
                     ))}
                  </div>

                  {/* Article à la une (Mise en page Magazine) */}
                  {featuredPost && !search && filter === 'All' && (
                     <div className="mb-24 group cursor-pointer relative rounded-[2.5rem] overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl glass">
                        <Link href={`/blog/${featuredPost.id}`} className="grid lg:grid-cols-2">
                           <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
                              <Image 
                                src={featuredPost.image} 
                                alt={featuredPost.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                              />
                              <div className="absolute inset-0 bg-[var(--accent-color)]/20 mix-blend-overlay"></div>
                           </div>
                           <div className="p-8 lg:p-16 flex flex-col justify-center relative">
                              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                                 <TrendingUp size={200} className="text-[var(--text-main)]"/>
                              </div>
                              <div className="flex gap-4 mb-6">
                                 <span className="bg-[var(--accent-color)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-[var(--accent-color)]/30">{featuredPost.category}</span>
                                 <span className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-medium"><Clock size={14}/> {featuredPost.readTime} {currentT.readTime}</span>
                              </div>
                              <h2 className="text-4xl lg:text-6xl font-black text-[var(--text-main)] mb-6 leading-[1.1] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--text-main)] group-hover:to-[var(--accent-color)] transition-all">
                                 {featuredPost.title}
                              </h2>
                              <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed border-l-2 border-[var(--accent-color)] pl-6">
                                 {featuredPost.excerpt}
                              </p>
                              <div className="flex items-center gap-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center text-[var(--accent-color)] font-bold text-lg border border-[var(--accent-color)]/20">
                                       {featuredPost.author.charAt(0)}
                                    </div>
                                    <div className="text-sm">
                                       <span className="block text-[var(--text-main)] font-bold">{featuredPost.author}</span>
                                       <span className="text-[var(--text-secondary)] opacity-60">{featuredPost.date}</span>
                                    </div>
                                 </div>
                                 <div className="ml-auto w-14 h-14 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-main)] group-hover:bg-[var(--text-main)] group-hover:text-[var(--bg-primary)] transition-all">
                                    <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"/>
                                 </div>
                              </div>
                           </div>
                        </Link>
                     </div>
                  )}

                  {/* Grille d'articles (Style Bento) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                     <AnimatePresence>
                        {gridPosts.map((post, idx) => (
                           <MotionDiv 
                              key={post.id} 
                              layout
                              initial={{ opacity: 0, y: 20 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ delay: idx * 0.1 }}
                              className="group relative bg-[var(--bg-surface)] rounded-[2rem] overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-color)]/30 transition-all hover:shadow-2xl flex flex-col glass"
                           >
                              <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
                                 <div className="h-64 overflow-hidden relative">
                                    <Image 
                                      src={post.image} 
                                      alt={post.title}
                                      fill
                                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                       <span className="bg-[var(--bg-primary)]/70 backdrop-blur-md text-[var(--text-main)] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-[var(--border-color)]">{post.category}</span>
                                    </div>
                                 </div>
                                 <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-4">
                                       <Calendar size={12}/> {post.date}
                                       <span className="w-1 h-1 bg-[var(--border-color)] rounded-full"></span>
                                       <Clock size={12}/> {post.readTime}
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-4 leading-tight group-hover:text-[var(--accent-color)] transition-colors">
                                       {post.title}
                                    </h3>
                                    <p className="text-[var(--text-secondary)] text-sm line-clamp-3 mb-6 flex-1">
                                       {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-4 mt-auto">
                                       <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                                          <User size={14}/> {post.author}
                                       </div>
                                       <span className="text-[var(--accent-color)] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                          {t('blog.read_more')} <ArrowRight size={16}/>
                                       </span>
                                    </div>
                                 </div>
                              </Link>
                           </MotionDiv>
                        ))}
                     </AnimatePresence>
                  </div>
               </motion.div>
            )}

            {/* VUE: PODCASTS */}
            {activeTab === 'podcasts' && (
               <motion.div
                  key="podcasts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-5xl mx-auto"
               >
                  <div className="bg-[var(--bg-surface)] rounded-[2.5rem] border border-[var(--border-color)] p-8 md:p-12 relative overflow-hidden glass">
                     <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent-color)]/10 rounded-full blur-[120px] pointer-events-none"></div>
                     
                     <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent-color)] to-[var(--text-main)] rounded-2xl flex items-center justify-center text-[var(--bg-primary)] shadow-lg">
                           <Headphones size={32} />
                        </div>
                        <div>
                           <h2 className="text-3xl font-black text-[var(--text-main)]">{currentT.podcast.title} <span className="text-[var(--accent-color)]">{currentT.podcast.subtitle}</span></h2>
                           <p className="text-[var(--text-secondary)]">{currentT.podcast.desc}</p>
                        </div>
                     </div>

                     <div className="space-y-4 relative z-10">
                        {PODCAST_EPISODES(language).map((ep, i) => (
                           <div key={ep.id} className="group bg-[var(--bg-primary)]/30 hover:bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl p-6 flex items-center gap-6 transition-all cursor-pointer">
                              <div className="w-12 h-12 rounded-full bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-main)] group-hover:scale-110 transition-transform">
                                 <PlayCircle size={24} className="group-hover:text-[var(--accent-color)] transition-colors" />
                              </div>
                              <div className="flex-1">
                                 <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xs font-bold text-[var(--accent-color)] uppercase tracking-wider">{currentT.podcast.episode} 0{ep.id}</span>
                                    <span className="text-xs text-[var(--text-secondary)] opacity-60">• {ep.duration}</span>
                                 </div>
                                 <h3 className="text-xl font-bold text-[var(--text-main)] mb-1 group-hover:text-[var(--accent-color)] transition-colors">{ep.title}</h3>
                                 <p className="text-sm text-[var(--text-secondary)] opacity-70">{currentT.guest} : {ep.guest}</p>
                              </div>
                              <div className="hidden md:flex items-center gap-4">
                                 <button className="p-3 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"><Bookmark size={20}/></button>
                                 <button className="px-6 py-2 bg-[var(--text-main)] text-[var(--bg-primary)] rounded-full font-bold text-sm hover:bg-[var(--accent-color)] hover:text-white transition-colors">{currentT.podcast.listen}</button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>

      {/* 3. APPEL À L'ACTION NEWSLETTER */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--bg-primary)] z-0"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-6">
               {currentT.newsletter.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-[var(--text-secondary)]">{currentT.newsletter.titleAccent}</span>.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-2xl mx-auto">
               {currentT.newsletter.desc}
            </p>
            <div className="max-w-md mx-auto relative">
               <input 
                  type="email" 
                  placeholder={currentT.newsletter.placeholder} 
                  className="w-full pl-6 pr-36 py-5 rounded-full bg-[var(--bg-surface)]/50 border border-[var(--border-color)] text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-color)] focus:bg-[var(--bg-surface)] transition-all backdrop-blur-md"
               />
               <button className="absolute right-2 top-2 bottom-2 px-8 btn-architect">
                  {currentT.newsletter.button}
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default BlogPage;

