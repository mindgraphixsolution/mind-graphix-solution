
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import { mockDB } from '../../utils/mockDatabase';

interface Step {
  target: string; // CSS Selector (e.g. '[data-tour="sidebar"]')
  title: string;
  content: string;
  position?: 'right' | 'bottom' | 'left' | 'top';
}

const TOUR_STEPS: Step[] = [
  { target: '[data-tour="sidebar"]', title: 'Navigation Principale', content: 'Accédez à tous vos modules depuis ce menu latéral. Vous pouvez le réduire pour plus d\'espace.', position: 'right' },
  { target: '[data-tour="search"]', title: 'Command Palette', content: 'Utilisez Cmd+K pour lancer des actions rapides ou naviguer sans souris.', position: 'bottom' },
  { target: '[data-tour="user-menu"]', title: 'Profil & Préférences', content: 'Gérez votre compte et personnalisez l\'interface (couleurs, disposition) ici.', position: 'bottom' },
  { target: '[data-tour="collab"]', title: 'Collaboration', content: 'Voyez qui est en ligne et travaillez ensemble en temps réel.', position: 'bottom' }
];

const Tour: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const completed = mockDB.isTourCompleted();
    if (!completed) {
      // Delay start to allow rendering
      setTimeout(() => setIsActive(true), 1000);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const updateRect = () => {
      const element = document.querySelector(TOUR_STEPS[stepIndex].target);
      if (element) {
        setRect(element.getBoundingClientRect());
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Skip step if element not found (e.g. mobile view hidden sidebar)
        handleNext();
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [stepIndex, isActive]);

  const handleNext = () => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      finishTour();
    }
  };

  const finishTour = () => {
    setIsActive(false);
    mockDB.completeTour();
  };

  if (!isActive || !rect) return null;

  const currentStep = TOUR_STEPS[stepIndex];

  // Calculate Popover Position
  const popoverStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 10002,
  };

  // Basic positioning logic (can be improved with libraries like Popper.js)
  if (currentStep.position === 'right') {
    popoverStyle.left = rect.right + 20;
    popoverStyle.top = rect.top;
  } else if (currentStep.position === 'bottom') {
    popoverStyle.left = rect.left;
    popoverStyle.top = rect.bottom + 20;
  }
  // Add fallback/clamping logic here for edges if needed

  return (
    <>
      {/* Dark Overlay with cutout using clip-path (simplified) or SVG masking */}
      {/* For simplicity in this demo, we use a high z-index div with a "hole" visual trick or just darkening everything else isn't easily done without complex SVG masks in pure React without libs. 
          Instead, we'll use a semi-transparent overlay that sits *behind* the highlighted element if we could manipulate z-index of the target.
          Since we can't easily change the target's z-index dynamically without side effects, we will draw a "spotlight" overlay. */}
      
      <div className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none">
         <div 
            className="absolute bg-accent/20 border-2 border-accent shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] rounded-xl transition-all duration-500 ease-in-out"
            style={{
               top: rect.top - 5,
               left: rect.left - 5,
               width: rect.width + 10,
               height: rect.height + 10
            }}
         />
      </div>

      {/* Popover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        key={stepIndex}
        style={popoverStyle}
        className="w-80 bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 pointer-events-auto"
      >
        <button onClick={finishTour} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={16}/></button>
        
        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
           Étape {stepIndex + 1} / {TOUR_STEPS.length}
        </span>
        <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{currentStep.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {currentStep.content}
        </p>

        <div className="flex justify-between items-center">
           <button onClick={finishTour} className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white font-medium">Ignorer</button>
           <button 
             onClick={handleNext} 
             className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg hover:bg-primary-dark transition-all flex items-center gap-2"
           >
             {stepIndex === TOUR_STEPS.length - 1 ? 'Terminer' : 'Suivant'} <ChevronRight size={14}/>
           </button>
        </div>
      </motion.div>
    </>
  );
};

export default Tour;
