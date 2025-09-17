import React from 'react';
import { ArrowLeft, MessageCircle, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { System } from '../../types';

interface ChatbotTemplateProps {
  system: System;
  onBack: () => void;
}

export const ChatbotTemplate = ({ system, onBack }: ChatbotTemplateProps) => {
  // Dummy data - replace with real data from webhooks
  const messagesSent = system.data?.messagesSent || 15420;
  const consumed = messagesSent / 1000; // Messages consumed in thousands
  const costPerThousand = 1.0; // $1 per 1000 messages
  const totalCost = consumed * costPerThousand;
  
  const activeUsers = 1247;
  const avgResponseTime = 0.8; // seconds

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Messages Sent */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-card-foreground">Messages Sent</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{messagesSent.toLocaleString()}</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+8% from last month</p>
          </div>

          {/* Amount Consumed */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-card-foreground">Consumed</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{consumed.toFixed(1)}K</p>
            <p className="text-sm text-muted-foreground mt-1">Messages in thousands</p>
          </div>

          {/* Cost */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-card-foreground">Total Cost</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">${totalCost.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">@$1.00/1K messages</p>
          </div>

          {/* Active Users */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-card-foreground">Active Users</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{activeUsers.toLocaleString()}</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+15% this week</p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Response Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Average Response Time</span>
                  <span className="font-medium text-card-foreground">{avgResponseTime}s</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-medium text-card-foreground">97.2%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '97%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">User Satisfaction</span>
                  <span className="font-medium text-card-foreground">4.8/5</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Usage Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Customer Support</span>
                <span className="text-sm font-medium text-card-foreground">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sales Inquiries</span>
                <span className="text-sm font-medium text-card-foreground">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">General Questions</span>
                <span className="text-sm font-medium text-card-foreground">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Technical Support</span>
                <span className="text-sm font-medium text-card-foreground">9%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Activity Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Message Activity</h3>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Message activity chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};