import React, { useState, useEffect, useRef } from "react";
import { Berry } from "../types/berry";

interface FirmnessSliderProps {
    berries: Berry[];
    setFirmness: (firmness: string | null) => void;
}

const FirmnessSlider: React.FC<FirmnessSliderProps> = ({ berries, setFirmness }) => {
    const firmnessOrder = ["super-hard", "very-hard", "hard", "soft", "very-soft"];
    const firmnessLevels = [...new Set(berries.map((berry) => berry.firmness.name))]
        .map((name) => {
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
        })
        .sort((a, b) => firmnessOrder.indexOf(a.name) - firmnessOrder.indexOf(b.name));

    const [selectedIndex, setSelectedIndex] = useState(0); // Default to "Very Soft"
    const sliderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setFirmness(firmnessLevels[selectedIndex].name);
    }, [selectedIndex, setFirmness, firmnessLevels]);

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

    const calculateTopPosition = (index: number) => {
        const trackHeight = 100;
        const stepHeight = trackHeight / (firmnessLevels.length - 1);

        if (index === 0) {
            return `0%`;
        } else {
            return `calc(${index * stepHeight}% - ${index * 10}px)`;
        }
    };

    return (
        <div className="relative flex items-center w-48 h-96 mx-auto my-8">
            <div
                ref={sliderRef}
                className="relative w-12 h-full cursor-pointer bg-gray-50 border-2 border-gray-400 rounded-full"
                onClick={handleTrackClick}
            >
                <div className="absolute inset-0 w-full bg-gray-100 shadow-xl rounded-full"></div>

                <div
                    className="absolute left-2/4 transform -translate-x-2/4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-out"
                    style={{
                        top: calculateTopPosition(selectedIndex),
                    }}
                >
                    <div
                        className="w-10 h-10 rounded-full"
                        style={{
                            backgroundColor: "#f5f5f6",
                            boxShadow: `${firmnessLevels[selectedIndex].color}4d 0px 0px 20px 20px`,
                            borderColor: `${firmnessLevels[selectedIndex].color}4d`,
                            borderWidth: "2px",
                        }}
                    />
                </div>
            </div>

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
                            setFirmness(level.name);
                        }}
                    >
                        {level.name.replace("-", " ")}
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
