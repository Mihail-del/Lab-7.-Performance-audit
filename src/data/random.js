export function createRandom(seed) {
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    int(min, max) {
      return min + Math.floor(next() * (max - min + 1));
    },
    pick(list) {
      return list[Math.floor(next() * list.length)];
    },
    sample(list, count) {
      const copy = list.slice();
      const result = [];
      while (result.length < count && copy.length) {
        result.push(copy.splice(Math.floor(next() * copy.length), 1)[0]);
      }
      return result;
    },
    chance(p) {
      return next() < p;
    },
  };
}
