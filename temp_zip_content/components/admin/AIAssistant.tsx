
import React, { useState, useEffect } from 'react';
import { 
  Bot, Sparkles, PenTool, Globe, Languages, Type, Copy, Check,
  RefreshCw, Zap, ArrowRight, FileText, Search, AlignLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDB } from '../../utils/mockDatabase';

type ToolType = 'blog' | 'rewrite' | 'headlines' | 'meta' | 'translate';

interface ToolConfig {
  id: ToolType;
  name: string;
  desc: string;
  icon: any;
  color: string;
}

const TOOLS: ToolConfig[] = [
  { id: 'blog', name: 'Rédacteur Blog', desc: 'Générez des articles structurés.', icon: FileText, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20' },
  { id: 'rewrite', name: 'Magic Rewrite', desc: 'Reformulez et améliorez vos textes.', icon: PenTool, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20' },
  { id: 'headlines', name: 'Générateur de Titres', desc: '5 titres accrocheurs en un clic.', icon: Type, color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20' },
  { id: 'meta', name: 'SEO Meta Tags', desc: 'Titre & Description optimisés.', icon: Search, color: 'text-green-500 bg-green-100 dark:bg-green-900/20' },
  { id: 'translate', name: 'Traducteur Pro', desc: 'Traduction contextuelle (FR/EN).', icon: Languages, color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/20' },
];

const AIAssistant: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);
  const [input, setInput] = useState('');
  const [options, setOptions] = useState({ tone: 'Professional', length: 'Medium', lang: 'en' });
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHistory(mockDB.getAIHistory());
  }, []);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResult('');

    // SIMULATION OF AI RESPONSE (Replace with real API call later)
    setTimeout(() => {
      let output = '';
      switch (activeTool) {
        case 'blog':
          output = `## ${input}\n\n**Introduction**\nDans le monde numérique d'aujourd'hui, "${input}" est devenu un sujet incontournable. \n\n**Point Clé 1**\nIl est essentiel de comprendre les fondamentaux. Les experts s'accordent à dire que l'approche stratégique est primordiale.\n\n**Conclusion**\nEn résumé, adopter cette méthode peut transformer vos résultats.`;
          break;
        case 'rewrite':
          output = `✨ Version Améliorée :\n"${input.split(' ').reverse().join(' ')} (Ceci est une simulation de réécriture qui rendrait votre texte plus percutant et professionnel.)"`;
          break;
        case 'headlines':
          output = `1. ${input} : Le Guide Ultime\n2. Pourquoi ${input} va changer votre business\n3. 5 Secrets sur ${input} que personne ne vous dit\n4. Maîtrisez ${input} en 24h\n5. ${input} : L'erreur à ne pas commettre`;
          break;
        case 'meta':
          output = `Title: ${input} | Mind Graphix Solution\n\nDescription: Découvrez tout sur "${input}". Nos experts vous guident avec des stratégies éprouvées pour maximiser votre impact digital. Cliquez ici pour en savoir plus.`;
          break;
        case 'translate':
          output = `[Traduction simulée vers ${options.lang === 'en' ? 'Anglais' : 'Espagnol'}]\n\n${input} -> (Translated content would appear here based on context using neural machine translation).`;
          break;
      }

      setResult(output);
      setIsLoading(false);
      mockDB.saveAIHistory({ tool: activeTool, input, output, date: new Date().toISOString() });
      setHistory(mockDB.getAIHistory());
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-primary to-accent text-white rounded-lg shadow-lg">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">Assistant IA <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase">Beta</span></h1>
            <p className="text-xs text-gray-500">Automatisation & Génération de contenu</p>
          </div>
        </div>
        {activeTool && (
          <button onClick={() => setActiveTool(null)} className="text-sm font-bold text-gray-500 hover:text-primary">Retour aux outils</button>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex gap-6">
        
        {/* LEFT PANEL: TOOLS / INPUT */}
        <div className={`flex-1 flex flex-col ${activeTool ? 'max-w-md' : 'w-full'}`}>
          {!activeTool ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2">
              {TOOLS.map((tool) => (
                <motion.div 
                  key={tool.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTool(tool.id)}
                  className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 cursor-pointer shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color}`}>
                    <tool.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tool.desc}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                <div className={`p-2 rounded-lg ${TOOLS.find(t => t.id === activeTool)?.color}`}>
                  {React.createElement(TOOLS.find(t => t.id === activeTool)?.icon || Bot, { size: 20 })}
                </div>
                <h3 className="font-bold text-lg">{TOOLS.find(t => t.id === activeTool)?.name}</h3>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Votre Demande (Prompt)</label>
                  <textarea 
                    className="w-full h-32 p-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl resize-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder={activeTool === 'translate' ? "Texte à traduire..." : "Sujet, mots-clés ou texte à traiter..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>

                {/* Dynamic Options */}
                {activeTool === 'blog' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Ton</label>
                      <select className="w-full p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10" value={options.tone} onChange={(e) => setOptions({...options, tone: e.target.value})}>
                        <option value="Professional">Professionnel</option>
                        <option value="Casual">Décontracté</option>
                        <option value="Enthusiastic">Enthousiaste</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Longueur</label>
                      <select className="w-full p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10" value={options.length} onChange={(e) => setOptions({...options, length: e.target.value})}>
                        <option value="Short">Court</option>
                        <option value="Medium">Moyen</option>
                        <option value="Long">Long</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTool === 'translate' && (
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Langue Cible</label>
                    <select className="w-full p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10" value={options.lang} onChange={(e) => setOptions({...options, lang: e.target.value})}>
                      <option value="en">Anglais (English)</option>
                      <option value="es">Espagnol (Español)</option>
                      <option value="de">Allemand (Deutsch)</option>
                    </select>
                  </div>
                )}
              </div>

              <button 
                onClick={handleGenerate} 
                disabled={isLoading || !input}
                className="w-full py-3 mt-6 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <div className="animate-spin w-5 h-5 border-2 border-white rounded-full border-t-transparent"></div> : <Sparkles size={20} />}
                Générer avec l'IA
              </button>
            </motion.div>
          )}
        </div>

        {/* RIGHT PANEL: RESULT / HISTORY */}
        {activeTool && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2"><AlignLeft size={20}/> Résultat</h3>
              <div className="flex gap-2">
                {result && (
                  <button onClick={copyToClipboard} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Copier">
                    {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18}/>}
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 bg-gray-50 dark:bg-black/20 rounded-xl p-6 overflow-y-auto border border-gray-100 dark:border-white/5 font-mono text-sm leading-relaxed whitespace-pre-wrap relative">
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="animate-pulse">L'IA rédige votre contenu...</p>
                </div>
              ) : result ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{result}</motion.div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 opacity-50">
                  <Bot size={48} className="mb-2"/>
                  <p>Le résultat apparaîtra ici.</p>
                </div>
              )}
            </div>
            
            {/* Recent History Mini-View */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Historique récent</p>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {history.slice(0, 5).map((h, i) => (
                  <button key={i} onClick={() => { setInput(h.input); setResult(h.output); setActiveTool(h.tool); }} className="px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-xs whitespace-nowrap hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-gray-300 dark:hover:border-white/20">
                    {h.input.substring(0, 15)}...
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
