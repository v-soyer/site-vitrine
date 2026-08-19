import Image from "next/image";
import HeroEcosystem from "./HeroEcosystem";
import ProjectsCarousel from "./ProjectsCarousel";
import TestimonialsMarquee from "./TestimonialsMarquee";
import ContactSwitcher from "./ContactSwitcher";

const offers = [
  {
    number: "01",
    title: "Renforcer un projet",
    text: "Votre projet est en train de grandir. Je rejoins vos équipes et apporte mon expertise pour le faire évoluer.",
    tags: ["Renfort technique"],
  },
  {
    number: "02",
    title: "Créer un nouveau produit",
    text: "Vous avez des idées et souhaitez quelqu’un pour les réaliser. Je pose les bases de votre solution et la développe avec vous.",
    tags: ["Lancement", "Architecture"],
  },
  {
    number: "03",
    title: "Transformer l’existant",
    text: "Votre projet a besoin de faire peau neuve. J’analyse l’existant et vous propose une vision plus moderne, sans régressions ni dette technique.",
    tags: ["Évolution", "Non-régression"],
  },
  {
    number: "04",
    title: "Installer un cadre",
    text: "Je structure les pratiques, accompagne les équipes et installe des repères techniques durables.",
    tags: ["Accompagnement", "Bonnes pratiques"],
  },
];

const metrics = [
  { value: "8+", label: "années d’expérience" },
  { value: "25+", label: "projets livrés" },
  { value: "10+", label: "collaborateurs encadrés" },
  { value: "350+", label: "étudiants accompagnés" },
];

const capabilities = [
  "Python",
  "Node.js",
  "NestJS",
  "TypeScript",
  "SQL & NoSQL",
  "Docker",
  "Neo4j",
  "Linux",
  "Microservices",
  "Shell / PowerShell",
  "Back-end",
  "Applications bureautiques",
  "Git",
  "AI-Driven Development",
  "Compound Engineering",
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 15.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.5 8.3H3.2V19h3.3V8.3ZM4.85 3A1.93 1.93 0 1 0 4.9 6.86 1.93 1.93 0 0 0 4.85 3ZM19 12.86c0-3.22-1.72-4.72-4.02-4.72a3.47 3.47 0 0 0-3.16 1.74V8.3H8.5V19h3.32v-5.3c0-1.4.27-2.76 2.01-2.76 1.72 0 1.74 1.6 1.74 2.85V19H19v-6.14Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Retour en haut">
          VS<span>.</span>
        </a>
        <nav aria-label="Navigation principale">
          <a href="#services">Prestations</a>
          <a href="#realisations">Réalisations</a>
          <a href="#avis">Avis</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="cv-download" href="/Valentin-Soyer-CV.pdf" download="Valentin-Soyer-CV.pdf">
            <span className="cv-download-label">Téléchargez mon C.V.</span>
            <DownloadIcon />
          </a>
          <a className="header-cta" href="#contact">
            Parlons de votre projet <ArrowIcon />
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> Senior Software Engineer · Freelance</div>
          <h1>Vous souhaitez lancer ou perfectionner un <em>projet&nbsp;?</em></h1>
          <p className="hero-intro">
            Je prends <em>votre</em> sujet en main et le mène jusqu’en production.
          </p>
          <aside className="hero-status" aria-label="Disponibilité et localisation">
            <div className="availability"><span /> Disponible pour de nouvelles missions</div>
            <div className="location">
              <span className="location-pin" aria-hidden="true" />
              <p>Toulouse <strong>ou Full remote</strong></p>
            </div>
          </aside>

          <a className="linkedin-pill" href="https://www.linkedin.com/in/valentin-soyer/" target="_blank" rel="noreferrer">
            <span className="linkedin-pill-icon"><LinkedInIcon /></span>
            LinkedIn
            <ArrowIcon />
          </a>
        </div>

        <div className="hero-visual">
          <HeroEcosystem />
        </div>

      </section>

      <section className="section services" id="services">
        <div className="services-content">
          <div className="section-heading section-heading-simple">
            <div className="section-title">
              <h2>Mes <span className="title-accent">prestations</span></h2>
            </div>
          </div>

          <div className="offer-list">
            {offers.map((offer) => (
              <article className="offer" key={offer.number}>
                <span className="offer-number">{offer.number}</span>
                <div className="offer-main">
                  <h3>{offer.title}</h3>
                  <p>{offer.text}</p>
                </div>
                <div className="tags">
                  {offer.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>

          <div className="service-proof" aria-label="Chiffres clés">
            <div className="metrics">
              {metrics.map((metric) => (
                <div className="metric" key={metric.value}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section work" id="realisations">
        <div className="work-heading">
          <h2>Mes <span className="title-accent">réalisations</span></h2>
        </div>

        <ProjectsCarousel />

        <div className="stack-block">
          <p>Technologies &amp; environnements</p>
          <div className="stack-list">
            {capabilities.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="testimonials" id="avis">
        <div className="trust-band">
          <div className="trust-heading">
            <h2>Ils m’ont fait <span className="title-accent">confiance</span></h2>
          </div>
          <div className="company-wordmarks" aria-label="Entreprises avec lesquelles j’ai travaillé">
            <a className="company-wordmark company-umlaut" href="https://www.umlaut.com/" target="_blank" rel="noreferrer" aria-label="umlaut"><span className="company-logo-plate"><Image src="/company-logos/umlaut.svg" alt="" width={170} height={150} unoptimized /></span></a>
            <a className="company-wordmark company-berger" href="https://www.berger-levrault.com/" target="_blank" rel="noreferrer" aria-label="Berger-Levrault"><span className="company-logo-plate"><Image src="/company-logos/berger-levrault.png" alt="" width={1341} height={451} unoptimized /></span></a>
            <a className="company-wordmark company-airbus" href="https://www.airbus.com/en/products-services/defence" target="_blank" rel="noreferrer" aria-label="Airbus Defence and Space"><span className="company-logo-plate"><Image src="/company-logos/airbus.svg" alt="" width={399} height={74} unoptimized /><small>Defence and Space</small></span></a>
            <a className="company-wordmark company-lehibou" href="https://www.lehibou.com/" target="_blank" rel="noreferrer" aria-label="LeHibou"><span className="company-logo-plate"><Image src="/company-logos/lehibou-dark.png" alt="" width={4507} height={1596} unoptimized /></span></a>
            <a className="company-wordmark company-alteia" href="https://alteia.com/" target="_blank" rel="noreferrer" aria-label="Alteia"><span className="company-logo-plate"><Image src="/company-logos/alteia.svg" alt="" width={200} height={60} unoptimized /></span></a>
          </div>
        </div>

        <div className="reviews-band">
          <p className="reviews-label">Témoignages</p>
          <TestimonialsMarquee />
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orbit" aria-hidden="true" />
        <p className="kicker kicker-light">Vous avez un projet ?</p>
        <h2>Un problème concret ?<br /><em>Parlons solution.</em></h2>
        <ContactSwitcher />
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-identity">
            <a className="brand brand-footer" href="#top">VS<span>.</span></a>
            <p>Valentin Soyer<br /><span>Senior Software Engineer · Freelance</span><small>© {new Date().getFullYear()} · Tous droits réservés.</small></p>
          </div>

          <div className="footer-column">
            <p className="footer-label">Coordonnées</p>
            <a href="mailto:valentin.soyer.pro@gmail.com">valentin.soyer.pro@gmail.com</a>
            <a href="tel:+33612506118">06 12 50 61 18</a>
            <span>Toulouse · Full remote</span>
          </div>

          <div className="footer-column">
            <p className="footer-label">Retrouvez-moi</p>
            <a href="https://www.linkedin.com/in/valentin-soyer/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="/Valentin-Soyer-CV.pdf" download="Valentin-Soyer-CV.pdf">Télécharger mon C.V.</a>
          </div>

          <div className="footer-column footer-legal">
            <p className="footer-label">Informations légales</p>
            <details className="legal-details" id="cgv">
              <summary>CGV</summary>
              <div className="legal-content">
                <p><strong>Conditions générales de vente</strong></p>
                <p>Les conditions applicables à chaque prestation sont précisées dans le devis ou le contrat de mission correspondant. Pour en obtenir un exemplaire, contactez-moi directement.</p>
              </div>
            </details>
            <details className="legal-details" id="mentions-legales">
              <summary>Mentions légales</summary>
              <div className="legal-content">
                <p><strong>Éditeur du site</strong><br />Valentin Soyer, Senior Software Engineer freelance.</p>
                <p><strong>Contact</strong><br /><a href="mailto:valentin.soyer.pro@gmail.com">valentin.soyer.pro@gmail.com</a> · <a href="tel:+33612506118">06 12 50 61 18</a></p>
                <p>L’ensemble des contenus de ce site est protégé. Toute reproduction sans autorisation préalable est interdite.</p>
              </div>
            </details>
          </div>
        </div>
      </footer>
    </main>
  );
}
