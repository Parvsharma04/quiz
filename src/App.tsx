import React, { useState } from 'react';
import { fetchQuiz, Difficulty, QuestionState } from './API';
import './app.css'
import QuestionCard from './components/QuestionCard';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuiz(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.innerText;
    const correct = questions[number].correct_answer === answer;

    if (correct) setScore(prev => prev + 1);  

    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correct_answer: questions[number].correct_answer,
    };
    setUserAnswers(prev => [...prev, answerObject]);
    console.log(answerObject);
    
  };


  const nextQuestion = () => {
    setNumber(prev=> prev+1)
    if(number === TOTAL_QUESTIONS-1){
      setGameOver(true)
    }
    setLoading(true)
    setLoading(false)
  };

  return (
    <div className="App">
      <h1>Quiz</h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}

      {!gameOver && <h1 className="score">Score: {score}</h1>}

      {loading && <p>Loading...</p>}

      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;

