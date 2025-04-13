import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SentenceBuilder from "../components/SentenceBuilder";
import Feedback from "../components/Feedback";

export default function GamePage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${backendUrl}/data`);
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (err) {
        setError("Failed to load questions");
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, [navigate]);

  const handleNextQuestion = (userSelection) => {
    const currentQuestion = questions[currentIndex];
    const userAnswerArray = currentQuestion.correctAnswer.map((_, index) => {
      return userSelection[index.toString()] || "";
    });

    const isCorrect = userAnswerArray.every(
      (answer, index) => answer === currentQuestion.correctAnswer[index]
    );

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.questionId,
        questionText: currentQuestion.question,
        userAnswer: userAnswerArray,
        isCorrect,
        correctAnswer: currentQuestion.correctAnswer,
      },
    ]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleTimeUp = () => {
    const currentQuestion = questions[currentIndex];
    const emptySelection = currentQuestion.correctAnswer.reduce(
      (acc, _, index) => {
        acc[index.toString()] = "";
        return acc;
      },
      {}
    );
    handleNextQuestion(emptySelection);
  };

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (loading)
    return <div className="text-center p-4">Loading questions...</div>;

  if (userAnswers.length === questions.length) {
    return <Feedback answers={userAnswers} />;
  }

  const currentQuestion = questions[currentIndex];

  let blankIndex = 0;

  const formattedQuestion = {
    sentence: currentQuestion.question.replace(
      /_____________/g,
      () => `{${blankIndex++}}`
    ),
    blanks: currentQuestion.correctAnswer.map((_, i) => i.toString()),
    options: [...currentQuestion.options],
    correctAnswers: currentQuestion.correctAnswer.reduce((acc, val, i) => {
      acc[i.toString()] = val;
      return acc;
    }, {}),
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-xl font-bold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h1>

      <div className="border border-gray-300 p-6 rounded-lg shadow-md">
        <SentenceBuilder
          question={formattedQuestion}
          onComplete={handleTimeUp}
          onNext={handleNextQuestion}
        />
      </div>
    </div>
  );
}
