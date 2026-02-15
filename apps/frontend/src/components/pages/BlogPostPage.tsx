'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// @ts-ignore
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, User, Clock, Tag, Share2, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BlogPost } from '../../types';
import NotFound from './NotFound';

/**
 * Traductions locales pour la page d'article de blog
 */
const TRANSLATIONS = {
  fr: {
    back: "Retour aux articles",
    tags: "Tags",
    share: "Partager",
    readTime: "de lecture",
    loading: "Chargement...",
    error404: "Article non trouvé"
  },
  en: {
    back: "Back to articles",
    tags: "Tags",
    share: "Share",
    readTime: "read",
    loading: "Loading...",
    error404: "Article not found"
  }
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, getData } = useLanguage();
  const currentT = TRANSLATIONS[language];
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
    // On récupère les articles via le LanguageContext pour avoir la bonne langue
    const posts = getData('blog');
    const found = posts.find((p: BlogPost) => p.id === slug);
    setPost(found || null);
    setLoading(false);
  }, [slug, getData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) return <NotFound />;

  const MotionDiv = motion.div as any;

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-main)] min-h-screen pb-20">
      {/* Barre de progression de lecture */}
      <MotionDiv 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[var(--accent-color)] z-[100] origin-left shadow-[0_0_10px_var(--accent-color)]" 
        style={{ scaleX }} 
      />

      {/* En-tête Hero de l'article */}
      <div className="relative h-[65vh] min-h-[450px] overflow-hidden">
         <Image 
           src={post.image} 
           alt={post.title}
           fill
           className="object-cover scale-105"
           priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent"></div>
         
         {/* Effet de flou artistique en haut */}
         <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--bg-primary)] to-transparent opacity-50"></div>

         <div className="absolute inset-0 flex items-center justify-center p-6 mt-20">
            <div className="max-w-4xl w-full text-center">
               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <span className="bg-[var(--accent-color)] text-white font-bold px-4 py-1.5 rounded-full uppercase tracking-wider text-xs mb-8 inline-block shadow-lg shadow-[var(--accent-color)]/20">
                    {post.category}
                  </span>
                  <h1 className="text-4xl md:text-7xl font-black text-[var(--text-main)] mb-8 leading-[1.1] tracking-tighter">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-6 text-[var(--text-secondary)] text-sm font-medium">
                     <span className="flex items-center gap-2"><User size={18} className="text-[var(--accent-color)]"/> {post.author}</span>
                     <span className="flex items-center gap-2"><Calendar size={18} className="text-[var(--accent-color)]"/> {post.date}</span>
                     <span className="flex items-center gap-2"><Clock size={18} className="text-[var(--accent-color)]"/> {post.readTime} {currentT.readTime}</span>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 -mt-24 relative z-10 flex flex-col lg:flex-row gap-12">
         {/* Barre latérale gauche (Partage) */}
         <div className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit">
            <div className="w-12 h-12 bg-[var(--bg-surface)] rounded-full shadow-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-all cursor-pointer border border-[var(--border-color)] group glass">
               <Facebook size={20} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="w-12 h-12 bg-[var(--bg-surface)] rounded-full shadow-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all cursor-pointer border border-[var(--border-color)] group glass">
               <Twitter size={20} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="w-12 h-12 bg-[var(--bg-surface)] rounded-full shadow-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all cursor-pointer border border-[var(--border-color)] group glass">
               <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="w-12 h-12 bg-[var(--bg-surface)] rounded-full shadow-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-all cursor-pointer border border-[var(--border-color)] group glass" onClick={() => navigator.share({ title: post.title, url: window.location.href })}>
               <Share2 size={20} className="group-hover:scale-110 transition-transform" />
            </div>
         </div>

         {/* Contenu principal */}
         <div className="flex-1 bg-[var(--bg-surface)] rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-[var(--border-color)] glass">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--accent-color)] font-bold mb-10 hover:gap-3 transition-all group">
               <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {currentT.back}
            </Link>
            
            <article className="prose prose-lg dark:prose-invert max-w-none">
               <p className="lead text-2xl font-medium text-[var(--text-main)] mb-12 border-l-4 border-[var(--accent-color)] pl-8 italic">
                  {post.excerpt}
               </p>
               
               <div className="whitespace-pre-wrap leading-[1.8] text-[var(--text-secondary)] text-lg">
                  {post.content}
               </div>
            </article>

            <div className="mt-16 pt-10 border-t border-[var(--border-color)]">
               <h4 className="font-black text-[var(--text-main)] text-xl mb-6 flex items-center gap-3">
                 <Tag size={22} className="text-[var(--accent-color)]"/> {currentT.tags}
               </h4>
               <div className="flex flex-wrap gap-3">
                  {post.tags?.map(tag => (
                     <span key={tag} className="px-5 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full text-sm font-bold text-[var(--text-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-colors cursor-default">
                        #{tag}
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlogPostPage;

