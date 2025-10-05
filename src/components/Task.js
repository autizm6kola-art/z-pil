// import React, { useEffect } from "react";
// import '../styles/taskItem.css';

// function Task({ task, onCorrect, alreadyCorrect }) {
//   const [answer, setAnswer] = React.useState('');
//   const [isCorrect, setIsCorrect] = React.useState(null);

//   useEffect(() => {
//     if (alreadyCorrect) {
//       setIsCorrect(true);
//     }
//   }, [alreadyCorrect]);

//   const handleChange = (e) => {
//     setAnswer(e.target.value);
//     setIsCorrect(null);
//   };

//   const checkAnswer = () => {
//     if (answer.trim().toLowerCase() === task.correctAnswer.toLowerCase()) {
//       if (!isCorrect) {
//         setIsCorrect(true);
//         onCorrect(task.id);
//       }
//     } else {
//       setIsCorrect(false);
//     }
//   };

//   return (
//     <div className="task-item" style={{ marginBottom: '20px' }}>
//       <p><strong>Задача {task.id}</strong></p>
      

//       {task.audio && (
//         <audio controls src={task.audio} style={{ marginBottom: '10px' }} />
//       )}


//       <input
//         type="text"
//         value={answer}
//         onChange={handleChange}
//         placeholder="Введите ответ"
//         disabled={isCorrect === true}
//         className={
//           isCorrect === null ? '' : isCorrect ? 'correct' : 'incorrect'
//         }
//       />

//       <button
//         onClick={checkAnswer}
//         disabled={isCorrect === true}
//         className="check-button"
//       >
//         Проверить
//       </button>
//     </div>
//   );
// }

// export default Task;


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
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <p><strong> {task.id}</strong></p>
      <p>{task.text}</p>

      {task.audio && (
        <audio controls src={task.audio} style={{ marginBottom: '10px' }} />
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
