"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;

  const supabase = createClient(
    "https://dxjtwqzuhpsnldtzetbk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4anR3cXp1aHBzbmxkdHpldGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5Njc1MjAsImV4cCI6MjA3MTU0MzUyMH0.ILefRvOV9Ba9fh8EtUWI8l75-N8z4rI4ef9L7sYJMJc"
  );

  const [space_id, setSpace_id] = useState<string | null>(null);
  const [preview, setPreview] = useState<"text" | "video">("text");
  const [show, setShow] = useState<"card" | "message">("card");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSpaceId() {
      const res = await fetch(`/api/spaceBySlug?slug=${slug}`);
      const data = await res.json();
      if (data?.space_id) {
        setSpace_id(data.space_id);
      }
    }

    if (slug) fetchSpaceId();
  }, [slug]);

  // Text-Testimonial
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  async function handleText() {
    if (!name || !email || !content) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/textTestimonial`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        content,
        space_id,
        type: "TEXT",
      }),
    });
    if (res.ok) {
      setShow("message");
    }
    setLoading(false);
  }

  // Video-Testimonial
  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill in your name and email");
      return;
    }

    if (!videoFile) {
      alert("Please select a video file first!");
      return;
    }

    if (videoFile.size > 50 * 1024 * 1024) {
      alert("File size must be less than 50MB");
      return;
    }

    setLoading(true);
    const fileName = uuidv4() + ".mp4";

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("videos")
      .upload(fileName, videoFile);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      alert("Error uploading file");
      setLoading(false);
      return;
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("videos")
      .getPublicUrl(fileName);

    const videoUrl = publicData?.publicUrl;

    if (!videoUrl) {
      alert("Bucket might not be public. Please check Supabase settings.");
      setLoading(false);
      return;
    }

    // Save metadata in DB
    const res = await fetch(`/api/videoTestimonial`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        videoUrl,
        space_id,
        type: "VIDEO",
      }),
    });

    if (res.ok) {
      setShow("message");
    } else {
      alert("Error saving video testimonial in DB");
    }
    setLoading(false);
  }

  if (show === "message") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center p-6">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-effect rounded-2xl shadow-2xl p-8 text-center max-w-md w-full border border-white/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-8">
            Your testimonial has been submitted successfully. We appreciate you
            taking the time to share your experience!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShow("card");
              setName("");
              setEmail("");
              setContent("");
              setVideoFile(null);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Submit Another Testimonial
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Share Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Write or record a testimonial about your experience with this space
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-1.5 max-w-md mx-auto mb-12 border border-white/20"
        >
          <div className="flex items-center">
            <button
              onClick={() => setPreview("text")}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                preview === "text"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Text
            </button>
            <button
              onClick={() => setPreview("video")}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                preview === "video"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Video
            </button>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl shadow-xl p-8 border border-white/20"
        >
          <AnimatePresence mode="wait">
            {preview === "text" ? (
              <motion.div
                key="text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Write Your Testimonial
                  </h2>
                  <p className="text-gray-600">
                    Share your thoughts and experience in your own words
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Testimonial <span className="text-red-500">*</span>
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your experience, what you liked, and any memorable moments..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 bg-white/50 backdrop-blur-sm resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleText}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {loading ? (
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
                        Submitting...
                      </>
                    ) : (
                      "Submit Testimonial"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="video"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleUpload}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Record Video Testimonial
                  </h2>
                  <p className="text-gray-600">
                    Upload a video sharing your experience (Max 50MB)
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video File <span className="text-red-500">*</span>
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-500 transition duration-300 cursor-pointer bg-white/30 backdrop-blur-sm"
                      onClick={() =>
                        document.getElementById("video-upload")?.click()
                      }
                    >
                      <div className="space-y-3 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-purple-600 hover:text-purple-500">
                            <span>Upload a file</span>
                            <input
                              id="video-upload"
                              type="file"
                              accept="video/mp4"
                              onChange={(e) =>
                                setVideoFile(e.target.files?.[0] || null)
                              }
                              className="sr-only"
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          MP4 video up to 50MB
                        </p>
                        {videoFile && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100"
                          >
                            <p className="text-sm font-medium text-green-800">
                              Selected: {videoFile.name} (
                              {(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <div className="glass-effect rounded-xl p-4 border border-white/20">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          Tips for a great video testimonial:
                        </h3>
                        <div className="mt-2 text-sm text-gray-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Record in a quiet, well-lit environment</li>
                            <li>Keep it under 2 minutes for best results</li>
                            <li>Share specific experiences and stories</li>
                            <li>Speak clearly and naturally</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {loading ? (
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
                        Uploading...
                      </>
                    ) : (
                      "Upload Video Testimonial"
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>
            Your testimonial will be reviewed and may be featured on our
            website.
          </p>
          <p className="mt-1">
            We respect your privacy and will not share your contact information.
          </p>
        </motion.div>
      </div>

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
