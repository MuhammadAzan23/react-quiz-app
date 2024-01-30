import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(function () {
    fetchQuestion();
  }, []);

  function fetchQuestion() {
    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(res => {
        if (res && res.questions && res.questions.length > 0) {
          setQuestions(res.questions);
        } else {
          console.error('Invalid API response:', res);
        }
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }

  function nextQuestion() {
    setCurrentIndex(currentIndex + 1);
    setSelectedOption(null); // Reset selected option for the next question
  }

  function restart() {
    setCurrentIndex(0);
    setSelectedOption(null);
  }

  function handleOptionSelect(option) {
    setSelectedOption(option);
  }

  if (!questions || questions.length === 0) {
    return <div>loading..</div>;
  }

  const currentQuestion = questions[currentIndex];
  const lastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="app">
      <h3>{currentIndex + 1}. {currentQuestion.question}</h3>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={selectedOption === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>
      {lastQuestion ? (
        <button onClick={restart}>Restart</button>
      ) : (
        <button onClick={nextQuestion} disabled={!selectedOption}>
          Next
        </button>
      )}
    </div>
  );
}

export default App;
