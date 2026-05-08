"use client"

import { useState, useEffect } from "react"
import { AgeVerificationGate } from "@/components/age-verification-gate"
import { LandingPage } from "@/components/landing-page"
import { Dashboard } from "@/components/dashboard"
import { ChatInterface } from "@/components/chat-interface"
import { PaywallModal } from "@/components/paywall-modal"
import { Companion } from "@/components/companion-card"

type AppView = "age-gate" | "landing" | "dashboard" | "chat"

export default function Home() {
  const [view, setView] = useState<AppView>("age-gate")
  const [isAgeVerified, setIsAgeVerified] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userTier, setUserTier] = useState<"free" | "premium" | "vip">("free")
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [paywallCompanion, setPaywallCompanion] = useState<Companion | null>(null)

  // Check for existing verification on mount
  useEffect(() => {
    const verified = localStorage.getItem("soulverse_age_verified")
    if (verified === "true") {
      setIsAgeVerified(true)
      setView("landing")
    }
    
    const auth = localStorage.getItem("soulverse_authenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
      const savedTier = localStorage.getItem("soulverse_tier") as "free" | "premium" | "vip" | null
      if (savedTier) setUserTier(savedTier)
    }
  }, [])

  const handleAgeVerified = () => {
    setIsAgeVerified(true)
    localStorage.setItem("soulverse_age_verified", "true")
    setView("landing")
  }

  const handleAuth = () => {
    setIsAuthenticated(true)
    localStorage.setItem("soulverse_authenticated", "true")
    setView("dashboard")
  }

  const handleCompanionSelect = (companion: Companion) => {
    const canAccess = 
      companion.tier === "free" || 
      (companion.tier === "premium" && (userTier === "premium" || userTier === "vip")) ||
      (companion.tier === "vip" && userTier === "vip")
    
    if (!isAuthenticated) {
      handleAuth()
      return
    }
    
    if (!canAccess) {
      setPaywallCompanion(companion)
      setShowPaywall(true)
      return
    }
    
    setSelectedCompanion(companion)
    setView("chat")
  }

  const handleSubscribe = (tier: "premium" | "vip") => {
    setUserTier(tier)
    localStorage.setItem("soulverse_tier", tier)
    setShowPaywall(false)
    
    if (paywallCompanion) {
      setSelectedCompanion(paywallCompanion)
      setPaywallCompanion(null)
      setView("chat")
    }
  }

  const handleBackFromChat = () => {
    setSelectedCompanion(null)
    setView("dashboard")
  }

  // Render based on current view
  if (!isAgeVerified) {
    return <AgeVerificationGate onVerified={handleAgeVerified} />
  }

  return (
    <>
      {view === "landing" && (
        <LandingPage 
          onCompanionSelect={handleCompanionSelect}
          onAuthClick={handleAuth}
        />
      )}
      
      {view === "dashboard" && (
        <Dashboard 
          onCompanionSelect={handleCompanionSelect}
          onUpgradeClick={() => setShowPaywall(true)}
          userTier={userTier}
        />
      )}
      
      {view === "chat" && selectedCompanion && (
        <ChatInterface 
          companion={selectedCompanion}
          onBack={handleBackFromChat}
          onUpgradeClick={() => {
            setPaywallCompanion(selectedCompanion)
            setShowPaywall(true)
          }}
          userTier={userTier}
        />
      )}
      
      <PaywallModal
        open={showPaywall}
        onOpenChange={setShowPaywall}
        companion={paywallCompanion}
        onSubscribe={handleSubscribe}
      />
    </>
  )
}
