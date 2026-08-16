"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import type { Language } from "@/lib/i18n";
import styles from "./Navigation.module.css";

type NavigationProps = {
  language: Language;
  labels: readonly string[];
  onLanguageChange: (language: Language) => void;
  homeAria: string;
  navigationAria: string;
  languageAria: string;
  openNavigation: string;
  closeNavigation: string;
};

export function Navigation({ language, labels, onLanguageChange, homeAria, navigationAria, languageAria, openNavigation, closeNavigation }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#inicio" onClick={close} aria-label={homeAria}>JA<span>.</span></a>
      <button className={styles.menuButton} onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? closeNavigation : openNavigation}>
        <Icon name={open ? "close" : "menu"} />
      </button>
      <nav id="main-navigation" className={`${styles.navigation} ${open ? styles.open : ""}`} aria-label={navigationAria}>
        {labels.map((label, index) => <a key={label} href={["#inicio", "#experiencia", "#projetos", "#competencias"][index]} onClick={close}>{label}</a>)}
        <div className={styles.languageSwitch} aria-label={languageAria}>
          <button className={language === "en" ? styles.activeLanguage : ""} onClick={() => onLanguageChange("en")} aria-pressed={language === "en"}>EN</button>
          <span>/</span>
          <button className={language === "pt-BR" ? styles.activeLanguage : ""} onClick={() => onLanguageChange("pt-BR")} aria-pressed={language === "pt-BR"}>PT</button>
        </div>
      </nav>
    </header>
  );
}
