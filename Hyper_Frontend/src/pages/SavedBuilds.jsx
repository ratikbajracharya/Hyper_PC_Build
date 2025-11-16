// src/pages/SavedBuilds.jsx
import React, { useState } from "react";
import { useBuild } from "../components/BuildContext.jsx";

const SavedBuilds = () => {
  const { savedBuilds, setSelectedParts, deleteBuild } = useBuild();
  const [selectedBuildId, setSelectedBuildId] = useState(null);

  const selectedBuild = savedBuilds.find((b) => b.id === selectedBuildId);

  /** Load build into the current builder */
  const handleLoadBuild = () => {
    if (!selectedBuild) return;
    setSelectedParts(selectedBuild.parts);
    alert("Build loaded into the builder!");
  };

  /** Delete build confirmation */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this build?")) {
      deleteBuild(id);
      if (id === selectedBuildId) setSelectedBuildId(null);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        💾 Saved Builds
      </h1>

      {savedBuilds.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          You have no saved builds yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ==============================
              LEFT PANEL – Saved Builds List
          ===============================*/}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Your Saved Builds</h2>

            <ul className="space-y-3 max-h-[65vh] overflow-y-auto">
              {savedBuilds.map((b) => (
                <li
                  key={b.id}
                  onClick={() => setSelectedBuildId(b.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition 
                    ${selectedBuildId === b.id
                      ? "bg-red-100 border-red-400"
                      : "bg-white hover:bg-gray-200"}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Build #{b.id}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(b.id);
                      }}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ==============================
              RIGHT PANEL – Build Details
          ===============================*/}
          <div className="lg:col-span-2 p-6 bg-white rounded-xl shadow border h-fit">
            {selectedBuild ? (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Build #{selectedBuild.id} Details
                </h2>

                <div className="space-y-4">
                  {Object.entries(selectedBuild.parts).map(([category, value]) => (
                    <div
                      key={category}
                      className="flex justify-between border-b pb-2"
                    >
                      <span className="capitalize font-medium text-gray-700">
                        {category}:
                      </span>
                      <span className="text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleLoadBuild}
                  className="mt-6 w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                >
                  Load This Build
                </button>
              </>
            ) : (
              <p className="text-gray-600 text-lg">
                Select a build from the list to see details.
              </p>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default SavedBuilds;
