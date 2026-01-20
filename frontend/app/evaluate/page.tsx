"use client";

import { useState } from "react";

type EvalType = "srs" | "code" | "test_cases";

export default function EvaluatePage() {
  const [evalType, setEvalType] = useState<EvalType>("srs");

  const [srsFile, setSrsFile] = useState<File | null>(null);
  const [codeFile, setCodeFile] = useState<File | null>(null);
  const [problemFile, setProblemFile] = useState<File | null>(null);
  const [testcaseFile, setTestcaseFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateInputs = (): boolean => {
    if (evalType === "srs" && !srsFile) {
      setMessage("Please upload the SRS document.");
      return false;
    }

    if (evalType === "code" && !codeFile) {
      setMessage("Please upload the source code file.");
      return false;
    }

    if (evalType === "test_cases" && (!problemFile || !testcaseFile)) {
      setMessage("Please upload both problem description and test cases.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setMessage("");

    if (!validateInputs()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("type", evalType);

    if (evalType === "srs" && srsFile) {
      formData.append("srs_file", srsFile);
    }

    if (evalType === "code" && codeFile) {
      formData.append("code_file", codeFile);
    }

    if (evalType === "test_cases" && problemFile && testcaseFile) {
      formData.append("problem_file", problemFile);
      formData.append("testcase_file", testcaseFile);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/evaluate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");

      const data = await res.json();
      setMessage(`Evaluation started. Job ID: ${data.job_id}`);
    } catch {
      setMessage("Failed to submit evaluation request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-20">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md border p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Evaluate Software Artifact
        </h1>

        {/* Evaluation Type */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-800">
            Evaluation Type
          </label>
          <select
            className="mt-2 w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
            value={evalType}
            onChange={(e) => setEvalType(e.target.value as EvalType)}
          >
            <option value="srs">SRS Evaluation</option>
            <option value="code">Code Evaluation</option>
            <option value="test_cases">Test Case Evaluation</option>
          </select>
        </div>

        {/* Conditional Inputs */}
        {evalType === "srs" && (
          <FileInput
            label="Upload SRS Document"
            onChange={setSrsFile}
          />
        )}

        {evalType === "code" && (
          <FileInput
            label="Upload Source Code File"
            onChange={setCodeFile}
          />
        )}

        {evalType === "test_cases" && (
          <>
            <FileInput
              label="Upload Problem Description"
              onChange={setProblemFile}
            />
            <FileInput
              label="Upload Generated Test Cases"
              onChange={setTestcaseFile}
            />
          </>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Start Evaluation"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}

/* ---------- Reusable File Input ---------- */

function FileInput({
  label,
  onChange,
}: {
  label: string;
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        type="file"
        className="mt-2 w-full rounded-md border border-gray-300 text-gray-900 file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:mr-4 focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </div>
  );
}
