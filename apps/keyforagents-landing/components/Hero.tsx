'use client';

import { useState } from 'react';
import { classNames } from '@/lib/utils';

interface HeroProps {
  domainConfig: {
    name: string;
    title: string;
    description: string;
    tagline: string;
    primaryColor: string;
    secondaryColor: string;
    ctaText: string;
    ctaLink: string;
  };
}

export default function Hero({ domainConfig }: HeroProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to your backend or email service
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className="relative bg-gradient-to-br from-dark-950 via-dark-1000 to-dark-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-full text-sm mb-8">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-dark-300">
              Now supporting {domainConfig.name}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            {domainConfig.title.split(' - ')[0]}
            <span className="block text-primary-400">
              {domainConfig.title.split(' - ')[1]}
            </span>
          </h1>
          <p className="mt-6 text-xl text-dark-300 max-w-3xl mx-auto">
            {domainConfig.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={domainConfig.ctaLink}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {domainConfig.ctaText}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <button
              onClick={() => {
                // TODO: Add demo video or calendar link
                window.open('#demo', '_blank');
              }}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-dark-200 bg-dark-800/50 border border-dark-700 rounded-lg hover:bg-dark-700/50 transition-colors"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Demo
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-12 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
            <p className="mt-2 text-xs text-dark-500">
              Be the first to know when we launch. No spam, ever.
            </p>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-1000 to-transparent" />
    </section>
  );
}
