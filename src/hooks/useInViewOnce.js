import { useState, useEffect, useRef } from 'react';

export function useInViewOnce(options = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px 150px 0px', ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
