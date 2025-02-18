import { Link } from "react-router-dom";
import { Trash2, Link2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

export const SpaceCard = ({ space_id, name, description, url }) => {
  return (
    <div className="bg-zinc-800 w-full sm:w-80 md:w-96 lg:w-[400px] mx-auto mt-5 p-5 rounded-2xl shadow-lg">
      <Link to={`/space/${space_id}`}>
        <div className="text-white text-2xl font-semibold cursor-pointer hover:underline">
          {name}
        </div>
      </Link>
      <div className="text-neutral-200 text-sm sm:text-xs mt-2 line-clamp-3">
        {description}
      </div>
      <div className="text-neutral-300 flex flex-wrap justify-end gap-3 mt-3">
        <button onClick={() => copyUrl(url)}>
          <Link2
            size={20}
            className="cursor-pointer hover:text-white transition-colors"
          />
        </button>
        <button onClick={() => deleteSpace(space_id)}>
          <Trash2
            size={20}
            className="cursor-pointer hover:text-red-500 transition-colors"
          />
        </button>
      </div>
    </div>
  );
};

const copyUrl = async (url) => {
  await navigator.clipboard.writeText(url);
  toast(`URL Copied : ${url}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};

const deleteSpace = async (space_id) => {
  await axios.delete(`http://localhost:3000/api/v1/space/delete/${space_id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  toast.error(`Space Deleted`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
