import { useReducer } from "react";
import Button from "./Button";
import Quiz from "./quiz/Quiz";
import questionList from "../assets/data/questions.json";


const initialState = {
  num: 0,
  userPoints: 0,
  selectedId: null,
  prevSelectedId: null,
  highScore: Number(localStorage.getItem('highScore')) || 0,
  // Intro | Start | Finish
  status: 'intro',
  secondsRemaining: 0
};
function reducer(state, action) {
  switch (action.type) {
    case "Next":
      return {
        ...state,
        num: state.num + 1,
        prevSelectedId: state.selectedId,
        selectedId: null,
      };
    case "Prev":
      return { ...state, num: state.num - 1, selectedId: state.prevSelectedId };
    case "setSelectedId":
      return { ...state, selectedId: action.payload };
    case "increaseUserPoints":
      return { ...state, userPoints: state.userPoints + action.payload };
    case "setStatus":
      return {...state, status: action.payload}
    case 'setHighscore':
      localStorage.setItem('highScore', action.payload);
      return { ...state, highScore: action.payload };
    case "reset":
      return {...initialState, highScore: state.highScore}
    case "reduceTimer":
      return {...state, secondsRemaining: state.secondsRemaining - 1}
    case "setTimer":
      return {...state, secondsRemaining: action.payload}
    default:
      return state;
  }
}
const totalPoints = questionList.questions.reduce((acc, qObj) => acc + qObj.points, 0)
export default function Main() {
  const [state, dispatch] = useReducer(reducer, initialState)
  function handleQuizStart() {
    dispatch({type: 'setStatus', payload: 'start'})
    dispatch({type: 'setTimer', payload: questionList.questions.length * 10})
  }
  function handleReset(){
    dispatch({type: 'reset'})
  }
  return (
    <main>
      {state.status === "intro" && (
        <div className="intro">
          <h2>Welcome to the React Quiz</h2>
          <p>15 questions to test your React mastery</p>
          <Button onClick={handleQuizStart}>Let's start!</Button>
        </div>
      )}
      {state.status === "start" && (
        <Quiz
          state={state}
          dispatch={dispatch}
          questions={questionList.questions}
        />
      )}
      {state.status === "finish" && (
        <div className="result-container">
          <div className="result">
            <p id="score">
              You scored {state.userPoints} out of{" "}
              {totalPoints} (
              {((state.userPoints / totalPoints) * 100).toFixed(2)}%)
            </p>
            <p id="highscore">(Highscore: {state.highScore} points)</p>
          </div>
          <div className="reset">
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
      )}
    </main>
  );
}
