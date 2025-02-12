import { Link } from "react-router-dom";

export const SpaceCard = ({ space_id, name, description, url }) => {
  return (
    <>
      <Link to={`/space/${space_id}`}>
        <div className="bg-zinc-800 ml-10 max-w-sm mt-5 py-5 px-6 cursor-pointer">
          <div className="text-white text-2xl font-semibold">{name}</div>
          <div className="text-neutral-200 text-xs mt-2">{description}</div>
          <div className="text-neutral-200 text-sm">{url}</div>
        </div>
      </Link>
    </>
  );
};
