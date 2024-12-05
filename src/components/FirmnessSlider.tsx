import React, { useState, useEffect, useRef } from "react";
import { Berry } from "../types/berry";

interface FirmnessSliderProps {
  berries: Berry[];
  setFirmness: (firmness: string | null) => void;
}

const FirmnessSlider: React.FC<FirmnessSliderProps> = ({ berries, setFirmness }) => {
  // Extract firmness levels dynamically from berries
  const firmnessLevels = [...new Set(berries.map((berry) => berry.firmness.name))].map(
    (name) => {
      const count = berries.filter((berry) => berry.firmness.name === name).length;
      const color =
        name === "super-hard"
          ? "#EF4444" // Red-500
          : name === "very-hard"
          ? "#F87171" // Red-400
          : name === "hard"
          ? "#FB923C" // Orange-400
          : name === "soft"
          ? "#34D399" // Green-400
          : "#10B981"; // Green-500
      return { name, count, color };
    }
  );

  const [selectedIndex, setSelectedIndex] = useState(3); // Default to "Soft"
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Set initial firmness value when the component loads
    setFirmness(firmnessLevels[selectedIndex].name);
  }, [selectedIndex, setFirmness, firmnessLevels]);

  // Handle slider track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (sliderRef.current) {
      const track = sliderRef.current.getBoundingClientRect();
      const clickPosition = e.clientY - track.top;
      const segmentHeight = track.height / firmnessLevels.length;
      const newIndex = Math.min(
        firmnessLevels.length - 1,
        Math.max(0, Math.round(clickPosition / segmentHeight))
      );
      setSelectedIndex(newIndex);
      setFirmness(firmnessLevels[newIndex].name);
    }
  };

  // Calculate top position more accurately
  const calculateTopPosition = (index: number) => {
    const trackHeight = 100; // Representing height in percentage
    const stepHeight = trackHeight / (firmnessLevels.length - 1);
    return `calc(${index * stepHeight}% - 1.5rem)`; // Adjust offset to visually center the thumb
  };

  return (
    <div className="relative flex items-center w-48 h-96 mx-auto">
      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="relative w-12 h-full cursor-pointer bg-gray-300 rounded-full"
        onClick={handleTrackClick} // Make track clickable
      >
        {/* Static Slider Track */}
        <div className="absolute w-full h-full rounded-full"></div>

        {/* Slider Thumb */}
        <div
          className="absolute left-2/4 transform -translate-x-2/4 w-8 h-8 rounded-full shadow-md slider-thumb transition-all duration-300 ease-out"
          style={{
            backgroundColor: firmnessLevels[selectedIndex].color,
            top: calculateTopPosition(selectedIndex), // Use function to determine correct position
          }}
        />
      </div>

      {/* Right: Labels */}
      <div className="flex flex-col justify-between h-full ml-4">
        {firmnessLevels.map((level, index) => (
          <div
            key={index}
            className={`text-sm font-semibold cursor-pointer ${
              selectedIndex === index ? "" : "text-gray-600"
            }`}
            style={{
              color: selectedIndex === index ? level.color : "gray",
            }}
            onClick={() => {
              setSelectedIndex(index);
              setFirmness(level.name); // Update firmness when clicked
            }}
          >
            {level.name}
            <div
              className={`text-xs ${
                selectedIndex === index ? "" : "text-gray-400"
              }`}
              style={{
                color: selectedIndex === index ? level.color : "gray",
              }}
            >
              {level.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirmnessSlider;
