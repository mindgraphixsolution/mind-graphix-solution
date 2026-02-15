
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { Link } from 'react-router-dom';
import { 
  Search, ArrowRight, Calendar, User, Clock, Mic, 
  PlayCircle, TrendingUp, Headphones, Bookmark, Hash 
} from 'lucide-react';
import { BlogPost } from '../../types';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useLanguage } from '../../context/LanguageContext';
import NeuralBackground from '../ui/NeuralBackground';
import Section from '../ui/Section';

const TRENDING_TAGS = [
  "Intelligence Artificielle", "Web3 Design", "No-Code Revolution", 
  "SEO 2025", "Green IT", "Cybersecurity", "React 19", "UX Psychology"
];

const PODCAST_EPISODES = [
  { id: 1, title: "L'avenir du Web est-il 100% IA ?", duration: "24 min", guest: "Dr. Sarah Connor" },
  { id: 2, title: "Design Systems : Arrêtez de tout refaire", duration: "18 min", guest: "Tom Designer" },
  { id: 3, title: "Le No-Code va-t-il tuer les dévs ?", duration: "32 min", guest: "Alex NoCoder" },
];

const BlogPage: React.FC = () => {
  const { t, getData } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'podcasts'>('articles');

  useEffect(() => {
    window.scrollTo(0, 0);
    setPosts(getData('blog'));
  }, [getData]);

  const categories = ['All', 'Tech', 'Design', 'Business', 'News'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = filter === 'All' || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);
  
  const MotionDiv = motion.div as any;

  return (
    <div className="bg-slate-50 dark:bg-dark min-h-screen">
      
      {/* 1. HERO SECTION CINEMATIC */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#02040a]">
         <div className="absolute inset-0 z-0">
            <NeuralBackground />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none"></div>
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
                     <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                        MGS Editorial
                     </span>
                     <span className="text-gray-500 text-sm font-mono">v.2025.1</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6">
                     DIGITAL <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400">INSIGHTS</span>
                  </h1>
                  <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                     {t('blog.subtitle')}
                  </p>
               </motion.div>

               {/* Search & Tabs */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="w-full lg:w-auto flex flex-col gap-6"
               >
                  <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 group-hover:opacity-100 blur transition duration-500"></div>
                     <div className="relative flex items-center bg-[#0a0f1c] rounded-full p-2 border border-white/10">
                        <Search className="ml-4 text-gray-400" size={20} />
                        <input 
                           type="text" 
                           placeholder={t('blog.search_placeholder')} 
                           className="w-full md:w-80 bg-transparent border-none outline-none text-white px-4 py-2"
                           value={search} 
                           onChange={(e) => setSearch(e.target.value)} 
                        />
                     </div>
                  </div>

                  <div className="flex bg-white/5 p-1 rounded-xl backdrop-blur-md border border-white/10">
                     <button 
                        onClick={() => setActiveTab('articles')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-bold transition-all ${activeTab === 'articles' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                     >
                        <TrendingUp size={16} /> Articles
                     </button>
                     <button 
                        onClick={() => setActiveTab('podcasts')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-bold transition-all ${activeTab === 'podcasts' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                     >
                        <Mic size={16} /> Podcasts
                     </button>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 2. TRENDING MARQUEE */}
      <div className="bg-[#0f172a] border-y border-white/5 py-4 overflow-hidden relative">
         <div className="flex gap-8 w-max animate-scroll">
            {[...TRENDING_TAGS, ...TRENDING_TAGS, ...TRENDING_TAGS].map((tag, i) => (
               <div key={i} className="flex items-center gap-2 text-gray-500 font-mono text-sm uppercase tracking-wider">
                  <Hash size={14} className="text-purple-500" /> {tag}
               </div>
            ))}
         </div>
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
         
         <AnimatePresence mode="wait">
            {/* VIEW: ARTICLES */}
            {activeTab === 'articles' && (
               <motion.div 
                  key="articles"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               >
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2 mb-12">
                     {categories.map(cat => (
                        <button 
                           key={cat} 
                           onClick={() => setFilter(cat)} 
                           className={`px-6 py-2 rounded-full font-bold text-sm border transition-all ${filter === cat ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent' : 'bg-transparent text-gray-500 border-gray-200 dark:border-white/10 hover:border-purple-500'}`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>

                  {/* Featured Post (Magazine Layout) */}
                  {featuredPost && !search && filter === 'All' && (
                     <div className="mb-24 group cursor-pointer relative rounded-[2.5rem] overflow-hidden bg-[#02040a] border border-white/10 shadow-2xl">
                        <Link to={`/blog/${featuredPost.id}`} className="grid lg:grid-cols-2">
                           <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
                              <img src={featuredPost.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={featuredPost.title} />
                              <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay"></div>
                           </div>
                           <div className="p-8 lg:p-16 flex flex-col justify-center relative">
                              <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
                                 <TrendingUp size={200} className="text-white"/>
                              </div>
                              <div className="flex gap-4 mb-6">
                                 <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/30">{featuredPost.category}</span>
                                 <span className="flex items-center gap-2 text-gray-400 text-xs font-medium"><Clock size={14}/> {featuredPost.readTime} de lecture</span>
                              </div>
                              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-[1.1] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-400 transition-all">
                                 {featuredPost.title}
                              </h2>
                              <p className="text-gray-400 text-lg mb-10 leading-relaxed border-l-2 border-purple-500 pl-6">
                                 {featuredPost.excerpt}
                              </p>
                              <div className="flex items-center gap-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                       {featuredPost.author.charAt(0)}
                                    </div>
                                    <div className="text-sm">
                                       <span className="block text-white font-bold">{featuredPost.author}</span>
                                       <span className="text-gray-500">{featuredPost.date}</span>
                                    </div>
                                 </div>
                                 <div className="ml-auto w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                                    <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"/>
                                 </div>
                              </div>
                           </div>
                        </Link>
                     </div>
                  )}

                  {/* Articles Grid (Bento Style) */}
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
                              className="group relative bg-white dark:bg-[#151e32] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-purple-500/30 transition-all hover:shadow-2xl flex flex-col"
                           >
                              <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                 <div className="h-64 overflow-hidden relative">
                                    <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                       <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-white/10">{post.category}</span>
                                    </div>
                                 </div>
                                 <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                       <Calendar size={12}/> {post.date}
                                       <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                       <Clock size={12}/> {post.readTime}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-purple-500 transition-colors">
                                       {post.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                                       {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4 mt-auto">
                                       <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-gray-300">
                                          <User size={14}/> {post.author}
                                       </div>
                                       <span className="text-purple-500 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
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

            {/* VIEW: PODCASTS (NEW) */}
            {activeTab === 'podcasts' && (
               <motion.div
                  key="podcasts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-5xl mx-auto"
               >
                  <div className="bg-[#151e32] rounded-[2.5rem] border border-white/10 p-8 md:p-12 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                     
                     <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                           <Headphones size={32} />
                        </div>
                        <div>
                           <h2 className="text-3xl font-black text-white">MGS <span className="text-purple-400">Cast</span></h2>
                           <p className="text-gray-400">Conversations brutes sur la tech, le design et le futur.</p>
                        </div>
                     </div>

                     <div className="space-y-4 relative z-10">
                        {PODCAST_EPISODES.map((ep, i) => (
                           <div key={ep.id} className="group bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-6 flex items-center gap-6 transition-all cursor-pointer">
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                 <PlayCircle size={24} className="group-hover:text-purple-400 transition-colors" />
                              </div>
                              <div className="flex-1">
                                 <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Episode 0{ep.id}</span>
                                    <span className="text-xs text-gray-500">• {ep.duration}</span>
                                 </div>
                                 <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{ep.title}</h3>
                                 <p className="text-sm text-gray-400">Invité : {ep.guest}</p>
                              </div>
                              <div className="hidden md:flex items-center gap-4">
                                 <button className="p-3 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><Bookmark size={20}/></button>
                                 <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-purple-400 transition-colors">Écouter</button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>

      {/* 3. NEWSLETTER CTA (Full Width) */}
      <section className="py-24 bg-gradient-to-r from-purple-900 to-black relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Restez à l'<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Avant-Garde</span>.</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
               Recevez chaque semaine notre sélection d'articles, de ressources et d'inspirations. Pas de spam, juste de la valeur pure.
            </p>
            <div className="max-w-md mx-auto relative">
               <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="w-full pl-6 pr-36 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all backdrop-blur-md"
               />
               <button className="absolute right-2 top-2 bottom-2 px-8 bg-white text-black rounded-full font-bold hover:bg-purple-400 transition-colors">
                  S'abonner
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default BlogPage;
