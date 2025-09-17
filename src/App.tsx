import React, { useState } from 'react';
import { AixptPortal } from './components/aixpt-portal';
import { System } from './types';

export default function App() {
  const [systems, setSystems] = useState<System[]>([
    {
      id: '1',
      name: 'Email System',
      description: 'Corporate email management and communication platform',
      type: 'email',
      status: 'active',
      lastAccessed: '2 hours ago',
      data: { emailsSent: 1247 }
    },
    {
      id: '2',
      name: 'CRM System',
      description: 'Customer relationship management and sales tracking',
      type: 'chatbot',
      status: 'active',
      lastAccessed: '1 day ago',
      data: { messagesSent: 15420 }
    },
    {
      id: '3',
      name: 'HR Management',
      description: 'Human resources and employee management system',
      type: 'vocal',
      status: 'maintenance',
      lastAccessed: '3 days ago',
      data: { callsToday: 23, minutesToday: 147, monthlyMinutes: 2840 }
    },
    {
      id: '4',
      name: 'Inventory System',
      description: 'Product inventory and warehouse management',
      type: 'presentation',
      status: 'active',
      lastAccessed: '5 hours ago',
      data: { creditsLeft: 847, renewalDate: '2024-04-15', documentsCreated: 23 }
    },
    {
      id: '5',
      name: 'Analytics Dashboard',
      description: 'Business intelligence and data analytics platform',
      type: 'email',
      status: 'inactive',
      lastAccessed: '1 week ago',
      data: { emailsSent: 892 }
    },
    {
      id: '6',
      name: 'Project Management',
      description: 'Task tracking and project collaboration tools',
      type: 'chatbot',
      status: 'active',
      lastAccessed: '30 minutes ago',
      data: { messagesSent: 8934 }
    },
  ]);

  const handleSystemClick = (system: System) => {
    console.log('Opening system:', system.name);
    alert(`Opening ${system.name}`);
  };

  const handleAddSystem = () => {
    // This will be handled by the portal component
    console.log('Add system triggered');
  };

  const handleEditSystem = (system: System) => {
    console.log('Editing system:', system.name);
    alert(`Editing ${system.name}`);
  };

  const handleDeleteSystem = (systemId: string) => {
    setSystems(prev => prev.filter(s => s.id !== systemId));
  };

  return (
    <AixptPortal
      systems={systems}
      onSystemClick={handleSystemClick}
      onAddSystem={handleAddSystem}
      onEditSystem={handleEditSystem}
      onDeleteSystem={handleDeleteSystem}
    />
  );
}