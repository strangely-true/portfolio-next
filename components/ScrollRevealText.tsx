"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  { text: "I'm a " },
  { text: "computer science student", highlight: true },
  { text: " and " },
  { text: "web developer", highlight: true },
  { text: " with a strong foundation in " },
  { text: "programming, design, and databases", highlight: true },
  { text: ". My skill set spans " },
  { text: "front-end and back-end development", highlight: true },
  { text: ", and I enjoy building " },
  { text: "dynamic and user-friendly applications", highlight: true },
  { text: ". With experience in tools like " },
  { text: "React.js, Next.js, Node.js, and PostgreSQL", highlight: true },
  { text: ", I thrive at the intersection of " },
  { text: "technology and creativity", highlight: true },
  { text: ". I'm looking forward to contributing to " },
  { text: "innovative projects", highlight: true },
  { text: " and honing my expertise further." },
];

export function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.5", "end 0.8"], // Adjusted offset for shorter scroll length
  });

  // Precompute styles for each word
  const wordStyles = words.map((_, i) => {
    const start = i / (words.length * 1.5); // Adjusted to make the effect end sooner
    const opacity = useTransform(
      scrollYProgress,
      [start, Math.min(start + 0.1, 1)],
      [0.2, 1]
    );
    const color = useTransform(
      scrollYProgress,
      [start, Math.min(start + 0.1, 1)],
      ["#333", words[i].highlight ? "#fff" : "#ccc"]
    );
    return { opacity, color };
  });

  return (
    <motion.div
      ref={containerRef}
      className="py-32 px-4 max-w-5xl mx-auto text-center"
    >
      <motion.p className="text-[clamp(1.5rem,5vw,2.5rem)] leading-relaxed font-light">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="font-object-sans"
            style={wordStyles[i]} // Apply precomputed styles here
          >
            {word.text}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}
