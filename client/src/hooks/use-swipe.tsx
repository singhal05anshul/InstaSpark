import { useRef, useState, useCallback } from "react";

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

interface UseSwipeReturn {
  ref: React.RefObject<HTMLDivElement>;
  transform: string;
  opacity: number;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 100,
}: UseSwipeOptions): UseSwipeReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [transform, setTransform] = useState("translateX(0px) rotate(0deg)");
  const [opacity, setOpacity] = useState(1);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const newX = e.touches[0].clientX;
    const deltaX = newX - startX;
    const rotation = deltaX * 0.1; // Subtle rotation effect
    const newOpacity = Math.max(0.5, 1 - Math.abs(deltaX) / 300);

    setCurrentX(newX);
    setTransform(`translateX(${deltaX}px) rotate(${rotation}deg)`);
    setOpacity(newOpacity);
  }, [isDragging, startX]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const absDeltaX = Math.abs(deltaX);

    if (absDeltaX > threshold) {
      // Swipe detected
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    } else {
      // Snap back to center
      setTransform("translateX(0px) rotate(0deg)");
      setOpacity(1);
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  }, [isDragging, currentX, startX, threshold, onSwipeLeft, onSwipeRight]);

  return {
    ref,
    transform,
    opacity,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
