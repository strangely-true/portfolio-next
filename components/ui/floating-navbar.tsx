"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth animation
        }}
        className={cn(
          "flex max-w-full fixed top-0 inset-x-0 mx-auto z-[5000] px-8 py-6 items-center justify-between",
          "bg-gradient-to-b from-black to-transparent",
          className
        )}
            >
        <Link href="/" className="text-2xl text-white hover:cinematic-gradient transition-opacity">
         Sabittwa.
        </Link>
        
        <div className="flex items-center space-x-8">
          {navItems.map((navItem: { name: string; link: string; icon?: JSX.Element }, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className="group relative overflow-hidden"
            >
              <motion.div
                className="text-white group-hover:cinematic-gradient transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ 
                  delay: idx * 0.1,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <span className="block text-sm uppercase tracking-wider">
                  {navItem.name}
                </span>
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 h-px w-full opacity-0 transform translate-y-1"
                initial={false}
                whileHover={{
                  opacity: 1,
                  translateY: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
              >
                <div className="h-full w-full cinematic-gradient" />
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

