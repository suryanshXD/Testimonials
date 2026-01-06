"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageSquare, Video, Calendar } from "lucide-react";

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

export default function IframeTestimonialPage() {
  const params = useParams();
  const testimonial_id = params.id as string;

  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonial() {
      try {
        const res = await fetch(`/api/iframeTestimonial?id=${testimonial_id}`);

        if (res.ok) {
          const data = await res.json();
          setTestimonial(data);
        }
      } catch (err) {
        console.error("Error fetching testimonial:", err);
      } finally {
        setLoading(false);
      }
    }

    if (testimonial_id) {
      fetchTestimonial();
    }
  }, [testimonial_id]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="text-center p-4">
          <p className="text-gray-600">Testimonial not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Main testimonial card - Removed fixed width/height constraints */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-full h-full flex flex-col">
        {/* Header with decorative accent */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="pt-5 px-4">
            <div className="flex items-center gap-3">
              {/* Avatar with gradient */}
              <div className="relative">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {testimonial.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {testimonial.email}
                </p>
              </div>

              {/* Type icon */}
              <div
                className={`p-2 rounded-lg ${
                  testimonial.type === "VIDEO" ? "bg-purple-50" : "bg-blue-50"
                }`}
              >
                {testimonial.type === "VIDEO" ? (
                  <Video className="w-4 h-4 text-purple-600" />
                ) : (
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 px-4 pt-8 pb-3 overflow-hidden">
          {testimonial.type === "TEXT" && testimonial.content && (
            <div className="relative h-full">
              <div className="h-full overflow-y-auto">
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            </div>
          )}

          {testimonial.type === "VIDEO" && testimonial.videoUrl && (
            <div className="h-full flex items-center">
              <div className="relative w-full rounded-lg overflow-hidden bg-gray-900 shadow-md">
                <video
                  src={testimonial.videoUrl}
                  controls
                  controlsList="nodownload"
                  className="w-full h-auto max-h-[140px] object-cover rounded-lg"
                  preload="metadata"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer with date and branding */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-3 h-3" />
              <span className="text-xs font-medium">
                {new Date(testimonial.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Branding/logo */}

            <span className="text-xs text-gray-400 ml-1 font-medium">
              TestimonialHub
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
