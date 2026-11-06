import { suggestNames } from '../utils/suggest';

export default function EmptyState({ query, tutors, onPick }) {
  const suggestions = query ? suggestNames(query, tutors) : [];
  return (
    <div className="empty">
      <h3>Нічого не знайдено</h3>
      <p>Спробуйте змінити запит або скинути частину фільтрів.</p>
      {suggestions.length > 0 && (
        <p>
          Можливо, ви мали на увазі:{' '}
          {suggestions.map((s, i) => (
            <span key={s}>
              {i > 0 && ', '}
              <button type="button" className="link-button" onClick={() => onPick(s)}>
                {s}
              </button>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
