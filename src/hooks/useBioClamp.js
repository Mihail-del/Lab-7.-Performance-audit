import { useLayoutEffect } from 'react';

function isInViewport(rect) {
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export function useBioClamp(containerRef, deps) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    let frame = 0;
    const bios = [...container.querySelectorAll('.tutor-card__bio')];

    const update = () => {
      // Спочатку читаємо розміри, потім змінюємо класи всіх видимих описів.
      const visible = bios.filter((bio) => isInViewport(bio.getBoundingClientRect()));
      visible.forEach((bio) => bio.classList.remove('is-clamped'));
      const fullHeights = visible.map((bio) => bio.offsetHeight);
      visible.forEach((bio) => bio.classList.add('is-clamped'));
      const clampedHeights = visible.map((bio) => bio.offsetHeight);
      visible.forEach((bio, i) => {
        bio.closest('.tutor-card').classList.toggle('has-more', fullHeights[i] > clampedHeights[i] + 1);
      });
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, deps);
}
