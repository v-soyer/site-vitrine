"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSwitcher() {
  const [showPhone, setShowPhone] = useState(false);
  const [displayedPhone, setDisplayedPhone] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"to-phone" | "to-email" | null>(null);
  const transitionTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => {
    transitionTimers.current.forEach(clearTimeout);
  }, []);

  const switchContact = (nextShowPhone: boolean) => {
    if (isTransitioning) return;
    transitionTimers.current.forEach(clearTimeout);
    transitionTimers.current = [];
    setIsTransitioning(true);
    setContentVisible(false);
    setTransitionDirection(nextShowPhone ? "to-phone" : "to-email");
    setShowPhone(nextShowPhone);

    transitionTimers.current.push(setTimeout(() => {
      setDisplayedPhone(nextShowPhone);
    }, 205));

    transitionTimers.current.push(setTimeout(() => setContentVisible(true), 220));
    transitionTimers.current.push(setTimeout(() => {
      setTransitionDirection(null);
      setIsTransitioning(false);
    }, 620));
  };

  return (
    <div className={`contact-switcher${showPhone ? " is-phone" : " is-email"}${transitionDirection ? ` is-${transitionDirection}` : ""}`}>
      <div className="contact-choice contact-choice-phone" aria-hidden={!showPhone}>
        <h3>Échangeons</h3>
        <p className="contact-choice-copy">Vous avez un projet en tête&nbsp;? Passons un appel ensemble pour voir comment mon expertise peut être mise à votre service.</p>
        <p className="contact-choice-prompt">Vous préférez m’écrire&nbsp;?</p>
        <button type="button" onClick={() => switchContact(false)} disabled={!showPhone || isTransitioning}>
          Obtenir l’E-mail
        </button>
      </div>

      <div className="contact-choice contact-choice-email" aria-hidden={showPhone}>
        <h3>Écrivez-moi</h3>
        <p className="contact-choice-copy">Décrivez-moi votre projet ou votre besoin et je vous répondrai sous 24&nbsp;h.</p>
        <p className="contact-choice-prompt">Vous préférez un appel&nbsp;?</p>
        <button type="button" onClick={() => switchContact(true)} disabled={showPhone || isTransitioning}>
          Afficher mon Numéro
        </button>
      </div>

      <div className="contact-slider" aria-live="polite">
        <div className={`contact-slider-content${contentVisible ? "" : " is-content-hidden"}`}>
          <h3>Contact</h3>
          <p>
            {displayedPhone
              ? "Si je suis indisponible, laissez-moi un message et je vous rappellerai en moins de 24 h, ou envoyez-moi un mail."
              : "Je répondrai rapidement à votre mail ou vous rappellerai si vous m’avez laissé vos coordonnées."}
          </p>
          <span className="contact-signoff">À bientôt.</span>
          <a href={displayedPhone ? "tel:+33612506118" : "mailto:valentin.soyer.pro@gmail.com"}>
            {displayedPhone ? "06 12 50 61 18" : "valentin.soyer.pro@gmail.com"}
          </a>
        </div>
      </div>
    </div>
  );
}
