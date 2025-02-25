
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const OPENROUTER_API_KEY = "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";

const TeddyChat = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'teddy'}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const synth = window.speechSynthesis;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    synth.speak(utterance);
  };

  const generateResponse = async (userInput: string) => {
    try {
      const response = await fetch("https://api.openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": `${window.location.origin}`,
          "X-Title": "TeddyAI",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openchat/openchat-3.5-0106",
          messages: [
            {
              role: "system",
              content: "You are TeddyAI, an enthusiastic and educational teddy bear companion for toddlers. Always respond in a cheerful, simple, and engaging way that a young child would understand. Focus on positive reinforcement and gentle guidance."
            },
            {
              role: "user",
              content: userInput
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error:", errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log
      
      if (!data.choices?.[0]?.message?.content) {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format");
      }
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating response:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await generateResponse(userMessage);
      setMessages(prev => [...prev, { text: response, sender: 'teddy' }]);
      speak(response);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Oops!",
        description: "I couldn't respond right now. Please try again!",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 space-y-4 bg-white/50 backdrop-blur-sm">
      <div className="h-[30vh] overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-yellow-100 text-yellow-900'
              }`}
            >
              {message.text}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to me..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          className="bg-white"
        />
        <Button 
          onClick={handleSend} 
          size="icon"
          disabled={isLoading}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TeddyChat;
