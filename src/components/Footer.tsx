import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  MapPin,
  Phone,
  Send,
  Twitter,
  Instagram,
  Code2,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    main: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projects', href: '#projects' },
    ],
    resources: [
      { name: 'Certificates', href: '#certificates' },
      { name: 'Contact', href: '#contact' },
      { name: 'Blog', href: '#blog' },
      { name: 'Resume', href: '#resume' },
    ],
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/irvanshandika',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/irvanshandika',
      icon: Linkedin,
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/irvanshandika',
      icon: Twitter,
      color: 'hover:text-sky-500 dark:hover:text-sky-400',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/irvanshandika',
      icon: Instagram,
      color: 'hover:text-pink-600 dark:hover:text-pink-400',
    },
    {
      name: 'Email',
      href: 'mailto:contact@irvans.my.id',
      icon: Mail,
      color: 'hover:text-red-600 dark:hover:text-red-400',
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: 'Indonesia',
    },
    {
      icon: Phone,
      text: '+62 858 4556 1655',
      href: 'tel:+6285845561655',
    },
    {
      icon: Mail,
      text: 'contact@irvans.my.id',
      href: 'mailto:contact@irvans.my.id',
    },
  ];

  return (
    <footer className="bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Irvan Shandika
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md leading-relaxed">
                Full-stack developer passionate about creating beautiful and functional web
                applications. Specialized in React, Next.js, and modern web technologies.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400">{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navigation.main.map(item => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {navigation.resources.map(item => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Subscribe to get notified about new projects and articles.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 flex-1 md:w-64"
              />
              <button className="px-6 py-2 rounded-lg bg-linear-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 group">
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start gap-2">
                © {currentYear} Irvan Shandika. Made with
                <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                using Next.js & TypeScript
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-600 dark:text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 transform`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-xs text-slate-500 dark:text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>
            <span>•</span>
            <Link
              href="/sitemap"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
