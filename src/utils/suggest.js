import { normalizeText } from './text';

export function editDistance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i++) matrix[i][0] = i;
  for (let j = 0; j < cols; j++) matrix[0][j] = j;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

export function suggestNames(query, list, limit = 3) {
  const needle = normalizeText(query);
  if (needle.length < 3) return [];
  const seen = new Set();
  const candidates = [];
  for (const tutor of list) {
    for (const word of [tutor.firstName, tutor.lastName, ...tutor.subjects]) {
      const normalized = normalizeText(word);
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      candidates.push({ word, distance: editDistance(needle, normalized.slice(0, needle.length + 2)) });
    }
  }
  return candidates
    .filter((c) => c.distance <= Math.max(2, Math.floor(needle.length / 3)))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map((c) => c.word);
}
