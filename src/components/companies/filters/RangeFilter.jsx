import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function RangeFilter({ isOpen, onClose, title, min = 0, max = 100, unit = '' }) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [sliderValues, setSliderValues] = useState([min, max]);

  const handleSliderChange = (values) => {
    setSliderValues(values);
    setMinValue(values[0]);
    setMaxValue(values[1]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Min/Max Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Min</label>
              <Input
                type="number"
                value={minValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || min;
                  setMinValue(val);
                  setSliderValues([val, maxValue]);
                }}
                className="text-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Max</label>
              <Input
                type="number"
                value={maxValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || max;
                  setMaxValue(val);
                  setSliderValues([minValue, val]);
                }}
                placeholder="Max"
                className="text-lg"
              />
            </div>
          </div>

          {/* Slider */}
          <div className="px-2">
            <Slider
              min={min}
              max={max}
              step={1}
              value={sliderValues}
              onValueChange={handleSliderChange}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{min}{unit}</span>
              <span>{max}{unit}</span>
            </div>
          </div>

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