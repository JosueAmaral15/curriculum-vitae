"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import styles from "./Navigation.module.css";

const links = [
  ["Início", "#inicio"],
  ["Experiência", "#experiencia"],
  ["Projetos", "#projetos"],
  ["Competências", "#competencias"],
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#inicio" onClick={close} aria-label="Ir para o início">JA<span>.</span></a>
      <button className={styles.menuButton} onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Fechar navegação" : "Abrir navegação"}>
        <Icon name={open ? "close" : "menu"} />
      </button>
      <nav id="main-navigation" className={`${styles.navigation} ${open ? styles.open : ""}`} aria-label="Navegação principal">
        {links.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
      </nav>
    </header>
  );
}
