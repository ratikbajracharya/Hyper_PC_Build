import React, { createContext, useContext, useEffect, useState } from "react";

export const BuildContext = createContext();

export const useBuild = () => {
  const context = useContext(BuildContext);
  if (!context) throw new Error("useBuild must be used within a BuildProvider");
  return context;
};

export const BuildProvider = ({ children }) => {
  const [selectedParts, setSelectedParts] = useState({});
  const [savedBuilds, setSavedBuilds] = useState([]);

  // Load localStorage on mount
  useEffect(() => {
    const savedParts = localStorage.getItem("selectedParts");
    const builds = localStorage.getItem("savedBuilds");

    if (savedParts) setSelectedParts(JSON.parse(savedParts));
    if (builds) setSavedBuilds(JSON.parse(builds));
  }, []);

  // Sync selectedParts to storage
  useEffect(() => {
    localStorage.setItem("selectedParts", JSON.stringify(selectedParts));
  }, [selectedParts]);

  // Sync saved builds
  useEffect(() => {
    localStorage.setItem("savedBuilds", JSON.stringify(savedBuilds));
  }, [savedBuilds]);

  // Select a part for a category
  const selectPart = (category, part) => {
    setSelectedParts((prev) => ({
      ...prev,
      [category]: part,
    }));
  };

  const removePart = (category) => {
    setSelectedParts((prev) => {
      const updated = { ...prev };
      delete updated[category];
      return updated;
    });
  };

  const clearBuild = () => setSelectedParts({});

  // Save current build
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

  const deleteBuild = (id) => {
    setSavedBuilds((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BuildContext.Provider
      value={{
        selectedParts,
        setSelectedParts,   // <-- IMPORTANT FIX
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
