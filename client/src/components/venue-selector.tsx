import { Button } from "@/components/ui/button";
import { X, MapPin, Users, ChevronRight } from "lucide-react";
import type { Venue } from "@shared/schema";

interface VenueSelectorProps {
  venues: Venue[];
  onSelectVenue: (venueId: string) => void;
  onClose: () => void;
}

export default function VenueSelector({ venues, onSelectVenue, onClose }: VenueSelectorProps) {
  const getVenueTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      brewery: "Brewery",
      coffee_shop: "Coffee Shop",
      bar: "Bar",
      restaurant: "Restaurant",
      pub: "Pub",
    };
    return typeLabels[type] || type;
  };

  const getVenueImage = (type: string) => {
    // Return placeholder colors based on venue type
    const colors: Record<string, string> = {
      brewery: "from-amber-200 to-amber-400",
      coffee_shop: "from-brown-200 to-brown-400",
      bar: "from-purple-200 to-purple-400",
      restaurant: "from-green-200 to-green-400",
      pub: "from-orange-200 to-orange-400",
    };
    return colors[type] || "from-gray-200 to-gray-400";
  };

  return (
    <div className="fixed inset-0 bg-white z-50 animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="bg-location text-white p-4 flex items-center space-x-3">
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full text-white"
          data-testid="button-close-venue-selector"
        >
          <X className="w-5 h-5" />
        </Button>
        <h3 className="font-poppins font-semibold text-lg" data-testid="text-venue-selector-title">
          Choose Your Venue
        </h3>
      </div>

      {/* Venue List */}
      <div className="p-4 space-y-3">
        {venues.map((venue) => (
          <Button
            key={venue.id}
            onClick={() => onSelectVenue(venue.id)}
            variant="outline"
            className="w-full h-auto p-4 hover:border-location transition-colors justify-start"
            data-testid={`button-venue-${venue.id}`}
          >
            <div className="flex items-center space-x-3 w-full">
              {/* Venue Image Placeholder */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getVenueImage(venue.type)} flex items-center justify-center`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-foreground" data-testid={`text-venue-name-${venue.id}`}>
                  {venue.name}
                </h4>
                <p className="text-sm text-gray-600" data-testid={`text-venue-type-${venue.id}`}>
                  {getVenueTypeLabel(venue.type)} • 0.1 km away
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Users className="w-3 h-3 text-location" />
                  <span className="text-xs text-location font-medium" data-testid={`text-venue-users-${venue.id}`}>
                    {venue.activeUsersCount || 0} people active
                  </span>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
