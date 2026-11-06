import { createRandom } from './random';
import { SUBJECTS, CITIES } from './subjects';

const FIRST_NAMES_F = ['Олена', 'Ірина', 'Наталія', 'Оксана', 'Тетяна', 'Юлія', 'Марія', 'Анна', 'Катерина', 'Світлана', 'Дарина', 'Софія', 'Вікторія', 'Галина', 'Людмила', 'Христина'];
const FIRST_NAMES_M = ['Андрій', 'Олександр', 'Дмитро', 'Сергій', 'Михайло', 'Іван', 'Богдан', 'Тарас', 'Володимир', 'Максим', 'Юрій', 'Остап', 'Василь', 'Роман', 'Петро', 'Назар'];
const LAST_NAMES = ['Шевченко', 'Бондаренко', 'Коваленко', 'Ткаченко', 'Кравченко', 'Олійник', 'Шевчук', 'Поліщук', 'Мельник', 'Савченко', 'Руденко', 'Лисенко', 'Марченко', 'Кузьменко', 'Гончаренко', 'Мороз', 'Павленко', 'Литвиненко', 'Захарченко', 'Ковальчук', 'Петренко', 'Гаврилюк', 'Онищенко', 'Федорук'];

const BIO_OPENINGS = [
  'Викладаю понад {years} років, працюю як зі школярами, так і зі студентами.',
  'Маю педагогічну освіту та досвід роботи у ліцеї.',
  'Випускник(-ця) КНУ імені Тараса Шевченка, сертифікований викладач.',
  'Готую до НМТ, олімпіад і вступу до закордонних університетів.',
  'Працюю за авторською методикою, яку вдосконалюю {years} років.',
  'Колишній інженер, тепер повністю присвятив(-ла) себе викладанню.',
];
const BIO_MIDDLE = [
  'На першому занятті визначаємо рівень і складаємо індивідуальний план.',
  'Пояснюю складні теми простими словами та на прикладах з життя.',
  'Даю домашні завдання з перевіркою та детальним розбором помилок.',
  'Використовую інтерактивну дошку, тести та відеоматеріали.',
  'Мої учні щороку вступають на бюджет до провідних університетів.',
  'Допомагаю з контрольними, курсовими та підготовкою до сесії.',
  'Заняття проходять у дружній атмосфері, без стресу і зубріння.',
  'Можу працювати з дітьми з особливими освітніми потребами.',
  'Регулярно проходжу курси підвищення кваліфікації.',
  'Середній бал моїх учнів на НМТ — понад 180.',
];
const BIO_CLOSINGS = [
  'Пишіть — підберемо зручний час!',
  'Перше заняття-знайомство безкоштовне.',
  'Можливі заняття в парах і міні-групах.',
  'Чекаю на вас!',
  'Знижки при оплаті пакета з 8 занять.',
];
const LANGUAGES = ['українська', 'англійська', 'польська', 'німецька'];
const FORMATS = ['online', 'offline', 'both'];
const PHOTO_COUNT = 36;
const DAY = 24 * 60 * 60 * 1000;
const BASE_DATE = Date.UTC(2026, 8, 1);

function pad(n) {
  return String(n).padStart(2, '0');
}

function isoDate(ts) {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

function makeReviews(rnd, quality) {
  const count = rnd.int(10, 36);
  const reviews = [];
  for (let i = 0; i < count; i++) {
    const base = quality + (rnd.next() - 0.5) * 2.2;
    reviews.push({
      id: i + 1,
      rating: Math.max(1, Math.min(5, Math.round(base))),
      date: isoDate(BASE_DATE - rnd.int(1, 1400) * DAY),
      author: rnd.pick(FIRST_NAMES_F.concat(FIRST_NAMES_M)),
    });
  }
  return reviews;
}

function makeBio(rnd, years) {
  const parts = [rnd.pick(BIO_OPENINGS).replace('{years}', years)];
  const middleCount = rnd.int(1, 5);
  parts.push(...rnd.sample(BIO_MIDDLE, middleCount));
  parts.push(rnd.pick(BIO_CLOSINGS));
  return parts.join(' ');
}

export function generateTutors(count = 2000, seed = 20251) {
  const rnd = createRandom(seed);
  const tutors = [];
  for (let i = 0; i < count; i++) {
    const female = rnd.chance(0.6);
    const firstName = rnd.pick(female ? FIRST_NAMES_F : FIRST_NAMES_M);
    const lastName = rnd.pick(LAST_NAMES);
    const years = rnd.int(1, 30);
    const subjects = rnd.sample(SUBJECTS, rnd.int(1, 3)).map((s) => s.title);
    const quality = 3 + rnd.next() * 2;
    tutors.push({
      id: i + 1,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      city: rnd.pick(CITIES),
      subjects,
      languages: ['українська', ...rnd.sample(LANGUAGES.slice(1), rnd.int(0, 2))],
      format: rnd.pick(FORMATS),
      pricePerHour: rnd.int(25, 120) * 10,
      experienceYears: years,
      verified: rnd.chance(0.35),
      bio: makeBio(rnd, years),
      photo: `/photos/tutor-${pad(rnd.int(1, PHOTO_COUNT))}.png`,
      reviews: makeReviews(rnd, quality),
      joined: isoDate(BASE_DATE - rnd.int(30, 3000) * DAY),
    });
  }
  return tutors;
}

export const tutors = generateTutors();
