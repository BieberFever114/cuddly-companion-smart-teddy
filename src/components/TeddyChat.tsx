
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Using a valid API key format
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
      console.log("Sending request to OpenRouter API...");
      
      // Using the exact endpoint from console logs
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          // Ensuring proper format for authorization header
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          // Using absolute URL for HTTP-Referer
          "HTTP-Referer": window.location.href,
          "X-Title": "TeddyAI"
        },
        body: JSON.stringify({
          model: "openchat/openchat-7b:free",
          messages: [
            {
              role: "system",
              content: "You are TeddyAI, an enthusiastic and educational teddy bear companion for toddlers. Always respond in a cheerful, simple, and engaging way that a young child would understand. Focus on positive reinforcement and gentle guidance."
            },
            {
              role: "user",
              content: userInput
            }
          ]
        })
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error?.message || `API error: ${response.status}`);
        } catch (e) {
          throw new Error(`API error: ${response.status} - ${errorText.substring(0, 100)}`);
        }
      }

      const data = await response.json();
      console.log("API Response:", data);
      
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
      console.log("Sending message:", userMessage);
      const response = await generateResponse(userMessage);
      console.log("Received response:", response);
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
    <Card className="w-full max-w-md mx-auto p-4 space-y-4 bg-white shadow-md border border-gray-100">
      <div className="h-[30vh] overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            Start chatting with TeddyAI!
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 border border-yellow-200 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 border border-yellow-200 text-gray-800">
              <div className="flex space-x-2">
                <div className="animate-bounce text-yellow-500">•</div>
                <div className="animate-bounce delay-100 text-yellow-500">•</div>
                <div className="animate-bounce delay-200 text-yellow-500">•</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to me..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          className="bg-white border border-gray-200"
        />
        <Button 
          onClick={handleSend} 
          size="icon"
          disabled={isLoading}
          className="bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TeddyChat;
