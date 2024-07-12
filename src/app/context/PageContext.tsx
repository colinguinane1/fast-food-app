// PageContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context data
interface PageContextData {
  currentPage: string; // Assuming currentPage is a string representing the current page path
  setCurrentPage: (page: string) => void;
}

// Create the context with initial values
const PageContext = createContext<PageContextData | undefined>(undefined);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageContextProvider");
  }
  return context;
};

// Provider component to wrap your app and provide the context
interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider = ({ children }: PageContextProviderProps) => {
  const [currentPage, setCurrentPage] = useState<string>(""); // Initial state can be whatever is appropriate

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};
