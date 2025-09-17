import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  Search, 
  Grid3X3, 
  List, 
  Bell, 
  Sun, 
  Moon 
} from 'lucide-react';
import { Button } from './ui/button';
import { SystemCard } from './system-card';
import { SystemCreationModal } from './system-creation-modal';
import { EditSystemModal } from './edit-system-modal';
import { EmailTemplate } from './templates/email-template';
import { VocalTemplate } from './templates/vocal-template';
import { ChatbotTemplate } from './templates/chatbot-template';
import { PresentationTemplate } from './templates/presentation-template';
import { cn } from '../lib/utils';
import { System, User } from '../types';

interface AixptPortalProps {
  companyName?: string;
  user?: User;
  systems?: System[];
  onSystemClick?: (system: System) => void;
  onAddSystem?: () => void;
  onEditSystem?: (system: System) => void;
  onDeleteSystem?: (systemId: string) => void;
}

export const AixptPortal = ({
  companyName = 'AIXPT',
  user = { name: 'John Doe', email: 'john@aixpt.com' },
  systems = [],
  onSystemClick,
  onAddSystem,
  onEditSystem,
  onDeleteSystem,
}: AixptPortalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSystem, setEditingSystem] = useState<System | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'system'>('dashboard');
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
  const [localSystems, setLocalSystems] = useState<System[]>(systems);

  React.useEffect(() => {
    setLocalSystems(systems);
  }, [systems]);

  const filteredSystems = localSystems.filter(system =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleCreateSystem = (type: 'email' | 'vocal' | 'chatbot' | 'presentation') => {
    const systemNames = {
      email: 'Email System',
      vocal: 'Vocal System',
      chatbot: 'Chatbot',
      presentation: 'Presentation System'
    };

    const systemDescriptions = {
      email: 'Email marketing and communication platform',
      vocal: 'Voice calls and communication system',
      chatbot: 'AI-powered chat interactions',
      presentation: 'Create and manage presentations'
    };

    const newSystem: System = {
      id: Date.now().toString(),
      name: systemNames[type],
      description: systemDescriptions[type],
      type,
      status: 'active',
      lastAccessed: 'Just now',
      data: {
        // Default dummy data for each type
        ...(type === 'email' && { emailsSent: 0 }),
        ...(type === 'vocal' && { callsToday: 0, minutesToday: 0, monthlyMinutes: 0 }),
        ...(type === 'chatbot' && { messagesSent: 0 }),
        ...(type === 'presentation' && { creditsLeft: 1000, renewalDate: '2024-12-31', documentsCreated: 0 })
      }
    };

    setLocalSystems(prev => [...prev, newSystem]);
    onAddSystem?.();
  };

  const handleSystemClick = (system: System) => {
    setSelectedSystem(system);
    setCurrentView('system');
    onSystemClick?.(system);
  };

  const handleEditDescription = (system: System) => {
    setEditingSystem(system);
    setShowEditModal(true);
  };

  const handleSaveSystemEdit = (systemId: string, updates: { name: string; description: string }) => {
    setLocalSystems(prev => 
      prev.map(system => 
        system.id === systemId 
          ? { ...system, ...updates }
          : system
      )
    );
  };

  const handleDeleteSystem = (systemId: string) => {
    setLocalSystems(prev => prev.filter(s => s.id !== systemId));
    onDeleteSystem?.(systemId);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedSystem(null);
  };

  // Render system template based on type
  if (currentView === 'system' && selectedSystem) {
    switch (selectedSystem.type) {
      case 'email':
        return <EmailTemplate system={selectedSystem} onBack={handleBackToDashboard} />;
      case 'vocal':
        return <VocalTemplate system={selectedSystem} onBack={handleBackToDashboard} />;
      case 'chatbot':
        return <ChatbotTemplate system={selectedSystem} onBack={handleBackToDashboard} />;
      case 'presentation':
        return <PresentationTemplate system={selectedSystem} onBack={handleBackToDashboard} />;
      default:
        return <div>Unknown system type</div>;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-lg font-bold">A</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">{companyName}</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search systems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-card-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Systems Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              Manage and access your company systems
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center rounded-lg border border-border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none border-r"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Add System Button */}
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add System
            </Button>
          </div>
        </div>

        {/* Systems Grid/List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Systems ({filteredSystems.length})
            </h3>
          </div>

          {filteredSystems.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Settings className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No systems found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by adding your first system.'}
              </p>
              {!searchQuery && (
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add System
                </Button>
              )}
            </div>
          ) : (
            <div className={cn(
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            )}>
              {filteredSystems.map((system) => (
                <SystemCard
                  key={system.id}
                  system={system}
                  onClick={handleSystemClick}
                  onEdit={onEditSystem}
                  onDelete={handleDeleteSystem}
                  onEditDescription={handleEditDescription}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <SystemCreationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateSystem={handleCreateSystem}
      />
      
      <EditSystemModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        system={editingSystem}
        onSave={handleSaveSystemEdit}
      />
    </div>
  );
};