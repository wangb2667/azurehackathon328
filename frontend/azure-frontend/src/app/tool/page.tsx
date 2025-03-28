"use client";
import { useRef, useState } from "react";
import DragNdrop from "../components/dragndrop";

export default function Page() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileSelect = (files: File[]) => {
    console.log("Selected files:", files);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div
      className="flex flex-col min-h-screen items-center justify-center px-6 py-12 sm:px-12 bg-gradient-to-b from-blue-200 to-blue-700 text-white"
      style={{ fontFamily: "'Tektur', sans-serif" }}
    >
      <h1 className="text-4xl font-bold mb-12 text-center">Try FridgeLens!</h1>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl border border-blue-400 bg-white/10 backdrop-blur-md shadow-lg p-6 space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-blue-700">How it works:</h2>
          <ul className="list-disc list-inside text-lg text-white/90 space-y-2">
            <li>Take a picture of your refrigerator (inside or contents).</li>
            <li>Upload it using our drag-and-drop tool on the right.</li>
            <li>We’ll detect the ingredients and suggest nutritious recipes.</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <DragNdrop
            onFilesSelected={handleFileSelect}
            onSubmit={handleSubmit}
            width="100%"
            height="auto"
          />
        </div>
      </div>

      {submitted && (
        <div
          ref={resultRef}
          className="mt-12 w-full px-6 sm:px-12 py-6 bg-green-100 text-green-800 text-center font-semibold text-lg shadow-lg rounded-xl max-w-screen-xl"
        >
          Files submitted successfully! (Results go here.)
        </div>
      )}
    </div>
  );
}
