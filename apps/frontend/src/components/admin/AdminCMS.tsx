'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Save, Trash2, Edit3, Briefcase, Users, MessageSquare, Image, Palette, Home, Layout, Zap, Star, CheckCircle2, AlertTriangle, Quote, User } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';
import { LivePreviewLayout, ImageUpload } from './CMSComponents';
import { ServiceCard } from '../Services';
import { TeamCard } from '../Team';
import Hero from '../Hero';
import { Palette as IconPalette, Code, Smartphone, Video, ShoppingCart, BarChart } from 'lucide-react';

// --- HOME & HERO MANAGER ---
export const HomeManager = ({ showToast }: { showToast: any }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => { setData(mockDB.getHero()); }, []);

  const handleSave = () => {
    mockDB.saveHero(data);
    showToast("Accueil mise à jour", "success");
  };

  if (!data) return null;

  return (
    <LivePreviewLayout 
      title="Gestion Accueil"
      actions={<button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark"><Save size={18}/> Enregistrer</button>}
      form={
        <>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">Contenu Hero</h4>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Titre (Mot 1)</label>
              <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={data.titlePrefix} onChange={e => setData({...data, titlePrefix: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Titre (Gradient)</label>
              <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={data.titleSpan} onChange={e => setData({...data, titleSpan: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Titre (Fin)</label>
              <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={data.titleSuffix} onChange={e => setData({...data, titleSuffix: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
              <textarea rows={4} className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={data.description} onChange={e => setData({...data, description: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Bouton Principal</label>
                  <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={data.ctaPrimary} onChange={e => setData({...data, ctaPrimary: e.target.value})} />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Bouton Secondaire</label>
                  <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={data.ctaSecondary} onChange={e => setData({...data, ctaSecondary: e.target.value})} />
               </div>
            </div>
          </div>
        </>
      }
      preview={<Hero />}
    />
  );
};

// --- SERVICE MANAGER ---
export const ServiceManager = ({ showToast }: { showToast: any }) => {
  const [services, setServices] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => { setServices(mockDB.getServices()); }, []);

  const handleSave = () => {
    mockDB.updateService(editing);
    setServices(mockDB.getServices());
    setEditing(null);
    showToast("Service sauvegardé", "success");
  };

  const handleDelete = (id: string | number) => {
    if(confirm('Supprimer ?')) {
        mockDB.deleteService(id);
        setServices(mockDB.getServices());
    }
  };

  const Icons: any = { Palette, Code, Smartphone, Video, ShoppingCart, BarChart };

  return (
    <>
      <AnimatePresence mode="wait">
        {editing ? (
          <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <LivePreviewLayout 
              title={editing.id ? "Modifier Service" : "Nouveau Service"}
              onBack={() => setEditing(null)}
              actions={<button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark"><Save size={18}/> Enregistrer</button>}
              form={
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Titre</label>
                    <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Sous-titre</label>
                    <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.subtitle} onChange={e => setEditing({...editing, subtitle: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
                    <textarea rows={4} className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Prix</label>
                        <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.pricing} onChange={e => setEditing({...editing, pricing: e.target.value})} />
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Durée</label>
                        <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.duration} onChange={e => setEditing({...editing, duration: e.target.value})} />
                     </div>
                  </div>
                  <ImageUpload label="Image de couverture" currentImage={editing.image} onImageChange={(url) => setEditing({...editing, image: url})} />
                </>
              }
              preview={<div className="p-8"><ServiceCard service={{...editing, icon: Icons[editing.iconName] || Palette}} /></div>}
            />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
               <h2 className="text-xl font-bold flex items-center gap-2"><Briefcase className="text-primary"/> Gestion des Services</h2>
               <button onClick={() => setEditing({ title: 'Nouveau Service', subtitle: 'Subtitle', description: 'Description...', features: [], pricing: '0 FCFA', duration: '1 semaine', gradient: 'from-blue-500 to-purple-600', image: '', iconName: 'Code' })} className="px-4 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2"><Plus size={18}/> Ajouter</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(s => (
                <div key={s.id} className="bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-4 group hover:border-primary/50 transition-colors">
                  <img src={s.image} alt={s.title} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 dark:text-white">{s.title}</h4>
                    <p className="text-xs text-gray-500">{s.subtitle}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditing(s)} className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-primary hover:text-white rounded-lg transition-colors"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-2 bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- TESTIMONIAL MANAGER ---
export const TestimonialManager = ({ showToast }: { showToast: any }) => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => { setTestimonials(mockDB.getTestimonials()); }, []);

  const handleSave = () => {
    mockDB.saveTestimonial(editing);
    setTestimonials(mockDB.getTestimonials());
    setEditing(null);
    showToast("Témoignage sauvegardé", "success");
  };

  const handleDelete = (id: string | number) => {
    if(confirm('Supprimer ce témoignage ?')) {
        mockDB.deleteTestimonial(id);
        setTestimonials(mockDB.getTestimonials());
        showToast("Témoignage supprimé", "success");
    }
  };

  const toggleApproval = (id: string | number) => {
    const updated = testimonials.map(t => t.id === id ? {...t, status: t.status === 'pending' ? 'approved' : 'pending'} : t);
    setTestimonials(updated);
    mockDB.saveTestimonials(updated);
    showToast("Statut mis à jour", "success");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {editing ? (
          <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <LivePreviewLayout 
              title={editing.id ? "Modifier Témoignage" : "Nouveau Témoignage"}
              onBack={() => setEditing(null)}
              actions={<button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark"><Save size={18}/> Enregistrer</button>}
              form={
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nom de l'utilisateur</label>
                    <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Rôle/Entreprise</label>
                    <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Note</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(star => (
                        <button type="button" key={star} onClick={() => setEditing({...editing, rating: star})} className="focus:outline-none">
                          <Star size={24} className={editing.rating >= star ? 'fill-accent text-accent' : 'text-gray-300 dark:text-gray-600'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Contenu</label>
                    <textarea rows={4} className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.content} onChange={e => setEditing({...editing, content: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Statut</label>
                    <select className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.status} onChange={e => setEditing({...editing, status: e.target.value})}>
                      <option value="pending">En attente</option>
                      <option value="approved">Approuvé</option>
                    </select>
                  </div>
                </div>
              }
              preview={
                <div className="p-8 max-w-md mx-auto">
                  <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 p-10 rounded-[2.5rem] shadow-xl">
                    <div className="flex justify-between items-start mb-8">
                      <Quote size={40} className="text-primary opacity-10" />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={`${i < editing.rating ? 'fill-accent text-accent' : 'text-gray-200 dark:text-gray-700'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic mb-10">
                      "{editing.content}"
                    </p>
                    <div className="flex items-center gap-5 border-t border-gray-100 dark:border-white/5 pt-8">
                      <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                         <User size={24} className="text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{editing.name}</h4>
                        <p className="text-sm text-gray-500 font-medium">{editing.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <h2 className="text-xl font-bold flex items-center gap-2"><Star className="text-primary"/> Témoignages Clients</h2>
              <button onClick={() => setEditing({ name: 'Client', role: 'Entreprise', content: 'Votre avis...', rating: 5, status: 'pending', date: new Date().toISOString() })} className="px-4 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2"><Plus size={18}/> Ajouter</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map(t => (
                <div key={t.id} className="bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={`${i < t.rating ? 'fill-accent text-accent' : 'text-gray-300 dark:text-gray-600'}`} />
                        ))}
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${t.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {t.status === 'pending' ? 'En attente' : 'Approuvé'}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">{new Date(t.date).toLocaleDateString()}</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic line-clamp-2">"{t.content}"</p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center"><User size={14} className="text-gray-400"/></div>
                       <div>
                         <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.name}</h4>
                         <p className="text-[10px] text-gray-500">{t.role}</p>
                       </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toggleApproval(t.id)} className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-primary hover:text-white rounded-lg transition-colors">
                        {t.status === 'pending' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                      </button>
                      <button onClick={() => setEditing(t)} className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-primary hover:text-white rounded-lg transition-colors"><Edit3 size={16} /></button>
                      <button onClick={() => handleDelete(t.id)} className="p-2 bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- PORTFOLIO MANAGER ---
export const PortfolioManager = ({ showToast }: { showToast: any }) => {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => { setItems(mockDB.getPortfolio()); }, []);

  const handleSave = () => {
    mockDB.savePortfolioItem(editing);
    setItems(mockDB.getPortfolio());
    setEditing(null);
    showToast("Projet mis à jour", "success");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {editing ? (
          <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <LivePreviewLayout 
              title={editing.id ? "Modifier Projet" : "Nouveau Projet"}
              onBack={() => setEditing(null)}
              actions={<button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark"><Save size={18}/> Enregistrer</button>}
              form={
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nom du projet</label>
                    <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Catégorie</label>
                    <select className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})}>
                      <option value="web">Web & App</option>
                      <option value="design">Design</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="motion">Motion</option>
                    </select>
                  </div>
                  <ImageUpload label="Image du projet" currentImage={editing.image} onImageChange={(url) => setEditing({...editing, image: url})} />
                </>
              }
              preview={
                <div className="p-10 flex items-center justify-center h-full">
                   <div className="relative w-full max-w-sm aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                      <img src={editing.image} className="w-full h-full object-cover"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 flex flex-col justify-end p-6">
                         <span className="text-accent text-[10px] uppercase font-bold">{editing.category}</span>
                         <h4 className="text-white font-bold text-xl">{editing.title}</h4>
                      </div>
                   </div>
                </div>
              }
            />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
               <h2 className="text-xl font-bold flex items-center gap-2"><Layout className="text-primary"/> Réalisations Portfolio</h2>
               <button onClick={() => setEditing({ title: 'Nouveau Projet', category: 'web', image: '', description: '' })} className="px-4 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2"><Plus size={18}/> Ajouter</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map(item => (
                <div key={item.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black shadow-lg">
                  <img src={item.image} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => setEditing(item)} className="p-2 bg-white text-black rounded-lg"><Edit3 size={16}/></button>
                    <button onClick={() => { if(confirm('Supprimer ?')) { mockDB.deletePortfolioItem(item.id); setItems(mockDB.getPortfolio()); } }} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- TEAM MANAGER ---
export const TeamManager = ({ showToast }: { showToast: any }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => { setMembers(mockDB.getTeam()); }, []);

  const handleSave = () => {
    mockDB.saveTeamMember(editing);
    setMembers(mockDB.getTeam());
    setEditing(null);
    showToast("Membre mis à jour", "success");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {editing ? (
          <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <LivePreviewLayout 
              title={editing.id ? "Modifier Membre" : "Nouveau Membre"}
              onBack={() => setEditing(null)}
              actions={<button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark"><Save size={18}/> Enregistrer</button>}
              form={
                <>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nom</label>
                        <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} />
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Rôle</label>
                        <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl" value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})} />
                     </div>
                  </div>
                  <ImageUpload label="Photo de profil" currentImage={editing.image} onImageChange={(url) => setEditing({...editing, image: url})} />
                </>
              }
              preview={<div className="p-8 max-w-md mx-auto"><TeamCard member={editing} /></div>}
            />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
               <h2 className="text-xl font-bold flex items-center gap-2"><Users className="text-primary"/> Gestion de l'Équipe</h2>
               <button onClick={() => setEditing({ name: 'Nouveau Membre', role: 'Developpeur', image: '', socials: {} })} className="px-4 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2"><Plus size={18}/> Ajouter</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {members.map(m => (
                <div key={m.id} className="bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col items-center gap-4 group hover:border-primary/50 transition-colors text-center">
                  <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full object-cover bg-gray-100" />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{m.name}</h4>
                    <p className="text-xs text-gray-500">{m.role}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditing(m)} className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-primary hover:text-white rounded-lg transition-colors"><Edit3 size={16} /></button>
                    <button onClick={() => { if(confirm('Supprimer ?')) { mockDB.deleteTeamMember(m.id); setMembers(mockDB.getTeam()); } }} className="p-2 bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

