import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Reveal } from '@/components/ui/reveal';
import { MultiLanguageGreeting } from '@/components/ui/multi-language-greeting';
import Link from 'next/link';

const HeroSection: React.FC = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gradient-to-b" />
            
            <div className="container mx-auto px-8 z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <Reveal>
                            <motion.p 
                                className="text-sm tracking-wider text-neutral-400"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Based in Kolkata, India
                            </motion.p>
                        </Reveal>

                        <Reveal>
                            <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                <span className="text-rose-600">
                                    <MultiLanguageGreeting />
                                    I&apos;m Sabittwa
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal>
                            <p className="text-lg text-neutral-300 max-w-md leading-relaxed">
                                Undergrad Student &amp; Full Stack Developer
                            </p>
                        </Reveal>

                        <Reveal>
                            <div className="flex items-center gap-6">
                             
                                <a href="/resume.pdf" className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-rose-600 rounded-xl group">
                                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-rose-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-rose-700 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Resume</span>
                                </a>
                                <Link href="/blog" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-rose-600 transition duration-300 ease-out border-2 border-rose-500 rounded-full shadow-md group">
                                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-rose-500 group-hover:translate-x-0 ease">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                    <span className="absolute flex items-center justify-center w-full h-full text-rose-500 transition-all duration-300 transform group-hover:translate-x-full ease">Blog</span>
                                    <span className="relative invisible">aaaaaaaa</span>
                                </Link>
                            </div>
                        </Reveal>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative w-[400px] h-[500px] mx-auto">
                            <Image
                                src="/SabittwaGhibli.png"
                                alt="Sabittwa Banerjee"
                                fill
                                className="object-cover rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

