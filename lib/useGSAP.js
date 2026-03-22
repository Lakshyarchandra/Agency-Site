// lib/useGSAP.js — Reusable GSAP animation hooks
import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook to animate elements on scroll using GSAP ScrollTrigger.
 * Uses progressive enhancement: elements are fully visible by default,
 * and only get animations if GSAP loads successfully.
 */
export function useScrollReveal(options = {}) {
  const elementsRef = useRef([]);
  const gsapReady = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let gsap, ScrollTrigger, ctx;
    const init = async () => {
      try {
        const gsapModule = await import('gsap');
        const stModule = await import('gsap/dist/ScrollTrigger');
        gsap = gsapModule.default || gsapModule.gsap;
        ScrollTrigger = stModule.default || stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        gsapReady.current = true;

        ctx = gsap.context(() => {
          elementsRef.current.forEach((el) => {
            if (!el) return;
            const stagger = el.dataset.stagger || 0;
            const delay = parseFloat(el.dataset.delay || 0);
            const direction = el.dataset.direction || 'up';
            const children = el.dataset.staggerChildren
              ? el.querySelectorAll(el.dataset.staggerChildren)
              : null;

            const fromVars = {
              opacity: 0,
              y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
              x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            };

            const toVars = {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.7,
              delay,
              ease: 'power2.out',
              ...options,
            };

            if (children && children.length > 0) {
              gsap.fromTo(children, fromVars, {
                ...toVars,
                stagger: parseFloat(stagger) || 0.1,
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                },
              });
            } else {
              gsap.fromTo(el, fromVars, {
                ...toVars,
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                },
              });
            }
          });
        });
      } catch (err) {
        // If GSAP fails to load, ensure elements remain visible
        console.warn('GSAP failed to load, skipping animations:', err);
        elementsRef.current.forEach(el => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
      }
    };

    // Small delay to ensure refs are populated after render
    const timer = setTimeout(init, 50);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  const addRef = useCallback((el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  }, []);

  return addRef;
}

/**
 * Hook for hero text stagger animation on mount.
 */
export function useHeroAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    let ctx;
    const init = async () => {
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap;

        const children = containerRef.current.querySelectorAll('[data-hero-animate]');
        if (!children.length) return;

        ctx = gsap.context(() => {
          gsap.fromTo(children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              delay: 0.15,
            }
          );
        });
      } catch {
        // Fallback: ensure hero content is visible
        const children = containerRef.current?.querySelectorAll('[data-hero-animate]');
        children?.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
      }
    };

    init();

    return () => { if (ctx) ctx.revert(); };
  }, []);

  return containerRef;
}

/**
 * Hook for counter animation (stats).
 */
export function useCounterAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    let ctx;
    const init = async () => {
      try {
        const gsapModule = await import('gsap');
        const stModule = await import('gsap/dist/ScrollTrigger');
        const gsap = gsapModule.default || gsapModule.gsap;
        const ScrollTrigger = stModule.default || stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const counters = containerRef.current.querySelectorAll('[data-count-to]');
          counters.forEach((el) => {
            const target = el.dataset.countTo;
            const numericMatch = target.match(/[\d.]+/);
            if (!numericMatch) return;

            const end = parseFloat(numericMatch[0]);
            const prefix = target.slice(0, target.indexOf(numericMatch[0]));
            const suffix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);
            const obj = { val: 0 };

            gsap.to(obj, {
              val: end,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              onUpdate: () => {
                const display = end % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1);
                el.textContent = prefix + display + suffix;
              },
            });
          });
        });
      } catch {
        // Counters show their final values by default, no fallback needed
      }
    };

    init();

    return () => { if (ctx) ctx.revert(); };
  }, []);

  return containerRef;
}
