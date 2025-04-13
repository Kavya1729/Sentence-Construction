import { useState, useEffect } from "react";
import WordOption from "./WordOption";
import Timer from "./Timer";

export default function SentenceBuilder({ question, onComplete, onNext }) {
  const [selectedWords, setSelectedWords] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setSelectedWords({});
    setShuffledOptions([...question.options].sort(() => Math.random() - 0.5));
    setKey((prevKey) => prevKey + 1);
  }, [question]);

  const handleSelectWord = (word) => {
    setSelectedWords((prev) => {
      if (Object.values(prev).includes(word)) {
        const newSelected = { ...prev };
        Object.keys(newSelected).forEach((key) => {
          if (newSelected[key] === word) {
            delete newSelected[key];
          }
        });
        return newSelected;
      }

      const blankId = question.blanks.find((id) => !prev[id]);
      if (blankId) {
        return { ...prev, [blankId]: word };
      }
      return prev;
    });
  };

  const handleRemoveWord = (blankId) => {
    setSelectedWords((prev) => {
      const newSelected = { ...prev };
      delete newSelected[blankId];
      return newSelected;
    });
  };

  const renderSentence = () => {
    return question.sentence.split(/(\{[0-9]+\})/).map((part, i) => {
      if (part.match(/^\{[0-9]+\}$/)) {
        const blankId = part.slice(1, -1);
        return (
          <span key={i} className="mx-1">
            {selectedWords[blankId] ? (
              <span
                onClick={() => handleRemoveWord(blankId)}
                className="bg-blue-100 px-2 py-1 rounded cursor-pointer hover:bg-blue-200"
              >
                {selectedWords[blankId]}
              </span>
            ) : (
              <span className="underline px-2">________</span>
            )}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const allBlanksFilled = question.blanks.every((id) => selectedWords[id]);

  return (
    <div className="p-4">
      <Timer key={key} duration={30} onComplete={onComplete} />
      <div className="flex justify-center items-center mb-9 mt-4">
        <p className="text-gray-600 text-sm font-medium">
          Select the missing words in correct order
        </p>
      </div>

      <div className="sentence mb-12 text-lg leading-relaxed">
        {renderSentence()}
      </div>

      <div className="options grid grid-cols-2 gap-3 mb-6">
        {shuffledOptions.map((word, i) => (
          <WordOption
            key={i}
            word={word}
            selected={Object.values(selectedWords).includes(word)}
            onSelect={() => handleSelectWord(word)}
          />
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <button
          onClick={() => onNext(selectedWords)}
          disabled={!allBlanksFilled}
          className={`flex items-center justify-center w-12 h-12 transition-all ${
            !allBlanksFilled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-700"
          } rounded-md`}
        >
          <span className="text-white text-3xl">{"→"}</span>
        </button>
      </div>
    </div>
  );
}
