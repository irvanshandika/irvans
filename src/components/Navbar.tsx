'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { UserAuthStatus } from '@/src/components/auth/UserAuthStatus';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <h1
              className="text-2xl font-bold gradient-text cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              Irvan
            </h1>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Navigasi ke bagian ${item.label}`}
                className="px-4 py-2 text-sm font-light text-muted-foreground hover:text-primary transition-smooth rounded-lg hover:bg-secondary/50"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <UserAuthStatus />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <UserAuthStatus />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <nav className="flex flex-col space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-label={`Navigasi ke bagian ${item.label}`}
                  className="text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-smooth py-3 px-4 text-left rounded-lg"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
