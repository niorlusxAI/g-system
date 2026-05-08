"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CompanionCard, Companion } from "@/components/companion-card"
import { SiteHeader } from "@/components/site-header"
import { 
  Sparkles, 
  Shield, 
  Headset, 
  MessageCircle, 
  Heart,
  Zap,
  Globe,
  Lock,
  ArrowRight,
  Star
} from "lucide-react"

interface LandingPageProps {
  onCompanionSelect: (companion: Companion) => void
  onAuthClick: () => void
}

const MOCK_COMPANIONS: Companion[] = [
  {
    id: "1",
    name: "Luna",
    tagline: "Your empathetic listener who understands your deepest thoughts",
    personality: ["Empathetic", "Caring", "Intuitive"],
    tier: "free",
    online: true,
    avatar: "",
    gradient: "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
  },
  {
    id: "2",
    name: "Nova",
    tagline: "Adventurous spirit with a passion for the extraordinary",
    personality: ["Adventurous", "Bold", "Creative"],
    tier: "premium",
    online: true,
    avatar: "",
    gradient: "bg-gradient-to-br from-pink-500/20 to-rose-500/20"
  },
  {
    id: "3",
    name: "Aria",
    tagline: "Sophisticated and witty, always keeping you on your toes",
    personality: ["Witty", "Sophisticated", "Playful"],
    tier: "premium",
    online: false,
    avatar: "",
    gradient: "bg-gradient-to-br from-amber-500/20 to-orange-500/20"
  },
  {
    id: "4",
    name: "Sage",
    tagline: "Wise and calming presence for meaningful conversations",
    personality: ["Wise", "Calm", "Thoughtful"],
    tier: "vip",
    online: true,
    avatar: "",
    gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "5",
    name: "Phoenix",
    tagline: "Intense and passionate, igniting unforgettable connections",
    personality: ["Passionate", "Intense", "Magnetic"],
    tier: "vip",
    online: true,
    avatar: "",
    gradient: "bg-gradient-to-br from-red-500/20 to-pink-500/20"
  },
  {
    id: "6",
    name: "Echo",
    tagline: "Mysterious and alluring, with secrets waiting to unfold",
    personality: ["Mysterious", "Alluring", "Deep"],
    tier: "premium",
    online: false,
    avatar: "",
    gradient: "bg-gradient-to-br from-indigo-500/20 to-violet-500/20"
  }
]

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Natural Conversations",
    description: "AI-powered dialogue that feels authentic and meaningful"
  },
  {
    icon: Headset,
    title: "Immersive VR",
    description: "Step into virtual worlds with your companion in WebXR"
  },
  {
    icon: Heart,
    title: "Deep Connections",
    description: "Build lasting relationships that evolve over time"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "End-to-end encryption and strict data protection"
  },
  {
    icon: Zap,
    title: "Real-time Voice",
    description: "Natural voice synthesis powered by advanced AI"
  },
  {
    icon: Globe,
    title: "Always Available",
    description: "Your companion is there whenever you need them"
  }
]

const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic features",
    features: [
      "1 Free Companion",
      "50 messages/day",
      "Basic chat features",
      "Community access"
    ],
    cta: "Start Free",
    highlighted: false
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "Unlock premium companions and features",
    features: [
      "All Premium Companions",
      "Unlimited messages",
      "Voice conversations",
      "VR experiences",
      "Priority support"
    ],
    cta: "Go Premium",
    highlighted: true
  },
  {
    name: "VIP",
    price: "$49",
    period: "per month",
    description: "The ultimate experience with exclusive access",
    features: [
      "All VIP Companions",
      "Exclusive content",
      "Custom companion creation",
      "Private VR rooms",
      "1-on-1 support",
      "Early access features"
    ],
    cta: "Become VIP",
    highlighted: false
  }
]

export function LandingPage({ onCompanionSelect, onAuthClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onAuthClick={onAuthClick} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/50 text-primary">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              AI-Powered Companions
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
              Your Perfect
              <span className="text-primary"> AI Companion </span>
              Awaits
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience deep, meaningful connections with AI companions designed to understand, 
              support, and grow with you. Available in chat, voice, and immersive VR.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8" onClick={onAuthClick}>
                Meet Your Companion
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                <span>Age Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4" />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Companions Section */}
      <section id="companions" className="py-20 bg-secondary/20">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Meet Your Companions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each companion has a unique personality, ready to connect with you on a deeper level.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COMPANIONS.map((companion) => (
              <CompanionCard 
                key={companion.id} 
                companion={companion} 
                onSelect={onCompanionSelect}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose SOULVERSE
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI technology meets emotional intelligence for an unparalleled experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-secondary/20">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your journey. Upgrade or cancel anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <div 
                key={tier.name}
                className={`relative p-6 rounded-xl border ${
                  tier.highlighted 
                    ? "border-primary bg-card shadow-lg shadow-primary/10" 
                    : "border-border/50 bg-card/50"
                }`}
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">/{tier.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${tier.highlighted ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={tier.highlighted ? "default" : "outline"}
                  onClick={onAuthClick}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            All payments processed securely via CCBill. Cancel anytime.
          </p>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            
            <div className="relative max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Find Your Perfect Match?
              </h2>
              <p className="text-muted-foreground">
                Join thousands of users who have discovered meaningful connections. 
                Your AI companion is waiting.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={onAuthClick}>
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">SV</span>
              </div>
              <span className="font-semibold text-foreground">SOULVERSE</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="hover:text-foreground transition-colors">DMCA</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Adults Only (18+) | VIC-AU Jurisdiction
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
