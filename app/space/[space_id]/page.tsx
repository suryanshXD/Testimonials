"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Testimonial = {
  id: string;
  name: string;
  email: string;
  content?: string | null;
  videoUrl?: string | null;
  type: "TEXT" | "VIDEO";
  createdAt: string;
};

export default function SpaceTestimonialsPage() {
  const params = useParams();
  const space_id = params.space_id as string;

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(`/api/testimonials?space_id=${space_id}`);
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data = await res.json();
        setTestimonials(data);
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

  if (loading) {
    return <p className="p-4 text-gray-500">Loading testimonials...</p>;
  }

  if (testimonials.length === 0) {
    return (
      <p className="p-4 text-gray-500">No testimonials found for this space.</p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Testimonials</h1>
      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="p-4 border rounded-xl shadow-sm bg-white">
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm text-gray-500">{t.email}</p>

            {t.type === "TEXT" && (
              <p className="mt-2 text-gray-800">{t.content}</p>
            )}

            {t.type === "VIDEO" && t.videoUrl && (
              <video
                src={t.videoUrl}
                controls
                className="mt-2 rounded-lg w-full h-64"
              />
            )}

            <p className="text-xs text-gray-400 mt-2">
              Posted on {new Date(t.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
