
import React, { useState, useRef } from 'react';
import { Upload, X, Eye, Monitor, Smartphone, Tablet } from 'lucide-react';
import { motion } from 'framer-motion';

// --- IMAGE UPLOAD COMPONENT ---
interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onImageChange, label }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-bold uppercase text-gray-500">{label}</label>}
      <div 
        className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-white/10'}`}
        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*" 
          onChange={handleChange} 
        />
        
        {currentImage ? (
          <div className="relative group aspect-video bg-gray-100 dark:bg-black/20">
            <img src={currentImage} alt="Preview" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white rounded-full hover:bg-gray-100 text-black"><Upload size={16}/></button>
              <button onClick={() => onImageChange('')} className="p-2 bg-red-500 rounded-full hover:bg-red-600 text-white"><X size={16}/></button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <Upload size={24} className="text-gray-400 mb-2" />
            <p className="text-xs text-gray-500">Cliquez ou glissez une image</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SPLIT PREVIEW LAYOUT ---
interface LivePreviewLayoutProps {
  title: string;
  onBack?: () => void;
  form: React.ReactNode;
  preview: React.ReactNode;
  actions?: React.ReactNode;
}

export const LivePreviewLayout: React.FC<LivePreviewLayoutProps> = ({ title, onBack, form, preview, actions }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-white/10 mb-4 bg-white dark:bg-[#0f172a] sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h2>
          <div className="bg-gray-100 dark:bg-white/5 rounded-lg p-1 flex gap-1">
            <button onClick={() => setViewMode('desktop')} className={`p-1.5 rounded ${viewMode === 'desktop' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-400'}`}><Monitor size={14}/></button>
            <button onClick={() => setViewMode('tablet')} className={`p-1.5 rounded ${viewMode === 'tablet' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-400'}`}><Tablet size={14}/></button>
            <button onClick={() => setViewMode('mobile')} className={`p-1.5 rounded ${viewMode === 'mobile' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-400'}`}><Smartphone size={14}/></button>
          </div>
        </div>
        <div className="flex gap-2">
          {onBack && <button onClick={onBack} className="px-4 py-2 text-gray-500 hover:text-gray-800 dark:hover:text-white">Annuler</button>}
          {actions}
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Form Panel (Left) */}
        <div className="w-1/3 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col shadow-lg">
          <div className="p-4 border-b border-gray-200 dark:border-white/10 font-bold text-xs uppercase text-gray-500">
            Éditeur
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {form}
          </div>
        </div>

        {/* Preview Panel (Right) */}
        <div className="flex-1 bg-gray-100 dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden flex justify-center items-start pt-10">
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur font-mono flex items-center gap-2">
            <Eye size={12}/> Live Preview
          </div>
          
          <motion.div 
            layout
            animate={{ 
              width: viewMode === 'desktop' ? '100%' : viewMode === 'tablet' ? '768px' : '375px',
              height: '100%',
            }}
            className="bg-white dark:bg-[#02040a] shadow-2xl overflow-y-auto border border-white/10 transition-all duration-300 relative"
          >
            {/* The component preview */}
            <div className="min-h-full">
               {preview}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
