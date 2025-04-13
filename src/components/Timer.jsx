import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Timer({ duration, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const navigate = useNavigate(); // Use this hook for navigation

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, onComplete]);

  const getColor = () => {
    if (timeLeft > 20) return "green";
    if (timeLeft > 10) return "orange";
    return "red";
  };

  const textColor = {
    green: "text-green-500",
    orange: "text-orange-500",
    red: "text-red-500",
  };

  const fillColor = {
    green: "bg-green-500",
    orange: "bg-orange-400",
    red: "bg-red-500",
  };

  const color = getColor();

  const totalDashes = 10;
  const filledDashes = Math.ceil((timeLeft / duration) * totalDashes);

  const handleQuit = () => {
    navigate("/"); // Route to the home page
  };

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1 items-center">
        <span className={`font-bold ${textColor[color]}`}>{timeLeft}s</span>
        {/* The Quit button is now placed after the timer */}
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-md text-sm border border-gray-400 mb-7"
          onClick={handleQuit}
        >
          Quit
        </button>
      </div>

      <div className="flex gap-1">
        {[...Array(totalDashes)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2.5 rounded-sm ${
              i < filledDashes ? fillColor[color] : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
