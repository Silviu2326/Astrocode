import { useState, useEffect } from 'react';

interface NeuroNovaState {
  activeNodes: string[];
  processingNodes: string[];
  brainActivity: number;
  theme: 'dark' | 'darker';
}

export const useNeuroNova = () => {
  const [state, setState] = useState<NeuroNovaState>({
    activeNodes: [],
    processingNodes: [],
    brainActivity: 0,
    theme: 'dark'
  });

  const activateNode = (nodeId: string) => {
    setState(prev => ({
      ...prev,
      activeNodes: [...prev.activeNodes, nodeId],
      brainActivity: Math.min(prev.brainActivity + 10, 100)
    }));
  };

  const deactivateNode = (nodeId: string) => {
    setState(prev => ({
      ...prev,
      activeNodes: prev.activeNodes.filter(id => id !== nodeId),
      brainActivity: Math.max(prev.brainActivity - 10, 0)
    }));
  };

  const startProcessing = (nodeId: string) => {
    setState(prev => ({
      ...prev,
      processingNodes: [...prev.processingNodes, nodeId]
    }));
  };

  const stopProcessing = (nodeId: string) => {
    setState(prev => ({
      ...prev,
      processingNodes: prev.processingNodes.filter(id => id !== nodeId)
    }));
  };

  const triggerBrainWave = () => {
    setState(prev => ({ ...prev, brainActivity: 100 }));
    setTimeout(() => {
      setState(prev => ({ ...prev, brainActivity: 20 }));
    }, 2000);
  };

  return {
    ...state,
    activateNode,
    deactivateNode,
    startProcessing,
    stopProcessing,
    triggerBrainWave
  };
};