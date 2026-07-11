'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-1000 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-white font-semibold">KeyForAgents</h3>
            <p className="text-dark-400 text-sm">
              AI Agent Systems for Maximum Revenue
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-medium">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-dark-400 hover:text-white text-sm transition-colors">
                  Platform
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-medium">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-medium">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-dark-500 text-sm">
              &copy; {new Date().getFullYear()} KeyForAgents. All rights reserved.
            </p>
            <p className="text-dark-500 text-sm mt-2 sm:mt-0">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
