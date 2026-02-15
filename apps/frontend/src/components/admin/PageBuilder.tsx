'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, Type, Image as ImageIcon, Box, Columns, MousePointer, 
  Smartphone, Monitor, Tablet, Save, Eye, Trash2, Move, Plus, 
  Settings, Layers, ChevronRight, ChevronDown, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Palette, Play, Menu, Maximize, CreditCard, List, Square, Circle,
  MoveVertical, Wind, Zap, Sliders, Grid, Copy, MonitorPlay, BoxSelect,
  CornerUpLeft, CornerUpRight, Minimize, Link as LinkIcon, ImagePlus,
  RotateCcw, RotateCw, History, GitBranch, Check, Clock, AlertTriangle, FileInput, Download
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

// --- TYPES AVANCÉS ---

type Breakpoint = 'desktop' | 'tablet' | 'mobile';

interface ElementStyle {
  [key: string]: string | undefined; // Base styles
}

interface ResponsiveStyles {
  tablet?: ElementStyle;
  mobile?: ElementStyle;
}

interface AnimationConfig {
  type: 'none' | 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoom' | 'rotate';
  duration: number;
  delay: number;
  trigger: 'load' | 'scroll' | 'hover';
  ease: string;
}

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  children?: MenuItem[];
  promoImage?: string; // For Mega Menu
  type: 'link' | 'column' | 'promo';
}

interface PageElement {
  id: string;
  type: string;
  name: string;
  content?: string;
  src?: string;
  children?: PageElement[];
  style: ElementStyle;
  responsive?: ResponsiveStyles; 
  animation?: AnimationConfig;   
  props?: any;
  menuItems?: MenuItem[]; // Specific for Mega Menu
}

// --- HELPER COMPONENTS ---

const BoxModelEditor = ({ style, onChange }: { style: ElementStyle, onChange: (key: string, val: string) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-4 select-none text-[10px]">
      <div className="relative bg-[#f9cc9d]/10 border border-dashed border-[#f9cc9d] p-6 w-full max-w-[240px] flex flex-col items-center gap-1 rounded">
        <span className="absolute top-1 left-2 text-[#f9cc9d] uppercase tracking-wider font-bold">Margin</span>
        <div className="w-full flex justify-center"><input className="w-8 bg-transparent text-center text-[#f9cc9d] outline-none" placeholder="-" value={style.marginTop || ''} onChange={(e) => onChange('marginTop', e.target.value)} /></div>
        
        <div className="w-full flex justify-between items-center">
           <input className="w-8 bg-transparent text-center text-[#f9cc9d] outline-none" placeholder="-" value={style.marginLeft || ''} onChange={(e) => onChange('marginLeft', e.target.value)} />
           <div className="relative bg-[#fdd835]/10 border border-[#fdd835] p-6 w-full flex flex-col items-center gap-1 rounded mx-1">
              <span className="absolute top-1 left-2 text-[#fdd835] uppercase tracking-wider font-bold">Border</span>
              <div className="w-full flex justify-center"><input className="w-8 bg-transparent text-center text-[#fdd835] outline-none" placeholder="-" value={style.borderTopWidth || ''} onChange={(e) => onChange('borderTopWidth', e.target.value)} /></div>
              <div className="w-full flex justify-between items-center">
                 <input className="w-8 bg-transparent text-center text-[#fdd835] outline-none" placeholder="-" value={style.borderLeftWidth || ''} onChange={(e) => onChange('borderLeftWidth', e.target.value)} />
                 <div className="relative bg-[#c3ce5f]/10 border border-dashed border-[#c3ce5f] p-6 w-full flex flex-col items-center gap-1 rounded mx-1">
                    <span className="absolute top-1 left-2 text-[#c3ce5f] uppercase tracking-wider font-bold">Padding</span>
                    <div className="w-full flex justify-center"><input className="w-8 bg-transparent text-center text-[#c3ce5f] outline-none" placeholder="-" value={style.paddingTop || ''} onChange={(e) => onChange('paddingTop', e.target.value)} /></div>
                    <div className="w-full flex justify-between items-center">
                       <input className="w-8 bg-transparent text-center text-[#c3ce5f] outline-none" placeholder="-" value={style.paddingLeft || ''} onChange={(e) => onChange('paddingLeft', e.target.value)} />
                       <div className="bg-[#90caf9] w-12 h-6 flex items-center justify-center text-slate-900 font-bold text-xs rounded-sm">Content</div>
                       <input className="w-8 bg-transparent text-center text-[#c3ce5f] outline-none" placeholder="-" value={style.paddingRight || ''} onChange={(e) => onChange('paddingRight', e.target.value)} />
                    </div>
                    <div className="w-full flex justify-center"><input className="w-8 bg-transparent text-center text-[#c3ce5f] outline-none" placeholder="-" value={style.paddingBottom || ''} onChange={(e) => onChange('paddingBottom', e.target.value)} /></div>
                 </div>
                 <input className="w-8 bg-transparent text-center text-[#fdd835] outline-none" placeholder="-" value={style.borderRightWidth || ''} onChange={(e) => onChange('borderRightWidth', e.target.value)} />
              </div>
              <div className="w-full flex justify-center"><input className="w-8 bg-transparent text-center text-[#fdd835] outline-none" placeholder="-" value={style.borderBottomWidth || ''} onChange={(e) => onChange('borderBottomWidth', e.target.value)} /></div>
           </div>
           <input className="w-8 bg-transparent text-center text-[#f9cc9d] outline-none" placeholder="-" value={style.marginRight || ''} onChange={(e) => onChange('marginRight', e.target.value)} />
        </div>
        <div className="w-full flex justify-center"><input className="w-8 bg-transparent text-center text-[#f9cc9d] outline-none" placeholder="-" value={style.marginBottom || ''} onChange={(e) => onChange('marginBottom', e.target.value)} /></div>
      </div>
    </div>
  );
};

const MegaMenuConfig = ({ items, onChange }: { items: MenuItem[], onChange: (items: MenuItem[]) => void }) => {
  const addItem = () => {
    const newItem: MenuItem = { id: Date.now().toString(), label: 'Nouveau lien', type: 'link' };
    onChange([...(items || []), newItem]);
  };

  const updateItem = (id: string, key: string, value: any) => {
    const updateRecursive = (list: MenuItem[]): MenuItem[] => {
      return list.map(item => {
        if (item.id === id) return { ...item, [key]: value };
        if (item.children) return { ...item, children: updateRecursive(item.children) };
        return item;
      });
    };
    onChange(updateRecursive(items || []));
  };

  const addSubItem = (parentId: string) => {
    const updateRecursive = (list: MenuItem[]): MenuItem[] => {
      return list.map(item => {
        if (item.id === parentId) {
          const newItem: MenuItem = { id: Date.now().toString(), label: 'Sous-lien', type: 'link' };
          return { ...item, children: [...(item.children || []), newItem] };
        }
        if (item.children) return { ...item, children: updateRecursive(item.children) };
        return item;
      });
    };
    onChange(updateRecursive(items || []));
  };

  const deleteItem = (id: string) => {
     const deleteRecursive = (list: MenuItem[]): MenuItem[] => {
        return list.filter(item => item.id !== id).map(item => ({
           ...item,
           children: item.children ? deleteRecursive(item.children) : undefined
        }));
     };
     onChange(deleteRecursive(items || []));
  };

  const renderTree = (list: MenuItem[], depth = 0) => {
    return (
      <div className={`flex flex-col gap-2 ${depth > 0 ? 'ml-4 border-l border-white/10 pl-2' : ''}`}>
        {list.map(item => (
          <div key={item.id} className="bg-white/5 p-2 rounded border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <input 
                value={item.label} 
                onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                className="bg-transparent border-b border-white/20 text-xs text-white focus:border-primary outline-none w-full"
              />
              <select 
                value={item.type} 
                onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                className="bg-black/30 text-[10px] rounded px-1 border border-white/10"
              >
                <option value="link">Lien</option>
                <option value="column">Colonne</option>
                <option value="promo">Promo Img</option>
              </select>
              <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-400"><Trash2 size={12}/></button>
            </div>
            {item.type === 'promo' && (
               <div className="flex items-center gap-2 mb-2">
                  <ImagePlus size={12} className="text-gray-400"/>
                  <input 
                     placeholder="URL Image"
                     value={item.promoImage || ''} 
                     onChange={(e) => updateItem(item.id, 'promoImage', e.target.value)}
                     className="bg-transparent border-b border-white/20 text-[10px] text-gray-300 w-full"
                  />
               </div>
            )}
            {(item.type === 'column' || depth === 0) && (
               <div className="mt-1">
                  {item.children && renderTree(item.children, depth + 1)}
                  <button onClick={() => addSubItem(item.id)} className="text-[10px] text-primary flex items-center gap-1 mt-1 hover:underline">
                     <Plus size={10}/> Ajouter sous-élément
                  </button>
               </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderTree(items || [])}
      <button onClick={addItem} className="w-full py-2 border border-dashed border-white/20 rounded text-xs text-gray-400 hover:text-white hover:border-white/40 flex items-center justify-center gap-2">
        <Plus size={14}/> Ajouter Menu Racine
      </button>
    </div>
  );
};

const getAnimationVariants = (config?: AnimationConfig) => {
  if (!config || config.type === 'none') return {};
  const transition = { duration: config.duration, delay: config.delay, ease: (config.ease || "easeOut") as any };
  const variants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition }, hover: { transition } };
  switch (config.type) {
    case 'slideUp': variants.hidden.y = 50; variants.visible.y = 0; break;
    case 'slideLeft': variants.hidden.x = -50; variants.visible.x = 0; break;
    case 'slideRight': variants.hidden.x = 50; variants.visible.x = 0; break;
    case 'zoom': variants.hidden.scale = 0.8; variants.visible.scale = 1; break;
    case 'rotate': variants.hidden.rotate = -15; variants.visible.rotate = 0; break;
  }
  if (config.trigger === 'hover') return { initial: {}, whileHover: config.type === 'zoom' ? { scale: 1.05 } : config.type === 'slideUp' ? { y: -10 } : {}, transition };
  return { initial: "hidden", whileInView: config.trigger === 'scroll' ? "visible" : undefined, animate: config.trigger === 'load' ? "visible" : undefined, viewport: { once: true, margin: "-10%" }, variants };
};

const COMPONENT_LIBRARY = [
  { category: 'Navigation', items: [
      { type: 'mega-menu', name: 'Mega Menu', icon: Menu, defaultStyle: { width: '100%', padding: '15px 30px', backgroundColor: '#ffffff10', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(10px)' }, menuItems: [ {id: '1', label: 'Accueil', type: 'link'}, {id: '2', label: 'Services', type: 'column', children: [{id: '2a', label: 'Web', type:'link'}, {id:'2b', label:'Design', type:'link'}]} ] }
  ]},
  { category: 'Structure', items: [
      { type: 'container', name: 'Section', icon: Box, defaultStyle: { padding: '60px 20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' } },
      { type: 'grid', name: 'Grille 2 Cols', icon: Columns, defaultStyle: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', width: '100%' }, children: [ { id: 'c1', type: 'container', name: 'Col 1', style: { padding: '20px' }, children: [] }, { id: 'c2', type: 'container', name: 'Col 2', style: { padding: '20px' }, children: [] } ]},
      { type: 'grid3', name: 'Grille 3 Cols', icon: Grid, defaultStyle: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', width: '100%' }, children: [ { id: 'c1', type: 'container', name: 'Col 1', style: { padding: '20px' }, children: [] }, { id: 'c2', type: 'container', name: 'Col 2', style: { padding: '20px' }, children: [] }, { id: 'c3', type: 'container', name: 'Col 3', style: { padding: '20px' }, children: [] } ]}
  ]},
  { category: 'Typography', items: [
      { type: 'heading', name: 'Titre H1', icon: Type, content: 'Grand Titre', defaultStyle: { fontSize: 'var(--h1)', fontWeight: '800', color: 'var(--text)', lineHeight: '1.1' } },
      { type: 'heading2', name: 'Titre H2', icon: Type, content: 'Sous-titre', defaultStyle: { fontSize: 'var(--h2)', fontWeight: '700', color: 'var(--text)', marginBottom: '10px' } },
      { type: 'text', name: 'Paragraphe', icon: AlignLeft, content: 'Lorem ipsum dolor sit amet...', defaultStyle: { fontSize: 'var(--body)', color: 'var(--text-secondary)', lineHeight: '1.6' } },
  ]},
  { category: 'Média & UI', items: [
      { type: 'image', name: 'Image', icon: ImageIcon, src: 'https://via.placeholder.com/800x600', defaultStyle: { width: '100%', borderRadius: 'var(--radius-md)', objectFit: 'cover' } },
      { type: 'button', name: 'Bouton CTA', icon: MousePointer, content: 'En savoir plus', defaultStyle: { padding: '12px 30px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: 'fit-content' } },
      { type: 'card', name: 'Carte', icon: CreditCard, defaultStyle: { padding: '30px', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }, children: [] }
  ]}
];

// --- MAIN BUILDER ---
const PageBuilder = () => {
  const [elements, setElements] = useState<PageElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<Breakpoint>('desktop');
  const [rightPanelTab, setRightPanelTab] = useState<'inspector' | 'structure' | 'animate' | 'layers'>('inspector');
  const [leftPanelTab, setLeftPanelTab] = useState<'add' | 'templates'>('add');
  const [previewMode, setPreviewMode] = useState(false);
  const [designSystem] = useState<any>(mockDB.getDesignSystem());
  
  // HISTORY STATE
  const [history, setHistory] = useState<Array<{ desc: string, data: PageElement[] }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHistory, setShowHistory] = useState(false);

  // VERSIONS STATE
  const [showVersions, setShowVersions] = useState(false);
  const [pageId] = useState('page_demo'); // For demo
  const [versions, setVersions] = useState<any[]>([]);
  const [versionPreviewMode, setVersionPreviewMode] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (designSystem && designSystem.colors) {
      Object.entries(designSystem.colors).forEach(([k, v]) => root.style.setProperty(`--${k}`, v as string));
    }
    root.style.setProperty('--border', 'rgba(255,255,255,0.1)');
    
    // Initial State Push
    setHistory([{ desc: 'Initial State', data: [] }]);
    setHistoryIndex(0);
    loadVersions();
  }, [designSystem]);

  const loadVersions = () => {
    setVersions(mockDB.getPageVersions(pageId));
  };

  const genId = () => Math.random().toString(36).substr(2, 9);

  // --- HISTORY LOGIC ---
  const commitHistory = (desc: string, newElements: PageElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    const deepCopy = JSON.parse(JSON.stringify(newElements));
    newHistory.push({ desc, data: deepCopy });
    
    // Limit history size to 100
    if (newHistory.length > 100) newHistory.shift();
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setElements(newElements);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const step = history[newIndex];
      if (step) {
        setHistoryIndex(newIndex);
        setElements(JSON.parse(JSON.stringify(step.data)));
      }
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const step = history[newIndex];
      if (step) {
        setHistoryIndex(newIndex);
        setElements(JSON.parse(JSON.stringify(step.data)));
      }
    }
  };

  const jumpToHistory = (index: number) => {
    const step = history[index];
    if (step) {
      setHistoryIndex(index);
      setElements(JSON.parse(JSON.stringify(step.data)));
      setShowHistory(false);
    }
  };

  // --- VERSIONING LOGIC ---
  const saveVersion = () => {
    const name = prompt("Nom de la version (ex: v1.0 avant refonte):");
    if (name) {
      mockDB.savePageVersion(pageId, name, elements);
      loadVersions();
      alert("Version sauvegardée !");
    }
  };

  const previewVersion = (v: any) => {
    setVersionPreviewMode(v.name);
    setElements(JSON.parse(JSON.stringify(v.elements))); // Load without committing to history yet
    setShowVersions(false);
  };

  const restoreVersion = () => {
    if (versionPreviewMode) {
      commitHistory(`Restored Version: ${versionPreviewMode}`, elements);
      setVersionPreviewMode(null);
      alert("Version restaurée avec succès !");
    }
  };

  const cancelVersionPreview = () => {
    // Revert to current history state
    const step = history[historyIndex];
    if (step) {
      setElements(JSON.parse(JSON.stringify(step.data)));
    }
    setVersionPreviewMode(null);
  };

  // --- ACTIONS ---
  const addElement = (template: any, targetId?: string) => {
    const newElement: PageElement = {
      id: genId(),
      type: template.type,
      name: template.name,
      content: template.content,
      src: template.src,
      style: { ...template.defaultStyle },
      children: template.children ? JSON.parse(JSON.stringify(template.children)) : [],
      animation: { type: 'none', duration: 0.5, delay: 0, trigger: 'scroll', ease: 'easeOut' },
      menuItems: template.menuItems || []
    };

    const addRecursive = (elems: PageElement[]): PageElement[] => {
      if (!targetId) return [...elems, newElement];
      return elems.map(el => {
        if (el.id === targetId && ['container', 'grid', 'grid3', 'card'].includes(el.type.replace(/\d+/g, ''))) {
          return { ...el, children: [...(el.children || []), newElement] };
        }
        if (el.children) return { ...el, children: addRecursive(el.children) };
        return el;
      });
    };
    
    const newElements = targetId ? addRecursive(elements) : [...elements, newElement];
    commitHistory(`Ajout ${template.name}`, newElements);
  };

  const updateElement = (id: string, updates: any, scope: 'style' | 'base' | 'animation' = 'base') => {
    const updateRecursive = (elems: PageElement[]): PageElement[] => {
      return elems.map(el => {
        if (el.id === id) {
          if (scope === 'style') {
            if (viewMode === 'desktop') return { ...el, style: { ...el.style, ...updates } };
            else return { ...el, responsive: { ...el.responsive, [viewMode]: { ...(el.responsive?.[viewMode] || {}), ...updates } } };
          }
          if (scope === 'animation') return { ...el, animation: { ...el.animation, ...updates } };
          return { ...el, ...updates };
        }
        if (el.children) return { ...el, children: updateRecursive(el.children) };
        return el;
      });
    };
    
    // Only commit history for 'base' updates or significant style changes (debouncing could be added here for sliders)
    // For simplicity, we commit on every change in this demo structure, in production use debounce
    const newElements = updateRecursive(elements);
    
    // Simple debounce check or just commit
    // In a real app, sliders should update local state and commit onMouseUp
    // Here we commit directly for functionality demonstration
    const activeEl = findElement(elements, id);
    commitHistory(`Modif ${activeEl?.name || 'Element'}`, newElements);
  };

  const deleteElement = (id: string) => {
    const deleteRecursive = (elems: PageElement[]): PageElement[] => {
      return elems.filter(el => el.id !== id).map(el => ({ ...el, children: el.children ? deleteRecursive(el.children) : undefined }));
    };
    const newElements = deleteRecursive(elements);
    commitHistory('Suppression élément', newElements);
    if (selectedId === id) setSelectedId(null);
  };

  const findElement = (elems: PageElement[], id: string): PageElement | undefined => {
    for (const el of elems) {
      if (el.id === id) return el;
      if (el.children) {
        const found = findElement(el.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const activeElement = selectedId ? findElement(elements, selectedId) : null;
  
  const getComputedStyle = (element: PageElement) => {
    const base = element.style;
    const tablet = viewMode !== 'desktop' ? element.responsive?.tablet : {};
    const mobile = viewMode === 'mobile' ? element.responsive?.mobile : {};
    return { ...base, ...tablet, ...mobile };
  };

  // --- RENDERER ---
  const ElementRenderer: React.FC<{ element: PageElement }> = ({ element }) => {
    const computedStyle = getComputedStyle(element);
    const isSelected = selectedId === element.id;
    const animationProps: any = !previewMode ? {} : getAnimationVariants(element.animation);

    const commonProps = {
      ...animationProps,
      style: { 
        ...computedStyle, 
        outline: isSelected && !previewMode ? '2px solid #00f3ff' : 'none', 
        position: 'relative' as any,
        minHeight: element.children && element.children.length === 0 ? '80px' : undefined
      },
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!previewMode) {
           setSelectedId(element.id);
           if(element.type === 'mega-menu') setRightPanelTab('structure');
        }
      },
      className: `transition-all duration-200 ${!previewMode ? 'hover:outline-dashed hover:outline-1 hover:outline-gray-500' : ''}`
    };

    if (element.type === 'mega-menu') {
       return (
          <motion.nav {...commonProps}>
             <div className="font-bold text-lg text-white">LOGO</div>
             <div className="flex gap-6 relative">
                {element.menuItems?.map((item) => (
                   <div key={item.id} className="group relative py-4">
                      <span className="cursor-pointer text-sm font-medium text-white/80 hover:text-white flex items-center gap-1">
                         {item.label} {item.children && item.children.length > 0 && <ChevronDown size={12}/>}
                      </span>
                      {item.children && item.children.length > 0 && (
                         <div className="absolute top-full left-0 w-[600px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 grid grid-cols-3 gap-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto z-50 shadow-2xl">
                            {item.children.map(col => (
                               <div key={col.id}>
                                  {col.type === 'promo' ? (
                                     <div className="rounded-lg overflow-hidden h-32 relative group/img">
                                        <img src={col.promoImage || 'https://via.placeholder.com/300'} className="w-full h-full object-cover" alt="Promo"/>
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                           <span className="text-xs font-bold text-white">{col.label}</span>
                                        </div>
                                     </div>
                                  ) : (
                                     <>
                                        <h4 className="font-bold text-accent text-sm mb-3 uppercase tracking-wider">{col.label}</h4>
                                        <div className="space-y-2">
                                           {col.children?.map(sub => (
                                              <a key={sub.id} href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">{sub.label}</a>
                                           ))}
                                        </div>
                                     </>
                                  )}
                               </div>
                            ))}
                         </div>
                      )}
                   </div>
                ))}
             </div>
             <div className="bg-primary px-4 py-2 rounded-full text-xs font-bold text-white">Contact</div>
          </motion.nav>
       );
    }

    if (['container', 'grid', 'grid3', 'card'].includes(element.type.replace(/\d+/g, ''))) {
      return (
        <motion.div {...commonProps}>
          {isSelected && !previewMode && <span className="absolute -top-5 left-0 bg-accent text-dark text-[10px] px-2 py-0.5 rounded-t font-bold z-50 uppercase">{element.name}</span>}
          {element.children?.map(child => <ElementRenderer key={child.id} element={child} />)}
          {element.children?.length === 0 && !previewMode && <div className="flex items-center justify-center p-4 h-full border border-dashed border-white/20 rounded bg-white/5 text-xs text-gray-500">Drop here</div>}
        </motion.div>
      );
    }

    if (element.type === 'image') return <motion.img src={element.src} alt="content" {...commonProps} />;
    if (element.type === 'button') return <motion.button {...commonProps}>{element.content}</motion.button>;
    if (element.type.startsWith('heading')) {
      const Tag = element.type === 'heading' ? 'h1' : 'h2';
      // @ts-ignore
      return <motion.div {...commonProps}><Tag>{element.content}</Tag></motion.div>;
    }
    
    return <motion.p {...commonProps}>{element.content}</motion.p>;
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-[#0a0e17] text-white overflow-hidden rounded-xl border border-white/10 shadow-2xl font-sans relative">
      
      {/* VERSION PREVIEW BANNER */}
      {versionPreviewMode && (
        <div className="bg-yellow-500 text-black px-4 py-2 flex items-center justify-between font-bold text-sm z-50">
           <div className="flex items-center gap-2"><AlertTriangle size={16}/> Prévisualisation de la version : {versionPreviewMode}</div>
           <div className="flex gap-2">
              <button onClick={cancelVersionPreview} className="px-3 py-1 bg-black/20 hover:bg-black/30 rounded">Annuler</button>
              <button onClick={restoreVersion} className="px-3 py-1 bg-black text-white hover:bg-black/80 rounded flex items-center gap-1"><RotateCcw size={12}/> Restaurer</button>
           </div>
        </div>
      )}

      {/* TOOLBAR */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#151e32]">
        <div className="flex items-center gap-4">
          <div className="flex bg-black/30 p-1 rounded-lg border border-white/5">
            <button onClick={() => setViewMode('desktop')} className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}><Monitor size={16}/></button>
            <button onClick={() => setViewMode('tablet')} className={`p-2 rounded ${viewMode === 'tablet' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}><Tablet size={16}/></button>
            <button onClick={() => setViewMode('mobile')} className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}><Smartphone size={16}/></button>
          </div>
          
          <div className="h-6 w-px bg-white/10"></div>
          
          <div className="flex items-center gap-1">
             <button onClick={undo} disabled={historyIndex <= 0} className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed" title="Undo"><RotateCcw size={16}/></button>
             <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed" title="Redo"><RotateCw size={16}/></button>
             
             <div className="relative">
                <button onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded transition-colors ${showHistory ? 'text-primary bg-white/10' : 'text-gray-400 hover:text-white'}`} title="Historique"><History size={16}/></button>
                {/* HISTORY DROPDOWN */}
                {showHistory && (
                   <div className="absolute top-full left-0 mt-2 w-64 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="p-2 border-b border-white/5 font-bold text-xs text-gray-400 uppercase">Historique des actions</div>
                      <div className="max-h-60 overflow-y-auto">
                         {history.map((step, i) => (
                            <button key={i} onClick={() => jumpToHistory(i)} className={`w-full text-left px-3 py-2 text-xs flex justify-between hover:bg-white/5 ${i === historyIndex ? 'text-primary font-bold bg-white/5' : 'text-gray-400'}`}>
                               <span>{step.desc}</span>
                               {i === historyIndex && <Check size={12}/>}
                            </button>
                         ))}
                      </div>
                   </div>
                )}
             </div>

             <div className="relative">
                <button onClick={() => setShowVersions(!showVersions)} className={`p-2 rounded transition-colors ${showVersions ? 'text-accent bg-white/10' : 'text-gray-400 hover:text-white'}`} title="Versions"><GitBranch size={16}/></button>
                {/* VERSIONS DROPDOWN */}
                {showVersions && (
                   <div className="absolute top-full left-0 mt-2 w-72 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="p-3 border-b border-white/5 flex justify-between items-center">
                         <span className="font-bold text-xs text-gray-400 uppercase">Versions</span>
                         <button onClick={saveVersion} className="text-[10px] bg-primary px-2 py-1 rounded flex items-center gap-1 hover:bg-primary-dark"><Save size={10}/> Sauvegarder</button>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                         {versions.length === 0 ? <div className="p-4 text-center text-xs text-gray-500">Aucune version sauvegardée</div> : 
                            versions.map((v) => (
                               <div key={v.id} className="px-3 py-2 border-b border-white/5 hover:bg-white/5 flex justify-between items-center group">
                                  <div>
                                     <div className="text-xs font-bold text-white">{v.name}</div>
                                     <div className="text-[10px] text-gray-500">{new Date(v.timestamp).toLocaleString()}</div>
                                  </div>
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button onClick={() => previewVersion(v)} className="p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500 hover:text-white" title="Charger"><Download size={12}/></button>
                                     <button onClick={() => {mockDB.deletePageVersion(v.id); loadVersions();}} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500 hover:text-white" title="Supprimer"><Trash2 size={12}/></button>
                                  </div>
                               </div>
                            ))
                         }
                      </div>
                   </div>
                )}
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setPreviewMode(!previewMode)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${previewMode ? 'bg-green-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}>
            <Eye size={14}/> {previewMode ? 'Éditer' : 'Aperçu'}
          </button>
          <button onClick={() => {mockDB.savePage({id: genId(), name: 'Nouvelle Page', elements}); alert('Page Sauvegardée!')}} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-xs font-bold transition-colors">
            <Save size={14}/> Sauvegarder
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: COMPONENT LIBRARY */}
        {!previewMode && (
          <div className="w-64 border-r border-white/10 bg-[#151e32] flex flex-col">
            <div className="flex border-b border-white/10">
              <button onClick={() => setLeftPanelTab('add')} className={`flex-1 py-3 text-xs font-bold uppercase ${leftPanelTab === 'add' ? 'text-primary border-b-2 border-primary bg-white/5' : 'text-gray-500 hover:text-white'}`}>Composants</button>
              <button onClick={() => setLeftPanelTab('templates')} className={`flex-1 py-3 text-xs font-bold uppercase ${leftPanelTab === 'templates' ? 'text-primary border-b-2 border-primary bg-white/5' : 'text-gray-500 hover:text-white'}`}>Modèles</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {leftPanelTab === 'add' ? (
                <div className="space-y-6">
                  {COMPONENT_LIBRARY.map((cat, i) => (
                    <div key={i}>
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 px-1 tracking-wider">{cat.category}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {cat.items.map((comp, j) => (
                          <div 
                            key={j} 
                            onClick={() => addElement(comp, selectedId || undefined)}
                            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-primary hover:bg-primary/10 cursor-pointer transition-all flex flex-col items-center gap-2 text-center group"
                          >
                            <comp.icon size={18} className="text-gray-400 group-hover:text-primary transition-colors"/>
                            <span className="text-[10px] font-medium text-gray-300 group-hover:text-white truncate w-full">{comp.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-xs mt-10">Templates Premium (Coming Soon)</div>
              )}
            </div>
          </div>
        )}

        {/* CENTER: CANVAS */}
        <div className="flex-1 bg-[#05070a] relative overflow-auto flex justify-center p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
          <motion.div 
            layout
            animate={{ 
              width: viewMode === 'desktop' ? '100%' : viewMode === 'tablet' ? '768px' : '375px',
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="min-h-full bg-[#0f172a] shadow-2xl relative border border-white/5"
          >
            {elements.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 opacity-50">
                <Layout size={48} className="mb-4 text-white/10"/>
                <p>Zone de travail vide</p>
              </div>
            ) : (
              elements.map(el => <ElementRenderer key={el.id} element={el} />)
            )}
          </motion.div>
        </div>

        {/* RIGHT: PROPERTIES & INSPECTOR */}
        {!previewMode && (
          <div className="w-80 border-l border-white/10 bg-[#151e32] flex flex-col">
            <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
              <button onClick={() => setRightPanelTab('inspector')} className={`flex-1 py-3 px-2 text-[10px] font-bold uppercase whitespace-nowrap ${rightPanelTab === 'inspector' ? 'text-primary border-b-2 border-primary bg-white/5' : 'text-gray-500 hover:text-white'}`}><BoxSelect size={12} className="mx-auto mb-1"/>Inspector</button>
              <button onClick={() => setRightPanelTab('structure')} className={`flex-1 py-3 px-2 text-[10px] font-bold uppercase whitespace-nowrap ${rightPanelTab === 'structure' ? 'text-primary border-b-2 border-primary bg-white/5' : 'text-gray-500 hover:text-white'}`}><List size={12} className="mx-auto mb-1"/>Content</button>
              <button onClick={() => setRightPanelTab('animate')} className={`flex-1 py-3 px-2 text-[10px] font-bold uppercase whitespace-nowrap ${rightPanelTab === 'animate' ? 'text-primary border-b-2 border-primary bg-white/5' : 'text-gray-500 hover:text-white'}`}><Wind size={12} className="mx-auto mb-1"/>Anim</button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {activeElement ? (
                <>
                  {/* INSPECTOR TAB (DEVTOOLS STYLE) */}
                  {rightPanelTab === 'inspector' && (
                    <div className="space-y-6">
                      
                      {/* Box Model */}
                      <div>
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase text-gray-500">Box Model</span>
                            <span className="text-[10px] text-primary">{viewMode}</span>
                         </div>
                         <BoxModelEditor style={getComputedStyle(activeElement)} onChange={(k, v) => updateElement(activeElement.id, {[k]: v}, 'style')} />
                      </div>

                      {/* Dimensions */}
                      <div className="pt-4 border-t border-white/5">
                         <span className="text-[10px] font-bold uppercase text-gray-500 block mb-2">Dimensions</span>
                         <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                               <span className="absolute left-2 top-1.5 text-gray-500 text-[10px]">W</span>
                               <input className="w-full bg-black/20 border border-white/10 rounded py-1 pl-6 text-xs" placeholder="auto" value={getComputedStyle(activeElement).width} onChange={e => updateElement(activeElement.id, {width: e.target.value}, 'style')} />
                            </div>
                            <div className="relative">
                               <span className="absolute left-2 top-1.5 text-gray-500 text-[10px]">H</span>
                               <input className="w-full bg-black/20 border border-white/10 rounded py-1 pl-6 text-xs" placeholder="auto" value={getComputedStyle(activeElement).height} onChange={e => updateElement(activeElement.id, {height: e.target.value}, 'style')} />
                            </div>
                         </div>
                      </div>

                      {/* Typography */}
                      <div className="pt-4 border-t border-white/5">
                         <span className="text-[10px] font-bold uppercase text-gray-500 block mb-2">Typography</span>
                         <div className="space-y-2">
                            <div className="flex gap-2">
                               <input type="color" className="w-6 h-6 bg-transparent border-none" value={getComputedStyle(activeElement).color} onChange={e => updateElement(activeElement.id, {color: e.target.value}, 'style')} />
                               <input className="flex-1 bg-black/20 border border-white/10 rounded py-1 px-2 text-xs" placeholder="Size (16px)" value={getComputedStyle(activeElement).fontSize} onChange={e => updateElement(activeElement.id, {fontSize: e.target.value}, 'style')} />
                            </div>
                            <div className="flex bg-black/20 rounded p-1">
                               {['left', 'center', 'right', 'justify'].map(align => (
                                  <button key={align} onClick={() => updateElement(activeElement.id, {textAlign: align}, 'style')} className="flex-1 hover:bg-white/10 rounded p-1 flex justify-center">
                                     {align === 'left' && <AlignLeft size={12}/>}
                                     {align === 'center' && <AlignCenter size={12}/>}
                                     {align === 'right' && <AlignRight size={12}/>}
                                     {align === 'justify' && <Menu size={12}/>}
                                  </button>
                               ))}
                            </div>
                         </div>
                      </div>

                      {/* Background & Borders */}
                      <div className="pt-4 border-t border-white/5">
                         <span className="text-[10px] font-bold uppercase text-gray-500 block mb-2">Decoration</span>
                         <div className="space-y-2">
                            <div className="flex items-center gap-2">
                               <div className="w-4 h-4 rounded border border-white/20" style={{background: getComputedStyle(activeElement).backgroundColor}}></div>
                               <input className="flex-1 bg-black/20 border border-white/10 rounded py-1 px-2 text-xs" placeholder="Background Color" value={getComputedStyle(activeElement).backgroundColor} onChange={e => updateElement(activeElement.id, {backgroundColor: e.target.value}, 'style')} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                               <input className="bg-black/20 border border-white/10 rounded py-1 px-2 text-xs" placeholder="Radius (px)" value={getComputedStyle(activeElement).borderRadius} onChange={e => updateElement(activeElement.id, {borderRadius: e.target.value}, 'style')} />
                               <input className="bg-black/20 border border-white/10 rounded py-1 px-2 text-xs" placeholder="Border (1px solid...)" value={getComputedStyle(activeElement).border} onChange={e => updateElement(activeElement.id, {border: e.target.value}, 'style')} />
                            </div>
                         </div>
                      </div>
                    </div>
                  )}

                  {/* STRUCTURE & CONTENT TAB */}
                  {rightPanelTab === 'structure' && (
                    <div className="space-y-6">
                       {activeElement.type === 'mega-menu' ? (
                          <>
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white flex items-center gap-2"><Menu size={16}/> Mega Menu</h3>
                             </div>
                             <MegaMenuConfig items={activeElement.menuItems || []} onChange={(items) => updateElement(activeElement.id, { menuItems: items })} />
                          </>
                       ) : (
                          <>
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white">Contenu</h3>
                                <button onClick={() => deleteElement(activeElement.id)} className="text-red-500 hover:bg-red-500/10 p-1.5 rounded"><Trash2 size={14}/></button>
                             </div>
                             {(activeElement.type.includes('text') || activeElement.type.includes('heading') || activeElement.type === 'button') && (
                                <textarea 
                                  rows={4}
                                  className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:border-primary outline-none resize-none" 
                                  value={activeElement.content}
                                  onChange={(e) => updateElement(activeElement.id, { content: e.target.value })}
                                />
                              )}
                              {activeElement.type === 'image' && (
                                <div className="space-y-2">
                                  <label className="text-xs text-gray-400">Source URL</label>
                                  <input 
                                    type="text"
                                    className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs text-white" 
                                    value={activeElement.src}
                                    onChange={(e) => updateElement(activeElement.id, { src: e.target.value })}
                                  />
                                </div>
                              )}
                          </>
                       )}
                    </div>
                  )}

                  {/* ANIMATION STUDIO */}
                  {rightPanelTab === 'animate' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-white flex items-center gap-2"><Wind size={16} className="text-accent"/> Animation</h3>
                        <button className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded" onClick={() => updateElement(activeElement.id, { type: 'none' }, 'animation')}>Reset</button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {['fade', 'slideUp', 'slideLeft', 'zoom', 'rotate'].map(type => (
                          <button key={type} onClick={() => updateElement(activeElement.id, { type }, 'animation')} className={`px-2 py-2 rounded text-[10px] border transition-all ${activeElement.animation?.type === type ? 'bg-primary border-primary text-white' : 'bg-black/20 border-white/10 text-gray-400'}`}>
                            {type}
                          </button>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/5 space-y-4">
                          <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Durée: {activeElement.animation?.duration}s</span></div>
                            <input type="range" min="0.1" max="2" step="0.1" value={activeElement.animation?.duration} onChange={e => updateElement(activeElement.id, { duration: parseFloat(e.target.value) }, 'animation')} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"/>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Délai: {activeElement.animation?.delay}s</span></div>
                            <input type="range" min="0" max="2" step="0.1" value={activeElement.animation?.delay} onChange={e => updateElement(activeElement.id, { delay: parseFloat(e.target.value) }, 'animation')} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"/>
                          </div>
                      </div>

                      {/* Timeline Preview */}
                      <div className="mt-4 p-3 bg-black/40 rounded border border-white/5">
                         <div className="h-1 w-full bg-gray-800 rounded relative overflow-hidden">
                            <motion.div key={activeElement.animation?.type} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: activeElement.animation?.duration, delay: activeElement.animation?.delay, ease: "linear", repeat: Infinity, repeatDelay: 1 }} className="h-full bg-accent absolute top-0 left-0" />
                         </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                   <MousePointer size={32} className="mb-3 opacity-20"/>
                   <p className="text-sm">Sélectionnez un élément<br/>pour l'éditer</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBuilder;

