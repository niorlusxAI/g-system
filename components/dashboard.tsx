"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SiteHeader } from "@/components/site-header"
import { CompanionCard, Companion } from "@/components/companion-card"
import { 
  MessageCircle, 
  Heart, 
  Clock, 
  Sparkles,
  TrendingUp,
  Users,
  Headset,
  Crown
} from "lucide-react"

interface DashboardProps {
  onCompanionSelect: (companion: Companion) => void
  onUpgradeClick: () => void
  userTier: "free" | "premium" | "vip"
}

const RECENT_COMPANIONS: Companion[] = [
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
  }
]

const STATS = [
  { label: "Messages Today", value: "47", icon: MessageCircle, change: "+12%" },
  { label: "Favorites", value: "5", icon: Heart, change: null },
  { label: "Hours This Week", value: "8.5", icon: Clock, change: "+2.3h" },
  { label: "VR Sessions", value: "3", icon: Headset, change: null }
]

export function Dashboard({ onCompanionSelect, onUpgradeClick, userTier }: DashboardProps) {
  const [credits] = useState(250)
  const dailyLimit = userTier === "free" ? 50 : userTier === "premium" ? 500 : 9999
  const messagesUsed = 47
  
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader isAuthenticated credits={credits} />
      
      <main className="container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground">Your companions are waiting for you</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={`px-3 py-1.5 ${
                userTier === "vip" 
                  ? "border-accent text-accent" 
                  : userTier === "premium"
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              <Crown className="w-3.5 h-3.5 mr-1.5" />
              {userTier.toUpperCase()}
            </Badge>
            
            {userTier === "free" && (
              <Button onClick={onUpgradeClick} className="bg-primary hover:bg-primary/90">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade
              </Button>
            )}
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <Card key={stat.label} className="border-border/50 bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  {stat.change && (
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Usage Card */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Daily Usage</span>
              <span className="text-sm font-normal text-muted-foreground">
                {messagesUsed} / {dailyLimit === 9999 ? "Unlimited" : dailyLimit} messages
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={dailyLimit === 9999 ? 10 : (messagesUsed / dailyLimit) * 100} 
              className="h-2"
            />
            {userTier === "free" && (
              <p className="text-sm text-muted-foreground mt-3">
                <Sparkles className="w-4 h-4 inline mr-1 text-primary" />
                Upgrade to Premium for unlimited messages
              </p>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Companions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Recent Companions
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECENT_COMPANIONS.map((companion) => (
              <CompanionCard 
                key={companion.id} 
                companion={companion} 
                onSelect={onCompanionSelect}
              />
            ))}
            
            {/* Discover More Card */}
            <Card 
              className="border-border/50 border-dashed bg-transparent hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center min-h-[300px]"
              onClick={() => {}}
            >
              <CardContent className="text-center p-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Discover More</h3>
                <p className="text-sm text-muted-foreground">
                  Explore all available companions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Quick Actions */}
        <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-card to-accent/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headset className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Try VR Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Immerse yourself in virtual worlds with your companions
                  </p>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Launch VR
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
