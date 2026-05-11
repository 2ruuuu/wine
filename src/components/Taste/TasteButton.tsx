'use client';
import { useState } from 'react';

import { INTENSITY } from '@/constants/taste';

const TasteButton = ({
  initialValue = 0,
  onChange,
}: {
  initialValue?: number;
  onChange?: (val: number) => void;
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  const handleSelect = (num: number) => {
    setCurrentValue(num);
    onChange?.(num);
  };

  return (
    <div className="flex w-full gap-1">
      {INTENSITY.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => handleSelect(num)} //
          className={`h-4 flex-1 cursor-pointer rounded-full transition-all duration-200 ${
            num <= currentValue ? 'bg-black' : 'bg-gray-100'
          }`}
        />
      ))}
    </div>
  );
};

export default TasteButton;
