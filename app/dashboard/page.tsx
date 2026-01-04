"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { generateString } from "../utils/generateString";
import Link from "next/link";

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

    const url = `http://localhost:3000/testimonial/${slug}`;

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
      <div className="fixed inset-0 bg-neutral-50 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Create New Space
            </h2>
            <button
              onClick={() => setModal(false)}
              className="text-gray-400 hover:text-gray-600 transition duration-300 p-1"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Space Name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter space name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your space"
                rows={3}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-none"
              />
            </div>

            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0"
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
                <div>
                  <p className="text-xs sm:text-sm text-blue-800">
                    Your space URL will be generated automatically based on the
                    name you provide.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateSpace}
              disabled={isCreating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                  <span className="text-xs sm:text-sm">Creating...</span>
                </>
              ) : (
                "Create Space"
              )}
            </button>
          </div>
        </div>
      </div>
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
      setIsDeleting(true);
      await handleDeleteSpace(space_id);
      setIsDeleting(false);
    };

    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="p-4 sm:p-6">
          {/* Header with space name and actions */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-3 sm:mb-4">
            <Link href={`space/${space_id}`} className="group">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition duration-300 line-clamp-1">
                {name}
              </h3>
            </Link>
            <div className="flex justify-end gap-2">
              {/* Copy Button - Icon Only */}
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300"
                title={copied ? "Copied!" : "Copy URL"}
              >
                {copied ? (
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600"
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
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
              </button>

              {/* Delete Button - Icon Only */}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center justify-center px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete space"
              >
                {isDeleting ? (
                  <svg
                    className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4"
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
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 gap-3 sm:gap-0">
            <Link
              href={`space/${space_id}`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 transition duration-300 py-2 sm:py-0"
            >
              <span>View Space</span>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
              </svg>
            </Link>

            <Link
              href={`/testimonial/${slug}`}
              target="_blank"
              className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 transition duration-300 py-2 sm:py-0"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
              <span>Testimonial Page</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 sm:py-12 px-3 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Your Spaces
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Create and manage spaces to collect testimonials from your clients
          </p>
        </div>

        {/* Create Space Button */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
          <button
            onClick={handleModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg transition duration-300 flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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
            <span>Create New Space</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <svg
                className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-blue-600"
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
              <p className="text-gray-600 text-sm sm:text-base">
                Loading your spaces...
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && spaces.length === 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center mx-2 sm:mx-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
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
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
              No Spaces Yet
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto">
              Create your first space to start collecting testimonials from your
              clients and customers.
            </p>
            <button
              onClick={handleModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 inline-flex items-center gap-1.5 sm:gap-2"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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
            </button>
          </div>
        )}

        {/* Spaces Grid */}
        {!loading && spaces.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-2 sm:px-0">
            {spaces.map((space) => (
              <SpaceCard
                key={space.space_id}
                name={space.name}
                description={space.description}
                space_id={space.space_id}
                url={space.url}
                slug={space.slug}
              />
            ))}
          </div>
        )}

        {/* Info Section */}
        {spaces.length > 0 && (
          <div className="mt-8 sm:mt-10 md:mt-12 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mx-2 sm:mx-0">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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
              </div>
              <div className="w-full">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 text-center sm:text-left">
                  How it works
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <div className="font-medium text-gray-700 text-sm sm:text-base mb-1">
                      1. Create a Space
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Each space represents a product, service, or event.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <div className="font-medium text-gray-700 text-sm sm:text-base mb-1">
                      2. Share the URL
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Share your unique testimonial page link with clients.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <div className="font-medium text-gray-700 text-sm sm:text-base mb-1">
                      3. Collect Testimonials
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Clients can submit text or video testimonials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && <CreateSpace />}
    </div>
  );
}
