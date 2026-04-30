import WineListProps from './type';

const WineList = ({ wines }: WineListProps) => {
  return (
    <>
      {wines.map((wine) => (
        <article
          key={wine.id}
          className="
            flex gap-5
            border-b border-gray-300
            pb-6 mb-6
          "
        >
          <div className="w-[80px] h-[110px] bg-gray-100" />

          <div>
            <strong>{wine.name}</strong>
            <p className="text-gray-400 text-[13px] mt-1.5">{wine.region}</p>
            <p className="text-gray-400 text-[13px] mt-1">
              평점 {wine.avgRating} · 리뷰 {wine.reviewCount}
            </p>
          </div>
        </article>
      ))}
    </>
  );
};

export default WineList;
