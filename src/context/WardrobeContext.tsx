import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface WardrobeContextType {
  items: number[];
  addToWardrobe: (id: number) => void;
  removeFromWardrobe: (id: number) => void;
  isInWardrobe: (id: number) => boolean;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

const STORAGE_KEY = "newcommon_wardrobe";

export const WardrobeProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToWardrobe = (id: number) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWardrobe = (id: number) => {
    setItems((prev) => prev.filter((item) => item !== id));
  };

  const isInWardrobe = (id: number) => items.includes(id);

  return (
    <WardrobeContext.Provider value={{ items, addToWardrobe, removeFromWardrobe, isInWardrobe }}>
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) throw new Error("useWardrobe must be used within WardrobeProvider");
  return context;
};
