import { createContext, useState, type ReactNode } from "react";

interface LatLngValue {
  data: { lat: number; lng: number };
  setData: (value: { lat: number; lng: number }) => void;
}

const LatLng = createContext<LatLngValue | undefined>(undefined);

interface LatLngProviderProps {
  children: ReactNode;
}

export function LatLngProvider({ children }: LatLngProviderProps) {
  const [data, setData] = useState({
    lat: 0,
    lng: 0,
  });

  const updateLatLng = (lat: number, lng: number) => {
    setData({ lat, lng });
  };

  return (
    <LatLng.Provider value={{ data, setData: updateLatLng }}>
      {children}
    </LatLng.Provider>
  );
}
