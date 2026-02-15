
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, User, Clock, Tag, Share2, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';
import { BlogPost } from '../../types';
import NotFound from './NotFound';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const posts = mockDB.getPosts();
    const found = posts.find((p: BlogPost) => p.id === id);
    setPost(found || null);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-50 dark:bg-dark"></div>;
  if (!post) return <NotFound />;

  const MotionDiv = motion.div as any;

  return (
    <div className="bg-white dark:bg-dark min-h-screen pb-20">
      {/* Progress Bar */}
      <MotionDiv className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[100] origin-left" style={{ scaleX }} />

      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px]">
         <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
         <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-90"></div>
         <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full text-center">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <span className="bg-accent text-dark font-bold px-4 py-1.5 rounded-full uppercase tracking-wider text-sm mb-6 inline-block">{post.category}</span>
                  <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{post.title}</h1>
                  <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm font-medium">
                     <span className="flex items-center gap-2"><User size={18} className="text-primary"/> {post.author}</span>
                     <span className="flex items-center gap-2"><Calendar size={18} className="text-primary"/> {post.date}</span>
                     <span className="flex items-center gap-2"><Clock size={18} className="text-primary"/> {post.readTime}</span>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-10 flex flex-col lg:flex-row gap-12">
         {/* Sidebar Left (Share) */}
         <div className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit">
            <div className="w-12 h-12 bg-white dark:bg-[#1a1a2e] rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors cursor-pointer border border-gray-100 dark:border-white/10">
               <Facebook size={20} />
            </div>
            <div className="w-12 h-12 bg-white dark:bg-[#1a1a2e] rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors cursor-pointer border border-gray-100 dark:border-white/10">
               <Twitter size={20} />
            </div>
            <div className="w-12 h-12 bg-white dark:bg-[#1a1a2e] rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors cursor-pointer border border-gray-100 dark:border-white/10">
               <Linkedin size={20} />
            </div>
            <div className="w-12 h-12 bg-white dark:bg-[#1a1a2e] rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-primary transition-colors cursor-pointer border border-gray-100 dark:border-white/10" onClick={() => navigator.share({ title: post.title, url: window.location.href })}>
               <Share2 size={20} />
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-white/5">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline">
               <ArrowLeft size={18} /> Retour aux articles
            </Link>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
               <p className="lead text-xl font-medium text-gray-600 dark:text-gray-300 mb-8 border-l-4 border-accent pl-4">
                  {post.excerpt}
               </p>
               {/* Simulation du contenu riche - Dans un vrai cas, utiliser un parser Markdown */}
               <div className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                  {post.content}
               </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5">
               <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Tag size={18}/> Tags</h4>
               <div className="flex flex-wrap gap-2">
                  {post.tags?.map(tag => (
                     <span key={tag} className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-600 dark:text-gray-300">#{tag}</span>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
