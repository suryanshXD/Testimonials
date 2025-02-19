import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

export const Home = () => {
  return (
    <>
      <div className="bg-zinc-900 min-h-screen">
        <Header />
        <div>
          <div className="flex flex-col items-center">
            <div className="text-neutral-100 font-medium text-5xl mt-10 mb-10">
              Get testimonials from your customers with ease
            </div>
            <div className="flex flex-col items-center">
              <div className="text-neutral-300 font-extralight text-xl">
                Collecting testimonials is hard, we get it! So we built
                Testimonial. In minutes, you can collect text
              </div>
              <div className="text-neutral-300 font-extralight text-xl pt-1">
                testimonials from your customers with no need for a developer or
                website hosting.
              </div>
            </div>
            <div className="w-2xl mt-10 ring-1 ring-neutral-400 shadow-2xl shadow-neutral-200 mb-20">
              <img src={img1} />
            </div>
          </div>
          <div className="text-white text-4xl flex justify-center mt-25 mb-12">
            Get and see Testimonials from your customer and Embed them
          </div>
          <div className="flex flex-row justify-around  mb-40">
            <div className="w-xl shadow-2xl shadow-neutral-300 ring-1 ring-black">
              <img src={img2} />
            </div>
            <div className="w-xl shadow-2xl shadow-neutral-300 ring-1 ring-white">
              <img src={img3} />
            </div>
          </div>
        </div>
        <footer>
          <div className="bg-zinc-800 pt-10 pb-10 text-white text-center inset-x-0  bottom-0 flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col ml-20">
                <div className="pl-16 flex flex-row">
                  <div className="size-10">
                    <img src="https://cdn.prod.website-files.com/5e9dc792e1210c5325f7ebbc/63fb43f256c0701578ad0b27_just-logo.svg" />
                  </div>
                  <div className="font-bold text-2xl pt-0.5 text-white">
                    Testimonials
                  </div>
                </div>
                <div className="ml-10 mt-1">
                  The easiest solution to getting text
                </div>
                <div className="ml-10">testimonials from your customers</div>
              </div>
              <div className="mr-50 mt-3">
                <Link
                  to="https://www.instagram.com/suryanshvaish_45"
                  target="_blank"
                >
                  <div className="flex flex-row items-center gap-2 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <div className="text-lg">Instagram</div>
                  </div>
                </Link>
                <Link to="https://x.com/suryanshvaish27" target="_blank">
                  <div className="flex flex-row items-center gap-2 cursor-pointer mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <div className="text-lg ml-4">X</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
