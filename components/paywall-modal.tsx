"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Lock, Sparkles, Check, CreditCard, Shield } from "lucide-react"
import { Companion } from "@/components/companion-card"

interface PaywallModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companion?: Companion | null
  onSubscribe: (tier: "premium" | "vip") => void
}

export function PaywallModal({ open, onOpenChange, companion, onSubscribe }: PaywallModalProps) {
  const requiredTier = companion?.tier || "premium"
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            {companion ? `Unlock ${companion.name}` : "Upgrade Required"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {companion 
              ? `${companion.name} is a ${requiredTier} companion. Subscribe to unlock full access.`
              : "Subscribe to access premium features and companions."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Premium Option */}
          <div 
            className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
              requiredTier === "premium" 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onSubscribe("premium")}
          >
            {requiredTier === "premium" && (
              <Badge className="absolute -top-2 right-4 bg-primary text-primary-foreground">
                Recommended
              </Badge>
            )}
            
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Premium
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Access all premium companions
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">$19</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>
            
            <ul className="mt-3 space-y-1.5">
              {["Unlimited messages", "Voice conversations", "VR experiences"].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* VIP Option */}
          <div 
            className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
              requiredTier === "vip" 
                ? "border-accent bg-accent/5" 
                : "border-border hover:border-accent/50"
            }`}
            onClick={() => onSubscribe("vip")}
          >
            {requiredTier === "vip" && (
              <Badge className="absolute -top-2 right-4 bg-accent text-accent-foreground">
                Required
              </Badge>
            )}
            
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  VIP
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Ultimate access with exclusives
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">$49</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>
            
            <ul className="mt-3 space-y-1.5">
              {["Everything in Premium", "VIP companions", "Custom creation", "Private rooms"].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => onSubscribe(requiredTier as "premium" | "vip")}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Subscribe to {requiredTier === "vip" ? "VIP" : "Premium"}
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure payment via CCBill. Cancel anytime.</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
