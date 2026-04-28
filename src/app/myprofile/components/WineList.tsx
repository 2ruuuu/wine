interface Wine {
  id: number;
  wineName: string;
  country: string;
}

interface WineListProps {
  wines: Wine[];
}

const WineList = ({ wines }: WineListProps) => {
  return (
    <>
      {wines.map((wine) => (
        <article
          key={wine.id}
          style={{
            display: 'flex',
            gap: '20px',
            borderBottom: '1px solid #ddd',
            paddingBottom: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ width: 80, height: 110, backgroundColor: '#eee' }} />

          <div>
            <strong>{wine.wineName}</strong>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '6px' }}>
              {wine.country}
            </p>
          </div>
        </article>
      ))}
    </>
  );
};

export default WineList;
