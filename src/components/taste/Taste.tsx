import React from 'react';

type TasteVariant =
  | 'label-boxed-long'
  | 'label-boxed-middle'
  | 'label-boxed-short'
  | 'label-bold'
  | 'label-top';

type TasteDataKey = 'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic';

interface TasteProps {
  variant: TasteVariant;
  type: TasteDataKey;
  value: number;
}

const TASTE_CONFIG: Record<
  TasteDataKey,
  { label: string; min: string; max: string }
> = {
  lightBold: { label: '바디감', min: '가벼워요', max: '진해요' },
  smoothTannic: { label: '탄닌', min: '부드러워요', max: '떫어요' },
  drySweet: { label: '당도', min: '드라이해요', max: '달아요' },
  softAcidic: { label: '산미', min: '안셔요', max: '많이셔요' },
};

const Bar = ({
  value,
  gapClass,
  widthClass,
}: {
  value: number;
  gapClass: string;
  widthClass: string;
}) => (
  <div className={`flex ${gapClass}`}>
    {[1, 2, 3, 4, 5, 6].map((num) => (
      <div
        key={num}
        className={`h-3 ${widthClass} rounded-full ${
          num <= value ? 'bg-[hsl(var(--black))]' : 'bg-[hsl(var(--gray-100))]'
        }`}
      />
    ))}
  </div>
);

const Taste = ({ variant, type, value }: TasteProps) => {
  const { label, min, max } = TASTE_CONFIG[type];
  const LABELDEFAULT = 'flex justify-center items-center w-full';

  const container: { [key in TasteVariant]: string } = {
    'label-boxed-long': `${LABELDEFAULT} gap-3 max-w-[500px]`,
    'label-boxed-middle': `${LABELDEFAULT} gap-4 max-w-[340px]`,
    'label-boxed-short': `${LABELDEFAULT} gap-5 max-w-[320px]`,
    'label-bold': `${LABELDEFAULT} gap-5 max-w-[480px]`,
    'label-top': `${LABELDEFAULT} flex-col max-w-[320px]`,
  };

  const LAYOUTS: { [key in TasteVariant]: React.ReactNode } = {
    'label-boxed-long': (
      <div className={container[variant]}>
        <div className="flex justify-between items-center gap-3.5">
          <span className="bg-[hsl(var(--gray-100))] px-[5px] py-[7px] rounded text-sm font-bold min-w-[50px] text-center text-gray-600">
            {label}
          </span>
          <div className="h-[30px] w-px bg-[hsl(var(--gray-100))] mx-1" />
        </div>
        <Bar value={value} gapClass="gap-1" widthClass="w-12" />
        <span className="ml-auto text-sm font-medium">{max}</span>
      </div>
    ),
    'label-boxed-middle': (
      <div className={container[variant]}>
        <span className="bg-[hsl(var(--gray-100))] font-bold px-[7px] py-[2px] rounded text-sm text-[hsl(var(--gray-600))]">
          {label}
        </span>
        <Bar value={value} gapClass="gap-0.5" widthClass="w-10" />
        <span className="text-sm font-medium">{max}</span>
      </div>
    ),

    'label-boxed-short': (
      <div className={container[variant]}>
        <span className="bg-[hsl(var(--gray-100))] font-bold px-[13.5px] py-[5px] rounded text-sm text-[hsl(var(--gray-600))]">
          {label}
        </span>
        <Bar value={value} gapClass="gap-0.5" widthClass="w-8" />
        <span className="text-sm font-medium text-[hsl(var(--gray-800))]">
          {min === '부드러워요' ? min : max}
        </span>
      </div>
    ),
    'label-bold': (
      <div className={container[variant]}>
        <div className="flex justify-center items-center">
          <span className="text-xl font-bold mr-2 text-gray-800">{label}</span>
          <div className="h-6 w-px bg-[hsl(var(--gray-100))] mx-0.5" />
        </div>
        <span className="text-[hsl(var(--gray-600))] text-sm">{min}</span>
        <Bar value={value} gapClass="gap-1" widthClass="w-10" />
        <span className="text-[hsl(var(--gray-600))] text-sm">{max}</span>
      </div>
    ),
    'label-top': (
      <div className={container[variant]}>
        <span className="font-bold text-[hsl(var(--gray-800))]">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-[hsl(var(--gray-600))] text-sm">{min}</span>
          <Bar value={value} gapClass="gap-0.5" widthClass="w-9" />
          <span className="text-[hsl(var(--gray-600))] text-sm">{max}</span>
        </div>
      </div>
    ),
  };

  return <>{LAYOUTS[variant]}</>;
};

export default Taste;
