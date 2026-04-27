interface Review {
  id: number;
  wineName: string;
  country: string;
  rating: number;
  time: string;
  content: string;
  likeCount: number;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <>
      {reviews.map((review) => (
        <article
          key={review.id}
          style={{
            borderBottom: '1px solid #ddd',
            paddingBottom: '32px',
            marginBottom: '32px',
            marginLeft: '-36px',
            paddingLeft: '36px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>{'★'.repeat(review.rating)}</span>
            <strong>{review.rating}</strong>
            <span style={{ color: '#aaa', fontSize: '13px' }}>
              {review.time}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <div style={{ width: 42, height: 70, backgroundColor: '#eee' }} />

            <div>
              <strong>{review.wineName}</strong>
              <p style={{ color: '#aaa', fontSize: '13px', marginTop: '4px' }}>
                {review.country}
              </p>
            </div>
          </div>

          <p
            style={{
              marginTop: '20px',
              lineHeight: '1.7',
              fontSize: '14px',
              whiteSpace: 'pre-line',
            }}
          >
            {review.content}
          </p>

          <button
            style={{
              marginTop: '20px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              borderRadius: '6px',
              padding: '8px 14px',
            }}
          >
            ♡ {review.likeCount}
          </button>
        </article>
      ))}
    </>
  );
};

export default ReviewList;
