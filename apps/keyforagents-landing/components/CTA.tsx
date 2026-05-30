'use client';

export default function CTA() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Ready to Transform Your Business?
        </h2>
        <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
          Join thousands of businesses already using KeyForAgents to automate their workflows and boost revenue.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 transition-colors shadow-lg"
          >
            View Pricing
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Request Demo
          </a>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-green-400"
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
            <span className="text-white">14-day free trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-green-400"
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
            <span className="text-white">No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-green-400"
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
            <span className="text-white">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
