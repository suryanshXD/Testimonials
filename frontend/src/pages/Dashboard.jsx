import { Link } from "react-router-dom";
import { FolderLogo } from "../components/FolderLogo";
import { useState } from "react";
import { CreateSpaceModel } from "../components/CreateSpaceModal";

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <div className="h-screen bg-zinc-900">
          <header>
            <div className="flex flex-row justify-between py-6 shadow-xl ">
              <div>
                <div className="pl-16 flex flex-row">
                  <div className="size-10">
                    <img src="https://cdn.prod.website-files.com/5e9dc792e1210c5325f7ebbc/63fb43f256c0701578ad0b27_just-logo.svg" />
                  </div>
                  <div className="font-bold text-2xl pt-0.5 text-white">
                    Testimonials
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-full bg-white px-4.5 py-2 mr-12 text-lg">
                  S
                </div>
              </div>
            </div>
          </header>
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
        </div>
      </div>
    </>
  );
};
