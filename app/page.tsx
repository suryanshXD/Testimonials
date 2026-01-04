"use client";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6 sm:mb-8">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-sm font-medium text-blue-700">
                  Trusted by 500+ businesses
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
                <span className="block text-gray-900">Collect Authentic</span>
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Testimonials Effortlessly
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
                Turn satisfied customers into your best marketers with
                beautiful, easy-to-use testimonial collection.
              </p>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              {isSignedIn ? (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  <Link href="/dashboard">
                    <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                      <span>Go to Dashboard</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </Link>
                  <p className="text-sm sm:text-base text-gray-500">
                    Welcome back! Manage your testimonials and spaces.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <Link href="/sign-up">
                      <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
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
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                        <span>Get Started Free</span>
                      </button>
                    </Link>
                    <Link href="/sign-in">
                      <button className="group border-2 border-gray-300 hover:border-blue-600 text-gray-800 hover:text-blue-600 font-semibold text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                        <span>Sign In</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                  <p className="text-sm sm:text-base text-gray-500">
                    No credit card required • Start collecting in 2 minutes
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose TestimonialHub?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to collect, manage, and showcase testimonials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600"
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
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Create Multiple Spaces
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Organize testimonials by product, service, or event. Each space
              gets its own beautiful collection page.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Video & Text Testimonials
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Collect both video and written testimonials. Easy upload and
              management for all types of feedback.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Built for performance. Your testimonial pages load instantly
              across all devices and networks.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 sm:py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                500+
              </div>
              <div className="text-sm sm:text-base opacity-90">
                Happy Businesses
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                50K+
              </div>
              <div className="text-sm sm:text-base opacity-90">
                Testimonials Collected
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                99.9%
              </div>
              <div className="text-sm sm:text-base opacity-90">Uptime</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                4.8★
              </div>
              <div className="text-sm sm:text-base opacity-90">
                Customer Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Preview */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See What Our Users Say
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Join thousands of businesses that trust TestimonialHub
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Testimonial Card 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div>
                <div className="font-semibold text-gray-900">John Smith</div>
                <div className="text-sm text-gray-600">CEO, TechStart Inc.</div>
              </div>
            </div>
            <p className="text-gray-700 italic mb-4">
              "TestimonialHub transformed how we collect customer feedback. Our
              conversion rate increased by 40% after adding video testimonials!"
            </p>
            <div className="flex text-yellow-400">{"★".repeat(5)}</div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                SJ
              </div>
              <div>
                <div className="font-semibold text-gray-900">Sarah Johnson</div>
                <div className="text-sm text-gray-600">Marketing Director</div>
              </div>
            </div>
            <p className="text-gray-700 italic mb-4">
              "The ease of use and beautiful design made our testimonial page
              look professional from day one. Our clients love submitting
              feedback!"
            </p>
            <div className="flex text-yellow-400">{"★".repeat(5)}</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 sm:py-16">
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            Start collecting authentic testimonials today
          </p>
          {isSignedIn ? (
            <Link href="/dashboard">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Go to Dashboard →
              </button>
            </Link>
          ) : (
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Get Started Free →
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Custom CSS for blob animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
