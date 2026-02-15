
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, Image as ImageIcon, FileText, Video, Search, Filter, 
  Plus, MoreVertical, Star, Info, Tag, Layers, Download, Trash2, 
  ChevronRight, ChevronDown, Upload, BrainCircuit, Sparkles, Check, X,
  Grid, List, LayoutGrid, Edit3, Crop, Sliders, Type as TypeIcon,
  Maximize2, BoxSelect, Monitor, ImagePlus, Zap, Server, Copy, CheckCircle2, Globe, ArrowRight, Code,
  Film, Subtitles, PlayCircle, PauseCircle, BarChart2, Volume2, Maximize, Scissors
} from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

// --- TYPES ---
interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  folderId: string;
  size: string;
  dimensions?: string;
  aiTags?: string[];
  dominantColor?: string;
  isFavorite: boolean;
  uploadedAt: string;
  optimization?: {
    status: 'pending' | 'processing' | 'optimized';
    originalSize: string;
    optimizedSize: string;
    savings: string;
    formats: string[];
    thumbnails: boolean;
    cdnUrl: string;
  };
  videoMetadata?: {
    duration: string;
    views: number;
    retention: number;
    processing: boolean;
    hasSubtitles: boolean;
    transcription?: Array<{start: string, end: string, text: string}>;
  };
}

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

// --- SUB-COMPONENTS ---

const VideoPlayer = ({ url, poster, duration }: { url: string, poster?: string, duration?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  return (
    <div className="relative group bg-black rounded-xl overflow-hidden shadow-2xl aspect-video flex flex-col justify-center border border-gray-800">
      <video 
        ref={videoRef}
        src={url}
        poster={poster}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        loop
      />
      
      {/* Overlay Controls */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!isPlaying && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
          >
            <PlayCircle size={32} fill="white" />
          </motion.div>
        )}
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress} 
          onChange={handleSeek}
          className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
        />
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-primary transition-colors">
              {isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
            </button>
            <span className="text-xs font-mono">{duration || "00:00"}</span>
          </div>
          <div className="flex items-center gap-4">
            <Volume2 size={18} />
            <Maximize size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoAnalytics = ({ metadata }: { metadata: any }) => {
  return (
    <div className="space-y-6 animate-fade-in p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
          <div className="text-xs text-gray-500 uppercase font-bold mb-1">Vues Totales</div>
          <div className="text-2xl font-black text-slate-800 dark:text-white">{metadata?.views || 0}</div>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
          <div className="text-xs text-gray-500 uppercase font-bold mb-1">Rétention Moy.</div>
          <div className="text-2xl font-black text-slate-800 dark:text-white">{metadata?.retention || 0}%</div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
        <h4 className="text-xs font-bold text-gray-500 uppercase mb-4">Courbe de Rétention</h4>
        <div className="h-32 flex items-end gap-1">
          {[100, 95, 88, 82, 75, 70, 65, 62, 58, 55, 50, 48, 45, 42, 40].map((val, i) => (
            <div key={i} className="flex-1 bg-primary/20 dark:bg-primary/40 rounded-t-sm relative group">
              <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all duration-500" style={{ height: `${val}%` }}></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">{val}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TranscriptEditor = ({ asset }: { asset: Asset }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      mockDB.generateVideoTranscription(asset.id);
      setIsGenerating(false);
    }, 2000);
  };

  if (!asset.videoMetadata) return null;

  return (
    <div className="h-full flex flex-col">
      {!asset.videoMetadata.hasSubtitles ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
            <Subtitles size={32} />
          </div>
          <h4 className="font-bold text-lg">Aucune transcription</h4>
          <p className="text-sm text-gray-500 max-w-xs">L'IA peut analyser l'audio de cette vidéo pour générer des sous-titres automatiques.</p>
          <button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg hover:bg-primary-dark transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {isGenerating ? <><div className="animate-spin w-4 h-4 border-2 border-white rounded-full border-t-transparent"></div> Analyse en cours...</> : <><Sparkles size={16}/> Générer Transcription</>}
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-sm uppercase text-gray-500">Sous-titres générés</h4>
            <div className="flex gap-2">
              <button className="text-xs bg-gray-100 dark:bg-white/10 px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors">VTT</button>
              <button className="text-xs bg-gray-100 dark:bg-white/10 px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors">SRT</button>
            </div>
          </div>
          {asset.videoMetadata.transcription?.map((line, i) => (
            <div key={i} className="flex gap-3 group p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-text">
              <span className="text-xs font-mono text-primary pt-1">{line.start}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 outline-none focus:bg-white dark:focus:bg-black/20 p-1 rounded" contentEditable suppressContentEditableWarning>{line.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENTS ---

const OptimizationPanel = ({ asset }: { asset: Asset }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const handleOptimize = () => {
    setIsOptimizing(true);
    setCurrentStep('Analyse de l\'image...');
    setProgress(10);

    // Simulate process
    setTimeout(() => {
      setCurrentStep('Compression intelligente...');
      setProgress(40);
    }, 1000);

    setTimeout(() => {
      setCurrentStep('Génération WebP & AVIF...');
      setProgress(70);
    }, 2500);

    setTimeout(() => {
      setCurrentStep('Création des miniatures...');
      setProgress(90);
    }, 4000);

    setTimeout(() => {
      mockDB.optimizeAsset(asset.id);
      setIsOptimizing(false);
      setProgress(100);
    }, 5000);
  };

  const copyCDN = () => {
    if(asset.optimization?.cdnUrl) {
      navigator.clipboard.writeText(asset.optimization.cdnUrl);
      alert('Lien CDN copié !');
    }
  };

  const copyCodeSnippet = () => {
    if(asset.optimization?.cdnUrl) {
      const code = `<img src="${asset.optimization.cdnUrl}" loading="lazy" alt="${asset.name}" />`;
      navigator.clipboard.writeText(code);
      alert('Code HTML copié !');
    }
  };

  if (asset.type !== 'image') return <div className="text-gray-500 text-center p-4">Optimisation disponible uniquement pour les images.</div>;

  return (
    <div className="space-y-6">
      {!asset.optimization && !isOptimizing ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap size={32} />
          </div>
          <h4 className="font-bold text-lg mb-2">Boostez les performances</h4>
          <p className="text-sm text-gray-500 mb-6">Compressez sans perte visuelle, générez des formats modernes (WebP, AVIF) et servez via CDN.</p>
          <button onClick={handleOptimize} className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
            <Sparkles size={18} /> Lancer l'optimisation
          </button>
        </div>
      ) : isOptimizing ? (
        <div className="py-8 text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h4 className="font-bold text-lg mb-2">{currentStep}</h4>
          <div className="w-full bg-gray-200 dark:bg-white/10 h-2 rounded-full overflow-hidden mt-4">
            <motion.div 
              className="h-full bg-primary"
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{progress}% terminé</p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Stats Card */}
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase text-green-700 dark:text-green-400 flex items-center gap-1"><CheckCircle2 size={14}/> Optimisé</span>
              <span className="text-xs font-mono bg-white dark:bg-black/20 px-2 py-1 rounded">{asset.optimization?.savings} saved</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="block text-xs text-gray-500 line-through">{asset.optimization?.originalSize}</span>
                <span className="block text-2xl font-black text-slate-800 dark:text-white">{asset.optimization?.optimizedSize}</span>
              </div>
              <div className="flex gap-1">
                {asset.optimization?.formats.map(fmt => (
                  <span key={fmt} className="text-[10px] font-bold uppercase bg-white dark:bg-black/20 px-2 py-1 rounded text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10">{fmt}</span>
                ))}
              </div>
            </div>
          </div>

          {/* CDN Link */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><Globe size={12}/> CDN URL</label>
            <div className="flex gap-2">
              <input readOnly value={asset.optimization?.cdnUrl} className="flex-1 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-gray-600 dark:text-gray-300 outline-none" />
              <button onClick={copyCDN} className="p-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-gray-600 dark:text-gray-300"><Copy size={16}/></button>
            </div>
          </div>

          {/* Integration */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><Code size={12}/> Intégration Rapide</label>
            <div className="bg-gray-900 text-gray-300 p-3 rounded-lg text-[10px] font-mono relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={copyCodeSnippet} className="text-white hover:text-primary"><Copy size={14}/></button>
              </div>
              {`<img \n  src="${asset.optimization?.cdnUrl}" \n  loading="lazy" \n  alt="${asset.name}" \n/>`}
            </div>
          </div>

          {/* Thumbnails */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Miniatures Générées</label>
            <div className="grid grid-cols-3 gap-2">
              {['Small', 'Medium', 'Large'].map((size, i) => (
                <div key={i} className="aspect-square bg-gray-100 dark:bg-white/5 rounded-lg flex items-center justify-center flex-col gap-1 border border-gray-200 dark:border-white/5">
                  <ImageIcon size={16} className="text-gray-400" />
                  <span className="text-[10px] text-gray-500">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ImageEditorModal = ({ asset, onClose, onSave }: { asset: Asset, onClose: () => void, onSave: (url: string) => void }) => {
  const [activeTab, setActiveTab] = useState<'crop' | 'tune' | 'watermark'>('tune');
  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0
  });
  const [crop, setCrop] = useState('none');
  const [watermark, setWatermark] = useState({ text: '', opacity: 50, position: 'center' });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAdjust = (key: string, value: string) => {
    setAdjustments(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const getFilterString = () => {
    return `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturate}%) blur(${adjustments.blur}px) grayscale(${adjustments.grayscale}%) sepia(${adjustments.sepia}%)`;
  };

  const handleMagicCrop = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setCrop('1:1'); // Simulating AI finding the center
      setIsProcessing(false);
    }, 1500);
  };

  const handleSaveInternal = () => {
    // In a real app, this would use Canvas API to generate the blob
    // For mock, we just close and pretend we saved
    onSave(asset.url); 
    onClose();
  };

  const getWatermarkStyle = () => {
    const base = { position: 'absolute' as any, color: 'white', fontWeight: 'bold', fontSize: '24px', textShadow: '0 2px 4px rgba(0,0,0,0.5)', opacity: watermark.opacity / 100 };
    switch(watermark.position) {
      case 'tl': return { ...base, top: '20px', left: '20px' };
      case 'tr': return { ...base, top: '20px', right: '20px' };
      case 'bl': return { ...base, bottom: '20px', left: '20px' };
      case 'br': return { ...base, bottom: '20px', right: '20px' };
      default: return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  const getCropStyle = () => {
    // Simple visual crop simulation using clip-path or scale/overflow
    switch(crop) {
      case '1:1': return { aspectRatio: '1/1', objectFit: 'cover' as any };
      case '16:9': return { aspectRatio: '16/9', objectFit: 'cover' as any };
      case '4:3': return { aspectRatio: '4/3', objectFit: 'cover' as any };
      case 'story': return { aspectRatio: '9/16', objectFit: 'cover' as any };
      default: return {};
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0e17] flex flex-col text-white">
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#151e32]">
        <div className="flex items-center gap-4">
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-white"/></button>
          <span className="font-bold">Éditeur Studio</span>
          <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{asset.name}</span>
        </div>
        <button onClick={handleSaveInternal} className="px-6 py-2 bg-primary hover:bg-primary-dark rounded-full font-bold text-sm">Enregistrer</button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Canvas */}
        <div className="flex-1 flex items-center justify-center bg-[#05070a] p-10 relative overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
          <div className={`relative shadow-2xl transition-all duration-500 ${crop !== 'none' ? 'overflow-hidden shadow-none ring-2 ring-primary' : ''}`} style={getCropStyle()}>
            <img 
              src={asset.url} 
              alt="Edit" 
              className="max-w-full max-h-[80vh] object-contain transition-all duration-200"
              style={{ filter: getFilterString(), ...getCropStyle() }} 
            />
            {watermark.text && (
              <div style={getWatermarkStyle()}>{watermark.text}</div>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="w-80 bg-[#151e32] border-l border-white/10 flex flex-col">
          <div className="flex border-b border-white/10">
            <button onClick={() => setActiveTab('tune')} className={`flex-1 py-4 text-xs font-bold uppercase flex flex-col items-center gap-1 ${activeTab === 'tune' ? 'text-primary bg-white/5' : 'text-gray-500 hover:text-white'}`}><Sliders size={18}/> Réglages</button>
            <button onClick={() => setActiveTab('crop')} className={`flex-1 py-4 text-xs font-bold uppercase flex flex-col items-center gap-1 ${activeTab === 'crop' ? 'text-primary bg-white/5' : 'text-gray-500 hover:text-white'}`}><Crop size={18}/> Recadrer</button>
            <button onClick={() => setActiveTab('watermark')} className={`flex-1 py-4 text-xs font-bold uppercase flex flex-col items-center gap-1 ${activeTab === 'watermark' ? 'text-primary bg-white/5' : 'text-gray-500 hover:text-white'}`}><TypeIcon size={18}/> Texte</button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {activeTab === 'tune' && (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-gray-400"><span>Luminosité</span><span>{adjustments.brightness}%</span></div>
                  <input type="range" min="0" max="200" value={adjustments.brightness} onChange={(e) => handleAdjust('brightness', e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-gray-400"><span>Contraste</span><span>{adjustments.contrast}%</span></div>
                  <input type="range" min="0" max="200" value={adjustments.contrast} onChange={(e) => handleAdjust('contrast', e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-gray-400"><span>Saturation</span><span>{adjustments.saturate}%</span></div>
                  <input type="range" min="0" max="200" value={adjustments.saturate} onChange={(e) => handleAdjust('saturate', e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-gray-400"><span>Flou</span><span>{adjustments.blur}px</span></div>
                  <input type="range" min="0" max="10" value={adjustments.blur} onChange={(e) => handleAdjust('blur', e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
              </>
            )}

            {activeTab === 'crop' && (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setCrop('none')} className={`p-4 rounded border text-xs font-bold ${crop === 'none' ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`}>Original</button>
                <button onClick={() => setCrop('1:1')} className={`p-4 rounded border text-xs font-bold ${crop === '1:1' ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`}>Carré (1:1)</button>
                <button onClick={() => setCrop('16:9')} className={`p-4 rounded border text-xs font-bold ${crop === '16:9' ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`}>Paysage (16:9)</button>
                <button onClick={() => setCrop('story')} className={`p-4 rounded border text-xs font-bold ${crop === 'story' ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`}>Story (9:16)</button>
                <button onClick={handleMagicCrop} disabled={isProcessing} className="col-span-2 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded font-bold text-sm flex items-center justify-center gap-2 mt-4">
                  {isProcessing ? <div className="animate-spin w-4 h-4 border-2 border-white rounded-full border-t-transparent"></div> : <Sparkles size={16}/>} Magic Crop (IA)
                </button>
              </div>
            )}

            {activeTab === 'watermark' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Texte</label>
                  <input type="text" placeholder="Mon Copyright" className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm" value={watermark.text} onChange={(e) => setWatermark({...watermark, text: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400"><span>Opacité</span><span>{watermark.opacity}%</span></div>
                  <input type="range" min="0" max="100" value={watermark.opacity} onChange={(e) => setWatermark({...watermark, opacity: parseInt(e.target.value)})} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Position</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['tl', 'top', 'tr', 'left', 'center', 'right', 'bl', 'bottom', 'br'].map(pos => (
                      <button 
                        key={pos} 
                        onClick={() => setWatermark({...watermark, position: pos})}
                        className={`h-8 rounded border ${watermark.position === pos ? 'bg-primary border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BatchResizeModal = ({ isOpen, onClose, onProcess }: any) => {
  const [width, setWidth] = useState(1920);
  const [format, setFormat] = useState('jpeg');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleProcess = () => {
    setProcessing(true);
    // Simulate batch
    const interval = setInterval(() => {
      setProgress(p => {
        if(p >= 100) {
          clearInterval(interval);
          setProcessing(false);
          onProcess({ targetSize: `${width}px`, format });
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-200 dark:border-white/10">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2"><Layers size={20} className="text-primary"/> Batch Resize</h3>
        
        {processing ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-white/10 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 mb-2">Traitement des images...</p>
            <div className="w-full bg-gray-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-200" style={{width: `${progress}%`}}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Largeur Cible (px)</label>
              <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Format de sortie</label>
              <div className="grid grid-cols-3 gap-3">
                {['jpeg', 'png', 'webp'].map(fmt => (
                  <button key={fmt} onClick={() => setFormat(fmt)} className={`p-3 rounded-xl border text-sm font-bold uppercase ${format === fmt ? 'bg-primary text-white border-primary' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10'}`}>
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5">Annuler</button>
              <button onClick={handleProcess} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark">Lancer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FolderTreeItem = ({ folder, allFolders, activeFolderId, onSelect, depth = 0 }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const children = allFolders.filter((f: Folder) => f.parentId === folder.id);
  const hasChildren = children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${activeFolderId === folder.id ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        onClick={() => { onSelect(folder.id); if(hasChildren) setIsOpen(!isOpen); }}
      >
        {hasChildren ? (
          <div onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="p-1 hover:bg-black/5 rounded">
             {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
        ) : <span className="w-6"></span>}
        <Folder size={16} className={activeFolderId === folder.id ? 'fill-primary text-primary' : 'fill-gray-300 text-gray-400'} />
        <span className="text-sm truncate">{folder.name}</span>
      </div>
      <AnimatePresence>
        {isOpen && children.map((child: Folder) => (
          <motion.div key={child.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <FolderTreeItem folder={child} allFolders={allFolders} activeFolderId={activeFolderId} onSelect={onSelect} depth={depth + 1} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const AssetCard = ({ asset, isSelected, onClick, onDoubleClick }: any) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`group relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${isSelected ? 'border-primary shadow-[0_0_0_4px_rgba(94,53,177,0.2)]' : 'border-transparent hover:border-gray-200 dark:hover:border-white/10'}`}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
  >
    <div className="absolute inset-0 bg-gray-100 dark:bg-white/5 flex items-center justify-center">
      {asset.type === 'image' ? (
        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" loading="lazy" />
      ) : asset.type === 'video' ? (
        <>
          <div className="w-full h-full bg-black flex items-center justify-center">
            <Film size={48} className="text-gray-600" />
          </div>
          {asset.videoMetadata?.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
              {asset.videoMetadata.duration}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <PlayCircle size={40} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
          </div>
        </>
      ) : (
        <FileText size={48} className="text-gray-400" />
      )}
    </div>
    
    {/* Optimization Badge */}
    {asset.optimization?.status === 'optimized' && (
      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md z-10" title="Optimisé">
        <Zap size={10} />
      </div>
    )}
    
    {/* Overlay Info */}
    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
      <p className="text-xs font-bold truncate">{asset.name}</p>
      <div className="flex justify-between items-center mt-1">
        <span className="text-[10px] opacity-80">{asset.optimization ? asset.optimization.optimizedSize : asset.size}</span>
        {asset.isFavorite && <Star size={12} className="fill-yellow-400 text-yellow-400" />}
      </div>
    </div>

    {/* Selection Check */}
    {isSelected && (
      <div className="absolute top-2 left-2 bg-primary text-white rounded-full p-1 shadow-md">
        <Check size={12} />
      </div>
    )}
  </motion.div>
);

const AssetInspector = ({ asset, onClose, onEdit }: any) => {
  const [activeTab, setActiveTab] = useState<'info' | 'ai' | 'perf'>('info');
  const [isScanning, setIsScanning] = useState(false);
  const [aiResult, setAiResult] = useState<string[] | null>(null);

  const handleAIScan = () => {
    setIsScanning(true);
    // Simulation API
    setTimeout(() => {
      const mockTags = ['Office', 'Technology', 'Modern', 'Business', 'Success', 'Digital'];
      const randomTags = mockTags.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      mockDB.saveAsset({ 
        ...asset, 
        aiTags: [...(asset.aiTags || []), ...randomTags] 
      });
      setAiResult(randomTags);
      setIsScanning(false);
    }, 2000);
  };

  if (!asset) return null;

  return (
    <div className="w-96 border-l border-gray-200 dark:border-white/10 bg-white dark:bg-[#151e32] flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
        <h3 className="font-bold text-sm uppercase tracking-wide">Inspecteur</h3>
        <button onClick={onClose}><X size={16} /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Preview */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 dark:border-white/10 relative group">
          {asset.type === 'video' ? (
            <VideoPlayer url={asset.url} duration={asset.videoMetadata?.duration} />
          ) : (
            <img src={asset.url} alt={asset.name} className="max-w-full max-h-full object-contain" />
          )}
          {asset.type === 'image' && (
            <button onClick={onEdit} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold gap-2">
              <Edit3 size={24}/> Éditer
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveTab('info')} className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-md transition-all whitespace-nowrap ${activeTab === 'info' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}>Infos</button>
          
          {asset.type === 'video' ? (
            <>
              <button onClick={() => setActiveTab('ai')} className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-md transition-all whitespace-nowrap ${activeTab === 'ai' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}>Transcript</button>
              <button onClick={() => setActiveTab('perf')} className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-md transition-all whitespace-nowrap ${activeTab === 'perf' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}>Analytics</button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab('ai')} className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-md transition-all whitespace-nowrap ${activeTab === 'ai' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}>IA Vision</button>
              <button onClick={() => setActiveTab('perf')} className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-md transition-all whitespace-nowrap ${activeTab === 'perf' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}>Performance</button>
            </>
          )}
        </div>

        {/* TABS CONTENT */}
        <div className="min-h-[200px]">
          
          {/* TAB: INFO */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white break-all leading-tight mb-2">{asset.name}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 p-2 rounded"><Info size={12}/> {asset.type.toUpperCase()}</div>
                  <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 p-2 rounded"><Layers size={12}/> {asset.size}</div>
                  {asset.dimensions && <div className="col-span-2 bg-gray-50 dark:bg-white/5 p-2 rounded">Dimensions: {asset.dimensions}</div>}
                  <div className="col-span-2 bg-gray-50 dark:bg-white/5 p-2 rounded">Ajouté le: {new Date(asset.uploadedAt).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-white/5">
                <button onClick={() => mockDB.toggleAssetFavorite(asset.id)} className={`w-full py-2 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition-colors ${asset.isFavorite ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-50'}`}>
                  <Star size={16} className={asset.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''} />
                  {asset.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
                
                {asset.type === 'video' && (
                  <button className="w-full py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-50">
                    <Scissors size={16}/> Extraire un clip
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50">
                    <Download size={16}/>
                  </button>
                  <button onClick={() => { if(confirm('Supprimer ?')) mockDB.deleteAsset(asset.id); onClose(); }} className="py-2 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-100">
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AI / TRANSCRIPT */}
          {activeTab === 'ai' && (
            asset.type === 'video' ? (
              <TranscriptEditor asset={asset} />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-bold text-sm flex items-center gap-2"><BrainCircuit size={16} className="text-purple-500"/> Analyse IA</h5>
                  {asset.dominantColor && <div className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{backgroundColor: asset.dominantColor}} title="Couleur Dominante"></div>}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(asset.aiTags || []).map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-md font-medium border border-purple-200 dark:border-purple-800">
                      {tag}
                    </span>
                  ))}
                  {(!asset.aiTags || asset.aiTags.length === 0) && <span className="text-xs text-gray-400 italic block py-4 text-center w-full">Aucune analyse effectuée.</span>}
                </div>

                <button 
                  onClick={handleAIScan}
                  disabled={isScanning}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-70"
                >
                  {isScanning ? <><div className="animate-spin w-3 h-3 border-2 border-white rounded-full border-t-transparent"></div> Analyse...</> : <><Sparkles size={14}/> Lancer Smart Scan</>}
                </button>
              </div>
            )
          )}

          {/* TAB: PERF / ANALYTICS */}
          {activeTab === 'perf' && (
            asset.type === 'video' ? (
              <VideoAnalytics metadata={asset.videoMetadata} />
            ) : (
              <OptimizationPanel asset={asset} />
            )
          )}

        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const MediaManager: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string>('root');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, image, video
  const [showEditor, setShowEditor] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);

  const loadData = () => {
    setFolders(mockDB.getDamFolders());
    setAssets(mockDB.getDamAssets());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('mgs_db_update', loadData);
    return () => window.removeEventListener('mgs_db_update', loadData);
  }, []);

  const filteredAssets = assets.filter(asset => {
    const matchesFolder = activeFolderId === 'favorites' ? asset.isFavorite : activeFolderId === 'recent' ? true : asset.folderId === activeFolderId;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || (asset.aiTags && asset.aiTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesType = filterType === 'all' || asset.type === filterType;
    return matchesFolder && matchesSearch && matchesType;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const type = file.type.startsWith('video') ? 'video' : file.type.startsWith('image') ? 'image' : 'document';
        mockDB.saveAsset({
          name: file.name,
          type: type,
          url: reader.result as string,
          folderId: activeFolderId === 'favorites' || activeFolderId === 'recent' ? 'root' : activeFolderId,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          isFavorite: false
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateFolder = () => {
    const name = prompt("Nom du dossier :");
    if (name) mockDB.createFolder(name, activeFolderId === 'favorites' || activeFolderId === 'recent' ? 'root' : activeFolderId);
  };

  const handleBatchResize = (config: any) => {
    // Collect all image IDs in current folder
    const targetIds = filteredAssets.filter(a => a.type === 'image').map(a => a.id);
    if(targetIds.length === 0) return alert("Aucune image à traiter.");
    
    mockDB.batchProcessAssets(targetIds, 'resize', config);
    setShowBatchModal(false);
    alert(`${targetIds.length} images traitées avec succès !`);
  };

  const selectedAsset = assets.find(a => a.id === selectedAssetId);

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden relative">
      
      {/* Editor Overlay */}
      <AnimatePresence>
        {showEditor && selectedAsset && selectedAsset.type === 'image' && (
          <ImageEditorModal 
            asset={selectedAsset} 
            onClose={() => setShowEditor(false)}
            onSave={(url) => {
              mockDB.saveAsset({ ...selectedAsset, url }); // Update asset with new URL (simulated)
            }}
          />
        )}
      </AnimatePresence>

      {/* Batch Modal */}
      {showBatchModal && (
        <BatchResizeModal 
          isOpen={showBatchModal}
          onClose={() => setShowBatchModal(false)}
          onProcess={handleBatchResize}
        />
      )}

      {/* SIDEBAR */}
      <div className="w-64 bg-slate-50 dark:bg-[#131323] border-r border-gray-200 dark:border-white/10 flex flex-col">
        <div className="p-4">
          <button 
            className="w-full py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2 font-bold text-sm"
            onClick={() => document.getElementById('dam-upload')?.click()}
          >
            <Upload size={16} /> Importer
            <input type="file" id="dam-upload" className="hidden" onChange={handleFileUpload} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          {/* Smart Collections */}
          <div className="mb-6 px-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Collections</p>
            <div onClick={() => setActiveFolderId('recent')} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeFolderId === 'recent' ? 'bg-white dark:bg-white/5 shadow-sm text-primary font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
              <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center"><Layers size={14}/></div>
              <span className="text-sm">Récents</span>
            </div>
            <div onClick={() => setActiveFolderId('favorites')} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${activeFolderId === 'favorites' ? 'bg-white dark:bg-white/5 shadow-sm text-primary font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
              <div className="w-6 h-6 rounded bg-yellow-100 text-yellow-600 flex items-center justify-center"><Star size={14}/></div>
              <span className="text-sm">Favoris</span>
            </div>
          </div>

          {/* Folder Tree */}
          <div className="px-3">
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dossiers</p>
              <button onClick={handleCreateFolder} className="text-gray-400 hover:text-primary"><Plus size={14}/></button>
            </div>
            {folders.filter(f => f.parentId === null || f.parentId === 'root').map(folder => (
              <FolderTreeItem key={folder.id} folder={folder} allFolders={folders} activeFolderId={activeFolderId} onSelect={setActiveFolderId} />
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] dark:bg-[#0f172a]">
        
        {/* Toolbar */}
        <div className="h-16 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-white dark:bg-[#1a1a2e]">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher par nom, tag ou contenu IA..." 
                className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-6 w-px bg-gray-200 dark:bg-white/10"></div>
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-400'}`}><Grid size={16}/></button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-400'}`}><List size={16}/></button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => setShowBatchModal(true)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
              <Layers size={14}/> Batch Resize
            </button>
            <select 
              className="bg-transparent text-sm font-medium text-gray-600 dark:text-gray-300 border-none outline-none cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="image">Images</option>
              <option value="video">Vidéos</option>
              <option value="document">Documents</option>
            </select>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-gray-500"><Filter size={18}/></button>
          </div>
        </div>

        {/* Asset Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredAssets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
              <ImageIcon size={64} className="mb-4 stroke-1" />
              <p className="text-lg font-medium">Ce dossier est vide</p>
              <p className="text-sm">Glissez des fichiers ici ou utilisez le bouton importer</p>
            </div>
          ) : (
            <motion.div 
              layout
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'}`}
            >
              <AnimatePresence>
                {filteredAssets.map(asset => (
                  <AssetCard 
                    key={asset.id} 
                    asset={asset} 
                    isSelected={selectedAssetId === asset.id} 
                    onClick={() => setSelectedAssetId(asset.id)}
                    onDoubleClick={() => {
                      if(asset.type === 'image') setShowEditor(true);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* INSPECTOR PANEL */}
      <AnimatePresence>
        {selectedAssetId && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 384, opacity: 1 }} // 384px = w-96
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-gray-200 dark:border-white/10"
          >
            <AssetInspector 
              asset={selectedAsset} 
              onClose={() => setSelectedAssetId(null)} 
              onEdit={() => setShowEditor(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MediaManager;
