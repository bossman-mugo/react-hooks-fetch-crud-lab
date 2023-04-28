import { useState, useEffect } from "react";
import Question from "./QuestionItem";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <div className="question-list">
      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
