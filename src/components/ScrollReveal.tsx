"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrollReveal.module.css";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Native replacement for ScrollReveal: no extra dependency, but still respects
 * reduced-motion preferences and reveals each block only once.
 */
export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = element.current;
    if (!target) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return <div ref={element} className={`${styles.reveal} ${visible ? styles.visible : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
