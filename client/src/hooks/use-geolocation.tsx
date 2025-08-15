import { useState, useEffect } from "react";

interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  location: GeolocationPosition | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setError(null);
      setLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = "Unable to retrieve location";
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied by user";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out";
          break;
      }
      
      setError(errorMessage);
      setLoading(false);
    };

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    };

    // Get current position
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);

    // Watch position changes
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { location, error, loading };
}
