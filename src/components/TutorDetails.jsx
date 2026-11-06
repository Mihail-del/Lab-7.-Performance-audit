import { useEffect } from 'react';
import RatingStars from './RatingStars';
import { averageRating, weightedRating } from '../utils/rating';
import { formatPrice, formatDate, pluralize, FORMAT_LABELS } from '../utils/format';

export default function TutorDetails({ tutor, isFavorite, onToggleFavorite, onClose, onBook }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const rating = averageRating(tutor.reviews);
  const recent = [...tutor.reviews].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label={tutor.name}>
      <div className="drawer__backdrop" onClick={onClose} />
      <div className="drawer__panel">
        <button type="button" className="drawer__close" onClick={onClose} aria-label="Закрити">
          ×
        </button>
        <div className="drawer__head">
          <img className="drawer__photo" src={tutor.photo} alt={tutor.name} />
          <div>
            <h2>{tutor.name}</h2>
            <p className="drawer__meta">
              {tutor.city} · {FORMAT_LABELS[tutor.format]}
            </p>
            <div className="tutor-card__rating">
              <RatingStars value={rating} />
              <span>
                {rating.toFixed(1)} · з урахуванням давності {weightedRating(tutor.reviews).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <dl className="drawer__facts">
          <div>
            <dt>Вартість</dt>
            <dd>{formatPrice(tutor.pricePerHour)} / год</dd>
          </div>
          <div>
            <dt>Досвід</dt>
            <dd>
              {tutor.experienceYears} {pluralize(tutor.experienceYears, 'рік', 'роки', 'років')}
            </dd>
          </div>
          <div>
            <dt>Мови</dt>
            <dd>{tutor.languages.join(', ')}</dd>
          </div>
          <div>
            <dt>На платформі з</dt>
            <dd>{formatDate(tutor.joined)}</dd>
          </div>
        </dl>
        <h3>Про себе</h3>
        <p>{tutor.bio}</p>
        <h3>Предмети</h3>
        <ul className="tutor-card__tags">
          {tutor.subjects.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <h3>Останні відгуки</h3>
        <ul className="reviews">
          {recent.map((r) => (
            <li key={r.id} className="reviews__item">
              <RatingStars value={r.rating} />
              <span className="reviews__author">{r.author}</span>
              <span className="reviews__date">{formatDate(r.date)}</span>
            </li>
          ))}
        </ul>
        <div className="drawer__actions">
          <button type="button" className="button" onClick={onBook}>
            Записатися на заняття
          </button>
          <button type="button" className="button button--ghost" onClick={onToggleFavorite}>
            {isFavorite ? '♥ В обраних' : '♡ В обрані'}
          </button>
        </div>
      </div>
    </div>
  );
}
