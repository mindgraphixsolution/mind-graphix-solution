
import React, { useState, useEffect } from 'react';
import { 
  Search, Globe, Share2, FileCode, Sliders, CheckCircle2, AlertTriangle, 
  XCircle, Copy, RefreshCw, BarChart2, Eye, Layout, ChevronRight, Save, Image as ImageIcon
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

interface SEOConfig {
  global: {
    siteName: string;
    titleSuffix: string;
    defaultImage: string;
    twitterHandle: string;
  };
  pages: Array<{
    path: string;
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  }>;
}

const SEOManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pages' | 'global' | 'sitemap' | 'schema'>('pages');
  const [data, setData] = useState<SEOConfig>({ global: {} as any, pages: [] });
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [demoContent, setDemoContent] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const seoData = mockDB.getSeoData();
    setData(seoData);
    if (seoData.pages.length > 0) {
      setSelectedPage(seoData.pages[0]);
    }
  }, []);

  // Analyse en temps réel
  useEffect(() => {
    if (selectedPage) {
      calculateScore();
    }
  }, [selectedPage, demoContent]);

  const handlePageUpdate = (key: string, value: string) => {
    const updatedPage = { ...selectedPage, [key]: value };
    setSelectedPage(updatedPage);
    
    // Update global state
    const newPages = data.pages.map(p => p.path === selectedPage.path ? updatedPage : p);
    setData({ ...data, pages: newPages });
  };

  const handleGlobalUpdate = (key: string, value: string) => {
    setData({ ...data, global: { ...data.global, [key]: value } });
  };

  const saveAll = () => {
    mockDB.saveSeoData(data);
    alert('Configuration SEO sauvegardée !');
  };

  const calculateScore = () => {
    let score = 0;
    const checks = [];

    // Title Length (Ideal: 30-60 chars)
    const titleLen = selectedPage.title.length;
    if (titleLen >= 30 && titleLen <= 60) {
      score += 20;
      checks.push({ status: 'good', msg: 'Longueur du titre optimale' });
    } else {
      score += 10;
      checks.push({ status: 'warning', msg: `Titre un peu ${titleLen < 30 ? 'court' : 'long'} (${titleLen}/60)` });
    }

    // Desc Length (Ideal: 120-160 chars)
    const descLen = selectedPage.description.length;
    if (descLen >= 120 && descLen <= 160) {
      score += 20;
      checks.push({ status: 'good', msg: 'Méta-description parfaite' });
    } else {
      score += 5;
      checks.push({ status: 'warning', msg: `Description ${descLen < 120 ? 'trop courte' : 'trop longue'} (${descLen}/160)` });
    }

    // Keywords check
    const keywords = selectedPage.keywords.split(',').map((k:string) => k.trim().toLowerCase()).filter((k:string) => k);
    if (keywords.length > 0) {
      // Check if main keyword is in title
      if (selectedPage.title.toLowerCase().includes(keywords[0])) {
        score += 20;
        checks.push({ status: 'good', msg: 'Mot-clé principal dans le titre' });
      } else {
        checks.push({ status: 'bad', msg: 'Mot-clé principal absent du titre' });
      }

      // Check density in content (simulated)
      if (demoContent) {
        const density = (demoContent.toLowerCase().match(new RegExp(keywords[0], 'g')) || []).length;
        if (density > 0) {
          score += 20;
          checks.push({ status: 'good', msg: `Mot-clé trouvé ${density} fois dans le contenu` });
        } else {
          checks.push({ status: 'bad', msg: 'Mot-clé absent du contenu' });
        }
      } else {
        // Bonus if no content provided yet, assume it will be
        score += 10; 
      }
    } else {
      checks.push({ status: 'bad', msg: 'Aucun mot-clé défini' });
    }

    // OG Image
    if (selectedPage.ogImage || data.global.defaultImage) {
      score += 20;
      checks.push({ status: 'good', msg: 'Image de partage social définie' });
    } else {
      checks.push({ status: 'bad', msg: 'Aucune image OpenGraph' });
    }

    setAnalysis({ score, checks });
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-500 border-green-500';
    if (s >= 50) return 'text-yellow-500 border-yellow-500';
    return 'text-red-500 border-red-500';
  };

  const generateSitemap = () => {
    const baseUrl = 'https://mindgraphixsolution.com';
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${data.pages.map(p => `  <url>
    <loc>${baseUrl}${p.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
    
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    link.click();
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": data.global.siteName,
      "url": "https://mindgraphixsolution.com",
      "logo": data.global.defaultImage,
      "sameAs": [
        `https://twitter.com/${data.global.twitterHandle.replace('@', '')}`,
        "https://www.linkedin.com/company/mind-graphix"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+226 01 51 11 46",
        "contactType": "customer service"
      }
    };
    return JSON.stringify(schema, null, 2);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Search className="text-blue-500"/> SEO Command Center</h1>
        <div className="flex gap-2">
          <button onClick={saveAll} className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark flex items-center gap-2">
            <Save size={18}/> Sauvegarder
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 dark:border-white/10">
        <button onClick={() => setActiveTab('pages')} className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'pages' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}>Pages & Meta</button>
        <button onClick={() => setActiveTab('global')} className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'global' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}>Config Globale</button>
        <button onClick={() => setActiveTab('schema')} className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'schema' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}>Schema.org</button>
        <button onClick={() => setActiveTab('sitemap')} className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'sitemap' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}>Sitemap XML</button>
      </div>

      <div className="flex-1 overflow-hidden">
        
        {/* PAGES EDITOR */}
        {activeTab === 'pages' && (
          <div className="flex h-full gap-6">
            {/* Page List */}
            <div className="w-64 bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-white/10 overflow-y-auto">
              {data.pages.map((p, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedPage(p)}
                  className={`p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${selectedPage?.path === p.path ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-primary' : ''}`}
                >
                  <div className="font-bold text-sm truncate">{p.title || 'Sans titre'}</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">{p.path}</div>
                </div>
              ))}
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex gap-6 overflow-hidden">
              {/* Form */}
              <div className="flex-1 bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-white/10 p-6 overflow-y-auto space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Titre de la page (Title Tag)</label>
                  <div className="relative">
                    <input 
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm pr-12"
                      value={selectedPage?.title || ''}
                      onChange={(e) => handlePageUpdate('title', e.target.value)}
                    />
                    <span className={`absolute right-3 top-3 text-xs font-bold ${selectedPage?.title.length > 60 ? 'text-red-500' : 'text-green-500'}`}>{selectedPage?.title.length}/60</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Méta Description</label>
                  <div className="relative">
                    <textarea 
                      rows={3}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm pr-12 resize-none"
                      value={selectedPage?.description || ''}
                      onChange={(e) => handlePageUpdate('description', e.target.value)}
                    />
                    <span className={`absolute right-3 bottom-3 text-xs font-bold ${selectedPage?.description.length > 160 ? 'text-red-500' : 'text-green-500'}`}>{selectedPage?.description.length}/160</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Mots-clés (séparés par des virgules)</label>
                  <input 
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm"
                    value={selectedPage?.keywords || ''}
                    onChange={(e) => handlePageUpdate('keywords', e.target.value)}
                    placeholder="agence web, design, seo..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image de partage (OG:Image)</label>
                  <div className="flex gap-2">
                    <input 
                      className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm"
                      value={selectedPage?.ogImage || ''}
                      onChange={(e) => handlePageUpdate('ogImage', e.target.value)}
                      placeholder="https://..."
                    />
                    <button className="p-3 bg-gray-100 dark:bg-white/10 rounded-lg"><ImageIcon size={18}/></button>
                  </div>
                </div>

                {/* Content Simulator */}
                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Simulateur de Contenu (pour analyse)</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm resize-none font-mono text-xs"
                    value={demoContent}
                    onChange={(e) => setDemoContent(e.target.value)}
                    placeholder="Collez ici le texte principal de votre page pour analyser la densité des mots-clés..."
                  />
                </div>
              </div>

              {/* Analysis & Preview Sidebar */}
              <div className="w-80 space-y-6 overflow-y-auto">
                {/* Score Card */}
                <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-white/10 p-6 flex flex-col items-center">
                  <div className={`w-24 h-24 rounded-full border-8 flex items-center justify-center text-3xl font-black ${getScoreColor(analysis?.score || 0)}`}>
                    {analysis?.score || 0}
                  </div>
                  <div className="mt-4 w-full space-y-2">
                    {analysis?.checks.map((check: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        {check.status === 'good' ? <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5"/> : 
                         check.status === 'warning' ? <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5"/> : 
                         <XCircle size={14} className="text-red-500 shrink-0 mt-0.5"/>}
                        <span className="text-gray-600 dark:text-gray-300">{check.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SERP Preview */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-xs font-bold uppercase text-gray-400 mb-3">Google Preview</h3>
                  <div className="font-sans">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="text-[10px] text-gray-800">Mind Graphix Solution</div>
                        <div className="text-[10px] text-gray-500">https://mindgraphixsolution.com{selectedPage?.path}</div>
                      </div>
                    </div>
                    <div className="text-[#1a0dab] text-lg leading-tight hover:underline cursor-pointer mb-1 truncate">
                      {selectedPage?.title || 'Titre de la page'}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {selectedPage?.description || 'Aucune description fournie.'}
                    </div>
                  </div>
                </div>

                {/* Social Preview */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <h3 className="text-xs font-bold uppercase text-gray-400 p-3 bg-gray-50">Social Share</h3>
                  <div className="bg-gray-200 h-40 w-full flex items-center justify-center text-gray-400">
                    {selectedPage?.ogImage || data.global.defaultImage ? 
                      <img src={selectedPage?.ogImage || data.global.defaultImage} className="w-full h-full object-cover"/> : 
                      <ImageIcon size={32}/>
                    }
                  </div>
                  <div className="p-3 bg-gray-100">
                    <div className="text-xs text-gray-500 uppercase">MINDGRAPHIXSOLUTION.COM</div>
                    <div className="font-bold text-gray-900 text-sm truncate">{selectedPage?.title}</div>
                    <div className="text-xs text-gray-600 truncate">{selectedPage?.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GLOBAL CONFIG */}
        {activeTab === 'global' && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-white/10 p-8 space-y-6">
            <h2 className="text-xl font-bold mb-4">Paramètres Globaux</h2>
            <div>
              <label className="block text-sm font-bold mb-2">Nom du Site</label>
              <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg" value={data.global.siteName} onChange={e => handleGlobalUpdate('siteName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Suffixe Titre (ex: " | Agence Web")</label>
              <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg" value={data.global.titleSuffix} onChange={e => handleGlobalUpdate('titleSuffix', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Image par défaut (URL)</label>
              <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg" value={data.global.defaultImage} onChange={e => handleGlobalUpdate('defaultImage', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Compte Twitter (@handle)</label>
              <input className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg" value={data.global.twitterHandle} onChange={e => handleGlobalUpdate('twitterHandle', e.target.value)} />
            </div>
          </div>
        )}

        {/* SITEMAP XML */}
        {activeTab === 'sitemap' && (
          <div className="max-w-3xl mx-auto text-center py-12">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileCode size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Générateur de Sitemap</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">Générez un fichier sitemap.xml conforme aux standards Google pour accélérer l'indexation de vos {data.pages.length} pages.</p>
            <button onClick={generateSitemap} className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark shadow-xl flex items-center gap-2 mx-auto">
              <RefreshCw size={20}/> Générer & Télécharger XML
            </button>
          </div>
        )}

        {/* SCHEMA.ORG */}
        {activeTab === 'schema' && (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Données Structurées (JSON-LD)</h2>
              <button onClick={() => navigator.clipboard.writeText(generateSchema())} className="text-sm text-primary flex items-center gap-2 hover:underline"><Copy size={14}/> Copier</button>
            </div>
            <div className="bg-gray-900 text-gray-300 p-6 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-gray-800">
              <pre>{generateSchema()}</pre>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Ce code est injecté automatiquement dans le {`<head>`} de votre site.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SEOManager;
