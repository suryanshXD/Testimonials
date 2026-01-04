"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, HeartOff, Star } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  email: string;
  content?: string | null;
  videoUrl?: string | null;
  type: "TEXT" | "VIDEO";
  createdAt: string;
  isLiked?: boolean;
};

type TabType = "all" | "liked";

export default function SpaceTestimonialsPage() {
  const params = useParams();
  const space_id = params.space_id as string;

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [likedTestimonials, setLikedTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [likingId, setLikingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const [testimonialsRes, likedRes] = await Promise.all([
          fetch(`/api/testimonials?space_id=${space_id}`),
          fetch(`/api/testimonials/liked?space_id=${space_id}`),
        ]);

        if (!testimonialsRes.ok)
          throw new Error("Failed to fetch testimonials");
        const testimonialsData = await testimonialsRes.json();

        // Mark testimonials that are liked
        if (likedRes.ok) {
          const likedData = await likedRes.json();
          const likedIds = new Set(likedData.map((t: Testimonial) => t.id));
          const testimonialsWithLikes = testimonialsData.map(
            (testimonial: Testimonial) => ({
              ...testimonial,
              isLiked: likedIds.has(testimonial.id),
            })
          );
          setTestimonials(testimonialsWithLikes);
          setLikedTestimonials(
            likedData.map((t: Testimonial) => ({ ...t, isLiked: true }))
          );
        } else {
          setTestimonials(testimonialsData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (space_id) {
      fetchTestimonials();
    }
  }, [space_id]);

  const handleLikeToggle = async (
    testimonialId: string,
    currentlyLiked: boolean
  ) => {
    setLikingId(testimonialId);
    try {
      const method = currentlyLiked ? "DELETE" : "POST";
      const response = await fetch(`/api/testimonials/like`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testimonial_id: testimonialId,
          space_id,
        }),
      });

      if (response.ok) {
        // Update testimonials list
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === testimonialId ? { ...t, isLiked: !currentlyLiked } : t
          )
        );

        // Update liked testimonials list
        if (currentlyLiked) {
          setLikedTestimonials((prev) =>
            prev.filter((t) => t.id !== testimonialId)
          );
        } else {
          const testimonialToAdd = testimonials.find(
            (t) => t.id === testimonialId
          );
          if (testimonialToAdd) {
            setLikedTestimonials((prev) => [
              ...prev,
              { ...testimonialToAdd, isLiked: true },
            ]);
          }
        }
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLikingId(null);
    }
  };

  const displayTestimonials =
    activeTab === "liked" ? likedTestimonials : testimonials;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full"
          />
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
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
            Testimonials
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            What people are saying about your space
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-1.5 max-w-md mx-auto mb-12 border border-white/20"
        >
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              All Testimonials
            </button>
            <button
              onClick={() => setActiveTab("liked")}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "liked"
                  ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <Heart className="h-4 w-4" />
              Liked
            </button>
          </div>
        </motion.div>

        {/* Liked Banner */}
        <AnimatePresence>
          {activeTab === "liked" && likedTestimonials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 glass-effect rounded-2xl p-6 border border-white/20 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Your Favorite Testimonials
                  </h3>
                  <p className="text-gray-600">
                    {likedTestimonials.length} testimonial
                    {likedTestimonials.length !== 1 ? "s" : ""} liked
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence mode="wait">
          {displayTestimonials.length === 0 && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-effect rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-white/20"
            >
              {activeTab === "liked" ? (
                <>
                  <div className="w-24 h-24 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-12 w-12 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No liked testimonials yet
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Like testimonials to see them here
                  </p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="h-12 w-12 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No testimonials yet
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Share your space to collect testimonials
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid */}
        {displayTestimonials.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayTestimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
                className="glass-effect rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  minHeight: t.type === "VIDEO" ? "420px" : "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="p-6 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {t.name}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {t.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLikeToggle(t.id, t.isLiked || false)}
                      disabled={likingId === t.id}
                      className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                        t.isLiked
                          ? "bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600"
                          : "bg-white/50 text-gray-400 hover:text-gray-600"
                      } ${
                        likingId === t.id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {likingId === t.id ? (
                        <div className="h-5 w-5 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
                      ) : t.isLiked ? (
                        <Heart className="h-5 w-5 fill-current" />
                      ) : (
                        <Heart className="h-5 w-5" />
                      )}
                    </motion.button>
                  </div>

                  {/* Content Area - Dynamic Height */}
                  <div className="flex-1 min-h-0 mb-4">
                    {t.type === "TEXT" && t.content && (
                      <div className="h-full overflow-hidden">
                        <p className="text-gray-900 font-medium leading-relaxed text-[16px]  tracking-wide">
                          {t.content}
                        </p>
                      </div>
                    )}

                    {t.type === "VIDEO" && t.videoUrl && (
                      <div className="h-full">
                        <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-gray-900">
                          <video
                            src={t.videoUrl}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-white/30 mt-auto">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          t.type === "VIDEO"
                            ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700"
                            : "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700"
                        }`}
                      >
                        {t.type}
                      </span>
                      <p className="text-xs text-gray-500">
                        {new Date(t.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
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
