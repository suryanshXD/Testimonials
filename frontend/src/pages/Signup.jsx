import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const [postInupt, setPostInput] = useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_REACT_API_URL;

  async function sendRequest() {
    const response = await axios.post(
      `${backend_url}/api/v1/user/signup`,
      postInupt
    );
    const jwt = response.data;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }

  return (
    <>
      <div className="h-screen bg-zinc-900 pt-34">
        <div className="relative mx-auto w-full max-w-md bg-zinc-800 px-6 pt-10 pb-8 shadow-sm  sm:rounded-xl sm:px-10">
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-4xl font-medium text-white">Sign up</h1>
              <p className="mt-2.5 text-neutral-100">
                Sign up below to create your account
              </p>
            </div>
            <div className="mt-5">
              <div className="relative mt-8">
                <input
                  onChange={(e) => {
                    setPostInput((c) => ({
                      ...c,
                      name: e.target.value,
                    }));
                  }}
                  placeholder="Name"
                  required
                  className="peer mt-1 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
                  Name
                </label>
              </div>
              <div className="relative mt-8">
                <input
                  onChange={(e) => {
                    setPostInput((c) => ({
                      ...c,
                      username: e.target.value,
                    }));
                  }}
                  placeholder="Username"
                  required
                  className="peer mt-1 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
                  Username
                </label>
              </div>
              <div className="relative mt-8">
                <input
                  onChange={(e) => {
                    setPostInput((c) => ({
                      ...c,
                      password: e.target.value,
                    }));
                  }}
                  placeholder="Password"
                  type="password"
                  required
                  className="peer mt-1 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
                  Password
                </label>
              </div>
              <div className="my-6">
                <button
                  onClick={sendRequest}
                  type="button"
                  className="w-full rounded-md bg-indigo-600 hover:bg-indigo-500 px-3 py-3 text-white"
                >
                  Create account
                </button>
              </div>
              <p className="text-center text-sm text-neutral-200">
                Already have an account?
                <Link
                  to="/signin"
                  className="font-semibold pl-1 text-neutral-200 underline"
                >
                  Login
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
