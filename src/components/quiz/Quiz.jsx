import questionList from "../../assets/data/questions.json";
import { useReducer } from "react";
import Question from "./Question";
import Button from "../Button";

const questions = questionList.questions;
const initialState = {
  num : 0,
  userPoints : 0,
  selectedId : null,
  prevSelectedId: null,
};

function reducer(state, action){
  switch (action.type) {
    case 'Next':
      return {...state, num: state.num + 1,  prevSelectedId: state.selectedId, selectedId: null}
    case 'Prev':
      return {...state, num: state.num - 1, selectedId: state.prevSelectedId}
    case 'setSelectedId':
      return {...state, selectedId: action.payload}
    case 'increaseUserPoints':
      return {...state, userPoints: state.userPoints + action.payload}
    default:
      return state
  }
}
export default function Quiz() {
  const [state, dispatch] = useReducer(reducer, initialState)
  function handleNext(){
    if (state.num < questions.length -1) dispatch({type : 'Next'})
  }

  return (
    <div className="quiz">
      <div className="progress-bar">
        <progress value={state.num + 1} max={15}>
          {" "}
        </progress>
        <p>
          <span>
            Question <strong>{state.num + 1}</strong> / {questions.length}
          </span>
          <span>
            <strong>{state.userPoints}</strong> /{" "}
            {questions.reduce((acc, qObj) => acc + qObj.points, 0)} points
          </span>
        </p>
      </div>
      <Question questionObj={questions[state.num]} state={state} dispatch={dispatch} />
      <div className="timer-next-container">
        <p>17:30</p>
        <div className="buttons">
          <Button onClick={handleNext}>Next ▶</Button>
        </div>
      </div>
    </div>
  );
}
