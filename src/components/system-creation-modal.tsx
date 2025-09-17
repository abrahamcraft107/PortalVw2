import React from 'react';
import { Mail, Phone, MessageCircle, Presentation } from 'lucide-react';
import { Modal } from './ui/modal';
import { Button } from './ui/button';

interface SystemCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSystem: (type: 'email' | 'vocal' | 'chatbot' | 'presentation') => void;
}

export const SystemCreationModal = ({ isOpen, onClose, onCreateSystem }: SystemCreationModalProps) => {
  const systemTypes = [
    {
      type: 'email' as const,
      name: 'Email System',
      description: 'Send and manage email campaigns',
      icon: Mail,
      color: 'bg-blue-500',
    },
    {
      type: 'vocal' as const,
      name: 'Vocal System',
      description: 'Voice calls and communication',
      icon: Phone,
      color: 'bg-green-500',
    },
    {
      type: 'chatbot' as const,
      name: 'Chatbot',
      description: 'AI-powered chat interactions',
      icon: MessageCircle,
      color: 'bg-purple-500',
    },
    {
      type: 'presentation' as const,
      name: 'Presentation',
      description: 'Create and manage presentations',
      icon: Presentation,
      color: 'bg-orange-500',
    },
  ];

  const handleCreateSystem = (type: 'email' | 'vocal' | 'chatbot' | 'presentation') => {
    onCreateSystem(type);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New System" className="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systemTypes.map((systemType) => {
          const Icon = systemType.icon;
          return (
            <button
              key={systemType.type}
              onClick={() => handleCreateSystem(systemType.type)}
              className="group p-6 border border-border rounded-lg hover:border-ring hover:shadow-md transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`p-3 rounded-lg ${systemType.color} text-white group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{systemType.name}</h3>
                  <p className="text-sm text-muted-foreground">{systemType.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
};