import { Link } from "react-router-dom";
import { Header } from "../components/Header";

export const Home = () => {
  return (
    <>
      <div className="bg-zinc-900 h-screen">
        <Header />
        <div>
          <div className="flex flex-col items-center">
            <div className="text-neutral-100 font-medium text-5xl mt-24 mb-14">
              Get testimonials from your customers with ease
            </div>
            <div className="flex flex-col items-center">
              <div className="text-neutral-300 font-extralight text-xl">
                Collecting testimonials is hard, we get it! So we built
                Testimonial. In minutes, you can collect text
              </div>
              <div className="text-neutral-300 font-extralight pl-1">
                and video testimonials from your customers with no need for a
                developer or website hosting.
              </div>
            </div>
          </div>
        </div>
        <footer></footer>
      </div>
    </>
  );
};
