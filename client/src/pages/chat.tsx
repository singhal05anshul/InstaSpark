import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Message, Match } from "@shared/schema";

export default function Chat() {
  const [, params] = useRoute("/chat/:matchId");
  const matchId = params?.matchId || "";
  const currentUserId = "demo-user-123"; // In real app, would come from auth
  const [messageText, setMessageText] = useState("");
  
  const queryClient = useQueryClient();

  // Get match details
  const { data: match } = useQuery<Match>({
    queryKey: ["/api/matches", matchId],
    enabled: !!matchId,
  });

  // Get messages
  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["/api/matches", matchId, "messages"],
    enabled: !!matchId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/messages", {
        matchId,
        senderId: currentUserId,
        content,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/matches", matchId, "messages"] });
      setMessageText("");
    },
  });

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessageMutation.mutate(messageText.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!match) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-poppins font-semibold text-xl mb-2">Match not found</h2>
          <p className="text-gray-600">This conversation may have been removed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary to-pink-500 text-white p-4 flex items-center space-x-3">
        <Button
          onClick={() => window.history.back()}
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full text-white"
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        {/* Profile Photo Placeholder */}
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-sm font-poppins font-bold">M</span>
        </div>
        
        <div>
          <h3 className="font-semibold" data-testid="text-chat-partner-name">
            Match
          </h3>
          <p className="text-xs opacity-90">Active now • Venue</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Start the conversation! You matched at the same venue.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
              data-testid={`message-${message.id}`}
            >
              <div
                className={`max-w-xs p-3 rounded-2xl ${
                  message.senderId === currentUserId
                    ? "bg-primary text-white rounded-tr-md"
                    : "bg-gray-100 text-foreground rounded-tl-md"
                }`}
              >
                <p className="text-sm" data-testid={`text-message-content-${message.id}`}>
                  {message.content}
                </p>
                <span className="text-xs opacity-75" data-testid={`text-message-time-${message.id}`}>
                  {new Date(message.sentAt!).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-3 items-end">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 rounded-2xl"
            data-testid="input-message"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim() || sendMessageMutation.isPending}
            className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
            data-testid="button-send-message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
