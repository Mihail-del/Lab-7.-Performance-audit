import { useEffect, useState } from 'react';
import { fetchCities, fetchRegions, fetchPriceBounds } from '../api/reference';

const EMPTY = { cities: [], regions: [], price: { min: 250, max: 1200, step: 50 }, ready: false };

export function useReferenceData() {
  const [data, setData] = useState(EMPTY);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cities = await fetchCities();
      const regions = await fetchRegions(cities);
      const price = await fetchPriceBounds();
      if (!cancelled) {
        setData({ cities, regions, price, ready: true });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
