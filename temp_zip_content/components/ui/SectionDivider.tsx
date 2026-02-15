
import React from 'react';

type DividerType = 'wave' | 'tilt' | 'curve';
type Position = 'top' | 'bottom';

interface SectionDividerProps {
  type?: DividerType;
  position?: Position;
  color?: string; // Tailwind class like 'text-white' or 'text-dark'
  height?: string;
  flip?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  type = 'wave', 
  position = 'bottom', 
  color = 'text-white dark:text-dark',
  height = 'h-16 md:h-24',
  flip = false
}) => {
  const transform = `${position === 'top' ? 'rotate(180deg)' : ''} ${flip ? 'scaleX(-1)' : ''}`;

  return (
    <div 
      className={`absolute left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none ${position === 'top' ? 'top-0' : 'bottom-0'} ${height} ${color}`}
      style={{ transform }}
    >
      {type === 'wave' && (
        <svg className="relative block w-[calc(100%+1.3px)] h-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
        </svg>
      )}
      {type === 'curve' && (
        <svg className="relative block w-[calc(100%+1.3px)] h-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-current"></path>
        </svg>
      )}
      {type === 'tilt' && (
        <svg className="relative block w-[calc(100%+1.3px)] h-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-current"></path>
        </svg>
      )}
    </div>
  );
};

export default SectionDivider;
