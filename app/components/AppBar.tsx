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
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

export function AppBar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on iframe routes (hide navbar completely)
  const isIframePage = pathname?.startsWith("/iframe/");

  // Check if we're on testimonial detail pages (show only logo)
  const isTestimonialDetailPage = pathname?.startsWith("/testimonial/");

  // Return null if we're on iframe page (completely hide navbar)
  if (isIframePage) {
    return null;
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo - Always show on all pages */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                animate={{
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
                className="relative"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TestimonialHub
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">
                  Collect authentic feedback
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Only show navigation and auth section if NOT on testimonial detail page */}
          {!isTestimonialDetailPage && (
            <>
              {/* Navigation Links for Signed In Users */}
              <SignedIn>
                <div className="hidden md:flex items-center gap-8">
                  {[
                    {
                      href: "/",
                      label: "Home",
                      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                    },
                    {
                      href: "/dashboard",
                      label: "Dashboard",
                      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                    },
                    {
                      href: "/contact",
                      label: "Contact",
                      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                    >
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
                          d={link.icon}
                        />
                      </svg>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SignedIn>

              {/* Auth Section */}
              <div className="flex items-center gap-3 sm:gap-4">
                <SignedOut>
                  <div className="flex items-center gap-3">
                    {/* Sign In Button */}
                    <SignInButton mode="modal">
                      <button className="hidden sm:inline-flex text-sm font-medium text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg hover:bg-white/50 transition-all duration-200">
                        Sign In
                      </button>
                    </SignInButton>

                    {/* Get Started Button */}
                    <SignUpButton mode="modal">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-5 sm:px-7 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
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
                  <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                      <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-700 hover:text-purple-600 hover:bg-white/50 rounded-lg transition-colors duration-200"
                      >
                        <svg
                          className="w-6 h-6"
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

                    {/* Simplified User Profile - Desktop */}
                    <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.primaryEmailAddress?.emailAddress}
                        </div>
                      </div>

                      {/* Clean User Button */}
                      <div className="relative">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox:
                                "w-10 h-10 rounded-xl border-2 border-white/50",
                              avatarImage: "rounded-lg",
                              userButtonPopoverCard:
                                "rounded-xl border border-white/20 shadow-xl",
                            },
                          }}
                          afterSignOutUrl="/"
                        />
                      </div>
                    </div>

                    {/* Mobile User Button */}
                    <div className="md:hidden">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox:
                              "w-9 h-9 rounded-lg border-2 border-white/30",
                            avatarImage: "rounded-lg",
                          },
                        }}
                        afterSignOutUrl="/"
                      />
                    </div>
                  </div>
                </SignedIn>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu - Only show if NOT on testimonial detail page */}
        <AnimatePresence>
          {isMobileMenuOpen && !isTestimonialDetailPage && (
            <SignedIn>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        href: "/",
                        label: "Home",
                        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                      },
                      {
                        href: "/dashboard",
                        label: "Dashboard",
                        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                      },
                      {
                        href: "/contact",
                        label: "Contact",
                        icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                      },
                    ].map((link, index) => (
                      <motion.div
                        key={link.href}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex flex-col items-center gap-1 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5 text-gray-700 mb-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={link.icon}
                            />
                          </svg>
                          <span className="text-xs font-medium text-gray-700">
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* User Info in Mobile Menu */}
                  {user && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 p-4 rounded-lg bg-white/70 border border-white/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium">
                            {user.firstName?.[0]}
                            {user.lastName?.[0]}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-[140px]">
                              {user.primaryEmailAddress?.emailAddress}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </SignedIn>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
