import { SORT_OPTIONS } from '../utils/catalog';
import { pluralize } from '../utils/format';

export default function SearchBar({ query, onQueryChange, sortBy, onSortChange, count }) {
  return (
    <div className="search-bar" id="catalog">
      <div className="search-bar__field">
        <span className="search-bar__icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Предмет, ім'я, місто або ключове слово…"
          aria-label="Пошук репетитора"
        />
      </div>
      <div className="search-bar__meta">
        <span className="search-bar__count">
          Знайдено {count} {pluralize(count, 'репетитор', 'репетитори', 'репетиторів')}
        </span>
        <label className="search-bar__sort">
          Сортування:
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
