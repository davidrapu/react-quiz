import Button from "../Button";

export default function Question({ questionObj, state, dispatch }) {
  function handleClick(e) {
    dispatch({ type: "setSelectedId", payload: Number(e.target.value) })

    if (questionObj.correctOption === Number(e.target.value)){
      dispatch({type: 'increaseUserPoints', payload: questionObj.points})
    }
  }
  return (
    <div className="question-answer-container">
      <h2> {questionObj.question} </h2>
      <div className="answers">
        {questionObj.options.map((answer, index) => (
          <Button
            onClick={handleClick}
            key={index}
            value={index}
            disabled={state.selectedId != null}
            className={`answer 
              ${state.selectedId === index ? "selected" : ""} 
              ${
                state.selectedId != null
                  ? questionObj.correctOption === index
                    ? "correct"
                    : "wrong"
                  : ""
              }
              ${state.selectedId != null ? 'disabled' : ""}
              `}
          >
            {answer}
          </Button>
        ))}
      </div>
    </div>
  );
}
