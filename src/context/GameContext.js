import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [isSimpleMode, setIsSimpleMode] = useState(false);

  return <GameContext.Provider value={{ isSimpleMode, setIsSimpleMode }}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
