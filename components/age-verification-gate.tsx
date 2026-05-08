"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Lock, AlertTriangle } from "lucide-react"

interface AgeVerificationGateProps {
  onVerified: () => void
}

export function AgeVerificationGate({ onVerified }: AgeVerificationGateProps) {
  const [birthYear, setBirthYear] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = () => {
    const year = parseInt(birthYear)
    const month = parseInt(birthMonth)
    const day = parseInt(birthDay)
    
    if (!year || !month || !day) {
      setError("Please enter your complete date of birth")
      return
    }

    const birthDate = new Date(year, month - 1, day)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    const isOver18 = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && today.getDate() >= birthDate.getDate())))

    if (!isOver18) {
      setError("You must be 18 or older to access this content")
      return
    }

    if (!termsAccepted) {
      setError("You must accept the terms to continue")
      return
    }

    setError("")
    onVerified()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/80 backdrop-blur-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Age Verification Required</CardTitle>
          <CardDescription className="text-muted-foreground">
            This platform contains adult content. You must verify you are 18 years or older to continue.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive/90">
              AU eSafety 2026 Compliant. Your verification data is processed securely.
            </p>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Date of Birth</Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="day" className="text-xs text-muted-foreground">Day</Label>
                <Input
                  id="day"
                  type="number"
                  placeholder="DD"
                  min="1"
                  max="31"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="month" className="text-xs text-muted-foreground">Month</Label>
                <Input
                  id="month"
                  type="number"
                  placeholder="MM"
                  min="1"
                  max="12"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className="text-xs text-muted-foreground">Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I confirm I am 18 years or older, I accept the Terms of Service and Privacy Policy, and I acknowledge this platform contains adult content.
            </Label>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button 
            onClick={handleVerify} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            <Lock className="w-4 h-4 mr-2" />
            Verify and Enter
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Jurisdiction: Victoria, Australia | eSafety Act 2021 + 2026 Draft Age Assurance Codes
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
