'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Loader2, RefreshCw } from 'lucide-react';
// @ts-ignore - Google AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SERVICES, CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  isError?: boolean;
}

/**
 * Composant ChatBot - Assistant IA Forge Intelligence
 * Intègre Gemini-1.5-Flash avec support bilingue et design harmonisé
 */
const ChatBot = ({ isOpen: externalIsOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
  const { t, language } = useLanguage();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Contexte de l'agence pour l'IA
  const AGENCY_CONTEXT = `
    Tu es "Forge Intelligence", l'IA de Mind Graphix Solution. 
    Agence basée à Bobo-Dioulasso.
    Ton rôle: Expert en transformation digitale et aide à la vente.
    Langue actuelle de l'utilisateur: ${language === 'fr' ? 'Français' : 'Anglais'}.
    
    SERVICES:
    ${JSON.stringify(SERVICES.map(s => ({ titre: s.title, desc: s.description })))}
    
    TON COMPORTEMENT:
    1. Professionnel, réactif et créatif.
    2. Répondre dans la langue de l'utilisateur (${language}).
    3. Toujours proposer de passer à l'action (devis, contact).
    4. Ne jamais inventer de prix, redirige vers les services pour les forfaits.
  `;

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: t('chatbot.welcome') || "Bonjour, je suis Forge Intelligence. Comment puis-je propulser votre projet aujourd'hui ?", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  
  const show = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleClose = onClose || (() => setInternalIsOpen(false));
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialisation de la session de chat avec Gemini
  useEffect(() => {
    if (show && !chatSessionRef.current) {
      try {
        const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
        chatSessionRef.current = ai.getGenerativeModel({ 
          model: 'gemini-1.5-flash' 
        }).startChat({
          systemInstruction: AGENCY_CONTEXT,
        });
      } catch (error) { 
        console.error("Erreur d'initialisation Gemini:", error); 
      }
    }
  }, [show, AGENCY_CONTEXT]); // Re-init si le contexte change (langue)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const processMessage = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user', timestamp: new Date() }]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) throw new Error("Hors ligne");
      const result = await chatSessionRef.current.sendMessage(text);
      setMessages(prev => [...prev, { id: Date.now(), text: result.response?.text?.() || "...", sender: 'bot', timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: t('chatbot.error') || "Connexion instable. Appelez-nous au " + CONTACT_INFO.phone, 
        sender: 'bot', 
        timestamp: new Date(), 
        isError: true 
      }]);
    } finally { setIsTyping(false); }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
          className="fixed bottom-24 right-6 z-[1000] w-[380px] h-[650px] bg-[var(--bg-surface)]/80 backdrop-blur-2xl border border-[var(--border-color)] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden text-[var(--text-main)] glass-morphism"
        >
          {/* En-tête du Chat - Harmonisé avec le thème */}
          <div className="bg-[var(--text-main)] p-6 flex justify-between items-center shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-2xl flex items-center justify-center border border-[var(--bg-primary)]/10 shadow-inner">
                <Bot size={28} className="text-[var(--text-main)]" />
              </div>
              <div>
                <h3 className="font-black text-sm text-[var(--bg-primary)] tracking-tight">Forge Intelligence</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-[10px] text-[var(--bg-primary)]/60 font-bold uppercase tracking-widest">Online Agent</p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleClose} 
              className="p-2 hover:bg-[var(--bg-primary)]/10 rounded-xl text-[var(--bg-primary)] transition-colors"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Zone des Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-[var(--accent-color)] text-white shadow-xl rounded-tr-none' 
                    : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] shadow-lg rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] italic ml-2">
                <Loader2 size={14} className="animate-spin" />
                {t('chatbot.typing') || "L'IA analyse votre requête..."}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulaire d'envoi */}
          <form 
            onSubmit={(e) => { e.preventDefault(); processMessage(inputValue); }} 
            className="p-6 bg-[var(--bg-primary)]/20 border-t border-[var(--border-color)] backdrop-blur-md"
          >
            <div className="flex gap-3">
              <input 
                className="flex-1 bg-[var(--bg-surface)]/50 border border-[var(--border-color)] rounded-2xl px-5 py-3 text-sm outline-none focus:border-[var(--accent-color)] text-[var(--text-main)] placeholder-[var(--text-secondary)]/50 transition-all shadow-inner"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('chatbot.placeholder') || "Votre question..."}
              />
              <button 
                type="submit" 
                className="p-3 bg-[var(--text-main)] text-[var(--bg-primary)] rounded-2xl hover:bg-[var(--accent-color)] hover:text-white transition-all duration-300 shadow-xl active:scale-95"
              >
                <Send size={20} strokeWidth={2} />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;

