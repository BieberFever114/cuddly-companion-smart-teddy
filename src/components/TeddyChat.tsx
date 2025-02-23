
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react";
import { motion } from "framer-motion";

const TeddyChat = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'teddy'}>>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const synth = window.speechSynthesis;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2; // Slightly higher pitch for child-friendly voice
    utterance.rate = 0.9; // Slightly slower rate for clarity
    synth.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    
    // Simple response for now - can be replaced with actual AI responses later
    const teddyResponse = `I love talking about ${input}! Tell me more!`;
    
    // Add teddy's response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: teddyResponse, sender: 'teddy' }]);
      speak(teddyResponse);
    }, 1000);

    setInput('');
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="h-96 overflow-y-auto space-y-4 p-4">
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
                  : 'bg-muted'
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
        />
        <Button onClick={handleSend} size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TeddyChat;
