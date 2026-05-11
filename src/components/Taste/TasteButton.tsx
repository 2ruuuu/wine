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
          className={`flex-1 h-4 rounded-full transition-all cursor-pointer duration-200 ${
            num <= currentValue ? 'bg-black' : 'bg-gray-100'
          }`}
        />
      ))}
    </div>
  );
};

export default TasteButton;
