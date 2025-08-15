import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, MapPin } from "lucide-react";
import BottomNavigation from "@/components/bottom-navigation";
import { Link } from "wouter";
import type { Match } from "@shared/schema";

export default function Matches() {
  const currentUserId = "demo-user-123"; // In real app, would come from auth

  const { data: matches = [] } = useQuery<Match[]>({
    queryKey: ["/api/users", currentUserId, "matches"],
  });

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center space-x-3">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full text-white"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="font-poppins font-semibold text-lg" data-testid="text-matches-title">
          Your Matches
        </h1>
      </div>

      <div className="p-4 pb-24">
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-poppins font-semibold text-xl mb-2" data-testid="text-no-matches">
              No matches yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start swiping to find people at venues near you
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white" data-testid="button-start-swiping">
                Start Swiping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <Link key={match.id} href={`/chat/${match.id}`}>
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 hover:border-primary transition-colors justify-start"
                  data-testid={`button-match-${match.id}`}
                >
                  <div className="flex items-center space-x-3 w-full">
                    {/* Profile Photo Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-lg font-poppins font-bold text-gray-600">
                        M
                      </span>
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground" data-testid={`text-match-name-${match.id}`}>
                        Match
                      </h3>
                      <p className="text-sm text-gray-600" data-testid={`text-match-venue-${match.id}`}>
                        Matched at venue
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-location" />
                        <span className="text-xs text-location font-medium">
                          {new Date(match.matchedAt!).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation currentPage="matches" />
    </div>
  );
}
