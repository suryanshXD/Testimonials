// import axios from "axios";
// import { X } from "lucide-react";
// import { useState } from "react";

// export const CreateSpaceModel = ({ onClose }) => {
//   const [spaceInput, setPostInput] = useState({
//     name: "",
//     description: "",
//   });

//   const backend_url = import.meta.env.VITE_REACT_API_URL;

//   const sendRequest = async () => {
//     try {
//       const response = await axios.post(
//         `${backend_url}/api/v1/space/create`,
//         spaceInput,
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         }
//       );
//       onClose();
//     } catch (error) {
//       console.error("Error creating space:", error);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-zinc-800 mx-110 my-32">
//         <div className="flex flex-col items-end">
//           <button
//             onClick={onClose}
//             className="mr-3 mt-3 text-neutral-200 hover:text-white cursor-pointer"
//           >
//             <X size={25} />
//           </button>
//         </div>
//         <div className="relative mx-auto max-w-md mt-5">
//           <div className="w-full">
//             <div className="text-center">
//               <h1 className="text-3xl font-semibold text-white">
//                 Create your custom space here
//               </h1>
//             </div>
//             <div className="mt-20">
//               <div className="relative mt-6">
//                 <input
//                   onChange={(e) => {
//                     setPostInput((c) => ({
//                       ...c,
//                       name: e.target.value,
//                     }));
//                   }}
//                   placeholder="Name"
//                   className="peer mt-1 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
//                 />
//                 <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
//                   Name
//                 </label>
//               </div>
//               <div className="relative mt-10">
//                 <input
//                   onChange={(e) => {
//                     setPostInput((c) => ({
//                       ...c,
//                       description: e.target.value,
//                     }));
//                   }}
//                   placeholder="Description"
//                   className="peer mt-1.5 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
//                 />
//                 <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
//                   Description
//                 </label>
//               </div>

//               <div className="mt-12">
//                 <button
//                   onClick={sendRequest}
//                   className="w-full cursor-pointer rounded-md bg-indigo-600 hover:bg-indigo-500 px-3 py-3 text-white"
//                 >
//                   Create new space
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

export const CreateSpaceModel = ({ onClose }) => {
  const [spaceInput, setSpaceInput] = useState({
    name: "",
    description: "",
  });

  const backend_url = import.meta.env.VITE_REACT_API_URL;

  const sendRequest = async () => {
    try {
      await axios.post(`${backend_url}/api/v1/space/create`, spaceInput, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      onClose();
    } catch (error) {
      console.error("Error creating space:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 overflow-hidden">
      <div className="relative w-full max-w-md bg-zinc-900 rounded-xl shadow-2xl p-8 border border-zinc-700 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-300 hover:text-white transition"
        >
          <X size={25} />
        </button>
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Your Space
        </h1>
        <div className="space-y-6">
          <div className="relative">
            <input
              onChange={(e) =>
                setSpaceInput((c) => ({ ...c, name: e.target.value }))
              }
              placeholder="Name"
              className="peer w-full border-b-2 border-gray-500 bg-transparent py-3 text-white placeholder-transparent focus:border-indigo-500 focus:outline-none"
            />
            <label className="absolute left-0 top-0 text-sm text-gray-400 transition-all duration-200 ease-in-out peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-white">
              Name
            </label>
          </div>
          <div className="relative">
            <input
              onChange={(e) =>
                setSpaceInput((c) => ({ ...c, description: e.target.value }))
              }
              placeholder="Description"
              className="peer w-full border-b-2 border-gray-500 bg-transparent py-3 text-white placeholder-transparent focus:border-indigo-500 focus:outline-none"
            />
            <label className="absolute left-0 top-0 text-sm text-gray-400 transition-all duration-200 ease-in-out peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-white">
              Description
            </label>
          </div>
          <button
            onClick={sendRequest}
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-lg font-semibold text-white hover:bg-indigo-500 transition-all"
          >
            Create Space
          </button>
        </div>
      </div>
    </div>
  );
};
