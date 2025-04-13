import { useNavigate } from "react-router-dom";
import image from "../assets/Icons.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-blue-500 text-white py-4">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-xl sm:text-xl font-semibold">
            Sentence Construction
          </h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg mx-4 text-center">
          <div className="flex justify-center mb-7">
            <img
              src={image}
              alt="Logo"
              className="w-17 h-17"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-6 sm:mb-8">
            Sentence Construction
          </h1>
          <p className="mb-10 sm:mb-16 text-sm sm:text-base font-normal text-gray-700 px-2 sm:px-0">
            Select the correct words to complete the sentence by arranging the
            provided options in the right order.
          </p>

          <div className="flex justify-between items-center mb-8 sm:mb-10 px-1 sm:px-2 w-full">
            <div className="flex-1 flex flex-col items-center">
              <p className="font-medium text-sm sm:text-base whitespace-nowrap">
                Time Per Question
              </p>
              <p className="text-gray-600 text-sm sm:text-base">30 sec</p>
            </div>

            <div className="h-8 sm:h-10 w-px bg-gray-300 mx-2 sm:mx-4" />

            <div className="flex-1 flex flex-col items-center">
              <p className="font-medium text-sm sm:text-base whitespace-nowrap">
                Total Questions
              </p>
              <p className="text-gray-600 text-sm sm:text-base">10</p>
            </div>

            <div className="h-8 sm:h-10 w-px bg-gray-300 mx-2 sm:mx-4" />

            <div className="flex-1 flex flex-col items-center">
              <p className="font-medium text-sm sm:text-base whitespace-nowrap">
                Coins
              </p>
              <p className="text-gray-600 text-sm sm:text-base">🪙 0</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 sm:gap-4 w-full px-2 sm:px-0">
            <button
              onClick={() => navigate(-1)}
              className="w-32 sm:w-40 border border-blue-500 text-blue-500 font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-base sm:text-lg transition-all hover:bg-blue-50"
            >
              Back
            </button>
            <button
              onClick={() => navigate("/game")}
              className="w-32 sm:w-40 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-base sm:text-lg transition-all"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
