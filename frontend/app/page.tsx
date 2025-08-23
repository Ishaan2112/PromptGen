"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageSquare, Send, Copy, Download, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export default function PromptGenPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    try {
      // Call the real backend API
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://promptgen-backend-qwpj.onrender.com';
      const fullUrl = `${API_URL}/ai/generate-prompt`;
      
      console.log('🌐 Making API request to:', fullUrl);
      console.log('📤 Request payload:', { userInput: userMessage.content });
      console.log('🔧 Environment API_URL:', process.env.NEXT_PUBLIC_API_URL);
      console.log('🔧 Fallback API_URL:', 'https://promptgen-backend-qwpj.onrender.com');
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userMessage.content }),
      })

      console.log('📥 Response status:', response.status);
      console.log('📥 Response statusText:', response.statusText);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response not ok:', response.status, response.statusText, errorText);
        throw new Error(`Failed to generate prompt: ${response.status} ${response.statusText}`);
      }

      const result = await response.json()
      console.log('✅ Response data:', result);
      
      if (!result.data || !result.data.prompt) {
        console.error('❌ Invalid response format:', result);
        throw new Error('Invalid response format from API');
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: result.data.prompt,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('💥 Error generating prompt:', error)
      console.error('💥 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Fallback to local generation if API fails
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `[API Error] ${error.message} - Using fallback: ${generatePromptResponse(userMessage.content)}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const generatePromptResponse = (userInput: string): string => {
    // Fallback prompt generation logic if API fails
    const prompts = [
      `Create a compelling ${userInput} that captures attention and drives engagement. Focus on clear value proposition and emotional connection.`,
      `Design a professional ${userInput} that addresses key pain points and provides actionable solutions. Include specific examples and measurable outcomes.`,
      `Develop an innovative ${userInput} that stands out from competitors. Emphasize unique benefits and create urgency for action.`,
      `Craft a persuasive ${userInput} that builds trust and credibility. Use social proof and testimonials to support your message.`,
    ]
    return prompts[Math.floor(Math.random() * prompts.length)]
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportChat = () => {
    const chatContent = messages.map((msg) => `${msg.type.toUpperCase()}: ${msg.content}`).join("\n\n")
    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "promptgen-chat.txt"
    a.click()
  }

  return (
    <div className="min-h-screen promptgen-bg">
      {/* Header */}
      <header className="border-b border-gray-700 bg-[#222C36]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 promptgen-teal rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">PromptGen</h1>
              <p className="text-sm text-gray-300">Your sleek prompt generation assistant</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {messages.length === 0 ? (
          /* Welcome Section */
          <div className="text-center py-16">
            <div className="w-16 h-16 promptgen-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4">Welcome to PromptGen!</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Your sleek prompt generation assistant for creative, technical, and professional uses. Describe what kind
              of prompt you need, and I'll help you create something amazing.
            </p>

            {/* Quick Tips */}
            <Card className="promptgen-card p-6 max-w-2xl mx-auto mb-8">
              <h3 className="font-semibold text-[#222C36] mb-4">Quick Tips to Get Started:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-[#5A6872]">
                <div className="text-left">
                  <p className="font-medium mb-1">• Be specific about your domain</p>
                  <p className="text-xs">e.g., "marketing email", "coding tutorial", "creative writing"</p>
                </div>
                <div className="text-left">
                  <p className="font-medium mb-1">• Mention your target audience</p>
                  <p className="text-xs">e.g., "for beginners", "for professionals", "for students"</p>
                </div>
                <div className="text-left">
                  <p className="font-medium mb-1">• Include desired tone</p>
                  <p className="text-xs">e.g., "professional", "casual", "persuasive", "educational"</p>
                </div>
                <div className="text-left">
                  <p className="font-medium mb-1">• Specify the format</p>
                  <p className="text-xs">e.g., "blog post", "social media", "presentation", "email"</p>
                </div>
              </div>
            </Card>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe the prompt you want to generate…"
                  className="flex-1 p-4 border-2 border-[#E2E8F0] focus:border-[#20B2AA] bg-[#F4F8FB] text-[#222C36] placeholder:text-[#5A6872]"
                />
                <Button
                  type="submit"
                  className="promptgen-teal hover:bg-[#1a9b94] text-white px-6 py-4 rounded-lg font-medium"
                  disabled={!input.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>
        ) : (
          /* Chat Section */
          <div className="space-y-6">
            {/* Export Button */}
            <div className="flex justify-end">
              <Button
                onClick={exportChat}
                variant="outline"
                className="border-[#E2E8F0] text-[#5A6872] hover:bg-[#E2E8F0] bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Chat
              </Button>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[65%] rounded-2xl px-4 py-3 relative group",
                      message.type === "user" ? "promptgen-teal text-white" : "bg-[#222C36] text-white",
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <Button
                      onClick={() => copyToClipboard(message.content)}
                      className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-white text-[#222C36] hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-[#222C36] text-white rounded-2xl px-4 py-3 max-w-[65%]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#20B2AA] rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#20B2AA] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#20B2AA] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300">Generating prompt...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="sticky bottom-0 bg-[#222C36] p-4 -mx-4 border-t border-gray-700">
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="flex gap-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe another prompt you need..."
                    className="flex-1 p-4 border-2 border-[#E2E8F0] focus:border-[#20B2AA] bg-[#F4F8FB] text-[#222C36] placeholder:text-[#5A6872]"
                    disabled={isGenerating}
                  />
                  <Button
                    type="submit"
                    className="promptgen-teal hover:bg-[#1a9b94] text-white px-6 py-4 rounded-lg font-medium"
                    disabled={!input.trim() || isGenerating}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
