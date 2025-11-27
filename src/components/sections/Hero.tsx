'use client';
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/button';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto w-full text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Greeting */}
          <div className="space-y-4">
            <p className="text-blue-600 dark:text-blue-400 text-xl sm:text-2xl font-medium">
              Hello, I&apos;m
            </p>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 dark:text-white drop-shadow-2xl">
              Irvan
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-blue-600 dark:text-cyan-400 drop-shadow-lg">
              Full-Stack Web Developer
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            I build robust and scalable web applications, always eager to learn and implement new
            technologies while ensuring clean, maintainable code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection('projects')}
              aria-label="Lihat hasil kerja saya"
              className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/50 dark:shadow-blue-500/50"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              aria-label="Hubungi saya"
              variant="outline"
              className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center items-center pt-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:irvan@example.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
              aria-label="Email Me"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
