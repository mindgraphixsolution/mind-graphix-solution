
import React, { useEffect, useState } from 'react';
import { QuantumEntanglement, QuantumMessage } from '../quantum/QuantumEntanglement';

interface DimensionWrapperProps {
  id: string;
  name: string;
}

export const DimensionWrapper: React.FC<DimensionWrapperProps> = ({ id, name }) => {
  const [energyLevel, setEnergyLevel] = useState(50);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const comms = new QuantumEntanglement(id);

    // Announce existence to the multiverse
    comms.transmit('DIMENSION_born', { name });

    const unsubscribe = comms.onMessage((msg: QuantumMessage) => {
      // Log cosmic events
      setLogs(prev => [`[${new Date(msg.timestamp).toLocaleTimeString()}] Signal from ${msg.fromDimension}: ${msg.type}`, ...prev].slice(0, 5));

      // React to specific quantum events
      if (msg.type === 'COLLAPSE_WAVEFUNCTION' && msg.payload.targetId === id) {
        window.close(); // The reality ends
      }

      if (msg.type === 'COSMIC_ENERGY_SURGE') {
        setEnergyLevel(100);
        setTimeout(() => setEnergyLevel(50), 2000);
      }
    });

    return () => {
      unsubscribe();
      comms.close();
    };
  }, [id, name]);

  return (
    <div className="cosmic-container gradient-cosmic" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="quantum-foam" />
      
      <div style={{ zIndex: 1, textAlign: 'center', width: '100%' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{name}</h2>
        <p style={{ fontFamily: 'monospace', color: 'var(--quantum-green)' }}>ID: {id}</p>
        
        <div style={{ margin: '40px auto', width: '200px', height: '200px', position: 'relative' }}>
          {/* Energy Orb Visual */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle, var(--star-blue) 0%, transparent 70%)`,
            opacity: energyLevel / 100,
            transform: `scale(${0.8 + (energyLevel / 200)})`,
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: `0 0 ${energyLevel}px var(--star-blue)`
          }} />
        </div>

        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '8px', maxWidth: '80%', margin: '0 auto', textAlign: 'left' }}>
          <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #333', paddingBottom: '5px' }}>Quantum Logs</h4>
          {logs.map((log, i) => (
            <div key={i} style={{ fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '4px', color: '#ccc' }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
