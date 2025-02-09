import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export const CreateSpaceModel = ({ onClose }) => {
  const [spaceInput, setPostInput] = useState({
    name: "",
    description: "",
  });
  const [url, setUrl] = useState("");

  const sendRequest = async () => {
    const response = await axios.post(
      `http://localhost:3000/api/v1/space/create`,
      spaceInput,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setUrl(response.data.url);
  };

  return (
    <>
      <div className="fixed inset-0 bg-zinc-800  mx-110 my-32 ">
        <div className="flex flex-col items-end">
          <button
            onClick={onClose}
            className="mr-3 mt-3 text-neutral-200 hover:text-white cursor-pointer"
          >
            <X size={25} />
          </button>
        </div>
        <div className="relative mx-auto  max-w-md mt-5 ">
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-white">
                Create your custom space here
              </h1>
            </div>
            <div className="mt-20">
              <div className="relative mt-6">
                <input
                  onChange={(e) => {
                    setPostInput((c) => ({
                      ...c,
                      name: e.target.value,
                    }));
                  }}
                  placeholder="Name"
                  className="peer mt-1 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
                  Name
                </label>
              </div>
              <div className="relative mt-10">
                <input
                  onChange={(e) => {
                    setPostInput((c) => ({
                      ...c,
                      description: e.target.value,
                    }));
                  }}
                  placeholder="Description"
                  className="peer peer mt-1.5 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
                  Description
                </label>
              </div>

              <div className="mt-12">
                <button
                  onClick={sendRequest}
                  className="w-full cursor-pointer rounded-md bg-indigo-600 hover:bg-indigo-500 px-3 py-3 text-white "
                >
                  Create new space
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
