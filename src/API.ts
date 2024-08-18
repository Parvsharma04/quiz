import {shuffleArray} from './utils'

export enum Difficulty {
  EASY = "easy",
  Medium = "medium",
  HARD = "hard"
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & { answers: string[] };

export const fetchQuiz = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();

  return data.results.map((ques: Question): QuestionState => ({
    ...ques,
    answers: shuffleArray([...ques.incorrect_answers, ques.correct_answer])
  }));
};

