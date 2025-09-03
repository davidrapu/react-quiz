import Question from "./Question";
import Button from "../Button";
import Timer from "./Timer";
export default function Quiz({state, dispatch, questions}) {
  function handleNext(){
    if (state.num < questions.length -1) dispatch({type : 'Next'})
    else {
      dispatch({type: 'setStatus', payload: 'finish'})
      console.log(state.highScore, state.userPoints)
      dispatch({type: 'setHighscore', payload: Math.max(state.highScore, state.userPoints)})
    }
  }

  return (
    <div className="quiz">
      <div className="progress-bar">
        <progress value={state.num} max={14}>
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
        <Timer dispatch={dispatch} state={state} />
        {state.selectedId != null ?
          <div className="buttons">
            <Button onClick={handleNext}>Next ▶</Button>
          </div>
          :
          ""
        }
      </div>
    </div>
  );
}
