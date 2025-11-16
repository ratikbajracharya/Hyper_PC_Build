import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BuildContext } from "../components/BuildContext";

const BuildDetails = () => {
  const { id } = useParams();
  const { savedBuilds } = useContext(BuildContext);

  const build = savedBuilds.find((b) => b.id === Number(id));

  if (!build) {
    return <p className="text-center mt-20 text-xl">Build not found.</p>;
  }

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">🔍 Build Details</h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow border">
        <h2 className="text-2xl font-semibold mb-4">🛠 Build ID: {build.id}</h2>
        <p className="text-gray-600 mb-6">Saved on: {build.timestamp}</p>

        <div className="space-y-4">
          {Object.entries(build.parts).map(([category, value]) => (
            <div key={category} className="flex justify-between border-b pb-2">
              <span className="capitalize font-medium">{category}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>

        <Link
          to="/saved-builds"
          className="block mt-6 text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
        >
          ⬅ Back to Saved Builds
        </Link>
      </div>
    </div>
  );
};

export default BuildDetails;
