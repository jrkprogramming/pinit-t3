import { createContext, useState, type ReactNode } from "react";

interface LatLngValue {
  data: { lat: number; lng: number };
  setData: (value: { lat: number; lng: number }) => void;
}
const LatLngContext = createContext<LatLngValue | undefined>(undefined);

interface LatLngProviderProps {
  children: ReactNode;
}

export function LatLngProvider({ children }: LatLngProviderProps) {
  const [data, setData] = useState({
    lat: 0,
    lng: 0,
  });

  const setClickedLatLng = (value: { lat: number; lng: number }) => {
    // Implement the logic for setting the clicked LatLng
    // For example:
    // setData(value);
    // Perform any other necessary actions
  };

  return (
    <LatLngContext.Provider value={{ data, setData }}>
      {children}
    </LatLngContext.Provider>
  );
}

export default LatLngContext;
