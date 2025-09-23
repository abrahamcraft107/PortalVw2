import React, { useState } from 'react';
import { ArrowLeft, Upload, Mail, FileText, TrendingUp, Users, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { System } from '../../types';

interface EmailCompleteTemplateProps {
  system: System;
  onBack: () => void;
}

export const EmailCompleteTemplate = ({ system, onBack }: EmailCompleteTemplateProps) => {
  const [dragActive, setDragActive] = useState(false);
  
  // Dummy data - replace with real data from webhooks
  const emailsSent = system.data?.emailsSent || 1247;
  const openRate = 24.5;
  const clickRate = 3.2;
  const subscribers = 15420;
  const campaigns = 23;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
    // Handle file upload logic here
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats Section - Enhanced for Complete Version */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-card-foreground">Emails Sent</h3>
              </div>
              <p className="text-3xl font-bold text-card-foreground">{emailsSent.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">This month</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-card-foreground">Subscribers</h3>
              </div>
              <p className="text-3xl font-bold text-card-foreground">{subscribers.toLocaleString()}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+5.2% this week</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-card-foreground">Campaigns</h3>
              </div>
              <p className="text-3xl font-bold text-card-foreground">{campaigns}</p>
              <p className="text-sm text-muted-foreground mt-1">Active campaigns</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-card-foreground">Performance</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Open Rate</span>
                    <span className="font-medium text-card-foreground">{openRate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${openRate}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Click Rate</span>
                    <span className="font-medium text-card-foreground">{clickRate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${clickRate * 10}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Conversion</span>
                    <span className="font-medium text-card-foreground">1.8%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: '18%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced File Upload and Campaign Management Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* File Upload Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Upload Contact Files</h3>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-medium text-card-foreground mb-2">
                  Drop files here or click to upload
                </h4>
                <p className="text-muted-foreground mb-4">
                  Supported formats: CSV, JSON, XLSX, XLS
                </p>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-card-foreground mb-3">Recent Uploads</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">contacts_march.csv</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">newsletter_list.xlsx</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Campaign Management - Complete Version Only */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Campaign Management</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">Spring Sale Campaign</h4>
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Promotional campaign for spring products</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sent: 5,420</span>
                    <span className="text-muted-foreground">Opens: 28.5%</span>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">Newsletter March</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">Scheduled</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Monthly newsletter with updates</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Recipients: 12,340</span>
                    <span className="text-muted-foreground">Send: Mar 15</span>
                  </div>
                </div>
              </div>
            </div>

            {/* A/B Testing Section - Complete Version Only */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">A/B Testing Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground mb-2">Version A</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">32.1%</p>
                  <p className="text-sm text-muted-foreground">Open Rate</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-medium text-card-foreground mb-2">Version B (Winner)</h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">38.7%</p>
                  <p className="text-sm text-muted-foreground">Open Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};