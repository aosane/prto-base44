import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HeadcountGrowthFilter({ isOpen, onClose }) {
  const [department, setDepartment] = useState('Accounting');
  const [minPercent, setMinPercent] = useState('');
  const [maxPercent, setMaxPercent] = useState('');

  const departments = [
    'Accounting',
    'Sales',
    'Marketing',
    'Engineering',
    'Product',
    'Operations',
    'HR',
    'All Departments'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Department headcount growth</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Department Select */}
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Min/Max Percentage */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                placeholder="Min (%)"
                value={minPercent}
                onChange={(e) => setMinPercent(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max (%)"
                value={maxPercent}
                onChange={(e) => setMaxPercent(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Reset</Button>
            <Button onClick={onClose} className="bg-[#2D55EB] hover:bg-[#2442c7]">Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}