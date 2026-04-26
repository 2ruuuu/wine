'use client';

import { INTENSITY } from '@/constants/taste';
import { useState } from 'react';
import { TasteButtonProps } from './type';

const TasteButton = ({
  initialValue = 0,
  label,
  min,
  max,
  onChange,
}: TasteButtonProps) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  const handleSelect = (num: number) => {
    setCurrentValue(num);
    if (onChange) onChange(num);
  };

  return (
    <div className="flex justify-center items-center w-full max-w-[480px] gap-5">
      <div className="flex justify-center items-center">
        <span className="text-xl font-bold mr-2 text-gray-800">{label}</span>
        <div className="h-6 w-px bg-[hsl(var(--gray-100))] mx-0.5" />
      </div>

      <span className="text-[hsl(var(--gray-600))] text-sm whitespace-nowrap">
        {min}
      </span>

      <div className="flex gap-1">
        {INTENSITY.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleSelect(num)}
            className={`h-4 w-10 rounded-full transition-all duration-200 hover:scale-110 ${
              num <= currentValue
                ? 'bg-[hsl(var(--black))]'
                : 'bg-[hsl(var(--gray-100))]'
            }`}
            aria-label={`${label} ${num}단계 선택`}
          />
        ))}
      </div>

      <span className="text-[hsl(var(--gray-600))] text-sm whitespace-nowrap">
        {max}
      </span>
    </div>
  );
};

export default TasteButton;
