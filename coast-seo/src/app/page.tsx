import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[80vh] bg-white flex items-center justify-center">
      <div className="w-full max-w-5xl px-8 py-32 text-center">
        {/* Hero */}
        <h1 className="text-6xl md:text-7xl font-bold text-[#1a1a2e] mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
          University Past Papers
        </h1>
        <p className="text-2xl text-[#555] max-w-3xl mx-auto mb-20 leading-relaxed">
          Access past exam papers and AI-powered solutions for your university courses. 
          Study smarter, not harder.
        </p>

        {/* CTA */}
        <Link
          href="/university"
          className="inline-flex items-center gap-4 px-12 py-6 bg-[#f5a623] hover:bg-[#e09612] text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-xl"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Browse Universities
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
