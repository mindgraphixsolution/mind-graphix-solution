
import React from 'react';
// @ts-ignore
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x: string) => x);

  // Map route names to readable labels
  const routeNameMap: Record<string, string> = {
    'services': 'Nos Services',
    'about': 'À Propos',
    'contact': 'Contact',
    'portfolio': 'Réalisations',
    'team': 'Équipe',
    'careers': 'Carrières',
    'devis': 'Devis',
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 animate-fade-in">
      <Link to="/" className="hover:text-primary transition-colors flex items-center">
        <Home size={16} className="mr-1" /> Accueil
      </Link>
      {pathnames.map((value: string, index: number) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = routeNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <React.Fragment key={to}>
            <ChevronRight size={14} className="mx-2" />
            {isLast ? (
              <span className="font-semibold text-primary dark:text-accent cursor-default">{label}</span>
            ) : (
              <Link to={to} className="hover:text-primary transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
