import React from 'react';
import { ArrowLeft, Phone, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { System } from '../../types';

interface VocalTemplateProps {
  system: System;
  onBack: () => void;
}

export const VocalTemplate = ({ system, onBack }: VocalTemplateProps) => {
  // Dummy data - replace with real data from webhooks
  const callsToday = system.data?.callsToday || 23;
  const minutesToday = system.data?.minutesToday || 147;
  const monthlyMinutes = system.data?.monthlyMinutes || 2840;
  
  const costPerMinute = 0.15;
  const monthlyCost = monthlyMinutes * costPerMinute;
  const moneySaved = monthlyCost * 4; // 4x savings

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
          {/* Calls Today */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-card-foreground">Calls Today</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{callsToday}</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12% from yesterday</p>
          </div>

          {/* Minutes Today */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-card-foreground">Minutes Today</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{minutesToday}</p>
            <p className="text-sm text-muted-foreground mt-1">Average: {(minutesToday / callsToday).toFixed(1)} min/call</p>
          </div>

          {/* Monthly Minutes */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-card-foreground">Monthly Minutes</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{monthlyMinutes.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </div>

          {/* Cost Estimate */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-card-foreground">Monthly Cost</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">${monthlyCost.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">@${costPerMinute}/min</p>
          </div>
        </div>

        {/* Savings Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Money Saved This Month</h3>
              <p className="text-green-100 mb-4">
                Compared to traditional phone services, you've saved approximately:
              </p>
              <p className="text-4xl font-bold">${moneySaved.toFixed(2)}</p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-16 w-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Usage Chart Placeholder */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Usage Overview</h3>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Usage chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};