import React from 'react';
import { ArrowLeft, Presentation, Calendar, FileText, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { System } from '../../types';

interface PresentationTemplateProps {
  system: System;
  onBack: () => void;
}

export const PresentationTemplate = ({ system, onBack }: PresentationTemplateProps) => {
  // Dummy data - replace with real data from webhooks
  const creditsLeft = system.data?.creditsLeft || 847;
  const renewalDate = system.data?.renewalDate || '2024-04-15';
  const documentsCreated = system.data?.documentsCreated || 23;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{system.name}</h1>
            <p className="text-muted-foreground">{system.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Stats (30% width) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Credits Left */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-card-foreground">Credits Left</h3>
              </div>
              <p className="text-3xl font-bold text-card-foreground">{creditsLeft}</p>
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(creditsLeft / 1000) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">of 1,000 credits</p>
              </div>
            </div>

            {/* Renewal Date */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-card-foreground">Next Renewal</h3>
              </div>
              <p className="text-lg font-bold text-card-foreground">{formatDate(renewalDate)}</p>
              <p className="text-sm text-muted-foreground mt-1">Auto-renewal enabled</p>
            </div>

            {/* Documents Created */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-card-foreground">Documents</h3>
              </div>
              <p className="text-3xl font-bold text-card-foreground">{documentsCreated}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+5 this week</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-card-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Presentation className="h-4 w-4 mr-2" />
                  New Presentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Templates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - ContextAI Embed (70% width) */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-6 h-full min-h-[600px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-card-foreground">ContextAI Presentation Builder</h3>
                <Button variant="outline" size="sm">
                  <Presentation className="h-4 w-4 mr-2" />
                  Full Screen
                </Button>
              </div>
              
              {/* ContextAI Embed Placeholder */}
              <div className="w-full h-full min-h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Presentation className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-card-foreground mb-2">
                    ContextAI Integration
                  </h4>
                  <p className="text-muted-foreground max-w-md">
                    This area will contain the embedded ContextAI presentation builder. 
                    The iframe or component will be integrated here to provide the full 
                    presentation creation experience.
                  </p>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <code className="text-sm text-muted-foreground">
                      &lt;iframe src="https://contextai.example.com/embed" /&gt;
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};