import { SUBJECTS, FORMATS } from '../data/subjects';
import { buildSubjectOptions } from '../utils/subjectOptions';
import { formatPrice } from '../utils/format';

export default function Filters({ filters, reference, tutors, onChange, onReset }) {
  const counts = tutors.reduce((acc, t) => {
    t.subjects.forEach((s) => {
      acc[s] = (acc[s] || 0) + 1;
    });
    return acc;
  }, {});
  const groups = buildSubjectOptions(SUBJECTS, counts);

  const toggleSubject = (title) => {
    const subjects = filters.subjects.includes(title)
      ? filters.subjects.filter((s) => s !== title)
      : [...filters.subjects, title];
    onChange({ subjects });
  };

  return (
    <aside className="filters">
      <div className="filters__head">
        <h2>Фільтри</h2>
        <button type="button" className="link-button" onClick={onReset}>
          Скинути
        </button>
      </div>

      <fieldset className="filters__group">
        <legend>Предмет</legend>
        {groups.map((group) => (
          <div key={group.name} className="filters__subgroup">
            <div className="filters__subgroup-title">
              {group.name} <span>{group.total}</span>
            </div>
            {group.items.map((subject) => (
              <label key={subject.slug} className="filters__check" htmlFor={`subj-${subject.slug}`}>
                <input
                  id={`subj-${subject.slug}`}
                  type="checkbox"
                  checked={filters.subjects.includes(subject.title)}
                  onChange={() => toggleSubject(subject.title)}
                />
                <span className="filters__icon">{subject.icon}</span>
                {subject.title}
                <span className="filters__count">{subject.count}</span>
              </label>
            ))}
          </div>
        ))}
      </fieldset>

      <fieldset className="filters__group">
        <legend>Місто</legend>
        <select value={filters.city} onChange={(e) => onChange({ city: e.target.value })}>
          <option value="">Усі міста</option>
          {reference.regions.map((region) => (
            <optgroup key={region.name} label={region.name}>
              {region.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Формат занять</legend>
        {FORMATS.map((f) => (
          <label key={f.value} className="filters__radio">
            <input
              type="radio"
              name="format"
              value={f.value}
              checked={filters.format === f.value}
              onChange={() => onChange({ format: f.value })}
            />
            {f.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="filters__group">
        <legend>Ціна за годину: до {formatPrice(filters.maxPrice)}</legend>
        <input
          type="range"
          min={reference.price.min}
          max={reference.price.max}
          step={reference.price.step}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
        />
      </fieldset>

      <label className="filters__check filters__verified">
        <input
          type="checkbox"
          checked={filters.verifiedOnly}
          onChange={(e) => onChange({ verifiedOnly: e.target.checked })}
        />
        Лише з перевіреними документами
      </label>
    </aside>
  );
}
