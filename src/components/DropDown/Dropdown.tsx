'use client';

import { useEffect, useRef, useState } from 'react';
import type { DropdownProps } from './type';

const variantClassMap = {
  basic: 'min-w-[126px] text-base',
  small: 'min-w-[101px] text-sm',
} as const;

const Dropdown = ({ variant, options, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      const isInsideDropdown = wrapperRef.current?.contains(targetNode);

      if (!isInsideDropdown) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleClickDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      {children({ toggle: handleClickDropdown })}

      {isOpen && (
        <ul
          role="listbox"
          className={`absolute right-0 top-full mt-5 rounded-sm border border-[hsl(var(--gray-300))] bg-white shadow-[0_16px_32px_rgba(0,0,0,0.1)] ${variantClassMap[variant]}`}
        >
          {options.map((option) => (
            <li key={option.label} className="px-[4px] py-[3px]">
              <button
                type="button"
                className={`block w-full rounded-[4px] py-[10px] text-center hover:bg-[#F2F2F2] active:bg-[hsl(var(--gray-800))] active:text-[hsl(var(--gray-100))]`}
                onClick={() => {
                  option.onSelect();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
