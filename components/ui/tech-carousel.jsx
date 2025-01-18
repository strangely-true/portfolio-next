"use client"

import React from 'react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

const logos = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', alt: 'C' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', alt: 'SQL' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS' },
    { src: '/flask.png', alt: 'Flask' },
    { src: '/express.png', alt: 'Express.js' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React.js' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', alt: 'Next.js' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', alt: 'SQLite' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', alt: 'VS Code' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', alt: 'Bootstrap' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind CSS' },
];

const duplicatedLogos = [...logos, ...logos];

export function TechCarousel() {
    return (
        <div className="relative w-full overflow-hidden">
            <Splide
                options={{
                    type: "loop",
                    drag: "free",
                    focus: "center",
                    perPage: 5,
                    autoWidth: true,
                    gap: '4rem',
                    arrows: false,
                    pagination: false,
                    autoScroll: {
                        pauseOnHover: false,
                        pauseOnFocus: false,
                        rewind: false,
                        speed: 1
                    },
                }}
                extensions={{ AutoScroll }}
            >
                {duplicatedLogos.map((logo, index) => (
                    <SplideSlide key={index}>
                        <div className="w-20 h-20 flex items-center justify-center">
                            <Image 
                                src={logo.src || "/placeholder.svg"} 
                                alt={logo.alt} 
                                width={80} 
                                height={80} 
                                className="object-contain"
                            />
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}

