import React, { createContext, useContext, useEffect, useState } from "react";

export const BuildContext = createContext(); // <-- FIXED (named export)

/** Custom hook */
export const useBuild = () => {
  const context = useContext(BuildContext);
  if (!context) throw new Error("useBuild must be used within a BuildProvider");
  return context;
};

export const BuildProvider = ({ children }) => {
  const [selectedParts, setSelectedParts] = useState({});
  const [savedBuilds, setSavedBuilds] = useState([]);

  /** Load saved data from localStorage on mount */
  useEffect(() => {
    const savedParts = localStorage.getItem("selectedParts");
    const builds = localStorage.getItem("savedBuilds");

    if (savedParts) setSelectedParts(JSON.parse(savedParts));
    if (builds) setSavedBuilds(JSON.parse(builds));
  }, []);

  /** Sync selected parts with localStorage */
  useEffect(() => {
    localStorage.setItem("selectedParts", JSON.stringify(selectedParts));
  }, [selectedParts]);

  /** Sync saved builds with localStorage */
  useEffect(() => {
    localStorage.setItem("savedBuilds", JSON.stringify(savedBuilds));
  }, [savedBuilds]);

  /** Select or replace a part */
  const selectPart = (category, part) => {
    setSelectedParts((prev) => ({
      ...prev,
      [category]: part,
    }));
  };

  /** Remove part from current build */
  const removePart = (category) => {
    setSelectedParts((prev) => {
      const updated = { ...prev };
      delete updated[category];
      return updated;
    });
  };

  /** Clear entire current build */
  const clearBuild = () => setSelectedParts({});

  /**
   * Save current build
   * Accepts selectedParts (from BuildMyPC)
   */
  const saveBuild = (buildParts) => {
    if (!buildParts || Object.keys(buildParts).length === 0) return null;

    const newBuild = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      parts: { ...buildParts },
    };

    setSavedBuilds((prev) => [...prev, newBuild]);

    return newBuild.id;
  };

  /** Delete a saved build */
  const deleteBuild = (id) => {
    setSavedBuilds((prev) => prev.filter((build) => build.id !== id));
  };

  return (
    <BuildContext.Provider
      value={{
        selectedParts,
        selectPart,
        removePart,
        clearBuild,

        savedBuilds,
        saveBuild,
        deleteBuild,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};
