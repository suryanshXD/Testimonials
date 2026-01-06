"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { generateString } from "../utils/generateString";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface spaceProps {
  space_id: string;
  name: string;
  description: string;
  url: string;
  slug: string;
}

export default function Page() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [spaces, setSpaces] = useState<spaceProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchSpaces = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/getSpaces?userID=${user.id}`);
        const data = await res.json();
        setSpaces(data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, [user?.id]);

  function handleModal() {
    setModal(true);
  }

  const handleDeleteSpace = async (spaceId: string) => {
    try {
      const res = await fetch(
        `/api/deleteSpace?spaceId=${spaceId}&userId=${user?.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setSpaces((prev) => prev.filter((space) => space.space_id !== spaceId));
      } else {
        throw new Error("Failed to delete space");
      }
    } catch (error) {
      console.error("Error deleting space:", error);
      alert("Failed to delete space. Please try again.");
    }
  };

  function CreateSpace() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isCreating, setIsCreating] = useState(false);
    const slug = `${generateString()}-${name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")}-${generateString()}`;

    const url = `${window.location.origin}/testimonial/${slug}`;

    async function handleCreateSpace() {
      if (!name.trim() || !description.trim()) {
        alert("Please fill in all fields");
        return;
      }

      setIsCreating(true);
      try {
        const res = await fetch("/api/space", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            slug,
            url,
            adminId: user?.id,
          }),
        });

        if (res.ok) {
          const newSpace = await res.json();
          setSpaces((prev) => [...prev, newSpace]);
          setModal(false);
          setName("");
          setDescription("");
        } else {
          throw new Error("Failed to create space");
        }
      } catch (error) {
        console.error("Error creating space:", error);
        alert("Failed to create space. Please try again.");
      } finally {
        setIsCreating(false);
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create New Space
            </h2>
            <button
              onClick={() => setModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white/30 transition duration-300"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Space Name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter space name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your space"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 bg-white/50 backdrop-blur-sm resize-none"
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-4 rounded-xl border border-white/30">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-gray-700">
                  Your space URL will be generated automatically based on the
                  name you provide.
                </p>
              </div>
            </div>

            <button
              onClick={handleCreateSpace}
              disabled={isCreating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                "Create Space"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  function SpaceCard({ space_id, name, description, url, slug }: spaceProps) {
    const [copied, setCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async () => {
      if (!confirm("Are you sure you want to delete this space?")) return;
      setIsDeleting(true);
      await handleDeleteSpace(space_id);
      setIsDeleting(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <Link href={`space/${space_id}`} className="group">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition duration-300 line-clamp-1">
                {name}
              </h3>
            </Link>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/70 transition duration-300"
                title={copied ? "Copied!" : "Copy URL"}
              >
                {copied ? (
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 rounded-lg bg-red-50/50 backdrop-blur-sm hover:bg-red-100/50 transition duration-300 disabled:opacity-50"
                title="Delete space"
              >
                {isDeleting ? (
                  <svg
                    className="animate-spin h-4 w-4 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>

          <p className="text-gray-600 mb-6 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between pt-4 border-t border-white/30">
            <Link
              href={`space/${space_id}`}
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 transition duration-300 group"
            >
              <span>View Space</span>
              <motion.svg
                className="w-4 h-4"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </Link>

            <Link
              href={`/testimonial/${slug}`}
              target="_blank"
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2 transition duration-300"
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>Preview</span>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Spaces
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create and manage spaces to collect testimonials from your clients
          </p>
        </motion.div>

        {/* Create Space Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleModal}
            className="glass-effect border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="flex items-center gap-3 px-8 py-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Space
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="flex flex-col items-center gap-4">
              <svg
                className="animate-spin h-12 w-12 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-gray-600">Loading your spaces...</p>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && spaces.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-white/20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-purple-600"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Spaces Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create your first space to start collecting testimonials from your
              clients and customers.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleModal}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Your First Space
            </motion.button>
          </motion.div>
        )}

        {/* Spaces Grid */}
        {!loading && spaces.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {spaces.map((space, index) => (
              <motion.div
                key={space.space_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SpaceCard
                  name={space.name}
                  description={space.description}
                  space_id={space.space_id}
                  url={space.url}
                  slug={space.slug}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Info Section */}
        {spaces.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 glass-effect rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  How it works
                </h3>
                <p className="text-gray-600">
                  Follow these simple steps to collect testimonials
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "1. Create a Space",
                  description:
                    "Each space represents a product, service, or event.",
                  icon: "M12 4v16m8-8H4",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  title: "2. Share the URL",
                  description:
                    "Share your unique testimonial page link with clients.",
                  icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "3. Collect Testimonials",
                  description: "Clients can submit text or video testimonials.",
                  icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
                  color: "from-green-500 to-teal-500",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  whileHover={{ y: -5 }}
                  className="glass-effect rounded-xl p-6 border border-white/20"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={step.icon}
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>{modal && <CreateSpace />}</AnimatePresence>

      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
}
