import { Link } from "react-router-dom";
import { FolderLogo } from "../components/FolderLogo";
import { useState } from "react";
import { CreateSpaceModel } from "../components/CreateSpaceModal";
import { AuthHeader } from "../components/AuthHeader";
import { SpaceCard } from "../components/SpaceCard";
import { userSpaces } from "../hooks/Hooks";

export const Dashboard = () => {
  const { spaces } = userSpaces();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <div className="bg-zinc-900 min-h-screen">
          <AuthHeader />
          <div>
            <div>
              <div className="text-white text-3xl font-semibold ml-60 mt-10 mb-1.5">
                Spaces
              </div>
              <div className="bg-zinc-800 pt-10 pb-10 mx-56">
                <div className="flex flex-col items-center">
                  <FolderLogo />
                  <div className="text-white text-lg pt-0.5 mt-1">
                    Create your space to start collecting your testimonials
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-white text-md bg-indigo-600 py-1 px-3 rounded-sm mt-6"
                  >
                    Create new space
                  </button>
                  {showModal && (
                    <CreateSpaceModel
                      onClose={() => {
                        setShowModal(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-white text-3xl font-bold mt-30 ml-36">
            Overview
          </div>
          <div className="grid grid-cols-3 ml-20 pb-20">
            {spaces.map((space) => (
              <SpaceCard
                space_id={space.space_id}
                name={space.name}
                description={space.description}
                url={space.url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
