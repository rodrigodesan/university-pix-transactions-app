import { useState, useEffect, useCallback } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return { location };
};
