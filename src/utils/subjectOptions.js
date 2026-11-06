const SLUG_MAP = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh', з: 'z',
  и: 'y', і: 'i', ї: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
  р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'shch', ь: '', ю: 'iu', я: 'ia',
};

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[Ѐ-ӿ]/g, (ch) => SLUG_MAP[ch] ?? '')
    .replace(/\(([^)]*)\)/g, '-$1')
    .replace(/(?:[^a-z0-9]+|^-+|-+$)/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function buildSubjectOptions(subjects, counts = {}) {
  return subjects
    .map((subject) => ({ ...subject, slug: slugify(subject.title) }))
    .map((subject) => ({ ...subject, count: counts[subject.title] || 0 }))
    .filter((subject) => subject.title.trim().length > 0)
    .sort((a, b) => Number(b.popular) - Number(a.popular) || a.title.localeCompare(b.title, 'uk'))
    .reduce((groups, subject) => {
      const group = groups.find((g) => g.name === subject.group);
      if (group) group.items.push(subject);
      else groups.push({ name: subject.group, items: [subject] });
      return groups;
    }, [])
    .map((group) => ({ ...group, total: group.items.reduce((sum, s) => sum + s.count, 0) }));
}
