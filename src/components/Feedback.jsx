import { useNavigate } from "react-router-dom";

export default function Feedback({ answers }) {
  const navigate = useNavigate();

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalQuestions = answers.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  const handleHomeClick = () => {
    navigate("/");
  };

  // Improved function to construct the full correct sentence
  const getFullCorrectSentence = (answer) => {
    // If we already have the complete correct sentence, use that
    if (answer.correctSentence) {
      return answer.correctSentence;
    }

    // For fill-in-the-blank questions
    if (answer.sentenceParts && answer.sentenceParts.length > 0) {
      let fullSentence = "";

      // Combine sentence parts with correct answers
      for (let i = 0; i < answer.sentenceParts.length; i++) {
        fullSentence += answer.sentenceParts[i];
        // Add the correct answer if it exists for this blank
        if (answer.correctAnswer && i < answer.correctAnswer.length) {
          fullSentence += answer.correctAnswer[i];
        }
      }
      return fullSentence;
    }

    // Fallback if we don't have sentence parts
    if (answer.correctAnswer && answer.correctAnswer.length > 0) {
      return answer.correctAnswer.join(" ");
    }

    return "No correct sentence available.";
  };

  // Helper function to get user's attempt at the full sentence
  const getUserSentence = (answer) => {
    if (answer.userSentence) {
      return answer.userSentence;
    }

    if (answer.sentenceParts && answer.sentenceParts.length > 0) {
      let userSentence = "";
      for (let i = 0; i < answer.sentenceParts.length; i++) {
        userSentence += answer.sentenceParts[i];
        if (answer.userAnswer && i < answer.userAnswer.length) {
          userSentence += answer.userAnswer[i];
        }
      }
      return userSentence;
    }

    if (answer.userAnswer && answer.userAnswer.length > 0) {
      return answer.userAnswer.join(" ");
    }

    return "No answer provided";
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={handleHomeClick}
        className="absolute top-4 left-4 bg-gray-100 text-black py-2 px-4 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200"
      >
        ← Home
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Test Results</h1>

      <div className="score-card bg-blue-50 p-6 rounded-lg mb-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Your Score</h2>
        <div className="text-5xl font-bold text-blue-600 mb-2">
          {correctCount}/{totalQuestions}
        </div>
        <div className="text-lg">({scorePercentage}%)</div>
      </div>

      <div className="answers">
        {answers.map((answer, index) => {
          const fullCorrectSentence = getFullCorrectSentence(answer);
          const userSentence = getUserSentence(answer);

          return (
            <div
              key={answer.questionId}
              className={`p-4 rounded-lg mb-4 ${
                answer.isCorrect ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <h3 className="font-bold mb-2 flex items-center">
                {answer.isCorrect ? (
                  <span className="text-green-500 mr-2">✓</span>
                ) : (
                  <span className="text-red-500 mr-2">✗</span>
                )}
                Question {index + 1}
              </h3>

              <div className="mb-4">
                <p className="font-medium">Correct Sentence:</p>
                <p className="text-gray-700 bg-white p-3 rounded border border-gray-200">
                  {fullCorrectSentence}
                </p>
              </div>

              <div className="mb-4">
                <p className="font-medium">Your Sentence:</p>
                <p
                  className={`text-gray-700 bg-white p-3 rounded border ${
                    answer.isCorrect
                      ? "border-green-200 text-green-600"
                      : "border-red-200 text-red-600"
                  }`}
                >
                  {userSentence}
                </p>
                <span
                  className={`text-sm ${
                    answer.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => window.location.reload()}
        className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
