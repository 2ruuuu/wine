import Taste from '@/components/Taste/Taste';

import { TasteListProps } from './type';

const TasteList = ({
  lightBold,
  smoothTannic,
  drySweet,
  softAcidic,
}: TasteListProps) => {
  const TasteArray = [
    { type: 'lightBold', value: lightBold },
    { type: 'smoothTannic', value: smoothTannic },
    { type: 'drySweet', value: drySweet },
    { type: 'softAcidic', value: softAcidic },
  ] as const;

  return (
    <div className="flex flex-col gap-[6px] md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-4 w-full">
      {TasteArray.map((item) => (
        <Taste
          key={item.type}
          variant="label-boxed-middle"
          type={item.type}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default TasteList;
