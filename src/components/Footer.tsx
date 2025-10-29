import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left: Copyright */}
          <div className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
            <p className="flex items-center justify-center md:justify-start gap-2">
              © {currentYear} Irvan. Made with
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              using React & TypeScript
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:irvan@example.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom: Quick Links */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="#home" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Projects
            </a>
            <a href="#certificates" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Certificates
            </a>
            <a href="#contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
