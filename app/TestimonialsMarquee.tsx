"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "J’avais besoin depuis deux ans de développer un outil informatique très spécifique et très niche pour mon entreprise. Après m’avoir écoutée, Valentin a développé en très peu de temps une solution parfaite, efficace et très simple à prendre en main. Je suis ravie : son travail me permet aujourd’hui de valider de nouveaux projets auprès de nombreux clients. Je le recommande chaleureusement, tant pour son professionnalisme que pour ses compétences. Qualité, écoute et rendu : au top !",
    name: "Melissa Butteux",
    role: "Cheffe d’entreprise · MelissaVoix",
  },
  {
    quote:
      "J’ai travaillé avec Valentin depuis son alternance chez Epitech, puis je l’ai embauché et nous avons travaillé ensemble jusqu’en mars 2023. Il possède une expertise back-end sur des technologies liées à Python, dans des environnements MongoDB, PostgreSQL et Django. C’est une personne fiable, curieuse et qui communique bien, avec un bon esprit d’équipe. Il connaît ses capacités et ses limites, et n’hésite pas à dire non quand il le faut. Sa montée en compétences est rapide : il a déjà abordé des sujets architecturaux et travaillé sur un audit de solutions lors de sa dernière mission.",
    name: "Joan Marty",
    role: "Business Manager · umlaut",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    name: "Nom du client",
    role: "Fonction · Entreprise",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel justo et lectus efficitur tincidunt. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    name: "Nom du client",
    role: "Fonction · Entreprise",
  },
];

function TestimonialSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={`testimonial-set${duplicate ? " testimonial-set-copy" : ""}`} aria-hidden={duplicate || undefined}>
      {testimonials.map((testimonial, index) => (
        <figure className="testimonial" key={`${duplicate ? "copy" : "original"}-${index}`}>
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>{testimonial.quote}</blockquote>
          <figcaption>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function TestimonialsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let previousTime = performance.now();
    let offset = 0;
    let speed = 0.04;

    const animate = (time: number) => {
      const delta = Math.min(time - previousTime, 40);
      previousTime = time;
      const targetSpeed = pausedRef.current ? 0 : 0.04;
      const easing = 1 - Math.exp(-delta / 420);
      speed += (targetSpeed - speed) * easing;
      offset += speed * delta;

      const loopWidth = track.scrollWidth / 2;
      if (loopWidth > 0 && offset >= loopWidth) offset -= loopWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="testimonial-marquee"
      aria-label="Témoignages clients"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocusCapture={() => { pausedRef.current = true; }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) pausedRef.current = false;
      }}
    >
      <div className="testimonial-track" ref={trackRef}>
        <TestimonialSet />
        <TestimonialSet duplicate />
      </div>
    </div>
  );
}
