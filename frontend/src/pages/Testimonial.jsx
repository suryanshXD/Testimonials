import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Testimonial = () => {
  const { slug } = useParams();

  const [space, setSpace] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const backend_url = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    axios
      .get(`${backend_url}/api/v1/space/${slug}`)
      .then((response) => setSpace(response.data));
  }, [slug]);

  const sendRequest = async () => {
    await axios.post(`${backend_url}/api/v1/testimonial/create`, {
      slug: space.slug,
      name,
      email,
      description,
    });
  };

  return (
    <>
      <div className="bg-neutral-200">
        <div className="min-h-screen">
          <header>
            <div className="pt-6 pb-4 pl-12 shadow-xs shadow-neutral-500 flex flex-row">
              <div className="size-10">
                <img src="https://cdn.prod.website-files.com/5e9dc792e1210c5325f7ebbc/63fb43f256c0701578ad0b27_just-logo.svg" />
              </div>
              <div className="font-bold text-2xl pt-0.5 text-stone-600">
                Testimonials
              </div>
            </div>
          </header>
          <div className="flex flex-row justify-evenly">
            <div className="flex flex-col items-center ml-20">
              <div className="text-5xl mt-60">{space.name}</div>
              <div className="mt-4 text-lg text-stone-600">
                {space.description}
              </div>
            </div>
            <div>
              <div className="flex flex-col items-start"></div>
            </div>
            <div className="">
              <div className="min-w-lg mt-20 ml-30 pb-4 shadow-2xl shadow-stone-500 ">
                <div className="px-8 pt-8">
                  <div className="font-semibold text-2xl ml-14">
                    Write your Testimonial here
                  </div>
                  <div className="pt-10">
                    <form>
                      <div className="relative mt-10">
                        <input
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          className="peer mt-3 w-full border-b-2 text-black border-gray-500 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        />
                        <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-black opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-md peer-focus:text-black">
                          Name
                        </label>
                      </div>
                      <div className="relative mt-14">
                        <input
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="peer mt-3 w-full border-b-2 text-black border-gray-500 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        />
                        <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-black opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-black">
                          Email
                        </label>
                      </div>
                      <div className="relative mt-14">
                        <textarea
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          className="peer mt-3 w-full border-b-2 text-black border-gray-500 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                        />
                        <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-black opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-black">
                          Write your review here
                        </label>
                      </div>
                      <div className="flex flex-row justify-end mt-8 ">
                        <button
                          onClick={sendRequest}
                          className=" text-neutral-50 py-2 px-6 rounded-sm bg-indigo-500 hover:bg-indigo-600 mr-2 cursor-pointer ring-1 ring-indigo-600"
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
