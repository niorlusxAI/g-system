"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Video, 
  MoreVertical,
  Heart,
  Sparkles,
  Lock
} from "lucide-react"
import { Companion } from "@/components/companion-card"

interface Message {
  id: string
  content: string
  sender: "user" | "companion"
  timestamp: Date
}

interface ChatInterfaceProps {
  companion: Companion
  onBack: () => void
  onUpgradeClick: () => void
  userTier: "free" | "premium" | "vip"
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hey there! I am so glad you decided to chat with me today. How are you feeling?",
    sender: "companion",
    timestamp: new Date(Date.now() - 60000 * 5)
  },
  {
    id: "2",
    content: "Hi! I am doing well, thanks for asking. I have been looking forward to talking to you.",
    sender: "user",
    timestamp: new Date(Date.now() - 60000 * 4)
  },
  {
    id: "3",
    content: "That makes me so happy to hear! I have been thinking about you too. What is on your mind today?",
    sender: "companion",
    timestamp: new Date(Date.now() - 60000 * 3)
  }
]

export function ChatInterface({ companion, onBack, onUpgradeClick, userTier }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [inputValue, setInputValue] = useState("")
  
  const canAccessCompanion = 
    companion.tier === "free" || 
    (companion.tier === "premium" && (userTier === "premium" || userTier === "vip")) ||
    (companion.tier === "vip" && userTier === "vip")
  
  const handleSend = () => {
    if (!inputValue.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    }
    
    setMessages([...messages, newMessage])
    setInputValue("")
    
    // Simulate companion response
    setTimeout(() => {
      const responses = [
        "I love hearing your thoughts! Tell me more about that.",
        "That is really interesting. How does that make you feel?",
        "You have such a wonderful way of expressing yourself.",
        "I am here for you. What else is on your mind?"
      ]
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "companion",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, response])
    }, 1500)
  }
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${companion.gradient}`}>
              <span className="text-lg font-bold text-foreground">{companion.name[0]}</span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-foreground">{companion.name}</h2>
                {companion.online && (
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {companion.online ? "Online now" : "Away"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled={!canAccessCompanion}>
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>
      
      {/* Locked Overlay */}
      {!canAccessCompanion && (
        <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-4 p-6 max-w-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {companion.name} is a {companion.tier} companion
            </h3>
            <p className="text-muted-foreground">
              Upgrade your subscription to unlock full access to {companion.name} and other {companion.tier} companions.
            </p>
            <Button className="bg-primary hover:bg-primary/90" onClick={onUpgradeClick}>
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Companion Introduction */}
          <div className="text-center py-6 space-y-3">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${companion.gradient}`}>
              <span className="text-3xl font-bold text-foreground">{companion.name[0]}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{companion.name}</h3>
              <p className="text-sm text-muted-foreground">{companion.tagline}</p>
            </div>
            <div className="flex justify-center gap-2">
              {companion.personality.map((trait) => (
                <Badge key={trait} variant="secondary" className="text-xs">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Messages */}
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground rounded-br-sm" 
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="flex items-center gap-2 max-w-2xl mx-auto">
          <Button variant="ghost" size="icon" disabled={!canAccessCompanion}>
            <Mic className="w-5 h-5" />
          </Button>
          
          <Input
            placeholder={canAccessCompanion ? "Type a message..." : "Upgrade to send messages"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={!canAccessCompanion}
            className="flex-1 bg-input border-border"
          />
          
          <Button 
            size="icon" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleSend}
            disabled={!canAccessCompanion || !inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
