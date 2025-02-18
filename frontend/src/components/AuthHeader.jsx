import { UserRound } from "lucide-react";

export const AuthHeader = () => {
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
          <div>
            <div className="rounded-full bg-white p-2.5 mr-12 text-lg cursor-pointer">
              <UserRound />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
