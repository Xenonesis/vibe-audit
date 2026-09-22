import React from 'react';

export function SlopFeatureSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* AI Slop: Blurry glow background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-purple-600/30" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* AI Slop: Sparkle badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 shadow-purple-500/20">
          ✨ Next-Gen AI Platform ✨
        </span>

        {/* AI Slop: Cartoon emojis in headline */}
        <h2 className="mt-6 text-4xl font-bold tracking-tight">
          🚀 Supercharge Your Workflow With AI ⚡
        </h2>

        {/* AI Slop: Cliché marketing copy */}
        <p className="mt-4 text-lg text-gray-600">
          In today's fast-paced world, unlock the power of automated intelligence to seamlessly integrate and elevate your workflow.
        </p>

        {/* AI Slop: Purple glow button with emoji */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-purple-500/50">
            🔥 Get Started Free 💥
          </button>
        </div>
      </div>
    </section>
  );
}
