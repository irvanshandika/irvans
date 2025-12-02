'use client';
import React from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
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
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-background dark:from-purple-950/20 dark:via-pink-950/10 dark:to-background -z-10" />
      
      {/* Floating orbs for visual interest */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 dark:bg-pink-800/20 rounded-full blur-3xl animate-float -z-10" style={{ animationDelay: '1s' }} />

      <div className="max-w-5xl mx-auto w-full">
        <div className="space-y-12 animate-fade-in text-center">
          {/* Greeting */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-base sm:text-lg font-light tracking-wide uppercase">
              Hello, I&apos;m
            </p>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold gradient-text leading-tight">
              Irvan
            </h1>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground/80 tracking-wide">
              Full-Stack Web Developer
            </h2>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            I build robust and scalable web applications, always eager to learn and implement new
            technologies while ensuring clean, maintainable code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={() => scrollToSection('projects')}
              aria-label="Lihat hasil kerja saya"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base rounded-2xl transition-smooth hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              aria-label="Hubungi saya"
              variant="outline"
              size="lg"
              className="border-2 border-border hover:border-primary text-foreground hover:text-primary px-8 py-6 text-base rounded-2xl transition-smooth hover:scale-105"
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
              className="group p-3 rounded-full bg-secondary/50 hover:bg-primary/10 transition-smooth hover:scale-110"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-secondary/50 hover:bg-primary/10 transition-smooth hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:irvan@example.com"
              className="group p-3 rounded-full bg-secondary/50 hover:bg-primary/10 transition-smooth hover:scale-110"
              aria-label="Email Me"
            >
              <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-16 animate-bounce">
            <button
              onClick={() => scrollToSection('about')}
              className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Scroll to next section"
            >
              <span className="text-xs font-light tracking-widest uppercase">Scroll</span>
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
