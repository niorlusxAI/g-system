import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import { DOMAIN_CONFIG, FEATURES, PRICING_TIERS } from '@/lib/constants';

export default function KeyForAgentsComPage() {
  const domain = 'KEYFORAGENTS_COM';
  const config = DOMAIN_CONFIG[domain];
  const features = FEATURES[domain];

  return (
    <main className="min-h-screen">
      <Header />
      <Hero domainConfig={config} />
      <Features features={features} domain={config.name} />
      <Pricing tiers={PRICING_TIERS} />
      <CTA />
      <Footer />
    </main>
  );
}
