"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

export function AppBar() {
  const { user } = useUser();
  const pathname = usePathname(); // Get current pathname

  // Check if we're on a testimonial detail page
  const isTestimonialDetailPage = pathname?.startsWith("/testimonial/");

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TestimonialHub
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                Collect authentic feedback
              </span>
            </div>
          </Link>

          {/* Only show the rest if NOT on testimonial detail page */}
          {!isTestimonialDetailPage && (
            <>
              {/* Navigation Links for Signed In Users */}
              <SignedIn>
                <div className="hidden md:flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </div>
              </SignedIn>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <SignedOut>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <SignInButton mode="modal">
                      <button className="hidden sm:inline-flex text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm sm:text-base py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                        <span className="hidden sm:inline">Get Started</span>
                        <span className="sm:hidden">Sign Up</span>
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                      <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* User Profile */}
                    <div className="hidden sm:flex items-center gap-2 pl-4 sm:pl-6 border-l border-gray-200 bg-gradient-to-r from-blue-100  via-violet-100 to-blue-100 p-2 rounded-xl">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {user?.firstName}
                        </div>
                        <div className="text-xs text-gray-600">
                          {user?.primaryEmailAddress?.emailAddress}
                        </div>
                      </div>
                      <div className="relative">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox:
                                "w-9 h-9 sm:w-10 sm:h-10 border-2 border-blue-100",
                            },
                          }}
                        />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                    </div>

                    {/* Mobile User Button */}
                    <div className="sm:hidden">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8 border-2 border-blue-100",
                          },
                        }}
                      />
                    </div>
                  </div>
                </SignedIn>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu - Only show if NOT on testimonial detail page */}
        {!isTestimonialDetailPage && (
          <SignedIn>
            <div className="md:hidden py-3 border-t border-gray-200">
              <div className="flex items-center justify-around">
                <Link
                  href="/"
                  className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Home</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/testimonials"
                  className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          </SignedIn>
        )}
      </div>
    </nav>
  );
}
