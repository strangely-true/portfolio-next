import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {Reveal} from '@/components/ui/reveal';
import {MultiLanguageGreeting} from '@/components/ui/multi-language-greeting';

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
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-black rounded-full font-medium"
                                >
                                    View Projects
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
                                >
                                    Contact Me
                                </motion.button>
                            </div>
                        </Reveal>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative w-[400px] h-[500px] mx-auto">
                            <Image
                                src="/DSC09490.jpg"
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