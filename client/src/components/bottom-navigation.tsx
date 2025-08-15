import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Compass, Heart, MessageCircle, User } from "lucide-react";

interface BottomNavigationProps {
  currentPage: "discover" | "matches" | "chats" | "profile";
}

export default function BottomNavigation({ currentPage }: BottomNavigationProps) {
  const [location] = useLocation();

  const navItems = [
    {
      id: "discover",
      label: "Discover",
      icon: Compass,
      path: "/",
    },
    {
      id: "matches",
      label: "Matches",
      icon: Heart,
      path: "/matches",
      badge: 3,
    },
    {
      id: "chats",
      label: "Chats",
      icon: MessageCircle,
      path: "/chats",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-5 py-3">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Link key={item.id} href={item.path}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center space-y-1 relative ${
                  isActive ? "text-primary" : "text-gray-400 hover:text-primary"
                } transition-colors`}
                data-testid={`nav-${item.id}`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {item.badge && (
                  <span 
                    className="bg-primary text-white text-xs rounded-full px-1.5 py-0.5 absolute -top-1 -right-1"
                    data-testid={`badge-${item.id}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
