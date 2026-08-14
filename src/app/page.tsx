import { Icon } from "@/components/Icon";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { portfolio } from "@/lib/portfolio";
import styles from "./page.module.css";

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className={styles.eyebrow}>{children}</p>; }

export default function Home() {
  return (
    <main id="inicio">
      <ScrollProgress />
      <Navigation />
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <div className={styles.orbit} aria-hidden="true"><span /><span /><span /></div>
          <Eyebrow>Disponível para oportunidades em engenharia de software</Eyebrow>
          <h1 id="hero-title">Sistemas claros.<br /><em>Entrega confiável.</em></h1>
          <p className={styles.lead}>{portfolio.summary}</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#projetos">Ver projetos <Icon name="arrow" size={18} /></a>
            <a className={styles.secondaryAction} href={`mailto:${portfolio.email}`}><Icon name="mail" size={18} /> Entrar em contato</a>
          </div>
        </div>
        <aside className={`${styles.heroNote} ${styles.heroNoteEnter}`} aria-label="Resumo profissional">
          <span className={styles.noteNumber}>01</span>
          <p>Engenharia full-stack, automação de infraestrutura e raciocínio algorítmico para produtos que precisam funcionar no mundo real.</p>
          <div><span>Base</span><strong>{portfolio.location}</strong></div>
        </aside>
      </section>

      <section className={`${styles.section} ${styles.capabilitySection}`} id="competencias" aria-labelledby="capabilities-title">
        <ScrollReveal className={styles.sectionIntro}><Eyebrow>Onde gero valor</Eyebrow><h2 id="capabilities-title">Construo com visão de produto e disciplina de produção.</h2></ScrollReveal>
        <div className={styles.capabilities}>
          {portfolio.capabilities.map((capability, index) => <ScrollReveal key={capability.title} delay={index * 100}><article className={styles.capability}><span>0{index + 1}</span><h3>{capability.title}</h3><p>{capability.detail}</p></article></ScrollReveal>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`} id="experiencia" aria-labelledby="experience-title">
        <ScrollReveal className={styles.sectionIntro}><Eyebrow>Experiência recente</Eyebrow><h2 id="experience-title">Tecnologia aplicada a problemas concretos.</h2></ScrollReveal>
        <div className={styles.experiences}>{portfolio.experiences.map((experience, index) => <ScrollReveal key={`${experience.company}-${experience.period}`} delay={index * 100}><article className={styles.experience}><div><span>{experience.period}</span><h3>{experience.title}</h3><p>{experience.company}</p></div><ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article></ScrollReveal>)}</div>
      </section>

      <section className={styles.section} id="projetos" aria-labelledby="projects-title">
        <ScrollReveal className={styles.sectionIntro}><Eyebrow>Projetos em destaque</Eyebrow><h2 id="projects-title">Arquitetura, governança e dados que suportam a evolução do produto.</h2></ScrollReveal>
        <div className={styles.projects}>{portfolio.projects.map((project, index) => <ScrollReveal key={project.name} delay={index * 100}><a className={styles.project} href={project.href} target="_blank" rel="noreferrer"><span>Projeto / 0{index + 1}</span><div><h3>{project.name}</h3><p>{project.label}</p></div><p>{project.description}</p><Icon name="external" /></a></ScrollReveal>)}</div>
      </section>

      <section className={styles.section} aria-label="Formação e tecnologias"><ScrollReveal className={styles.details}>
        <div><Eyebrow>Formação</Eyebrow>{portfolio.education.map((item) => <p key={item}>{item}</p>)}</div>
        <div><Eyebrow>Stack</Eyebrow><ul className={styles.stack}>{portfolio.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </ScrollReveal></section>

      <footer className={styles.footer}>
        <div><p className={styles.footerName}>{portfolio.name}</p><p>{portfolio.role}</p></div>
        <div className={styles.footerLinks}><a href={portfolio.links.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a><a href={portfolio.links.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a><a href={`mailto:${portfolio.email}`}><Icon name="mail" /> E-mail</a></div>
        <p className={styles.copyright}>© {new Date().getFullYear()} · Desenvolvido com Next.js e TypeScript.</p>
      </footer>
    </main>
  );
}
