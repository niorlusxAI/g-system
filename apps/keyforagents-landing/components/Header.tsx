'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { classNames } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-dark-950/90 backdrop-blur-lg border-b border-dark-800'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              KeyForAgents
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-dark-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="#contact"
              className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-primary-400 border border-primary-400 rounded-lg hover:bg-primary-400/10 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="#cta"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
