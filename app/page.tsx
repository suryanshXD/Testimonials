"use client";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { useState, useEffect } from "react";

// Reusable Hover Animation Component
interface HoverCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverScale?: number;
  hoverY?: number;
  className?: string;
}

const HoverCard = ({
  children,
  hoverScale = 1.02,
  hoverY = -8,
  className = "",
  ...props
}: HoverCardProps) => {
  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Reusable Button Component with Hover Effects
interface HoverButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

const HoverButton = ({
  children,
  href,
  variant = "primary",
  className = "",
}: HoverButtonProps) => {
  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative font-semibold text-lg py-4 px-12 rounded-xl overflow-hidden transition-all ${className} ${
        variant === "primary"
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
          : "bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-transparent text-gray-800"
      }`}
    >
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
};

// Reusable Icon Container with Hover Rotation
const HoverIcon = ({
  children,
  color = "from-blue-500 to-cyan-500",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mb-6`}
    >
      {children}
    </motion.div>
  );
};

// Reusable Floating Animation
const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Reusable Pulsing Text
const PulsingText = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { isSignedIn } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const featureVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Features data for mapping
  const features = [
    {
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Create Multiple Spaces",
      desc: "Organize testimonials by product, service, or event. Each space gets its own beautiful collection page.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      title: "Video & Text Testimonials",
      desc: "Collect both video and written testimonials. Easy upload and management for all types of feedback.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Lightning Fast",
      desc: "Built for performance. Your testimonial pages load instantly across all devices and networks.",
      color: "from-green-500 to-teal-500",
    },
  ];

  const testimonials = [
    {
      initials: "JS",
      name: "John Smith",
      role: "CEO, TechStart Inc.",
      text: '"TestimonialHub transformed how we collect customer feedback. Our conversion rate increased by 40% after adding video testimonials!"',
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      initials: "SJ",
      name: "Sarah Johnson",
      role: "Marketing Director",
      text: '"The ease of use and beautiful design made our testimonial page look professional from day one. Our clients love submitting feedback!"',
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { value: "500+", label: "Happy Businesses" },
    { value: "50K+", label: "Testimonials Collected" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.8★", label: "Customer Rating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden relative">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Glassmorphism Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute glass-effect rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              background: `rgba(255, 255, 255, ${0.1 + i * 0.05})`,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <FloatingElement>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Trusted by 500+ businesses
                </span>
              </div>
            </FloatingElement>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight mb-8"
            >
              <span className="block text-gray-900">Collect Authentic</span>
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                  backgroundSize: "300% 300%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
                className="inline-block"
              >
                Testimonials Effortlessly
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 px-4"
            >
              Turn satisfied customers into your best marketers with beautiful,
              easy-to-use testimonial collection.
            </motion.p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isSignedIn ? (
              <div className="flex flex-col items-center gap-8">
                <HoverButton href="/dashboard">
                  Go to Dashboard
                  <motion.svg
                    className="w-5 h-5"
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </HoverButton>
                <PulsingText>
                  <p className="text-gray-500">
                    Welcome back! Manage your testimonials and spaces.
                  </p>
                </PulsingText>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <HoverButton href="/sign-up" variant="primary">
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
                    Get Started Free
                  </HoverButton>
                  <HoverButton href="/sign-in" variant="secondary">
                    Sign In
                    <motion.svg
                      className="w-5 h-5"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
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
                    </motion.svg>
                  </HoverButton>
                </div>
                <PulsingText delay={0.5}>
                  <p className="text-gray-500">
                    No credit card required • Start collecting in 2 minutes
                  </p>
                </PulsingText>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TestimonialHub?
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Everything you need to collect, manage, and showcase testimonials
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <HoverCard
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={featureVariants}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              hoverScale={1.05}
              hoverY={-12}
              className="glass-effect rounded-2xl p-8 backdrop-blur-sm border border-white/20"
            >
              <HoverIcon color={feature.color}>
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={feature.icon}
                  />
                </svg>
              </HoverIcon>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </HoverCard>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <HoverCard
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={statsVariants}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                hoverScale={1.1}
                hoverY={-5}
                className="glass-effect rounded-2xl p-8 backdrop-blur-sm border border-white/20"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/90">{stat.label}</div>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Preview */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            See What Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Users Say
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Join thousands of businesses that trust TestimonialHub
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <HoverCard
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={featureVariants}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              hoverScale={1.03}
              hoverY={-8}
              className="glass-effect rounded-2xl p-8 backdrop-blur-sm border border-white/20"
            >
              <div className="flex items-center gap-6 mb-8">
                <HoverIcon color={testimonial.gradient}>
                  <span className="text-white font-bold text-xl">
                    {testimonial.initials}
                  </span>
                </HoverIcon>
                <div>
                  <div className="font-bold text-gray-900 text-xl">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <PulsingText delay={index * 0.3}>
                <p className="text-gray-700 text-lg mb-6">{testimonial.text}</p>
              </PulsingText>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + index * 0.1 }}
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
            </HoverCard>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-16">
        <HoverCard
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            y: { duration: 4, repeat: Infinity },
            opacity: { duration: 0.8 },
          }}
          hoverScale={1.02}
          hoverY={-5}
          className="glass-effect rounded-3xl p-12 text-center backdrop-blur-sm border border-white/20"
        >
          <motion.h2
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Ready to Grow Your Business?
          </motion.h2>
          <p className="text-gray-600 text-xl mb-10">
            Start collecting authentic testimonials today
          </p>
          {isSignedIn ? (
            <HoverButton href="/dashboard" variant="primary">
              Go to Dashboard →
            </HoverButton>
          ) : (
            <HoverButton href="/sign-up" variant="primary">
              Get Started Free →
            </HoverButton>
          )}
        </HoverCard>
      </div>

      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        @media (max-width: 640px) {
          .glass-effect {
            background: rgba(255, 255, 255, 0.9);
          }
        }
      `}</style>
    </div>
  );
}
