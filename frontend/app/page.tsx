import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold max-w-4xl">
          AI-Powered Evaluation of Software Artifacts
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Automatically assess the quality of Software Requirement
          Specifications, source code, and LLM-generated test cases using
          structured evaluation metrics and explainable AI scoring.
        </p>

        <Link
          href="/evaluate"
          className="mt-8 inline-block rounded-md bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Start Evaluation
        </Link>
      </section>

      {/* What We Evaluate */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center">
          What This Platform Evaluates
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            title="SRS Documents"
            description="Evaluate completeness, consistency, ambiguity, and testability of Software Requirement Specifications."
          />
          <FeatureCard
            title="Source Code"
            description="Assess functional correctness, efficiency, maintainability, and edge-case coverage."
          />
          <FeatureCard
            title="LLM-Generated Test Cases"
            description="Measure coverage, relevance, redundancy, and robustness of generated test suites."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-6 py-20">
        <h2 className="text-3xl font-semibold text-center">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12 text-center">
          <Step label="1" title="Upload" description="Upload your artifact" />
          <Step label="2" title="Analyze" description="AI evaluates using GEval metrics" />
          <Step label="3" title="Score" description="Get quantitative scores" />
          <Step label="4" title="Explain" description="Receive detailed justifications" />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        Evaluation Engine v0.1 • Built with FastAPI & Next.js
      </footer>
    </main>
  );
}

/* ---------- Components ---------- */

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-gray-600">{description}</p>
    </div>
  );
}

function Step({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-xs">
      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
        {label}
      </div>
      <h4 className="mt-4 font-semibold">{title}</h4>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
