"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const imageSet = [
  "/food/apple.webp",
  "/food/orange.webp",
  "/food/peach.png",
  "/food/lettuce.webp",
  "/food/watermelon.webp",
  "/food/bananas.webp",
];

// Row vertical positions
const rowTops = ["5%", "22.5%", "40%", "57.5%", "75%"];

// Even horizontal positions for 6 columns
const colLefts = ["5%", "22%", "39%", "56%", "73%", "90%"];

const noFlyZone = {
  top: 20,     // % from top of screen
  bottom: 75,  // % from top of screen (i.e., this covers the center 40%)
  left: 35,    // % from left of screen
  right: 65,   // % from left of screen
};

const foods = rowTops.flatMap((topPercent, rowIndex) => {
  const topNum = parseFloat(topPercent); // e.g., "40%" → 40
  const rotatedImages = [...imageSet.slice(rowIndex), ...imageSet.slice(0, rowIndex)];

  return colLefts.map((leftPercent, colIndex) => {
    const leftNum = parseFloat(leftPercent); // e.g., "56%" → 56

    // Skip if the image would land inside the no-fly box
    const isInNoFlyZone =
      leftNum > noFlyZone.left &&
      leftNum < noFlyZone.right &&
      topNum > noFlyZone.top &&
      topNum < noFlyZone.bottom;

    if (isInNoFlyZone) return null;

    return {
      src: rotatedImages[colIndex % rotatedImages.length],
      top: topPercent,
      left: leftPercent,
    };
  }).filter(Boolean);
});


const suggestions = [
  "meal plan",
  "grocery list",
  "dinner idea",
  "healthy recipe",
  "way to reduce food waste",
];

export default function Home() {
  const [subIndex, setSubIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (index === suggestions.length) setIndex(0);
    const current = suggestions[index];

    if (subIndex === current.length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % suggestions.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 80 : 160);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0651c9] to-white text-white px-6 sm:px-12 py-12 flex flex-col items-center justify-center text-center space-y-6"
    style={{ fontFamily: "'Tektur', sans-serif" }}>
      {foods.map((food, i) => {
        if (!food) return null;
        const floatClass = ["animate-float-sm", "animate-float-md", "animate-float-lg"][i % 3];
  
        return (
          <div
            key={i}
            className={`absolute ${floatClass} z-[1] transition-all duration-300`}
            style={{
              top: food.top,
              left: food.left,
              width: "120px",
              height: "120px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-full h-full flex items-center justify-center group">
              <Image
                src={food.src}
                alt={`food-${i}`}
                width={90}
                height={90}
                className="transition-all duration-300 group-hover:blur-sm group-hover:scale-110 cursor-pointer"
              />
            </div>
          </div>
        );
      })}
  
      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-700 tracking-tight z-10">FridgeLens</h1>
  
      {/* Typing Effect */}
      <p className="text-2xl sm:text-3xl text-gray-300 font-medium h-10 z-10">
        Your next{" "}
        <span className="inline-block text-blue-600">
          {suggestions[index].substring(0, subIndex)}
          {blink ? "|" : " "}
        </span>
      </p>
  
      {/* Welcome & Tagline */}
      <p className="text-lg sm:text-xl text-gray-700 max-w-2xl z-10">
        Welcome to FridgeLens — the tool that helps you make the most of what’s in your fridge.
      </p>
  
      <p className="text-xl sm:text-2xl text-white font-semibold max-w-2xl z-10">
        Turn your fridge into a personal chef with FridgeLens!
      </p>
  
      {/* Instruction Box */}
      <div className="z-10 mt-6 bg-blue-950/30 border border-blue-600 p-6 rounded-xl shadow max-w-xl backdrop-blur-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2">How it works:</h2>
        <ul className="text-left list-disc list-inside text-gray-200 space-y-1 text-base sm:text-lg">
          <li>Take a picture of your refrigerator (inside or contents).</li>
          <li>Upload it using our drag-and-drop tool.</li>
          <li>We’ll detect the ingredients and suggest nutritious recipes.</li>
        </ul>
  
        <Link
          href="/tool"
          className="mt-4 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all"
        >
          Try the Tool
        </Link>
      </div>
    </div>
  );}