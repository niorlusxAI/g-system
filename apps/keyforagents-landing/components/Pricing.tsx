'use client';

import { classNames, formatPrice } from '@/lib/utils';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface PricingProps {
  tiers: PricingTier[];
}

export default function Pricing({ tiers }: PricingProps) {
  return (
    <section id="pricing" className="py-20 bg-dark-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-dark-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                'bg-dark-800/50 border border-dark-700 rounded-xl p-8 relative',
                tier.popular
                  ? 'ring-2 ring-primary-500 border-primary-500 transform scale-105'
                  : ''
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                <p className="text-dark-400 mt-2">{tier.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {formatPrice(tier.price, tier.period)}
                </span>
                <span className="text-dark-400">
                  /{tier.period} + applicable taxes
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={classNames(
                  'w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all',
                  tier.popular
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl'
                    : 'bg-dark-700 text-white border border-dark-600 hover:bg-dark-600'
                )}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-dark-400">
            Not sure which plan is right for you?{' '}
            <a href="#contact" className="text-primary-400 hover:text-primary-300">
              Contact us
            </a>{' '}
            and we&apos;ll help you choose.
          </p>
        </div>
      </div>
    </section>
  );
}
