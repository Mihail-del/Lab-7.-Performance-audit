export function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ʼ'`’]/g, '')
    .trim();
}

export function matchesQuery(tutor, query) {
  if (!query) return true;
  const haystack = normalizeText(
    [tutor.name, tutor.city, tutor.subjects.join(' '), tutor.bio].join(' ')
  );
  return normalizeText(query)
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}
