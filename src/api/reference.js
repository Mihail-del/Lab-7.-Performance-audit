import { CITIES } from '../data/subjects';

const cache = new Map();

function cached(key, loader) {
  if (!cache.has(key)) {
    cache.set(key, Promise.resolve().then(loader));
  }
  return cache.get(key);
}

const REGIONS = {
  Київ: 'Центр', Вінниця: 'Центр', Житомир: 'Центр', Полтава: 'Центр',
  Львів: 'Захід', 'Івано-Франківськ': 'Захід', Чернівці: 'Захід', Ужгород: 'Захід',
  Тернопіль: 'Захід', Рівне: 'Захід',
  Харків: 'Схід', Дніпро: 'Схід', Запоріжжя: 'Схід',
  Одеса: 'Південь',
};

export function fetchCities() {
  return cached('cities', () =>
    CITIES.map((name) => ({ name, region: REGIONS[name] || 'Інше' }))
  );
}

export function fetchRegions(cities) {
  return cached('regions', () =>
    [...new Set(cities.map((c) => c.region))].map((name) => ({
      name,
      cities: cities.filter((c) => c.region === name).map((c) => c.name),
    }))
  );
}

export function fetchPriceBounds() {
  return cached('price', () => ({ min: 250, max: 1200, step: 50 }));
}
