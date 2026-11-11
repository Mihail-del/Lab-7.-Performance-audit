import { describe, it, expect, vi } from 'vitest';
import { generateTutors } from '../data/tutors';
import { getVisibleTutors } from '../utils/catalog';
import { tutorScore } from '../utils/rating';

vi.mock('../utils/rating', async (importOriginal) => {
  const original = await importOriginal();
  return { ...original, tutorScore: vi.fn(original.tutorScore) };
});

describe('Сортування рекомендацій', () => {
  it('рахує оцінку кожного репетитора один раз і зберігає порядок', () => {
    const tutors = generateTutors(40);
    const filters = {
      subjects: [], city: '', format: 'all', maxPrice: 1200, verifiedOnly: false,
    };
    const expected = [...tutors].sort((a, b) => tutorScore(b) - tutorScore(a));
    tutorScore.mockClear();

    const result = getVisibleTutors(tutors, { query: '', filters, sortBy: 'recommended' });

    expect(result.map((t) => t.id)).toEqual(expected.map((t) => t.id));
    expect(tutorScore).toHaveBeenCalledTimes(tutors.length);
    expect(tutors.map((t) => t.id)).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
  });
});
