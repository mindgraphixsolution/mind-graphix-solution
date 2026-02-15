
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import Section from './ui/Section';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Check, ArrowRight, Star, Clock, Palette, Code, Smartphone, Video, ShoppingCart, BarChart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { mockDB } from '../utils/mockDatabase';

const Icons: any = { Palette, Code, Smartphone, Video, ShoppingCart, BarChart };

export const ServiceCard: React.FC<{ service: any; index?: number }> = ({ service, index = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct); y.set(yPct);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const Icon = Icons[service.iconName] || Palette;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative grid lg:grid-cols-2 gap-12 items-center rounded-3xl p-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all cursor-pointer group ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
    >
      <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient || 'from-primary to-accent'} rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20`}></div>
        <div className="relative bg-white dark:bg-white/5 p-2 rounded-2xl shadow-xl border border-white/10">
          <img src={service.image} alt={service.title} className="w-full h-80 object-cover rounded-xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
        </div>
        <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${service.gradient || 'from-primary to-accent'} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
           <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
        <p className={`text-lg font-semibold bg-gradient-to-r ${service.gradient || 'from-primary to-accent'} bg-clip-text text-transparent mb-4`}>{service.subtitle}</p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">{service.description}</p>
        <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-100 dark:border-white/10">
           <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><Star className="text-accent" size={18}/> {service.pricing}</div>
           <div className="flex items-center gap-2 text-gray-500"><Clock size={18}/> {service.duration}</div>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const load = () => setServices(mockDB.getServices());
    load();
    window.addEventListener('mgs_db_update', load);
    return () => window.removeEventListener('mgs_db_update', load);
  }, []);

  return (
    <Section id="services" className="bg-slate-50 dark:bg-dark">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6">{t('services.title')}</h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">{t('services.subtitle')}</p>
      </div>
      <div className="space-y-32">
        {services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}
      </div>
    </Section>
  );
};

export default Services;
