
import React from "react";
import {
  getSavedAnswer,
  saveAnswerText,
  saveCorrectAnswer,
  isTaskCorrect
} from '../utils/storage';
import '../styles/taskItem.css';

function Task({ task, onCorrect, alreadyCorrect, resetSignal }) {
  const [answer, setAnswer] = React.useState('');
  const [isCorrect, setIsCorrect] = React.useState(false);

  React.useEffect(() => {
    const savedAnswer = getSavedAnswer(task.id);
    const correct = isTaskCorrect(task.id);

    setAnswer(savedAnswer || '');
    setIsCorrect(correct);
  }, [task.id, resetSignal]);

  const handleChange = (e) => {
    setAnswer(e.target.value);
    setIsCorrect(false);
  };

  const saveAnswer = () => {
    if (answer.trim() === '') return;

    saveAnswerText(task.id, answer.trim());
    saveCorrectAnswer(task.id);
    setIsCorrect(true);

    if (typeof onCorrect === 'function') {
      onCorrect(task.id);
    }
  };

  const inputStyle = {
    backgroundColor: isCorrect ? '#c8f7c5' : 'white',
    padding: '5px',
    marginRight: '10px',
    width: '230px',
    marginBottom: '10px',
    marginTop: '10px',
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <p><strong> {task.id}</strong></p>
      <p>{task.text}</p>

      {task.audio && (
        <audio controls src={process.env.PUBLIC_URL + task.audio} style={{ marginBottom: '10px' }} />
      )}

      {isCorrect && (
        <div className="correct-answer">
          {answer}
        </div>
      )}

      <input
        type="text"
        value={answer}
        onChange={handleChange}
        style={inputStyle}
        placeholder="Введите ответ"
        disabled={isCorrect}
      />
      <button
        onClick={saveAnswer}
        disabled={answer.trim() === '' || isCorrect}
        className={`save-button ${isCorrect ? 'disabled' : ''}`}
      >
        Сохранить
      </button>
    </div>
  );
}

export default Task;
