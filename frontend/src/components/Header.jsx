import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
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
          <div className="flex flex-row text-white">
            <div className="font-medium mt-1.5 text-lg hover:text-neutral-300">
              <Link to="/signin">Sign in</Link>
            </div>
            <div className="font-medium text-md bg-indigo-500 hover:bg-indigo-600 pt-1.5 pb-0.5 px-2 rounded-sm ml-10 mr-20">
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
