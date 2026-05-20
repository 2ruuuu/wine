import Taste from '@/components/Taste/Taste';

import { TasteListProps } from './type';

const TasteList = ({ review }: TasteListProps) => {
  const { lightBold, smoothTannic, drySweet, softAcidic } = review;
  const TasteArray = [
    { type: 'lightBold', value: lightBold },
    { type: 'smoothTannic', value: smoothTannic },
    { type: 'drySweet', value: drySweet },
    { type: 'softAcidic', value: softAcidic },
  ] as const;

  return (
    <div className="flex w-full flex-col gap-[6px] md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-4">
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
