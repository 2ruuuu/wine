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
    <div className="grid grid-cols-2 gap-4">
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
