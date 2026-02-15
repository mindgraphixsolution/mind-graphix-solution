
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { SERVICES, CONTACT_INFO } from '../constants';

const AGENCY_CONTEXT = `
Tu es "Forge Intelligence", l'IA de Mind Graphix Solution. 
Agence basée à Bobo-Dioulasso.
Ton rôle: Expert en transformation digitale et aide à la vente.

SERVICES:
${JSON.stringify(SERVICES.map(s => ({ titre: s.title, desc: s.description })))}

TON COMPORTEMENT:
1. Professionnel, réactif et créatif.
2. Parle français par défaut.
3. Toujours proposer de passer à l'action (devis, contact).
4. Ne jamais inventer de prix, redirige vers les services pour les forfaits.
`;

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  isError?: boolean;
}

const ChatBot = ({ isOpen: externalIsOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Bonjour, je suis Forge Intelligence. Comment puis-je propulser votre projet aujourd'hui ?", sender: 'bot', timestamp: new Date() }
  ]);
  
  const show = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleClose = onClose || (() => setInternalIsOpen(false));
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && !chatSessionRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: { systemInstruction: AGENCY_CONTEXT, temperature: 0.8 },
        });
      } catch (error) { console.error("Gemini Error:", error); }
    }
  }, [show]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const processMessage = async (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user', timestamp: new Date() }]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) throw new Error("Offline");
      const result = await chatSessionRef.current.sendMessage({ message: text });
      setMessages(prev => [...prev, { id: Date.now(), text: result.text || "...", sender: 'bot', timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: "Connexion instable. Appelez-nous au " + CONTACT_INFO.phone, sender: 'bot', timestamp: new Date(), isError: true }]);
    } finally { setIsTyping(false); }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 right-6 z-[1000] w-[380px] h-[600px] bg-[#0a0e17]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        >
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                <Bot size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Forge Intelligence</h3>
                <p className="text-[10px] text-white/60 flex items-center gap-1">Powered by Gemini 3</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white/5 border border-white/10 text-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-gray-500 animate-pulse">L'IA analyse votre requête...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); processMessage(inputValue); }} className="p-4 bg-white/5 border-t border-white/10">
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-transparent border border-white/10 rounded-full px-4 py-2 text-sm outline-none focus:border-primary"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Votre question..."
              />
              <button type="submit" className="p-2 bg-primary rounded-full hover:bg-accent transition-colors"><Send size={18}/></button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
