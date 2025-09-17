import React from 'react';
import { Settings, Trash2, MoreHorizontal, Edit3 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { System } from '../types';

interface SystemCardProps {
  system: System;
  onClick?: (system: System) => void;
  onEdit?: (system: System) => void;
  onDelete?: (systemId: string) => void;
  onEditDescription?: (system: System) => void;
}

export const SystemCard = ({ 
  system, 
  onClick, 
  onEdit, 
  onDelete,
  onEditDescription
}: SystemCardProps) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
    inactive: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800',
    maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
  };

  return (
    <div 
      className="group relative bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer" 
      onClick={() => onClick?.(system)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-card-foreground mb-2 truncate">
            {system.name}
          </h3>
          {system.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {system.description}
            </p>
          )}
          <div className="flex items-center gap-3">
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', 
              statusColors[system.status || 'active']
            )}>
              {system.status || 'active'}
            </span>
            {system.lastAccessed && (
              <span className="text-xs text-muted-foreground">
                Last accessed: {system.lastAccessed}
              </span>
            )}
          </div>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(system);
            }}
            className="h-8 w-8 p-0"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(system.id);
            }}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="relative group/menu">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="h-8 w-8 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditDescription?.(system);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit Description
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};