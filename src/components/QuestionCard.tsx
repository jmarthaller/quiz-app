import React from 'react';

type Props = {
    question: string;
    answer: string[];
    callback: any;
    userAnswer: string;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answer, callback, userAnswer, questionNumber, totalQuestions }) => (
    
    <div>
      <p className="number">Question: {questionNumber} / {totalQuestions}</p>;
      <p></p>
    </div>
    
    );




export default QuestionCard;