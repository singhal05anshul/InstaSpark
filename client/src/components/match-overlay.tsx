import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { Match } from "@shared/schema";

interface MatchOverlayProps {
  match: Match;
  onStartChat: () => void;
  onKeepSwiping: () => void;
}

export default function MatchOverlay({ match, onStartChat, onKeepSwiping }: MatchOverlayProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary to-pink-500 z-50 flex items-center justify-center animate-match-appear">
      <div className="text-center text-white p-8">
        <div className="mb-6">
          <Heart className="w-16 h-16 text-accent mx-auto animate-pulse" />
        </div>
        <h2 className="font-poppins font-bold text-3xl mb-4" data-testid="text-match-title">
          It's a Match!
        </h2>
        <p className="text-lg opacity-90 mb-8" data-testid="text-match-description">
          You both want to connect at this venue
        </p>
        <div className="flex space-x-4">
          <Button
            onClick={onStartChat}
            className="flex-1 bg-white text-primary py-3 px-6 rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
            data-testid="button-start-chat"
          >
            Start Chatting
          </Button>
          <Button
            onClick={onKeepSwiping}
            variant="outline"
            className="flex-1 border-2 border-white text-white py-3 px-6 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors"
            data-testid="button-keep-swiping"
          >
            Keep Swiping
          </Button>
        </div>
      </div>
    </div>
  );
}
