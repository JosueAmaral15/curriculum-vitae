"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return <div className={styles.track} aria-hidden="true"><div className={styles.bar} style={{ transform: `scaleX(${progress / 100})` }} /></div>;
}
