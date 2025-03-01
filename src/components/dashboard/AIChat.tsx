import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const AIChat = ({
  messages: initialMessages = [
    {
      id: 1,
      text: "Hello! I'm your restaurant analytics assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "Can you show me the peak hours for my restaurant?",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "Based on your data, your restaurant is busiest between 12-2pm for lunch and 6-8pm for dinner. Would you like to see a detailed breakdown?",
      sender: "ai",
      timestamp: new Date(),
    },
  ],
  onSendMessage = () => {},
}: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <Card className="w-full flex flex-col bg-zinc-900/90 backdrop-blur-sm border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      message.sender === "ai"
                        ? "https://api.dicebear.com/7.x/bottts/svg?seed=ai-assistant"
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    }
                  />
                  <AvatarFallback>
                    {message.sender === "ai" ? "AI" : "U"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Ask me anything about your restaurant..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
