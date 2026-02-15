'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, User, MessageSquare, Send, CheckCircle2, Briefcase } from 'lucide-react';
import { api } from '../../lib/api';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Veuillez sélectionner une note.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Envoi réel via l'API (avec fallback mocké si nécessaire)
      await api.submitTestimonial({
        ...formData,
        rating,
        date: new Date().toISOString(),
        status: 'pending' // Pour validation admin plus tard
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', role: '', content: '' });
        setRating(0);
      }, 2500);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error);
      alert("Une erreur est survenue lors de l'envoi de votre avis. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  const MotionDiv = motion.div as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-[#1a1a2e] w-full max-w-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden relative"
          >
            {/* Header / Close */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <MotionDiv 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
                </MotionDiv>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Merci pour votre avis !</h3>
                <p className="text-gray-600 dark:text-gray-300">Votre témoignage a été soumis et sera publié après validation.</p>
              </div>
            ) : (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Votre avis compte</h2>
                  <p className="text-slate-500 dark:text-gray-400 text-sm">Partagez votre expérience avec Mind Graphix Solution.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating Stars */}
                  <div className="flex flex-col items-center gap-3 mb-6">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Notez votre expérience</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            size={32} 
                            className={`${
                              (hoverRating || rating) >= star 
                                ? 'fill-accent text-accent' 
                                : 'fill-transparent text-gray-300 dark:text-gray-600'
                            } transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && <span className="text-accent text-sm font-bold">{rating}/5 Excellent !</span>}
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Nom complet</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors dark:text-white"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Poste / Entreprise</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input 
                          type="text" 
                          required
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors dark:text-white"
                          placeholder="CEO, Startup..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Votre Message</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400" size={16} />
                      <textarea 
                        required
                        rows={4}
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none dark:text-white"
                        placeholder="Racontez-nous comment s'est passée notre collaboration..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-accent hover:text-dark transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon avis'} <Send size={18} />
                  </button>
                </form>
              </div>
            )}
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default TestimonialModal;

