import React, { useState } from 'react';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { System } from '../types';

interface EditSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  system: System | null;
  onSave: (systemId: string, updates: { name: string; description: string }) => void;
}

export const EditSystemModal = ({ isOpen, onClose, system, onSave }: EditSystemModalProps) => {
  const [name, setName] = useState(system?.name || '');
  const [description, setDescription] = useState(system?.description || '');

  React.useEffect(() => {
    if (system) {
      setName(system.name);
      setDescription(system.description || '');
    }
  }, [system]);

  const handleSave = () => {
    if (system) {
      onSave(system.id, { name, description });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit System">
      <div className="space-y-4">
        <Input
          label="System Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter system name"
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter system description"
          rows={3}
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};