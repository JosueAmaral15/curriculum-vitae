"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrollReveal.module.css";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Native replacement for ScrollReveal: no extra dependency, respects
 * reduced-motion preferences, and reverses the reveal when a block leaves the
 * viewport so that re-entering it plays the transition again.
 */
export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = element.current;
    if (!target) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // CSS exposes the content without transitions for reduced motion, so no
    // state update or observer is needed in that mode.
    if (reducedMotion) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return <div ref={element} className={`${styles.reveal} ${visible ? styles.visible : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
