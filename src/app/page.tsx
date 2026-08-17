"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Icon } from "@/components/Icon";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { copy, type Language } from "@/lib/i18n";
import { portfolio } from "@/lib/portfolio";
import styles from "./page.module.css";

const AssemblyExperience = dynamic(() => import("@/components/AssemblyExperience").then((module) => module.AssemblyExperience), { ssr: false });

function Eyebrow({ children }: { children: ReactNode }) { return <p className={styles.eyebrow}>{children}</p>; }

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const text = copy[language];
  const professionalLinks = [
    { href: portfolio.links.website, label: text.resourceLinks.website },
    { href: portfolio.links.github, label: text.resourceLinks.github },
    { href: portfolio.links.linkedin, label: text.resourceLinks.linkedin },
    { href: portfolio.links.lattes, label: text.resourceLinks.lattes },
    { href: portfolio.links.books, label: text.resourceLinks.books },
    { href: portfolio.links.geogebra, label: text.resourceLinks.geogebra },
    { href: portfolio.links.instagram, label: text.resourceLinks.instagram },
    { href: portfolio.links.youtube, label: text.resourceLinks.youtube },
  ];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language") as Language | null;
    if (savedLanguage !== "en" && savedLanguage !== "pt-BR") return;

    const frame = window.requestAnimationFrame(() => setLanguage(savedLanguage));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("portfolio-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  return (
    <main id="inicio">
      <ScrollProgress />
      <Navigation language={language} labels={text.nav} onLanguageChange={selectLanguage} homeAria={text.homeAria} navigationAria={text.navigationAria} languageAria={text.language} openNavigation={text.openNavigation} closeNavigation={text.closeNavigation} />
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.videoLayer} aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src={`${assetBasePath}/media/python-coding-pexels-5473798-optimized.mp4`} type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <div className={styles.orbit} aria-hidden="true"><span /><span /><span /></div>
          <Eyebrow>{text.availability}</Eyebrow>
          <h1 id="hero-title">{text.heroTitle.lead}<br /><em>{text.heroTitle.emphasis}</em></h1>
          <p className={styles.lead}>{text.summary}</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href={`mailto:${portfolio.email}`}><Icon name="mail" size={18} /> {text.email}</a>
            <a className={styles.secondaryAction} href={portfolio.links.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={18} /> LinkedIn</a>
            <a className={styles.secondaryAction} href={portfolio.links.resumeEnglish} target="_blank" rel="noreferrer"><Icon name="external" size={18} /> {text.resumeEnglish}</a>
            <a className={styles.secondaryAction} href={portfolio.links.resumePortuguese} target="_blank" rel="noreferrer"><Icon name="external" size={18} /> {text.resumePortuguese}</a>
          </div>
        </div>
        <aside className={`${styles.heroNote} ${styles.heroNoteEnter}`} aria-label="Professional summary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.portrait} src={`${assetBasePath}/images/josue-amaral-professional-portrait-2025.jpg`} alt={text.portraitAlt} width={382} height={379} />
          <span className={styles.noteNumber}>01</span>
          <p>{text.heroNote}</p>
          <div><span>{text.locationLabel}</span><strong>{portfolio.location}</strong></div>
        </aside>
        <span className={styles.videoLabel}>{text.videoLabel}</span>
      </section>

      <section className={`${styles.section} ${styles.capabilitySection}`} id="competencias" aria-labelledby="capabilities-title">
        <ScrollReveal className={styles.sectionIntro}><Eyebrow>01 / {text.value}</Eyebrow><h2 id="capabilities-title">{text.valueTitle}</h2></ScrollReveal>
        <div className={styles.capabilities}>{text.capabilities.map((capability, index) => <ScrollReveal key={capability.title} delay={index * 110}><article className={styles.capability}><span>0{index + 1}</span><h3>{capability.title}</h3><p>{capability.detail}</p></article></ScrollReveal>)}</div>
      </section>

      <AssemblyExperience copy={text.assembly} modelUrl={`${assetBasePath}/models/axis-q6010-e-surveillance-camera.glb`} />

      <section className={`${styles.section} ${styles.darkSection}`} id="experiencia" aria-labelledby="experience-title">
        <div className={styles.lightTrail} aria-hidden="true" />
        <ScrollReveal className={styles.sectionIntro}><Eyebrow>03 / {text.experience}</Eyebrow><h2 id="experience-title">{text.experienceTitle}</h2></ScrollReveal>
        <div className={styles.experiences}>{text.experiences.map((experience, index) => <ScrollReveal key={`${experience.company}-${experience.period}`} delay={index * 110}><article className={styles.experience}><div><span>{experience.period}</span><h3>{experience.title}</h3><p>{experience.company}</p></div><ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article></ScrollReveal>)}</div>
      </section>

      <section className={`${styles.section} ${styles.resourcesSection}`} aria-labelledby="resources-title">
        <ScrollReveal className={styles.sectionIntro}><Eyebrow>04 / {text.resources}</Eyebrow><h2 id="resources-title">{text.resourcesTitle}</h2></ScrollReveal>
        <div className={styles.resumeLinks}>
          <a className={styles.resumeLink} href={portfolio.links.resumeEnglish} target="_blank" rel="noreferrer"><span>{text.resumeEnglish}</span><Icon name="external" /></a>
          <a className={styles.resumeLink} href={portfolio.links.resumePortuguese} target="_blank" rel="noreferrer"><span>{text.resumePortuguese}</span><Icon name="external" /></a>
        </div>
        <div className={styles.resourceLinks}>
          {professionalLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer"><span>{link.label}</span><Icon name="external" size={17} /></a>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.projectsSection}`} id="projetos" aria-labelledby="projects-title">
        <ScrollReveal className={styles.sectionIntro}><Eyebrow>05 / {text.projects}</Eyebrow><h2 id="projects-title">{text.projectsTitle}</h2></ScrollReveal>
        <div className={styles.projects}>{text.projectItems.map((project, index) => {
          const content = <><span>{text.projectPrefix} / 0{index + 1}</span><div><h3>{project.name}</h3><p>{project.label}</p></div><p>{project.description}</p>{project.href ? <Icon name="external" /> : <span className={styles.privateMark}>Private</span>}</>;
          return <ScrollReveal key={project.name} delay={index * 110}>{project.href ? <a className={styles.project} href={project.href} target="_blank" rel="noreferrer">{content}</a> : <article className={`${styles.project} ${styles.privateProject}`}>{content}</article>}</ScrollReveal>;
        })}</div>
      </section>

      <section className={`${styles.section} ${styles.detailsSection}`} aria-label="Education and technologies"><ScrollReveal className={styles.details}>
        <div><Eyebrow>06 / {text.education}</Eyebrow>{text.educationItems.map((item) => <p key={item}>{item}</p>)}</div>
        <div><Eyebrow>{text.stack}</Eyebrow><ul className={styles.stack}>{portfolio.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </ScrollReveal></section>

      <footer className={styles.footer}>
        <div><p className={styles.footerName}>{portfolio.name}</p><p>{text.footerRole}</p></div>
        <div className={styles.footerLinks}><a href={`mailto:${portfolio.email}`}><Icon name="mail" /> {text.emailLabel}</a><a href={portfolio.links.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> {text.linkedinLabel}</a><a href={portfolio.links.whatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> {text.whatsappLabel}</a></div>
        <p className={styles.copyright}>© {new Date().getFullYear()} · {text.footer}</p>
      </footer>
      <FloatingWhatsApp href={portfolio.links.whatsapp} ariaLabel={text.whatsappAria} label={text.whatsappCallout} />
    </main>
  );
}
