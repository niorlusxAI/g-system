'use client';

import { classNames } from '@/lib/utils';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
  domain: string;
}

export default function Features({ features, domain }: FeaturesProps) {
  return (
    <section id="features" className="py-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Powerful Features for {domain}
          </h2>
          <p className="mt-4 text-xl text-dark-400 max-w-2xl mx-auto">
            Everything you need to succeed with AI automation
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-800/50 border border-dark-700 rounded-xl p-8 hover:border-primary-500 transition-colors group"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-dark-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
