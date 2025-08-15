import { Button } from "@/components/ui/button";
import { Wine, MessageCircle, Coffee, X } from "lucide-react";

interface QuickOfferModalProps {
  onSendOffer: (offerType: string, message: string) => void;
  onClose: () => void;
}

export default function QuickOfferModal({ onSendOffer, onClose }: QuickOfferModalProps) {
  const offers = [
    {
      type: "drink",
      icon: Wine,
      message: "Can I buy you a drink?",
      bgColor: "bg-secondary",
    },
    {
      type: "join",
      icon: MessageCircle,
      message: "Mind if I join you?",
      bgColor: "bg-primary",
    },
    {
      type: "coffee",
      icon: Coffee,
      message: "Coffee after this?",
      bgColor: "bg-accent text-foreground",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-poppins font-semibold text-xl" data-testid="text-offer-title">
            Send Quick Offer
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="p-2"
            data-testid="button-close-offer-modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="space-y-3 mb-6">
          {offers.map((offer) => {
            const IconComponent = offer.icon;
            return (
              <Button
                key={offer.type}
                onClick={() => onSendOffer(offer.type, offer.message)}
                className={`w-full ${offer.bgColor} text-white py-4 px-6 rounded-xl flex items-center justify-between font-medium hover:opacity-90 transition-colors`}
                data-testid={`button-offer-${offer.type}`}
              >
                <span className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5" />
                  <span>"{offer.message}"</span>
                </span>
                <i className="fas fa-chevron-right"></i>
              </Button>
            );
          })}
        </div>
        
        <Button
          onClick={onClose}
          variant="outline"
          className="w-full border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          data-testid="button-cancel-offer"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
