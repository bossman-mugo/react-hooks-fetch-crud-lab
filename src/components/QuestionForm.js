import { useState } from "react";

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAnswerChange = (event, index) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = event.target.value;
    setFormData({ ...formData, answers: newAnswers });
  };

  const handleCorrectAnswerChange = (event) => {
    setFormData({
      ...formData,
      correctIndex: parseInt(event.target.value),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // TODO: update state in parent component
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          className="form-control"
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        {formData.answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            className="form-control"
            value={answer}
            onChange={(event) => handleAnswerChange(event, index)}
          />
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="correctAnswer">Correct Answer:</label>
        <select
          className="form-control"
          id="correctAnswer"
          name="correctAnswer"
          value={formData.correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {formData.answers.map((answer, index) => (
            <option key={index} value={index}>
              Answer {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default QuestionForm;
