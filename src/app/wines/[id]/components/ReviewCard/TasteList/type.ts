import { Review } from '@/app/wines/[id]/type';

export interface TasteListProps {
  review: Pick<
    Review,
    'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic'
  >;
}
