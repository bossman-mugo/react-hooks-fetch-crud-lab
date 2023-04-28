import { useState } from "react";

const Question = ({ question }) => {
  const { id, prompt, answers, correctIndex } = question;

  const [formData, setFormData] = useState({
    prompt,
    answers: [...answers],
    correctIndex,
  });

  const handleAnswerChange = (event, index) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = event.target.value;
    setFormData({ ...formData, answers: newAnswers });
  };

  const handleCorrectAnswerChange = (event) => {
    const correctIndex = parseInt(event.target.value);
    setFormData({
      ...formData,
      correctIndex,
    });
  };

  const handleDelete = () => {
    // TODO: implement delete functionality
    console.log(`Deleting question ${id}`);
  };

  const options = formData.answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Question {id}</h5>
        <p className="card-text">{formData.prompt}</p>
        <form>
          {formData.answers.map((answer, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="radio"
                name={`question-${id}-answer`}
                value={index}
                checked={formData.correctIndex === index}
                onChange={handleCorrectAnswerChange}
              />
              <label className="form-check-label">{answer}</label>
            </div>
          ))}
        </form>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Question
        </button>
      </div>
    </div>
  );
};

export default Question;
