"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Sparkles, Lock } from "lucide-react"

export interface Companion {
  id: string
  name: string
  tagline: string
  personality: string[]
  tier: "free" | "premium" | "vip"
  online: boolean
  avatar: string
  gradient: string
}

interface CompanionCardProps {
  companion: Companion
  onSelect: (companion: Companion) => void
}

export function CompanionCard({ companion, onSelect }: CompanionCardProps) {
  const tierColors = {
    free: "bg-secondary text-secondary-foreground",
    premium: "bg-primary text-primary-foreground",
    vip: "bg-accent text-accent-foreground"
  }

  const tierLabels = {
    free: "Free",
    premium: "Premium",
    vip: "VIP"
  }

  return (
    <Card 
      className="group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(companion)}
    >
      <div className={`absolute inset-0 opacity-20 ${companion.gradient}`} />
      
      <CardContent className="p-0 relative">
        {/* Avatar Section */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <div className={`absolute inset-0 ${companion.gradient} opacity-30`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-muted/50 flex items-center justify-center border-2 border-border/50">
              <span className="text-4xl font-bold text-foreground/60">{companion.name[0]}</span>
            </div>
          </div>
          
          {/* Online Status */}
          {companion.online && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-foreground">Online</span>
            </div>
          )}
          
          {/* Tier Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={tierColors[companion.tier]}>
              {companion.tier !== "free" && <Lock className="w-3 h-3 mr-1" />}
              {tierLabels[companion.tier]}
            </Badge>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
        </div>
        
        {/* Info Section */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              {companion.name}
              <Sparkles className="w-4 h-4 text-primary" />
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{companion.tagline}</p>
          </div>
          
          {/* Personality Tags */}
          <div className="flex flex-wrap gap-1.5">
            {companion.personality.slice(0, 3).map((trait) => (
              <span 
                key={trait}
                className="px-2 py-0.5 text-xs rounded-full bg-secondary/50 text-secondary-foreground"
              >
                {trait}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(companion)
              }}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
