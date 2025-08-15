import { useState } from "react";
import { useSwipe } from "@/hooks/use-swipe";
import { Button } from "@/components/ui/button";
import { Heart, X, Bolt, MapPin, Wine, MessageCircle } from "lucide-react";
import type { User } from "@shared/schema";

interface SwipeCardProps {
  user: User;
  onSwipe: (direction: "left" | "right") => void;
  onQuickOffer: () => void;
}

export default function SwipeCard({ user, onSwipe, onQuickOffer }: SwipeCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { 
    ref, 
    transform, 
    opacity,
    handleTouchStart, 
    handleTouchMove, 
    handleTouchEnd 
  } = useSwipe({
    onSwipeLeft: () => handleSwipeAction("left"),
    onSwipeRight: () => handleSwipeAction("right"),
  });

  const handleSwipeAction = (direction: "left" | "right") => {
    setIsAnimating(true);
    setTimeout(() => {
      onSwipe(direction);
      setIsAnimating(false);
    }, 300);
  };

  const calculateDistance = () => {
    // Mock distance calculation - in real app would use geolocation
    return `${Math.floor(Math.random() * 50) + 10}m away`;
  };

  return (
    <div 
      ref={ref}
      className={`absolute inset-0 z-30 touch-none ${
        isAnimating ? 'transition-transform duration-300' : ''
      }`}
      style={{
        transform,
        opacity,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-testid={`card-user-${user.id}`}
    >
      <div className="bg-white rounded-3xl shadow-2xl h-full overflow-hidden">
        {/* User Photo */}
        <div className="w-full h-2/3 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
          {user.photos && user.photos.length > 0 ? (
            <img 
              src={user.photos[0]} 
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover"
              data-testid="img-user-photo"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl font-poppins font-bold text-gray-400">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-5 h-1/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-poppins font-semibold text-xl" data-testid="text-user-name">
                {user.name}, {user.age}
              </h3>
              <div className="flex items-center space-x-1 text-location">
                <MapPin className="w-3 h-3" />
                <span className="text-xs font-medium" data-testid="text-user-distance">
                  {calculateDistance()}
                </span>
              </div>
            </div>
            {user.bio && (
              <p className="text-gray-600 text-sm mb-3" data-testid="text-user-bio">
                "{user.bio}"
              </p>
            )}
          </div>
          
          {/* Quick Offer Suggestions */}
          <div className="flex space-x-2">
            <Button
              onClick={onQuickOffer}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-white py-2 px-3 rounded-xl text-xs font-medium"
              data-testid="button-quick-offer-drink"
            >
              <Wine className="w-3 h-3 mr-1" />
              Buy a drink
            </Button>
            <Button
              onClick={onQuickOffer}
              className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-3 rounded-xl text-xs font-medium"
              data-testid="button-quick-offer-join"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Join table
            </Button>
          </div>
        </div>
      </div>

      {/* Swipe Action Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-40">
        <Button
          onClick={() => handleSwipeAction("left")}
          className="w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:scale-110 transition-all"
          data-testid="button-swipe-left"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={() => handleSwipeAction("right")}
          className="w-16 h-16 bg-primary shadow-lg rounded-full flex items-center justify-center text-white hover:bg-primary/90 hover:scale-110 transition-all"
          data-testid="button-swipe-right"
        >
          <Heart className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={onQuickOffer}
          className="w-14 h-14 bg-accent shadow-lg rounded-full flex items-center justify-center text-foreground hover:scale-110 transition-all"
          data-testid="button-super-like"
        >
          <Bolt className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
