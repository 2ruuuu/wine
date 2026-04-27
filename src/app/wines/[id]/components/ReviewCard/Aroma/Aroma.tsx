import { AROMA_DATA, AromaKey } from '@/constants/aroma';
import { AromaProps } from './type';
import Image from 'next/image';

const Aroma = ({ item }: AromaProps) => {
  const data = AROMA_DATA[item as AromaKey];

  if (!data) return null;

  return (
    <div className="flex gap-1.5">
      {<Image src={data.icon} alt={data.label} width={24} height={24} />}
      <span className="text-[hsl(var(--gray-600))]">{data.label}</span>
    </div>
  );
};

export default Aroma;
