import React from 'react';

import { INTENSITY } from '@/constants/taste';

import { TasteDataKey, TasteProps, TasteVariant } from './type';

const TASTE_CONFIG: Record<
  TasteDataKey,
  { label: string; min: string; max: string }
> = {
  lightBold: { label: '바디감', min: '가벼워요', max: '진해요' },
  smoothTannic: { label: '탄닌', min: '부드러워요', max: '떫어요' },
  drySweet: { label: '당도', min: '드라이해요', max: '달아요' },
  softAcidic: { label: '산미', min: '안셔요', max: '많이셔요' },
};

const Bar = ({ value, gapClass }: { value: number; gapClass: string }) => (
  <div className={`flex w-full ${gapClass}`}>
    {INTENSITY.map((num) => (
      <div
        key={num}
        className={`h-3 flex-1 rounded-full ${
          num <= value ? 'bg-black' : 'bg-gray-100'
        }`}
      />
    ))}
  </div>
);

const Taste = ({ variant, type, value }: TasteProps) => {
  const { label, min, max } = TASTE_CONFIG[type];
  const LABELDEFAULT = 'flex items-center w-full';

  const container: { [key in TasteVariant]: string } = {
    'label-boxed-long': `${LABELDEFAULT} gap-3 w-full`,
    'label-boxed-middle': `${LABELDEFAULT} gap-6 w-full min-w-0`,
    'label-boxed-short': `${LABELDEFAULT} gap-5 w-full`,
    'label-bold': `${LABELDEFAULT} gap-5 w-full`,
    'label-top': `${LABELDEFAULT} flex-col w-full`,
  };

  const LAYOUTS: { [key in TasteVariant]: React.ReactNode } = {
    'label-boxed-long': (
      <div className={container[variant]}>
        <div className="flex justify-between items-center gap-3.5">
          <span className="bg-gray-100 px-[5px] py-[7px] rounded text-sm font-bold min-w-[50px] text-center text-gray-600">
            {label}
          </span>
          <div className="h-[30px] w-px bg-gray-100 mx-1" />
        </div>
        <div className="flex-1">
          <Bar value={value} gapClass="gap-1" />
        </div>
        <span className="text-sm font-medium whitespace-nowrap shrink-0 min-w-[65px] text-right">
          {max}
        </span>
      </div>
    ),
    'label-boxed-middle': (
      <div className={`${container[variant]} flex-nowrap`}>
        <span className="flex items-center justify-center shrink-0 whitespace-nowrap bg-gray-100 font-bold w-[53px] h-[30px] rounded text-sm text-gray-600">
          {label}
        </span>
        <div className="flex-1 px-1 min-w-0">
          <Bar value={value} gapClass="md:gap-0.5 gap-1" />
        </div>
        <span className="text-sm font-medium whitespace-nowrap shrink-0 min-w-[55px] text-right">
          {max}
        </span>
      </div>
    ),

    'label-boxed-short': (
      <div className={`${container[variant]} flex-nowrap`}>
        <span className="flex items-center justify-center shrink-0 whitespace-nowrap bg-gray-100 font-bold w-[53px] h-[30px] rounded text-sm text-gray-600">
          {label}
        </span>
        <div className="flex-1 min-w-0">
          <Bar value={value} gapClass="gap-0.5" />
        </div>
        <span className="text-sm font-medium text-gray-800 whitespace-nowrap shrink-0 min-w-[65px] text-right">
          {min === '부드러워요' ? min : max}
        </span>
      </div>
    ),
    'label-bold': (
      <div className={container[variant]}>
        <div className="flex justify-center items-center">
          <span className="text-xl font-bold mr-2 text-gray-800">{label}</span>
          <div className="h-6 w-px bg-gray-100 mx-0.5" />
        </div>
        <span className="text-gray-600 text-sm">{min}</span>
        <div className="flex-1">
          <Bar value={value} gapClass="gap-1" />
        </div>
        <span className="text-gray-600 text-sm">{max}</span>
      </div>
    ),
    'label-top': (
      <div className={container[variant]}>
        <span className="font-bold text-gray-800">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-sm">{min}</span>
          <div className="flex-1">
            <Bar value={value} gapClass="gap-0.5" />
          </div>
          <span className="text-gray-600 text-sm">{max}</span>
        </div>
      </div>
    ),
  };

  return <>{LAYOUTS[variant]}</>;
};

export default Taste;
