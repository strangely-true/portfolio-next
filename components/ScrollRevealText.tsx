"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  { text: "I'm " },
  { text: "a ", highlight: true },
  { text: "computer ", highlight: true },
  { text: "science ", highlight: true },
  { text: "student ", highlight: true },
  { text: "and " },
  { text: "web ", highlight: true },
  { text: "developer ", highlight: true },
  { text: "with " },
  { text: "a ", },
  { text: "strong ",  },
  { text: "foundation ",  },
  { text: "in " },
  { text: "programming, ",  },
  { text: "design, ", highlight: true },
  { text: "and ",  },
  { text: "databases. ", highlight: true },
  { text: "My " },
  { text: "skill ",  },
  { text: "set ",  },
  { text: "spans " },
  { text: "front-end ", highlight: true },
  { text: "and ", },
  { text: "back-end ", highlight: true },
  { text: "development, ",},
  { text: "and " },
  { text: "I " },
  { text: "enjoy " },
  { text: "building " },
  { text: "dynamic ",  },
  { text: "and ",  },
  { text: "user-friendly ",  },
  { text: "applications. ",  },
  { text: "With " },
  { text: "experience ",  },
  { text: "in " },
  { text: "tools ",  },
  { text: "like " },
  { text: "React.js, ", highlight: true },
  { text: "Next.js, ", highlight: true },
  { text: "Node.js, ", highlight: true },
  { text: "and ",  },
  { text: "PostgreSQL, ", highlight: true },
  { text: "I " },
  { text: "thrive " },
  { text: "at " },
  { text: "the ",  },
  { text: "intersection ", },
  { text: "of ", },
  { text: "technology ",},
  { text: "and ",  },
  { text: "creativity. ",  },
  { text: "I'm " },
  { text: "looking " },
  { text: "forward " },
  { text: "to " },
  { text: "contributing " },
  { text: "to " },
  { text: "innovative ",  },
  { text: "projects ",  },
  { text: "and " },
  { text: "honing " },
  { text: "my " },
  { text: "expertise " },
  { text: "further." },
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
            className={` ${word.highlight ? "text-rose-600 font-bold" : ""}`}
            style={wordStyles[i]} // Apply precomputed styles here
          >
            {word.text}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}
