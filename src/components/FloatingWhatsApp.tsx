import { Icon } from "@/components/Icon";
import styles from "./FloatingWhatsApp.module.css";

export function FloatingWhatsApp({ href, ariaLabel, label }: { href: string; ariaLabel: string; label: string }) {
  return (
    <a className={styles.button} href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel}>
      <span className={styles.pulse} aria-hidden="true" />
      <Icon name="whatsapp" size={25} />
      <span className={styles.label}>{label}</span>
    </a>
  );
}
