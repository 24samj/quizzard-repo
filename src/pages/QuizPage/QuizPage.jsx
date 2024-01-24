import { useEffect, useState } from "react";
import { questionBank } from "../../constants/questionBank";
import Preface from "../../components/Preface/Preface";
import Gamebox from "../../components/Gamebox/Gamebox";
import Results from "../../components/Results/Results";
import "./QuizPage.css";

const QuizPage = () => {
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentScore, setCurrentScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30000);
    const [questionSet, setQuestionSet] = useState(null);

    useEffect(() => {
        setQuestionSet(
            questionBank[Math.floor(Math.random() * questionBank.length)]
        );
    }, []);

    const handleQuestionChange = () => {
        if (currentQuestionNumber < 4) {
            setCurrentQuestionNumber(currentQuestionNumber + 1);
        } else {
            setQuizSubmitted(true);
            setGameStarted(false);
        }
        if (questionSet.answers[currentQuestionNumber] === selectedOption) {
            setCurrentScore(currentScore + 1);
        }
        setTimeLeft(30000);
        setSelectedOption(null);
    };

    useEffect(() => {
        if (!gameStarted) return;

        if (!timeLeft) handleQuestionChange();

        const intervalId = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 100);
        }, 100);

        return () => clearInterval(intervalId);
    }, [timeLeft, gameStarted]);

    return (
        <div className="quizpage-container">
            {!gameStarted && !quizSubmitted && (
                <Preface setGameStarted={setGameStarted} />
            )}
            {gameStarted && !quizSubmitted && (
                <Gamebox
                    currentQuestionNumber={currentQuestionNumber}
                    questionSet={questionSet}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    handleQuestionChange={handleQuestionChange}
                    timeLeft={timeLeft}
                />
            )}
            {quizSubmitted && (
                <Results
                    currentScore={currentScore}
                    setCurrentScore={setCurrentScore}
                    setCurrentQuestionNumber={setCurrentQuestionNumber}
                    setQuizSubmitted={setQuizSubmitted}
                    setGameStarted={setGameStarted}
                />
            )}
        </div>
    );
};

export default QuizPage;
