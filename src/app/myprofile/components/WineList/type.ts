export type WineListItem = {
  id: number;
  name: string;
  region: string;
  image?: string | null;
  avgRating: number;
  reviewCount: number;
};

interface WineListProps {
  wines: WineListItem[];
}

export default WineListProps;
