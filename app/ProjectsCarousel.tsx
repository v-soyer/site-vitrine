"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type Project = {
  title: string;
  date: string;
  description: string;
  tone: string;
  image: string;
  link?: {
    href: string;
    label: string;
  };
};

const projects: Project[] = [
  {
    title: "DEKG",
    date: "2021–2023",
    description: "Le Decentralized Enterprise Knowledge Graph (DEKG) utilise Neo4j et des microservices pour rassembler les données cloisonnées d’une entreprise, stockées dans diverses sources, au sein d’un graphe unique facilitant leur exploration et leur interrogation.",
    tone: "dekg",
    image: "/project-icons/dekg.png",
    link: {
      href: "https://hal.science/hal-03304542v1/file/Designing_BusinessView_Vide.pdf",
      label: "Travaux de thèse originaux de Bastien Vidé",
    },
  },
  {
    title: "VM-OUTPUT",
    date: "2024",
    description: "VM-OUTPUT est un logiciel FinOps interne basé sur PowerShell et Python. Il inventorie les machines virtuelles présentes sur différents systèmes de stockage et en traite les coûts afin de générer un fichier détaillant l’ensemble des informations et le coût réel de chaque machine. Le script s’exécute quotidiennement pour garantir l’exactitude des données.",
    tone: "vm-output",
    image: "/project-icons/vm-output.png",
  },
  {
    title: "Plateforme interne Airbus D&S",
    date: "2024–2025",
    description: "Au sein d’Airbus Defence & Space, j’ai travaillé pendant presque deux ans sur plusieurs projets. L’objectif était d’adapter une ancienne base de code Bash pour la migrer vers Python, tout en intégrant de nouvelles fonctionnalités à la demande. Au total, 18 pipelines ETL ont été améliorés ou mis en place pour répondre à des besoins stricts dans un environnement sensible.",
    tone: "ads",
    image: "/project-icons/airbus-platform.png",
  },
  {
    title: "Aether",
    date: "2026",
    description: "Aether est une plateforme de GE Vernova dédiée au secteur de l’énergie. J’ai travaillé sur le back-end et les microservices du module de planification, dont l’objectif est de prévoir et d’ordonner les opérations d’élagage aux abords des lignes électriques.",
    tone: "aether",
    image: "/project-icons/aether.png",
    link: {
      href: "https://alteia.com/software/a-i-platform/",
      label: "Découvrir la plateforme Aether",
    },
  },
  {
    title: "LineForge",
    date: "2026",
    description: "Projet en régie pour l’entreprise Melissavoix. J’ai créé une application bureautique dotée de sa propre interface, capable de prendre en charge et de traiter des fichiers caractéristiques du monde du doublage afin de les transformer en fichiers plus facilement exploitables en interne.",
    tone: "lineforge",
    image: "/project-icons/lineforge.png",
    link: {
      href: "https://melissavoix.com/",
      label: "Découvrir Melissavoix",
    },
  },
];

function modulo(value: number, length: number) {
  return (value + length) % length;
}

function getPosition(index: number, activeIndex: number) {
  const relativeIndex = modulo(index - activeIndex, projects.length);
  if (relativeIndex === 0) return "is-active";
  if (relativeIndex === 1) return "is-next";
  if (relativeIndex === projects.length - 1) return "is-previous";
  return "is-hidden";
}

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  const move = (direction: number) => {
    setActiveIndex((current) => modulo(current + direction, projects.length));
  };

  return (
    <div
      className="projects-carousel"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Réalisations"
      tabIndex={0}
      onKeyDown={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        pointerStart.current = null;
        if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
    >
      <div className="project-stage" aria-live="polite">
        {projects.map((project, index) => {
          const position = getPosition(index, activeIndex);
          const isActive = position === "is-active";

          return (
            <article
              className={`project-slide project-slide-${project.tone} ${position}`}
              key={project.title}
              aria-hidden={!isActive}
              onClick={() => {
                if (position === "is-previous") move(-1);
                if (position === "is-next") move(1);
              }}
            >
              <div className={`project-visual project-visual-${project.tone}`} aria-hidden="true">
                <span className="project-visual-grid" />
                <span className="project-visual-orbit project-visual-orbit-large" />
                <span className="project-visual-orbit project-visual-orbit-small" />
                <span className="project-visual-node project-visual-node-one" />
                <span className="project-visual-node project-visual-node-two" />
                <span className="project-visual-icon project-visual-icon-image">
                  <Image src={project.image} alt="" width={512} height={512} unoptimized />
                </span>
                <span className="project-visual-code">{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="project-copy">
                <p className="project-date">{project.date}</p>
                <h3>{project.title}</h3>
                <span className="project-copy-rule" />
                <p className="project-description">{project.description}</p>
                {project.link && isActive ? (
                  <a className="project-source" href={project.link.href} target="_blank" rel="noreferrer">
                    {project.link.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <div className="project-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Voir le projet précédent">
          <FaArrowLeft />
        </button>
        <div className="project-dots" aria-label="Choisir un projet">
          {projects.map((project, index) => (
            <button
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Voir le projet ${project.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              key={project.title}
            />
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Voir le projet suivant">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
