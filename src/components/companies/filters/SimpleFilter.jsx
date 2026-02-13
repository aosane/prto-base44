import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SimpleFilter({ isOpen, onClose, title, description, inputType = 'text' }) {
  const [value, setValue] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}

          {inputType === 'textarea' ? (
            <Textarea
              placeholder="Enter value..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="min-h-32"
            />
          ) : (
            <Input
              type={inputType}
              placeholder="Enter value..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} className="bg-[#2D55EB] hover:bg-[#2442c7]">Apply</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}