export default function RatingStars({ value }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span className="stars" aria-label={`Рейтинг ${value.toFixed(1)} з 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            'stars__item' +
            (rounded >= i ? ' stars__item--full' : rounded >= i - 0.5 ? ' stars__item--half' : '')
          }
        >
          ★
        </span>
      ))}
    </span>
  );
}
