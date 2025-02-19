import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signin = () => {
  const backend_url = import.meta.env.VITE_REACT_API_URL;
  const [postInupt, setPostInput] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async () => {
    const response = await axios.post(
      `${backend_url}/api/v1/user/signin`,
      postInupt
    );
    const jwt = response.data;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="bg-zinc-900 h-screen pt-40">
        <div className="relative mx-auto w-full max-w-md px-6 pt-10 pb-8 bg-zinc-800 shadow-sm  ring-1 ring-zinc-500/5 sm:rounded-xl sm:px-10">
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-white">Sign in</h1>
              <p className="mt-2.5 text-neutral-100">
                Sign in below to access your account
              </p>
            </div>
            <div className="mt-8">
              <div className="relative mt-6">
                <input
                  onChange={(e) => {
                    setPostInput((c) => ({
                      ...c,
                      username: e.target.value,
                    }));
                  }}
                  placeholder="Email Address"
                  required
                  className="peer mt-1 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
                  Username
                </label>
              </div>
              <div className="relative mt-9">
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
                  className="peer peer mt-1.5 w-full border-b-2 text-neutral-100 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-neutral-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-100 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-neutral-100">
                  Password
                </label>
              </div>

              <div className="my-6">
                <button
                  onClick={sendRequest}
                  className="w-full rounded-md bg-indigo-600 hover:bg-indigo-500 px-3 py-3 text-white "
                >
                  Login
                </button>
              </div>
              <p className="text-center text-sm text-neutral-100">
                Don't have a account?
                <Link
                  to="/signup"
                  className="font-semibold pl-1 text-neutral-100 underline"
                >
                  Sign up
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
