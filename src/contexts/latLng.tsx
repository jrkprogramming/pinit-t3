import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface LatLngValue {
  data: Coordinates;
  setData: Dispatch<SetStateAction<Coordinates>>;
}

const LatLngContext = createContext<LatLngValue | undefined>(undefined);

interface LatLngProviderProps {
  children: ReactNode;
}

export function LatLngProvider({ children }: LatLngProviderProps) {
  const [data, setData] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  return (
    <LatLngContext.Provider value={{ data, setData }}>
      {children}
    </LatLngContext.Provider>
  );
}

export default LatLngContext;
