import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [usedSuperpowers, setUsedSuperpowers] = useState({
    revelation: false,
    alohomora: false,
  });

  return (
    <GameContext.Provider
      value={{
        isSimpleMode,
        setIsSimpleMode,
        usedSuperpowers,
        setUsedSuperpowers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
