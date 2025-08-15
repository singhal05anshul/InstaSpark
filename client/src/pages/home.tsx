import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useGeolocation } from "@/hooks/use-geolocation";
import { MapPin, Users, Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";
import SwipeCard from "@/components/swipe-card";
import MatchOverlay from "@/components/match-overlay";
import QuickOfferModal from "@/components/quick-offer-modal";
import VenueSelector from "@/components/venue-selector";
import BottomNavigation from "@/components/bottom-navigation";
import type { User, Venue, Match } from "@shared/schema";

export default function Home() {
  const [currentUserId] = useState("demo-user-123"); // In real app, would come from auth
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [showMatchOverlay, setShowMatchOverlay] = useState(false);
  const [showQuickOfferModal, setShowQuickOfferModal] = useState(false);
  const [showVenueSelector, setShowVenueSelector] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const { location } = useGeolocation();
  const queryClient = useQueryClient();

  // Get nearby venues
  const { data: venues = [] } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
    queryFn: async () => {
      const params = location 
        ? `?lat=${location.latitude}&lng=${location.longitude}`
        : "";
      const response = await fetch(`/api/venues${params}`);
      return response.json();
    },
  });

  // Get current venue details
  const { data: currentVenue } = useQuery<Venue>({
    queryKey: ["/api/venues", selectedVenueId],
    enabled: !!selectedVenueId,
  });

  // Get users at current venue for swiping
  const { data: potentialMatches = [] } = useQuery<User[]>({
    queryKey: ["/api/users", currentUserId, "discover", selectedVenueId],
    enabled: !!selectedVenueId,
  });

  // Update user's current venue
  const updateVenueMutation = useMutation({
    mutationFn: async (venueId: string) => {
      const response = await apiRequest("PATCH", `/api/users/${currentUserId}/venue`, {
        venueId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/venues"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users", currentUserId, "discover"] });
    },
  });

  // Handle swipe action
  const swipeMutation = useMutation({
    mutationFn: async ({ swipedUserId, isLike }: { swipedUserId: string; isLike: boolean }) => {
      const response = await apiRequest("POST", "/api/swipes", {
        swiperId: currentUserId,
        swipedId: swipedUserId,
        venueId: selectedVenueId,
        isLike,
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.match) {
        setCurrentMatch(data.match);
        setShowMatchOverlay(true);
      }
      setCurrentCardIndex(prev => prev + 1);
    },
  });

  // Send quick offer
  const quickOfferMutation = useMutation({
    mutationFn: async ({ receiverId, offerType, message }: {
      receiverId: string;
      offerType: string;
      message: string;
    }) => {
      const response = await apiRequest("POST", "/api/quick-offers", {
        senderId: currentUserId,
        receiverId,
        venueId: selectedVenueId,
        offerType,
        message,
        status: "pending",
      });
      return response.json();
    },
    onSuccess: () => {
      setShowQuickOfferModal(false);
    },
  });

  // Auto-select first venue if available
  useEffect(() => {
    if (venues.length > 0 && !selectedVenueId) {
      const firstVenue = venues[0];
      setSelectedVenueId(firstVenue.id);
      updateVenueMutation.mutate(firstVenue.id);
    }
  }, [venues, selectedVenueId]);

  const handleSwipe = (direction: "left" | "right") => {
    const currentUser = potentialMatches[currentCardIndex];
    if (!currentUser) return;

    swipeMutation.mutate({
      swipedUserId: currentUser.id,
      isLike: direction === "right",
    });
  };

  const handleQuickOffer = (offerType: string, message: string) => {
    const currentUser = potentialMatches[currentCardIndex];
    if (!currentUser) return;

    quickOfferMutation.mutate({
      receiverId: currentUser.id,
      offerType,
      message,
    });
  };

  if (!selectedVenueId || !currentVenue) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <MapPin className="w-12 h-12 text-location mx-auto mb-4" />
          <h2 className="font-poppins font-semibold text-xl mb-2">Finding nearby venues...</h2>
          <p className="text-gray-600">We'll show you people at locations near you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      {/* Location Header */}
      <header className="bg-gradient-to-r from-location to-purple-600 text-white p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MapPin className="text-accent text-lg" />
              <button 
                onClick={() => setShowVenueSelector(true)}
                className="font-poppins font-medium hover:underline"
                data-testid="button-venue-selector"
              >
                {currentVenue.name}
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full text-white"
              data-testid="button-profile"
            >
              <i className="fas fa-user text-lg"></i>
            </Button>
          </div>
          <div className="text-sm opacity-90 flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span data-testid="text-active-users">{currentVenue.activeUsersCount || 0} people</span>
            <span>nearby right now</span>
          </div>
        </div>
      </header>

      {/* Quick Offer Bar */}
      <div className="bg-gradient-to-r from-accent to-yellow-400 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bolt className="text-foreground w-4 h-4" />
            <span className="text-foreground font-medium text-sm">Quick offers available</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground font-semibold text-sm hover:underline"
            data-testid="button-view-offers"
          >
            View All
          </Button>
        </div>
      </div>

      {/* Swipe Interface */}
      <div className="relative h-[calc(100vh-180px)] overflow-hidden">
        <div className="absolute inset-0 p-5">
          {potentialMatches.length > 0 ? (
            <>
              {/* Background Cards */}
              {currentCardIndex + 1 < potentialMatches.length && (
                <div className="absolute inset-0 transform scale-95 opacity-50 z-10">
                  <div className="bg-gray-100 rounded-3xl h-full"></div>
                </div>
              )}
              
              {currentCardIndex + 2 < potentialMatches.length && (
                <div className="absolute inset-0 transform scale-98 opacity-75 z-20">
                  <div className="bg-gray-200 rounded-3xl h-full"></div>
                </div>
              )}

              {/* Active Card */}
              {currentCardIndex < potentialMatches.length && (
                <SwipeCard
                  user={potentialMatches[currentCardIndex]}
                  onSwipe={handleSwipe}
                  onQuickOffer={() => setShowQuickOfferModal(true)}
                />
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-poppins font-semibold text-lg mb-2">No one here yet</h3>
                <p className="text-gray-600">Be the first to check in at {currentVenue.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Match Overlay */}
      {showMatchOverlay && currentMatch && (
        <MatchOverlay
          match={currentMatch}
          onStartChat={() => {
            setShowMatchOverlay(false);
            // Navigate to chat
          }}
          onKeepSwiping={() => setShowMatchOverlay(false)}
        />
      )}

      {/* Quick Offer Modal */}
      {showQuickOfferModal && (
        <QuickOfferModal
          onSendOffer={handleQuickOffer}
          onClose={() => setShowQuickOfferModal(false)}
        />
      )}

      {/* Venue Selector */}
      {showVenueSelector && (
        <VenueSelector
          venues={venues}
          onSelectVenue={(venueId) => {
            setSelectedVenueId(venueId);
            updateVenueMutation.mutate(venueId);
            setShowVenueSelector(false);
            setCurrentCardIndex(0);
          }}
          onClose={() => setShowVenueSelector(false)}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="discover" />
    </div>
  );
}
