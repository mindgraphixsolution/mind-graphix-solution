
import React from 'react';
import './styles/cosmic.css';
import { CosmicPortal } from './core/CosmicPortal';
import { DimensionWrapper } from './dimensions/DimensionWrapper';

const App: React.FC = () => {
  // Simple URL parameter routing to determine Reality State
  const params = new URLSearchParams(window.location.search);
  const dimensionId = params.get('dimension');
  const dimensionName = params.get('name');

  // If we have a dimension ID, we are a child reality
  if (dimensionId && dimensionName) {
    return <DimensionWrapper id={dimensionId} name={dimensionName} />;
  }

  // Otherwise, we are the Core Portal
  return <CosmicPortal />;
};

export default App;
