import React, { useEffect, useState } from 'react';
import { QuantumEntanglement, QuantumMessage } from '../quantum/QuantumEntanglement';

interface Dimension {
  id: string;
  name: string;
  status: 'active' | 'collapsed';
  lastPing: number;
}

export const CosmicPortal: React.FC = () => {
  const [activeDimensions, setActiveDimensions] = useState<Map<string, Dimension>>(new Map());
  const [quantumComms, setQuantumComms] = useState<QuantumEntanglement | null>(null);

  useEffect(() => {
    // Initialize the Portal's communication node
    const comms = new QuantumEntanglement('PORTAL_CORE');
    setQuantumComms(comms);

    const unsubscribe = comms.onMessage((msg: QuantumMessage) => {
      handleQuantumFluctuation(msg);
    });

    return () => {
      unsubscribe();
      comms.close();
    };
  }, []);

  const handleQuantumFluctuation = (msg: QuantumMessage) => {
    // Update the dashboard based on signals from dimensions
    if (msg.type === 'DIMENSION_born') {
      setActiveDimensions(prev => {
        const newMap = new Map(prev);
        newMap.set(msg.fromDimension, {
          id: msg.fromDimension,
          name: msg.payload.name,
          status: 'active',
          lastPing: Date.now()
        });
        return newMap;
      });
    }
  };

  const openDimension = (name: string) => {
    const dimensionId = `dim_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    // Calculate screen position for "random" placement
    const left = Math.floor(Math.random() * (window.screen.width - 600));
    const top = Math.floor(Math.random() * (window.screen.height - 400));

    window.open(
      `/?dimension=${dimensionId}&name=${encodeURIComponent(name)}`,
      dimensionId,
      `width=600,height=400,left=${left},top=${top},menubar=no,toolbar=no`
    );
  };

  const collapseReality = (id: string) => {
    if (quantumComms) {
      quantumComms.transmit('COLLAPSE_WAVEFUNCTION', { targetId: id });
      setActiveDimensions(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }
  };

  const broadcastEnergy = () => {
    quantumComms?.transmit('COSMIC_ENERGY_SURGE', { intensity: 0.9 });
  };

  return (
    <div className="cosmic-container">
      <div className="quantum-foam" />
      
      <div style={{ position: 'relative', zIndex: 1, padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', textShadow: '0 0 20px var(--nebula-purple)' }}>
            🌌 COSMIC PORTAL
          </h1>
          <p style={{ color: 'var(--star-blue)', letterSpacing: '1px' }}>
            Multiverse Dashboard • Dimensions Active: {activeDimensions.size}
          </p>
        </header>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px' }}>
          <button className="stargate-btn" onClick={() => openDimension('Nebula Alpha')}>
            Open Nebula Alpha
          </button>
          <button className="stargate-btn" onClick={() => openDimension('Quantum Void')}>
            Open Quantum Void
          </button>
          <button className="stargate-btn" onClick={() => openDimension('Cyber Construct')}>
            Open Cyber Construct
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {Array.from(activeDimensions.values()).map((dim: Dimension) => (
            <div key={dim.id} className="dimension-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: 'var(--quantum-green)' }}>{dim.name}</h3>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{dim.id.substr(0, 8)}...</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Quantum State: Stable</p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => collapseReality(dim.id)}
                  style={{ background: 'rgba(255,50,50,0.2)', border: '1px solid red', color: 'white', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Collapse
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: 'fixed', bottom: '30px', right: '30px' }}>
          <button 
            className="stargate-btn glow-quantum"
            onClick={broadcastEnergy}
          >
            Broadcast Energy Surge
          </button>
        </div>
      </div>
    </div>
  );
};