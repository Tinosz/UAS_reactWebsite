import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [trendingBooks, setTrendingBooks] = useState([]);

  return (
    <AppContext.Provider value={{ trendingBooks, setTrendingBooks }}>
      {children}
    </AppContext.Provider>
  );
};
