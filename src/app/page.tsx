"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";

export default function Page() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [tailoredResult, setTailoredResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!jobTitle.trim()) {
      setError("Please enter a job title.");
      return;
    }

    if (jobDescription.trim().length < 50) {
      setError("Job description must be at least 50 characters.");
      return;
    }

    setError(""); // Clear previous errors
    setTailoredResult(""); // Clear previous result

    const response = await fetch("https://aimannaseem.app.n8n.cloud/webhook/tailor-resume", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jobTitle,
    jobDescription,
  }),
});


const data = await response.json();
console.log(data.result);


    /*try {
      const response = await fetch("/api/tailor-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle, jobDescription }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setTailoredResult(data.result);
    } catch (err) {
      setError("Failed to connect to the server.");
    }*/
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-10 flex flex-col items-center justify-center space-y-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-800 p-10 rounded-2xl shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Tailor Your Resume
        </h1>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Job Title
          </label>
          <div className="relative">
            <Input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <FileText className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Job Description
          </label>
          <textarea
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full px-4 py-2 bg-gray-100 text-black rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Show error message */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="relative px-6 py-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold overflow-hidden shadow-md group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 animate-sparkle" />
            <span className="relative z-10">✨ Tailor Resume ✨</span>
          </button>
        </div>
      </form>

      {/* Output Box */}
      {tailoredResult && (
        <div className="p-6 bg-gray-700 text-white rounded-xl max-w-2xl w-full shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Tailored Result:</h2>
          <p>{tailoredResult}</p>
        </div>
      )}
    </div>
  );
}