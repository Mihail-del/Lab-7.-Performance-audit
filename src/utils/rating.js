const DAY = 24 * 60 * 60 * 1000;
const HALF_LIFE_DAYS = 365;
export const RATING_REFERENCE_DATE = Date.UTC(2026, 8, 1);

export function averageRating(reviews) {
  if (!reviews.length) return 0;
  let sum = 0;
  for (const review of reviews) sum += review.rating;
  return sum / reviews.length;
}

export function weightedRating(reviews, now = RATING_REFERENCE_DATE) {
  let weighted = 0;
  let weights = 0;
  for (const review of reviews) {
    const ageDays = (now - new Date(review.date).getTime()) / DAY;
    const weight = Math.pow(0.5, ageDays / HALF_LIFE_DAYS);
    weighted += review.rating * weight;
    weights += weight;
  }
  return weights ? weighted / weights : 0;
}

export function tutorScore(tutor) {
  const rating = weightedRating(tutor.reviews);
  const confidence = Math.log10(tutor.reviews.length + 1);
  const bonus = (tutor.verified ? 0.25 : 0) + Math.min(tutor.experienceYears, 20) / 100;
  return rating * confidence + bonus;
}
