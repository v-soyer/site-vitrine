"use client";

import { useEffect, useRef, useState } from "react";
import {
  SiDocker,
  SiJavascript,
  SiMongodb,
  SiNeo4J,
  SiNestjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
} from "react-icons/si";
import { TbBrandPowershell } from "react-icons/tb";

type OrbitSpec = {
  name: string;
  ring: "inner" | "outer";
  duration: number;
  direction: 1 | -1;
  start: number;
  radius: number;
  compactRadius: number;
  floatX: number;
  floatY: number;
  floatPeriodX: number;
  floatPeriodY: number;
};

const ORBITS: OrbitSpec[] = [
  { name: "Python", ring: "inner", duration: 24, direction: -1, start: -.3, radius: .39, compactRadius: .37, floatX: 7, floatY: 9, floatPeriodX: 8.4, floatPeriodY: 10.2 },
  { name: "NestJS", ring: "inner", duration: 24, direction: -1, start: .55, radius: .39, compactRadius: .37, floatX: 8, floatY: 8, floatPeriodX: 10.8, floatPeriodY: 7.8 },
  { name: "JavaScript", ring: "inner", duration: 24, direction: -1, start: 2.5, radius: .39, compactRadius: .37, floatX: 7, floatY: 10, floatPeriodX: 9.3, floatPeriodY: 12.4 },
  { name: "Shell / PowerShell", ring: "inner", duration: 24, direction: -1, start: 4, radius: .39, compactRadius: .37, floatX: 8, floatY: 7, floatPeriodX: 12.8, floatPeriodY: 9.7 },
  { name: "OpenAI", ring: "outer", duration: 24, direction: 1, start: .05, radius: .53, compactRadius: .5, floatX: 10, floatY: 8, floatPeriodX: 11.6, floatPeriodY: 8.9 },
  { name: "PostgreSQL", ring: "outer", duration: 24, direction: 1, start: .7, radius: .53, compactRadius: .5, floatX: 11, floatY: 7, floatPeriodX: 9.8, floatPeriodY: 12.1 },
  { name: "MongoDB", ring: "outer", duration: 24, direction: 1, start: 1.55, radius: .53, compactRadius: .5, floatX: 9, floatY: 8, floatPeriodX: 13.2, floatPeriodY: 10.4 },
  { name: "Neo4j", ring: "outer", duration: 24, direction: 1, start: 2.7, radius: .53, compactRadius: .5, floatX: 12, floatY: 7, floatPeriodX: 12.8, floatPeriodY: 9.7 },
  { name: "Docker", ring: "outer", duration: 24, direction: 1, start: 4.15, radius: .53, compactRadius: .5, floatX: 10, floatY: 9, floatPeriodX: 10.3, floatPeriodY: 11.7 },
];

function OrbitIcon({ name }: { name: string }) {
  if (name === "Python") return <SiPython aria-hidden="true" />;
  if (name === "NestJS") return <SiNestjs aria-hidden="true" />;
  if (name === "JavaScript") return <SiJavascript aria-hidden="true" />;
  if (name === "Shell / PowerShell") return <TbBrandPowershell aria-hidden="true" />;
  if (name === "OpenAI") return <SiOpenai aria-hidden="true" />;
  if (name === "PostgreSQL") return <SiPostgresql aria-hidden="true" />;
  if (name === "MongoDB") return <SiMongodb aria-hidden="true" />;
  if (name === "Neo4j") return <SiNeo4J aria-hidden="true" />;
  return <SiDocker aria-hidden="true" />;
}

export default function HeroEcosystem() {
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const anglesRef = useRef(ORBITS.map((orbit) => orbit.start));
  const hoveredRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let width = stage.clientWidth;
    let height = stage.clientHeight;
    let frame = 0;
    let previousTime = performance.now();

    const measure = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
    };

    const positionIcons = (time: number, delta: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const compact = width < 430;
      const nodeRadius = compact ? 19 : 24;
      const horizontalOverscan = compact ? 32 : 56;
      const elapsed = time / 1000;

      const positions = ORBITS.map((orbit, index) => {
        if (hoveredRef.current !== index) {
          anglesRef.current[index] += orbit.direction * (delta / 1000) * (Math.PI * 2 / orbit.duration);
        }

        const angle = anglesRef.current[index];
        const radius = width * (compact ? orbit.compactRadius : orbit.radius);
        const floatScale = compact ? .46 : .68;
        const floatX = Math.sin(elapsed * Math.PI * 2 / orbit.floatPeriodX + orbit.start * 1.7) * orbit.floatX * floatScale;
        const floatY = Math.cos(elapsed * Math.PI * 2 / orbit.floatPeriodY + orbit.start * 1.3) * orbit.floatY * floatScale;

        return {
          x: centerX + Math.cos(angle) * radius + floatX,
          y: centerY + Math.sin(angle) * radius + floatY,
        };
      });

      const minimumDistance = compact ? 54 : 74;
      const keepInsideMotionArea = () => {
        positions.forEach((position) => {
          // The wide ellipses intentionally extend beyond the stage's layout box.
          // Reserving overscan here prevents the old hard clamp from flattening
          // the trajectory into a vertical segment at the left and right edges.
          position.x = Math.min(
            width - nodeRadius + horizontalOverscan,
            Math.max(nodeRadius - horizontalOverscan, position.x),
          );
          position.y = Math.min(height - nodeRadius, Math.max(nodeRadius, position.y));
        });
      };

      for (let pass = 0; pass < 28; pass += 1) {
        for (let first = 0; first < positions.length; first += 1) {
          for (let second = first + 1; second < positions.length; second += 1) {
            const dx = positions[second].x - positions[first].x;
            const dy = positions[second].y - positions[first].y;
            const distance = Math.max(Math.hypot(dx, dy), .001);
            if (distance < minimumDistance) {
              const midpointX = (positions[first].x + positions[second].x) / 2 - centerX;
              const midpointY = (positions[first].y + positions[second].y) / 2 - centerY;
              const midpointLength = Math.max(Math.hypot(midpointX, midpointY), 1);
              let tangentX = -midpointY / midpointLength;
              let tangentY = midpointX / midpointLength;
              if (dx * tangentX + dy * tangentY < 0) {
                tangentX *= -1;
                tangentY *= -1;
              }
              const separationX = dx / distance * .55 + tangentX * .45;
              const separationY = dy / distance * .55 + tangentY * .45;
              const separationLength = Math.max(Math.hypot(separationX, separationY), .001);
              const push = (minimumDistance - distance) / 2 + .15;
              const pushX = separationX / separationLength * push;
              const pushY = separationY / separationLength * push;
              positions[first].x -= pushX;
              positions[first].y -= pushY;
              positions[second].x += pushX;
              positions[second].y += pushY;
            }
          }
        }
        keepInsideMotionArea();
      }

      keepInsideMotionArea();

      positions.forEach((position, index) => {
        const node = nodeRefs.current[index];
        if (node) node.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      });

      stage.classList.add("is-ready");
    };

    const tick = (time: number) => {
      const delta = Math.min(time - previousTime, 48);
      previousTime = time;
      positionIcons(time, delta);
      frame = requestAnimationFrame(tick);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      previousTime = performance.now();
      positionIcons(previousTime, 0);
      frame = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      positionIcons(performance.now(), 0);
    });

    resizeObserver.observe(stage);
    measure();
    restart();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  const pauseOrbit = (index: number) => {
    hoveredRef.current = index;
    setHovered(index);
  };

  const resumeOrbit = () => {
    hoveredRef.current = null;
    setHovered(null);
  };

  return (
    <div ref={stageRef} className="ecosystem-stage" aria-label="Écosystème technologique : Python, NestJS, JavaScript, PowerShell, OpenAI, PostgreSQL, MongoDB, Neo4j et Docker">
      <div className="orbit-guide orbit-guide-outer" aria-hidden="true" />
      <div className="orbit-guide orbit-guide-inner" aria-hidden="true" />

      <figure className="ecosystem-portrait">
        {/* vinext's development runtime cannot safely hydrate next/image here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/valentin-soyer.png" alt="Valentin Soyer, Senior Software Engineer" />
      </figure>

      {ORBITS.map((orbit, index) => (
        <div
          key={orbit.name}
          ref={(element) => { nodeRefs.current[index] = element; }}
          className={`orbit-node-shell ring-${orbit.ring}${hovered === index ? " is-active" : ""}`}
          role="img"
          aria-label={orbit.name}
          tabIndex={0}
          onPointerEnter={() => pauseOrbit(index)}
          onPointerLeave={resumeOrbit}
          onFocus={() => pauseOrbit(index)}
          onBlur={resumeOrbit}
        >
          <div className="tech-orbit-node">
            <span className="orbit-icon"><OrbitIcon name={orbit.name} /></span>
            <span className="orbit-label">{orbit.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
